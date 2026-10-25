/**
	- file name: auth.utils.js
	- responsibility: responsible for all auth related constants, helpers & util functions
 */

// importing dependencis
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const envConfig = require('../configs/env.config')
const userModel = require('../models/user.model')
const otpModel = require('../models/otp.model')
const sessionModel = require('../models/session.model')

/* -------------------------------------------------------------------------- */
/*  Constants - validation rules MUST mirror the frontend                     */
/* -------------------------------------------------------------------------- */

const USERNAME_MAX_LENGTH = 15
const EMAIL_MAX_LENGTH = 254
const PASSWORD_MAX_BYTES = 72 // bcrypt silently ignores everything after 72 bytes
const BCRYPT_SALT_ROUNDS = 12

const OTP_LENGTH = 6
const OTP_EXPIRY_MS = 3 * 60 * 1000
const RESEND_COOLDOWN_MS = 30 * 1000

const ACCESS_TOKEN_EXPIRES_IN = '15m'
const REFRESH_TOKEN_EXPIRES_IN = '7d'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000
const JWT_ALGORITHM = 'HS256'

const REFRESH_COOKIE_NAME = 'refreshToken'
const REFRESH_COOKIE_OPTIONS = {
	httpOnly: true,
	secure: true,
	sameSite: 'strict',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_REGEX =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/
const OTP_REGEX = new RegExp(`^\\d{${OTP_LENGTH}}$`)

const DUPLICATE_MESSAGES = {
	username: 'This username is not available.',
	email: 'An account with this email already exists.',
}

// a real bcrypt hash used to keep signin timing constant when the user doesn't exist
const DUMMY_PASSWORD_HASH = bcrypt.hashSync(
	crypto.randomBytes(16).toString('hex'),
	BCRYPT_SALT_ROUNDS,
)

/* -------------------------------------------------------------------------- */
/*  Errors                                                                    */
/* -------------------------------------------------------------------------- */

// marks failures that came specifically from the email provider
class EmailDeliveryError extends Error {
	constructor(cause) {
		super('Failed to deliver email', { cause })
		this.name = 'EmailDeliveryError'
	}
}

/* -------------------------------------------------------------------------- */
/*  Response helpers                                                          */
/* -------------------------------------------------------------------------- */

// one consistent error shape: { success, message, errors? }
function sendError(res, status, message, errors) {
	return res.status(status).json({
		success: false,
		message,
		...(errors && { errors }),
	})
}

// the only user fields that are ever sent to the client
function toPublicUser(user) {
	return {
		id: user._id,
		username: user.username,
		email: user.email,
		verified: user.verified,
	}
}

// first error message, used as the top-level message of a validation response
function getFirstErrorMessage(errors) {
	return Object.values(errors)[0]
}

/* -------------------------------------------------------------------------- */
/*  Input validation                                                          */
/*  Non-string values are treated as missing, which also blocks NoSQL         */
/*  injection payloads like { "email": { "$gt": "" } } before any query runs. */
/* -------------------------------------------------------------------------- */

function normalizeEmail(email) {
	return typeof email === 'string' ? email.trim().toLowerCase() : ''
}

function isValidEmail(normalizedEmail) {
	return (
		normalizedEmail.length <= EMAIL_MAX_LENGTH &&
		EMAIL_REGEX.test(normalizedEmail)
	)
}

// validates + normalizes signup body, collects ALL field errors at once
function validateSignupInput(body) {
	const { username, email, password } = body ?? {}
	const errors = {}

	const normalizedUsername =
		typeof username === 'string' ? username.trim() : ''
	const normalizedEmail = normalizeEmail(email)
	const rawPassword = typeof password === 'string' ? password : ''

	if (!normalizedUsername) {
		errors.username = 'Username is required.'
	} else if (normalizedUsername.length > USERNAME_MAX_LENGTH) {
		errors.username = `Username must be ${USERNAME_MAX_LENGTH} characters or fewer.`
	}

	if (!normalizedEmail) {
		errors.email = 'Email is required.'
	} else if (!isValidEmail(normalizedEmail)) {
		errors.email = 'Please enter a valid email address.'
	}

	if (!rawPassword) {
		errors.password = 'Password is required.'
	} else if (Buffer.byteLength(rawPassword, 'utf8') > PASSWORD_MAX_BYTES) {
		errors.password =
			'Password is too long. Please use 72 characters or fewer.'
	} else if (!PASSWORD_REGEX.test(rawPassword)) {
		errors.password =
			'Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol. Spaces are not allowed.'
	}

	return {
		errors,
		values: {
			username: normalizedUsername,
			email: normalizedEmail,
			password: rawPassword,
		},
	}
}

// validates + normalizes signin body (never reveals password rules)
function validateSigninInput(body) {
	const { username, email, password } = body ?? {}
	const errors = {}

	const normalizedUsername =
		typeof username === 'string' ? username.trim() : ''
	const normalizedEmail = normalizeEmail(email)
	const rawPassword = typeof password === 'string' ? password : ''

	if (!normalizedUsername && !normalizedEmail) {
		errors.identifier = 'Username or email is required.'
	} else if (normalizedUsername && normalizedEmail) {
		errors.identifier = 'Provide either username or email, not both.'
	} else if (normalizedEmail && !isValidEmail(normalizedEmail)) {
		errors.email = 'Please enter a valid email address.'
	}

	if (!rawPassword) {
		errors.password = 'Password is required.'
	} else if (Buffer.byteLength(rawPassword, 'utf8') > PASSWORD_MAX_BYTES) {
		// bcrypt would truncate it and could match a different password
		errors.password = 'Password is too long.'
	}

	return {
		errors,
		values: {
			username: normalizedUsername,
			email: normalizedEmail,
			password: rawPassword,
		},
	}
}

// validates + normalizes verify-email body
function validateVerifyEmailInput(body) {
	const errors = {}

	const normalizedEmail = normalizeEmail(body?.email)
	const otp = typeof body?.otp === 'string' ? body.otp.trim() : ''

	if (!normalizedEmail) {
		errors.email = 'Email is required.'
	} else if (!isValidEmail(normalizedEmail)) {
		errors.email = 'Please enter a valid email address.'
	}

	if (!otp) {
		errors.otp = 'OTP is required.'
	} else if (!OTP_REGEX.test(otp)) {
		errors.otp = `OTP must be ${OTP_LENGTH} digits.`
	}

	return { errors, values: { email: normalizedEmail, otp } }
}

// validates + normalizes resend-verify-email body
function validateResendInput(body) {
	const errors = {}
	const normalizedEmail = normalizeEmail(body?.email)

	if (!normalizedEmail) {
		errors.email = 'Email is required.'
	} else if (!isValidEmail(normalizedEmail)) {
		errors.email = 'Please enter a valid email address.'
	}

	return { errors, values: { email: normalizedEmail } }
}

/* -------------------------------------------------------------------------- */
/*  OTP helpers                                                               */
/* -------------------------------------------------------------------------- */

// generates a cryptographically secure numeric OTP
function generateSecureOTP(length = OTP_LENGTH) {
	if (!Number.isInteger(length) || length < 4 || length > 10) {
		throw new RangeError('OTP length must be an integer between 4 and 10')
	}

	const min = 10 ** (length - 1)
	const max = 10 ** length - 1

	// randomInt's upper bound is exclusive
	return crypto.randomInt(min, max + 1).toString()
}

// seconds the user must still wait before a new OTP can be requested (0 = allowed)
// the last send time is derived from the last OTP's expiry, no extra schema field needed
function getResendRetryAfterSeconds(lastOtpExpiresAt) {
	if (!lastOtpExpiresAt) return 0

	const lastSentAt = new Date(lastOtpExpiresAt).getTime() - OTP_EXPIRY_MS
	const remainingMs = RESEND_COOLDOWN_MS - (Date.now() - lastSentAt)

	return remainingMs > 0 ? Math.ceil(remainingMs / 1000) : 0
}

/* -------------------------------------------------------------------------- */
/*  Token, cookie & session helpers                                           */
/* -------------------------------------------------------------------------- */

/**
 * SHA-256 hash for refresh tokens.
 * bcrypt is the WRONG tool here: it ignores everything after 72 bytes, and a
 * JWT's first 72 bytes don't include the signature or session id. Refresh
 * tokens are long random-looking values, so a fast hash is both safe and correct.
 */
function hashToken(token) {
	return crypto.createHash('sha256').update(token).digest('hex')
}

function signAccessToken(userId, sessionId) {
	return jwt.sign(
		{ type: 'access', id: userId, sessionId },
		envConfig.JWT_ACCESS_TOKEN_SECRET,
		{ expiresIn: ACCESS_TOKEN_EXPIRES_IN, algorithm: JWT_ALGORITHM },
	)
}

function signRefreshToken(userId, sessionId) {
	return jwt.sign(
		{ type: 'refresh', id: userId, sessionId },
		envConfig.JWT_REFRESH_TOKEN_SECRET,
		{ expiresIn: REFRESH_TOKEN_EXPIRES_IN, algorithm: JWT_ALGORITHM },
	)
}

function setRefreshTokenCookie(res, refreshToken) {
	res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
		...REFRESH_COOKIE_OPTIONS,
		maxAge: SESSION_DURATION_MS,
	})
}

