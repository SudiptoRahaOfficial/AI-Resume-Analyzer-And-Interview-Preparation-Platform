/**
	- file name: resume.model.js
	- responsibility: responsible for resume schema & model design
 */

// importing dependencis
const { Schema, model } = require('mongoose')

// making schema
const resumeSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			required: [true, 'User is required'],
		},

		jobTitle: {
			type: String,
			trim: true,
			required: [true, 'Job title is required'],
		},

		resumePdf: {
			type: String,
			trim: true,
			required: [true, 'Resume PDF is required'],
		},

		resumeFileId: {
			type: String,
			trim: true,
			required: [true, 'Resume file ID is required'],
		},

		resumeFilePath: {
			type: String,
			trim: true,
			required: [true, 'Resume file path is required'],
		},
	},
	{ timestamps: true },
)

// making model
const resumeModel = model('resume', resumeSchema)

// exporting model
module.exports = resumeModel