/**
	- file name: interview.controllers.js
	- responsibility: responsible for all interview related api controllers
 */

// importing dependencies
const { PDFParse } = require('pdf-parse')
const { generateInterviewReport } = require('../services/ai.service')
const interviewReportModel = require('../models/interviewReport.model')

/**
	- generate report controller
	- POST API - "/api/interview/generate-report"
 */
async function generateReportController(req, res) {
	// extracting all data sent by client
	const resumeFile = req.file
	let { selfDescription, jobDescription } = req.body

	// validating required fields
	if (!jobDescription) {
		return res.status(400).json({
			message: 'Job description is required',
			success: false,
		})
	}
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

	// normalizing all data
	resume = typeof resume === 'string' ? resume.trim() : ''
	selfDescription =
		typeof selfDescription === 'string' ? selfDescription.trim() : ''
	jobDescription =
		typeof jobDescription === 'string' ? jobDescription.trim() : ''

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
		// generating interview report by ai
		const interviewReportByAi = await generateInterviewReport({
			resume,
			selfDescription,
			jobDescription,
		})

		// creating interview report
		const interviewReport = await interviewReportModel.create({
			user: req.user.id,
			...interviewReportByAi,
		})

		// response back on success
		return res.status(201).json({
			message: 'Interview report generated successfully',
			success: true,
			interviewReport: {
				id: interviewReport._id,
				jobTitle: interviewReport.jobTitle,
				matchScore: interviewReport.matchScore,
				technicalQuestions: interviewReport.technicalQuestions,
				behavioralQuestions: interviewReport.behavioralQuestions,
				skillGaps: interviewReport.skillGaps,
				preparationPlan: interviewReport.preparationPlan,
			},
		})
	} catch (error) {
		// logging on unexpected interview report generation failure
		console.error('Interview report generation failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on interview report generation failure
		return res.status(500).json({
			message: 'Failed to generate interview report',
			success: false,
		})
	}
}

/**
	- get report by id controller
	- GET API - "/api/interview/reports/:reportId"
 */
async function getReportByIdController(req, res) {
	// extracting reportId from req.params
	const { reportId } = req.params

	try {
		// finding report according reportId and requested user
		const report = await interviewReportModel.findOne({
			_id: reportId,
			user: req.user.id,
		})

		// failed response back if report not found
		if (!report) {
			return res.status(404).json({
				message: 'Interview report not found.',
				success: false,
			})
		}

		// response back on success
		return res.status(200).json({
			message: 'Interview report fetched successfully.',
			success: true,
			interviewReport: report,
		})
	} catch (error) {
		// logging on unexpected query failure
		console.error('Interview report finding query failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected query failure
		return res.status(500).json({
			message: 'Failed to find requested interview report.',
			success: false,
		})
	}
}

/**
	- get all reports controller
	- GET API - "/api/interview/reports"
 */
async function getReportsController(req, res) {
	try {
		// finding reports according requested user
		const reports = await interviewReportModel
			.find({ user: req.user.id })
			.sort({ createdAt: -1 })
			.select(
				'jobTitle matchScore technicalQuestions behavioralQuestions skillGaps createdAt',
			)

		// response back on success
		return res.status(200).json({
			message: 'Interview reports fetched successfully.',
			success: true,
			interviewReports: reports,
		})
	} catch (error) {
		// logging on unexpected query failure
		console.error('Interview reports finding query failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected query failure
		return res.status(500).json({
			message: 'Failed to find requested interview reports.',
			success: false,
		})
	}
}

// exporting controllers
module.exports = {
	generateReportController,
	getReportByIdController,
	getReportsController,
}