function clearRefreshTokenCookie(res) {
	res.clearCookie(REFRESH_COOKIE_NAME, REFRESH_COOKIE_OPTIONS)
}

/**
 * Verifies a refresh token and returns its ACTIVE session, or null if invalid.
 * Replaces the check that was copy-pasted in refresh / signout / signout-all.
 *
 * The session is looked up by the token's hash, so a rotated-out (old) token
 * no longer matches and is rejected.
 * Unexpected errors (e.g. DB down) are rethrown so callers can answer with a 500.
 */
async function findSessionByRefreshToken(refreshToken) {
	let decoded

	try {
		decoded = jwt.verify(refreshToken, envConfig.JWT_REFRESH_TOKEN_SECRET, {
			algorithms: [JWT_ALGORITHM],
		})
	} catch (error) {
		// covers invalid signature, malformed token, expired token
		if (error instanceof jwt.JsonWebTokenError) return null
		throw error
	}

	const { type, id, sessionId } = decoded

	if (
		type !== 'refresh' ||
		typeof id !== 'string' ||
		typeof sessionId !== 'string'
	) {
		return null
	}

	return sessionModel.findOne({
		_id: sessionId,
		user: id,
		revoked: false,
		expiresAt: { $gt: new Date() },
		refreshTokenHash: hashToken(refreshToken),
	})
}

