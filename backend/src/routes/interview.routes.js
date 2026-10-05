/**
    - file name: interview.routes.js
    - responsibility: responsible for all interview related api endpoints
 */

// importing dependencis
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const { getPdfBuffer } = require('../middlewares/multer.middlewares')
const {
	generateReportController,
	getReportByIdController,
	getReportsController,
} = require('../controllers/interview.controllers')

// generate report : POST API - "/api/interview/generate-report"
router.post(
	'/generate-report',
	authenticateUser,
	getPdfBuffer.single('resume'),
	generateReportController,
)

// get report by id : GET API - "/api/interview/reports/:reportId"
router.get('/reports/:reportId', authenticateUser, getReportByIdController)

// get all reports : GET API - "/api/interview/reports"
router.get('/reports', authenticateUser, getReportsController)

// exporting router
module.exports = router