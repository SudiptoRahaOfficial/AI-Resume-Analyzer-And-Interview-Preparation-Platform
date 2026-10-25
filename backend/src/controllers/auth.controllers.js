/**
	- file name: auth.controllers.js
	- responsibility: responsible for all auth related api controllers
 */

// importing dependencis
const bcrypt = require('bcryptjs')
const securityConfig = require('../configs/security.config')
const userModel = require('../models/user.model')
const otpModel = require('../models/otp.model')
const sessionModel = require('../models/session.model')
const {
	BCRYPT_SALT_ROUNDS,
	OTP_EXPIRY_MS,
	SESSION_DURATION_MS,
	REFRESH_COOKIE_NAME,
	DUPLICATE_MESSAGES,
	DUMMY_PASSWORD_HASH,
	EmailDeliveryError,
	sendError,
	toPublicUser,
	getFirstErrorMessage,
	validateSignupInput,
	validateSigninInput,
	validateVerifyEmailInput,
	validateResendInput,
	generateSecureOTP,
	getResendRetryAfterSeconds,
	hashToken,
	signAccessToken,
	signRefreshToken,
	setRefreshTokenCookie,
	clearRefreshTokenCookie,
	findSessionByRefreshToken,
	cleanupFailedSignup,
	runInBackground,
} = require('../utils/auth.utils')
const {
	sendSignupEmail,
	sendSigninEmail,
	sendOTPEmail,
	sendVerificationSuccessEmail,
} = require('../services/email.service')

/**
	- signup controller
	- POST API - "/api/auth/signup"
 */
