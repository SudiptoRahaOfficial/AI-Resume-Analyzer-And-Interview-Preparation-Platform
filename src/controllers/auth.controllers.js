/**
    - file name: auth.controllers.js
    - responsibility: responsible for all auth related api controllers
 */

// importing dependencis
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const envConfig = require('../configs/env.config')
const securityConfig = require('../configs/security.config')
const userModel = require('../models/user.model')
const otpModel = require('../models/otp.model')
const sessionModel = require('../models/session.model')
const { generateSecureOTP } = require('../utils/auth.utils')
const {
	sendSignupEmail,
	sendSigninEmail,
	sendOTPEmail,
} = require('../services/email.service')

/**
    - signup controller
    - POST API - "/api/auth/signup"
 */
async function signupController(req, res) {
	// extract all data sent by client
	const { username, email, password } = req.body

	// validating required fields
	if (!username || !email || !password) {
		return res.status(400).json({
			message: 'Username, email & password are required',
			success: false,
		})
	}

	// validating fields type
	if (
		typeof username !== 'string' ||
		typeof email !== 'string' ||
		typeof password !== 'string'
	) {
		return res.status(400).json({
			message: 'Username, email and password must be strings',
			success: false,
		})
	}

	// normalizing username & email
	const normalizedUsername = username.trim()
	const normalizedEmail = email.trim().toLowerCase()

	// validating username
	if (!normalizedUsername) {
		return res.status(400).json({
			message: 'Username cannot be empty',
			success: false,
		})
	}

	// validating email format
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
		return res.status(400).json({
			message: 'Invalid email address',
			success: false,
		})
	}

	// validating password format
	if (
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/.test(
			password,
		)
	) {
		return res.status(400).json({
			message:
				'Password must be at least 8 characters, contain uppercase & lowercase letter, one number, and one special character',
			success: false,
		})
	}

	try {
		// duplicate account check with username & email
		const isUserExists = await userModel.findOne({
			$or: [{ username: normalizedUsername }, { email: normalizedEmail }],
		})
		if (isUserExists) {
			// username error response
			if (isUserExists.username === normalizedUsername) {
				return res.status(400).json({
					message: 'Account already exists with the username',
					success: false,
				})
			}
			// email error response
			if (isUserExists.email === normalizedEmail) {
				return res.status(400).json({
					message: 'Account already exists with the email',
					success: false,
				})
			}
		}

		// encrypting password
		const passwordHash = await bcrypt.hash(password, 10)

		// creating new user
		const user = await userModel.create({
			username: normalizedUsername,
			email: normalizedEmail,
			password: passwordHash,
		})

		// generating otp & encrypting otp
		const otp = generateSecureOTP()
		const otpHash = await bcrypt.hash(otp, 10)

		// creating new otp document to db
		const otpDoc = await otpModel.create({
			email: user.email,
			user: user._id,
			otpHash,
			expiresAt: new Date(Date.now() + 3 * 60 * 1000),
		})

		try {
			// sending email to user on signup
			await sendSignupEmail(user.email, user.username, otp)
		} catch (emailError) {
			// if email sending failed remove the newly created OTP
			await otpModel.deleteOne({
				_id: otpDoc._id,
			})

			// throwing email error
			throw emailError
		}

		// response back on success
		return res.status(201).json({
			message: 'Signup successful! Please verify your email.',
			success: true,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		})
	} catch (error) {
		// logging on unexpected server error
		console.error('Signup failed', {
			error: error.message,
			stack: error.stack,
		})

		// response back on server error
		return res.status(500).json({
			message: 'Internal server error',
			success: false,
		})
	}
}

// exporting controllers
module.exports = {
	signupController,
}