// importing dependencis
const { generateResumePdfHtml } = require('../services/ai.service')
const { generateResumePdfFromHtml } = require('../services/pdf.service')

// function for generate resume
async function generateResume(resume, selfDescription, jobDescription) {
	const resumeHtml = generateResumePdfHtml(
		resume,
		selfDescription,
		jobDescription,
	)
	const resumePdf = generateResumePdfFromHtml(resumeHtml)

	return resumePdf
}

// exporting functions
module.exports = {
	generateResume,
}