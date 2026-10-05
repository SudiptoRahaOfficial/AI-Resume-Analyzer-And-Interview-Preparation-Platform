/**
    - file name: profile.model.js
    - responsibility: responsible for user profile schema & model design
 */

// importing dependencies
const { Schema, model } = require('mongoose')

// making schema
const profileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: [true, 'User is required'],
			unique: true,
			index: true,
		},
		firstName: {
			type: String,
			trim: true,
			maxlength: 50,
		},
		lastName: {
			type: String,
			trim: true,
			maxlength: 50,
		},
		bio: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		phone: {
			type: String,
			trim: true,
			maxlength: 20,
		},
		location: {
			city: {
				type: String,
				trim: true,
				maxlength: 50,
			},
			country: {
				type: String,
				trim: true,
				maxlength: 50,
			},
		},
		profileImage: {
			type: String,
			trim: true,
		},
		profession: {
			type: String,
			trim: true,
			maxlength: 50,
		},
		experience: {
			type: Number,
			min: 0,
			max: 50,
		},
		skills: [
			{
				type: String,
				trim: true,
				maxlength: 50,
			},
		],
		socialLinks: [
			{
				platform: {
					type: String,
					trim: true,
				},
				url: {
					type: String,
					trim: true,
				},
			},
		],
	},
	{ timestamps: true },
)

// making model
const profileModel = model('profile', profileSchema)

// exporting model
module.exports = profileModel