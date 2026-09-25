/**
    - file name: auth.controllers.js
    - responsibility: responsible for all auth related api controllers
 */

// importing dependencis
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const envConfig = require('../configs/env.config')
const userModel = require('../models/user.model')

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
		!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
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
	} catch (error) {
		console.log(error)
	}
}

// exporting controllers
module.exports = {
	signupController,
}