/**
	- file name: user.model.js
	- responsibility: responsible for user schema & model design
 */

// importing dependencis
const { Schema, model } = require('mongoose')

// making schema
const userSchema = new Schema(
	{
		
	},
	{ timestamps: true },
)

// making model
const userModel = model('user', userSchema)

// exporting model
module.exports = userModel