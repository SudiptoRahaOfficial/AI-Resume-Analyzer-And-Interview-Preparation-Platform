/**
	- file name: user.model.js
	- responsibility: responsible for user schema & model design
 */

// importing dependencis
const { Schema, model } = require('mongoose')

// making schema
const userSchema = new Schema(
	{
		username: {
			type: String,
			trim: true,
			required: [true, 'Username is required'],
			unique: [true, 'This username is not available'],
			maxlength: 15,
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'Email is required'],
			lowercase: true,
			match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
			unique: [true, 'Already have an account with this email'],
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
			match: [
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
				'Password must be at least 8 characters, contain uppercase & lowercase letter, one number, and one special character',
			],
		},
	},
	{ timestamps: true },
)

// making model
const userModel = model('user', userSchema)

// exporting model
module.exports = userModel