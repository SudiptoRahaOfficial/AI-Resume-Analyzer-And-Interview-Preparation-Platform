// importing dependencies
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
	accessToken,
}) {
	const formData = new FormData()

	formData.append('resume', resumeFile)
	formData.append('selfDescription', selfDescription)
	formData.append('jobDescription', jobDescription)

	try {
		const response = await api.post('/generate-report', formData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		return response.data
	} catch (error) {
		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}

// function for calling get-report-by-id api
export async function callGetReportByIdApi({ reportId, accessToken }) {
	try {
		const response = await api.get(`/reports/${reportId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		return response.data
	} catch (error) {
		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}

// function for calling get-reports api
export async function callGetReportsApi({ accessToken }) {
	try {
		const response = await api.get('/reports', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})

		return response.data
	} catch (error) {
		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}