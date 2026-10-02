/**
    - file name: interview.controllers.js
    - responsibility: responsible for all interview related api controllers
 */

// importing dependencis
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
	if (!jobDescription || (!selfDescription && !resumeFile)) {
		return res.status(400).json({
			message:
				'Resume or selfDescription and jobDescription are required',
			success: false,
		})
	}

	// parsing resume file to text
	let resume = ''
	if (resumeFile) {
		const parser = new PDFParse({ data: resumeFile.buffer })
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

	// validating fields type
	if (
		typeof resume !== 'string' ||
		typeof selfDescription !== 'string' ||
		typeof jobDescription !== 'string'
	) {
		return res.status(400).json({
			message:
				'Resume, selfDescription and jobDescription must be strings',
			success: false,
		})
	}

	// normalizing all data
	resume = resume.trim()
	selfDescription = selfDescription.trim()
	jobDescription = jobDescription.trim()

	try {
		// generating interview report by ai
		const interviewReportByAi = await generateInterviewReport({
			resume,
			selfDescription,
			jobDescription,
		})

		try {
			// creating interview report
			const interviewReport = await interviewReportModel.create({
				user: req.user.id,
				resume,
				selfDescription,
				jobDescription,
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
			// logging on interview report creation failure
			console.error('Interview report creation failed', {
				error: error.message,
				stack: error.stack,
			})

			// failed response back on interview report creation failure
			return res.status(500).json({
				message: 'Failed to save interview report',
				success: false,
			})
		}
	} catch (error) {
		// logging on unexpected ai service failure
		console.error('AI report generation failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on ai report generation failure
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
				'jobTitle matchScore technicalQuestions behavioralQuestions skillGaps updatedAt',
			)

		// failed response back if reports not found
		if (!reports) {
			return res.status(404).json({
				message: 'Interview reports not found.',
				success: false,
			})
		}

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