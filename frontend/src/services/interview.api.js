// file: interview.api.js
// responsibility: one function per interview endpoint

import { authRequest } from './client'

// converting plain input into FormData
// (backend uses multer, so the request must be multipart/form-data)
function buildGenerateReportFormData({
	resume,
	selfDescription,
	jobDescription,
}) {
	const formData = new FormData()

	// text fields: appending only what was provided
	if (jobDescription != null)
		formData.append('jobDescription', jobDescription)
	if (selfDescription != null)
		formData.append('selfDescription', selfDescription)

	// field name must match getPdfBuffer.single('resume')
	// (File extends Blob, so this check accepts a File from <input type="file">)
	if (resume instanceof Blob) formData.append('resume', resume)

	return formData
}

// POST /api/interview/generate-report
// resolves to { message, success, interviewReport: { id, jobTitle, matchScore, ... } }
export function generateReport(reportInput) {
	return authRequest('/interview/generate-report', {
		method: 'POST',
		body: buildGenerateReportFormData(reportInput),
	})
}

// GET /api/interview/reports
// resolves to { message, success, interviewReports: [...] }
export function getReports() {
	return authRequest('/interview/reports')
}

// GET /api/interview/reports/:reportId
// resolves to { message, success, interviewReport: {...} }
export function getReportById(reportId) {
	// encoding because the id is user-controlled (comes from the URL)
	return authRequest(`/interview/reports/${encodeURIComponent(reportId)}`)
}