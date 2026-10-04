/**
	- file name: dashboard.controllers.js
	- responsibility: responsible for dashboard related api controllers
 */

// importing dependencies
const interviewReportModel = require('../models/interviewReport.model')
const resumeModel = require('../models/resume.model')

/**
	- get dashboard statistics controller
	- GET API - "/api/dashboard/statistics"
 */
async function getDashboardStatisticsController(req, res) {
	// extracting user id from req.user
	const userId = req.user.id

	try {
		// counting document length of interview guides & ATS-resumes
		const [interviewGuides, generatedResumes] = await Promise.all([
			interviewReportModel.countDocuments({
				user: userId,
			}),
			resumeModel.countDocuments({
				user: userId,
			}),
		])

		// response back on success
		return res.status(200).json({
			message: 'Dashboard statistics fetched successfully.',
			success: true,
			statistics: {
				interviewGuides,
				generatedResumes,
			},
		})
	} catch (error) {
		// logging on unexpected query failure
		console.error('Dashboard statistics query failed', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected query failure
		return res.status(500).json({
			message: 'Failed to fetch dashboard statistics.',
			success: false,
		})
	}
}

// exporting controllers
module.exports = {
	getDashboardStatisticsController,
}