async function signupController(req, res) {
	// 1. validate + normalize input (400 with per-field errors)
	const { errors: inputErrors, values } = validateSignupInput(req.body)

	if (Object.keys(inputErrors).length > 0) {
		return sendError(
			res,
			400,
			'Please correct the highlighted fields.',
			inputErrors,
		)
	}

	const { username, email, password } = values

	// set once the user document exists, so we know what to undo on failure
	let createdUserId = null

	try {
		// 2. friendly duplicate check (reports username AND email conflicts together)
		const existingUsers = await userModel
			.find({ $or: [{ username }, { email }] })
			.select('username email')
			.lean()

		const duplicateErrors = {}
		existingUsers.forEach((existing) => {
			if (existing.username === username) {
				duplicateErrors.username = DUPLICATE_MESSAGES.username
			}
			if (existing.email === email) {
				duplicateErrors.email = DUPLICATE_MESSAGES.email
			}
		})

		if (Object.keys(duplicateErrors).length > 0) {
			return sendError(
				res,
				409,
				'An account with these details already exists.',
				duplicateErrors,
			)
		}

		// 3. create the user with a hashed password
		const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)

		const user = await userModel.create({
			username,
			email,
			password: passwordHash,
		})
		createdUserId = user._id

		// 4. create the OTP
		const otp = generateSecureOTP()
		const otpHash = await bcrypt.hash(otp, BCRYPT_SALT_ROUNDS)

		await otpModel.create({
			email: user.email,
			user: user._id,
			otpHash,
			expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
		})

		// 5. send the email (a failure here must not leave a stuck account)
		try {
			await sendSignupEmail(user.email, user.username, otp)
		} catch (emailError) {
			throw new EmailDeliveryError(emailError)
		}

		return res.status(201).json({
			message: 'Signup successful! Please verify your email.',
			success: true,
			user: toPublicUser(user),
		})
	} catch (error) {
		// roll back anything created before the failure
		await cleanupFailedSignup(createdUserId)

		// email provider failed
		if (error instanceof EmailDeliveryError) {
			console.error('Signup email failed', {
				error: error.cause?.message,
			})
			return sendError(
				res,
				502,
				'We could not send the verification email. Please try again.',
			)
		}

		// These two only make sense when the failure came from creating the
		// USER. If the OTP insert failed, "email already exists" would be a lie.
		if (!createdUserId) {
			// Mongoose schema validation failed -> client mistake, not a 500
			if (error.name === 'ValidationError') {
				const errors = Object.fromEntries(
					Object.values(error.errors).map((fieldError) => [
						fieldError.path,
						fieldError.message,
					]),
				)
				return sendError(
					res,
					400,
					'Please correct the highlighted fields.',
					errors,
				)
			}

			// unique index violation (race condition the find() can't catch)
			if (error.code === 11000) {
				const errors = Object.fromEntries(
					Object.keys(error.keyPattern ?? {}).map((field) => [
						field,
						DUPLICATE_MESSAGES[field] ??
							`This ${field} is already in use.`,
					]),
				)
				return sendError(
					res,
					409,
					'An account with these details already exists.',
					errors,
				)
			}
		}

		// genuinely unexpected: log details server-side, hide them from the client
		console.error('Signup failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

/**
	- verify-email controller
	- POST API - "/api/auth/verify-email"
 */
async function verifyEmailController(req, res) {
	// validating + normalizing input
	const { errors: inputErrors, values } = validateVerifyEmailInput(req.body)

	if (Object.keys(inputErrors).length > 0) {
		return sendError(
			res,
			400,
			getFirstErrorMessage(inputErrors),
			inputErrors,
		)
	}

	const { email, otp } = values

	try {
		// atomically claim one OTP verification attempt
		const otpDoc = await otpModel.findOneAndUpdate(
			{
				email,
				expiresAt: { $gt: new Date() },
				attempts: { $lt: securityConfig.MAX_OTP_ATTEMPTS },
			},
			{ $inc: { attempts: 1 } },
			{ returnDocument: 'after' },
		)

		// no claimable OTP: either all attempts are used up, or it's invalid/expired
		if (!otpDoc) {
			const hasActiveOtp = await otpModel.exists({
				email,
				expiresAt: { $gt: new Date() },
			})

			if (hasActiveOtp) {
				return sendError(
					res,
					429,
					'Too many incorrect attempts. Please request a new code.',
				)
			}

			return sendError(res, 400, 'Invalid or expired OTP')
		}

		// securely comparing provided OTP with stored OTP
		const isOtpValid = await bcrypt.compare(otp, otpDoc.otpHash)

		// wrong OTP: tell the user how many tries are left
		if (!isOtpValid) {
			const attemptsLeft = Math.max(
				securityConfig.MAX_OTP_ATTEMPTS - otpDoc.attempts,
				0,
			)

			if (attemptsLeft === 0) {
				return sendError(
					res,
					429,
					'Too many incorrect attempts. Please request a new code.',
				)
			}

			return sendError(
				res,
				400,
				`Incorrect code. ${attemptsLeft} ${attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`,
			)
		}

		// marking the user verified (only if not already verified)
		const user = await userModel.findOneAndUpdate(
			{ _id: otpDoc.user, verified: false },
			{ $set: { verified: true } },
			{ returnDocument: 'after' },
		)

		// deleting all OTPs belonging to the user
		await otpModel.deleteMany({ user: otpDoc.user })

		if (!user) {
			return sendError(res, 404, 'User not found or already verified')
		}

		// non-critical email: must not delay or fail the response
		runInBackground(
			'Verification success email delivery',
			() => sendVerificationSuccessEmail(user.email, user.username),
			{ userId: user._id.toString() },
		)

		return res.status(200).json({
			message: 'Email verified successfully',
			success: true,
			user: toPublicUser(user),
		})
	} catch (error) {
		console.error('Email verification failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

/**
	- resend-verify-email controller
	- POST API - "/api/auth/resend-verify-email"
 */
async function resendVerifyEmailController(req, res) {
	// validating + normalizing input
	const { errors: inputErrors, values } = validateResendInput(req.body)

	if (Object.keys(inputErrors).length > 0) {
		return sendError(
			res,
			400,
			getFirstErrorMessage(inputErrors),
			inputErrors,
		)
	}

	const { email } = values

	try {
		// finding user by normalized email
		const user = await userModel.findOne({ email })

		if (!user) {
			return sendError(res, 404, 'User not found')
		}

		if (user.verified) {
			return sendError(res, 409, 'Email already verified')
		}

		// cooldown: stops OTP email spam / bombing
		const latestOtp = await otpModel
			.findOne({ user: user._id })
			.sort({ expiresAt: -1 })
			.select('expiresAt')
			.lean()

		const retryAfter = getResendRetryAfterSeconds(latestOtp?.expiresAt)

		if (retryAfter > 0) {
			res.set('Retry-After', String(retryAfter))
			return sendError(
				res,
				429,
				`Please wait ${retryAfter} seconds before requesting a new code.`,
			)
		}

		// invalidating all previously generated OTPs for this user
		await otpModel.deleteMany({ user: user._id })

		// generating otp & encrypting otp
		const otp = generateSecureOTP()
		const otpHash = await bcrypt.hash(otp, BCRYPT_SALT_ROUNDS)

		const otpDoc = await otpModel.create({
			email: user.email,
			user: user._id,
			otpHash,
			expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
		})

		try {
			await sendOTPEmail(user.email, user.username, otp)
		} catch (emailError) {
			// the OTP was never delivered, so remove it and tell the user honestly
			await otpModel.deleteOne({ _id: otpDoc._id })

			console.error('Resend OTP email failed', {
				userId: user._id.toString(),
				error: emailError.message,
			})

			return sendError(
				res,
				502,
				'We could not send the verification email. Please try again.',
			)
		}

		return res.status(200).json({
			message: 'A new OTP has been sent',
			success: true,
		})
	} catch (error) {
		console.error('OTP sending failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

/**
	- signin controller
	- POST API - "/api/auth/signin"
 */
async function signinController(req, res) {
	// validating + normalizing input
	const { errors: inputErrors, values } = validateSigninInput(req.body)

	if (Object.keys(inputErrors).length > 0) {
		return sendError(
			res,
			400,
			getFirstErrorMessage(inputErrors),
			inputErrors,
		)
	}

	const { username, email, password } = values

	// making query according to username/email
	const query = username ? { username } : { email }

	try {
		const user = await userModel.findOne(query)

		// ALWAYS run bcrypt (against a dummy hash if the user doesn't exist), so
		// response time doesn't reveal whether an account exists
		const isPasswordValid = await bcrypt.compare(
			password,
			user?.password ?? DUMMY_PASSWORD_HASH,
		)

		if (!user || !isPasswordValid) {
			return sendError(res, 401, 'Invalid credentials')
		}

		// checked AFTER the password, so only the real owner learns this
		if (!user.verified) {
			return sendError(res, 403, 'Email not verified')
		}

		// building the session in memory first: its _id is known immediately,
		// so we need ONE database write instead of create + save
		const session = new sessionModel({
			user: user._id,
			ip: req.ip,
			userAgent: req.get('user-agent')?.slice(0, 512),
			expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
		})

		const refreshToken = signRefreshToken(user._id, session._id)
		session.refreshTokenHash = hashToken(refreshToken)
		await session.save()

		setRefreshTokenCookie(res, refreshToken)

		const accessToken = signAccessToken(user._id, session._id)

		// non-critical email: must not delay or fail the signin
		runInBackground(
			'Signin email delivery',
			() => sendSigninEmail(user.email, user.username),
			{ userId: user._id.toString() },
		)

		return res.status(200).json({
			message: 'User signed in successfully',
			success: true,
			user: toPublicUser(user),
			accessToken,
		})
	} catch (error) {
		console.error('Signin failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

/**
	- refresh-token controller
	- POST API - "/api/auth/refresh-token"
 */
async function refreshTokenController(req, res) {
	const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME]

	if (!refreshToken || typeof refreshToken !== 'string') {
		return sendError(
			res,
			401,
			'Unauthenticated user, refresh token missing',
		)
	}

	try {
		// verifies the JWT AND finds the active session matching this exact token
		const session = await findSessionByRefreshToken(refreshToken)

		if (!session) {
			clearRefreshTokenCookie(res)
			return sendError(res, 401, 'Invalid refresh token')
		}

		const user = await userModel.findById(session.user)

		if (!user) {
			clearRefreshTokenCookie(res)
			return sendError(res, 401, 'Unauthenticated user')
		}

		// rotating the refresh token atomically (compare-and-swap on the hash):
		// if two requests race with the same token, only one wins
		const newRefreshToken = signRefreshToken(user._id, session._id)

		const rotatedSession = await sessionModel.findOneAndUpdate(
			{
				_id: session._id,
				revoked: false,
				refreshTokenHash: session.refreshTokenHash,
			},
			{ $set: { refreshTokenHash: hashToken(newRefreshToken) } },
			{ returnDocument: 'after' },
		)

		// lost the race: another request already rotated it
		// (not clearing the cookie, it may already hold the winner's new token)
		if (!rotatedSession) {
			return sendError(res, 401, 'Invalid refresh token')
		}

		setRefreshTokenCookie(res, newRefreshToken)

		const accessToken = signAccessToken(user._id, session._id)

		return res.status(200).json({
			message: 'Token refreshed successfully',
			success: true,
			user: toPublicUser(user),
			accessToken,
		})
	} catch (error) {
		console.error('Token rotation failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

/**
	- signout controller
	- POST API - "/api/auth/signout"
 */
async function signoutController(req, res) {
	const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME]

	if (!refreshToken || typeof refreshToken !== 'string') {
		return sendError(
			res,
			401,
			'Unauthenticated user, refresh token missing',
		)
	}

	try {
		const session = await findSessionByRefreshToken(refreshToken)

		if (!session) {
			clearRefreshTokenCookie(res)
			return sendError(res, 401, 'Invalid refresh token')
		}

		// revoking only this device's session
		await sessionModel.updateOne(
			{ _id: session._id },
			{ $set: { revoked: true } },
		)

		clearRefreshTokenCookie(res)

		return res.status(200).json({
			message: 'User signed out successfully',
			success: true,
		})
	} catch (error) {
		console.error('Signout failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

/**
	- signout-all controller
	- POST API - "/api/auth/signout-all"
 */
async function signoutAllController(req, res) {
	const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME]

	if (!refreshToken || typeof refreshToken !== 'string') {
		return sendError(
			res,
			401,
			'Unauthenticated user, refresh token missing',
		)
	}

	try {
		const session = await findSessionByRefreshToken(refreshToken)

		if (!session) {
			clearRefreshTokenCookie(res)
			return sendError(res, 401, 'Invalid refresh token')
		}

		// revoking all active sessions belonging to the authenticated user
		await sessionModel.updateMany(
			{ user: session.user, revoked: false },
			{ $set: { revoked: true } },
		)

		clearRefreshTokenCookie(res)

		return res.status(200).json({
			message: 'Signed out from all devices successfully',
			success: true,
		})
	} catch (error) {
		console.error('Signout from all devices failed', {
			error: error.message,
			stack: error.stack,
		})

		return sendError(res, 500, 'Internal server error')
	}
}

// exporting controllers
module.exports = {
	signupController,
	verifyEmailController,
	resendVerifyEmailController,
	signinController,
	refreshTokenController,
	signoutController,
	signoutAllController,
}