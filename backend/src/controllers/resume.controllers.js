/**
	- file name: resume.controllers.js
	- responsibility: responsible for all resume related api controllers
 */

// importing dependencies
const { PDFParse } = require('pdf-parse')
const resumeModel = require('../models/resume.model')
const { generateResume } = require('../utils/resume.utils')

/**
	- generate resume controller
	- POST API - "/api/resume/generate-resume"
 */
async function generateResumeController(req, res) {
	// extracting all data sent by client
	const resumeFile = req.file
	let { selfDescription, jobDescription } = req.body

	// validating job description
	if (!jobDescription) {
		return res.status(400).json({
			message: 'Job description is required',
			success: false,
		})
	}

	// validating resume source
	if (!resumeFile && !selfDescription) {
		return res.status(400).json({
			message: 'Either resume file or self description is required',
			success: false,
		})
	}

	// parsing resume file to text
	let resume = ''
	if (resumeFile) {
		const parser = new PDFParse({
			data: resumeFile.buffer,
		})
		try {
			const result = await parser.getText()
			resume = result.text
		} catch (error) {
			// logging on resume parsing failure
			console.error('Parsing resume failed', {
				error: error.message,
				stack: error.stack,
			})

			// failed response back on resume parsing failure
			return res.status(400).json({
				message: 'Invalid or unreadable PDF file',
				success: false,
			})
		}
	}

	// normalizing all fields
	selfDescription =
		typeof selfDescription === 'string' ? selfDescription.trim() : ''
	jobDescription =
		typeof jobDescription === 'string' ? jobDescription.trim() : ''
	resume = typeof resume === 'string' ? resume.trim() : ''

	// validating normalized job description
	if (!jobDescription) {
		return res.status(400).json({
			message: 'Job description cannot be empty',
			success: false,
		})
	}

	// validating that at least one resume source contains content
	if (!resume && !selfDescription) {
		return res.status(400).json({
			message:
				'Either a valid resume PDF or self description is required',
			success: false,
		})
	}

	try {
		// generating ATS-optimized resume
		const resumeByAi = await generateResume({
			resume,
			selfDescription,
			jobDescription,
		})

		// creating resume document
		const resumeDoc = await resumeModel.create({
			user: req.user.id,
			jobTitle: resumeByAi.jobTitle,
			resumePdf: resumeByAi.resumePdf,
			resumeFileId: resumeByAi.resumeFileId,
			resumeFilePath: resumeByAi.resumeFilePath,
		})

		// response back on success
		return res.status(201).json({
			message: 'Resume generated successfully',
			success: true,
			resume: {
				id: resumeDoc._id,
				jobTitle: resumeDoc.jobTitle,
				resumePdf: resumeDoc.resumePdf,
			},
		})
	} catch (error) {
		// logging on resume generation failure
		console.error('Resume generation failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on resume generation failure
		return res.status(500).json({
			message: 'Failed to generate resume',
			success: false,
		})
	}
}

/**
	- get resume by id controller
	- GET API - "/api/resume/resumes/:resumeId"
 */
async function getResumeByIdController(req, res) {
	// extracting resumeId from req.params
	const { resumeId } = req.params

	try {
		// finding resume according resumeId and requested user
		const resume = await resumeModel.findOne({
			_id: resumeId,
			user: req.user.id,
		})

		// failed response back if resume not found
		if (!resume) {
			return res.status(404).json({
				message: 'Resume not found.',
				success: false,
			})
		}

		// response back on success
		return res.status(200).json({
			message: 'Resume fetched successfully.',
			success: true,
			resume,
		})
	} catch (error) {
		// logging on unexpected query failure
		console.error('Resume finding query failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected query failure
		return res.status(500).json({
			message: 'Failed to find requested resume.',
			success: false,
		})
	}
}

/**
	- get all resumes controller
	- GET API - "/api/resume/resumes"
 */
async function getResumesController(req, res) {
	try {
		// finding resumes according requested user
		const resumes = await resumeModel
			.find({ user: req.user.id })
			.sort({ createdAt: -1 })
			.select('jobTitle resumePdf createdAt')

		// response back on success
		return res.status(200).json({
			message: 'Resumes fetched successfully.',
			success: true,
			resumes,
		})
	} catch (error) {
		// logging on unexpected query failure
		console.error('Resumes finding query failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected query failure
		return res.status(500).json({
			message: 'Failed to find requested resumes.',
			success: false,
		})
	}
}

// exporting controllers
module.exports = {
	generateResumeController,
	getResumeByIdController,
	getResumesController,
}