/* -------------------------------------------------------------------------- */
/*  Misc helpers                                                              */
/* -------------------------------------------------------------------------- */

// undoes a half-finished signup so the user can retry with the same details
async function cleanupFailedSignup(userId) {
	if (!userId) return

	const results = await Promise.allSettled([
		otpModel.deleteMany({ user: userId }),
		userModel.deleteOne({ _id: userId }),
	])

	results.forEach((result) => {
		if (result.status === 'rejected') {
			console.error('Signup cleanup failed', {
				userId: userId.toString(),
				error: result.reason?.message,
			})
		}
	})
}

// runs a non-critical task (notification emails) without delaying the response
function runInBackground(label, task, context = {}) {
	Promise.resolve()
		.then(task)
		.catch((error) => {
			console.error(`${label} failed`, {
				...context,
				error: error.message,
				stack: error.stack,
			})
		})
}

// exporting constants, helpers & functions
module.exports = {
	// constants
	BCRYPT_SALT_ROUNDS,
	OTP_EXPIRY_MS,
	SESSION_DURATION_MS,
	REFRESH_COOKIE_NAME,
	DUPLICATE_MESSAGES,
	DUMMY_PASSWORD_HASH,
	// errors
	EmailDeliveryError,
	// response helpers
	sendError,
	toPublicUser,
	getFirstErrorMessage,
	// validation
	validateSignupInput,
	validateSigninInput,
	validateVerifyEmailInput,
	validateResendInput,
	// otp
	generateSecureOTP,
	getResendRetryAfterSeconds,
	// token, cookie & session
	hashToken,
	signAccessToken,
	signRefreshToken,
	setRefreshTokenCookie,
	clearRefreshTokenCookie,
	findSessionByRefreshToken,
	// misc
	cleanupFailedSignup,
	runInBackground,
}