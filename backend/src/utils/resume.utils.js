/**
	- file name: resume.utils.js
	- responsibility: responsible for all resume related util functions
 */

// importing dependencies
const { generateResumePdfHtml } = require('../services/ai.service')
const { generateResumePdfFromHtml } = require('../services/pdf.service')
const { uploadPdf } = require('../services/storage.service')

// function for generating resume
async function generateResume({ resume, selfDescription, jobDescription }) {
	// generating resume HTML by AI
	const resumeHtml = await generateResumePdfHtml({
		resume,
		selfDescription,
		jobDescription,
	})

	// extracting AI returned data
	const { resumePdfHtml, jobTitle } = resumeHtml

	// converting resume HTML into PDF
	const resumePdf = await generateResumePdfFromHtml(resumePdfHtml)

	// uploading generated PDF to ImageKit
	const uploadedResume = await uploadPdf(resumePdf)

	// returning resume information
	return {
		jobTitle,
		resumePdf: uploadedResume.url,
		resumeFileId: uploadedResume.fileId,
		resumeFilePath: uploadedResume.filePath,
	}
}

// exporting functions
module.exports = {
	generateResume,
}