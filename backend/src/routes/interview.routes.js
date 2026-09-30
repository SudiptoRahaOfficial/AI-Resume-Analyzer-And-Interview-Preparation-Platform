/**
    - file name: interview.routes.js
    - responsibility: responsible for all interview related api endpoints
 */

// importing dependencis
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const { upload } = require('../middlewares/multer.middleware')
const {
	generateInterviewReportController,
} = require('../controllers/interview.controllers')

// generate-report : POST API - "/api/interview/generate-report"
router.post(
	'/generate-report',
	authenticateUser,
	upload.single('resume'),
	generateInterviewReportController,
)

// exporting router
module.exports = router