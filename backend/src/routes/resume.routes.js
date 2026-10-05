/**
    - file name: resume.routes.js
    - responsibility: responsible for all resume related api endpoints
 */

// importing dependencis
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const { getPdfBuffer } = require('../middlewares/multer.middlewares')
const {
	generateResumeController,
	getResumeByIdController,
	getResumesController,
} = require('../controllers/resume.controllers')

// generate resume : POST API - "/api/resume/generate-resume"
router.post(
	'/generate-resume',
	authenticateUser,
	getPdfBuffer.single('resume'),
	generateResumeController,
)

// get resume by id : GET API - "/api/resume/resumes/:resumeId"
router.get('/resumes/:resumeId', authenticateUser, getResumeByIdController)

// get all resumes : GET API - "/api/resume/resumes"
router.get('/resumes', authenticateUser, getResumesController)

// exporting router
module.exports = router