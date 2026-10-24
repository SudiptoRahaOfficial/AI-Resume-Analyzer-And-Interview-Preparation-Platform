// file: resume.api.js
// responsibility: one function per resume endpoint

import { authRequest } from './client'

// converting plain input into FormData
// (backend uses multer, so the request must be multipart/form-data)
function buildGenerateResumeFormData({
	resumeFile,
	selfDescription,
	jobDescription,
}) {
	const formData = new FormData()

	// text fields: appending only what was provided
	if (jobDescription != null)
		formData.append('jobDescription', jobDescription)
	if (selfDescription != null)
		formData.append('selfDescription', selfDescription)

	// the form-field name must be 'resume' to match getPdfBuffer.single('resume')
	// (File extends Blob, so this accepts a File from <input type="file">)
	if (resumeFile instanceof Blob) formData.append('resume', resumeFile)

	return formData
}

// POST /api/resume/generate-resume
// resolves to { message, success, resume: { id, jobTitle, resumePdf } }
export function generateResume(resumeInput) {
	return authRequest('/resume/generate-resume', {
		method: 'POST',
		body: buildGenerateResumeFormData(resumeInput),
	})
}

// GET /api/resume/resumes
// resolves to { message, success, resumes: [...] }
export function getResumes() {
	return authRequest('/resume/resumes')
}

// GET /api/resume/resumes/:resumeId
// resolves to { message, success, resume: {...} }
export function getResumeById(resumeId) {
	// encoding because the id is user-controlled (comes from the URL)
	return authRequest(`/resume/resumes/${encodeURIComponent(resumeId)}`)
}