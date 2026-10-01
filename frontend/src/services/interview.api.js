// importing dependencis
import axios from 'axios'

// making axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/api/interview',
	withCredentials: true,
})

// function for calling generate-report api
export async function callGenerateReportApi({
	resumeFile,
	selfDescription,
	jobDescription,
}) {
	// making form data
	const formData = new FormData()
	formData.append('resume', resumeFile)
	formData.append('selfDescription', selfDescription)
	formData.append('jobDescription', jobDescription)

	try {
		// calling api
		const response = await api.post('/generate-report', formData, {
			headers: { 'Content-Type': 'multipart/from-data' },
		})
		// returning response
		return response.data
	} catch (error) {
		// handling unexpected error
		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}

// function for calling get report by id api
export async function callGetReportByIdApi(reportId) {
	try {
		// calling api
		const response = await api.get(`/reports/${reportId}`)
		// returning response
		return response.data
	} catch (error) {
		// handling unexpected error
		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}

// function for calling get reports api
export async function callGetReportsApi() {
	try {
		// calling api
		const response = await api.get('/reports')
		// returning response
		return response.data
	} catch (error) {
		// handling unexpected error
		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}