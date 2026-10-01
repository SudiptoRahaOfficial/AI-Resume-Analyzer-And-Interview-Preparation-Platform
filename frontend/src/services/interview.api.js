// importing dependencis
import axios from 'axios'

// making axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/api/interview',
	withCredentials: true,
})

// function for calling generate-report api
export async function callGenerateReportApi({
	resume,
	selfDescription,
	jobDescription,
}) {
	try {
		const response = await api.post('/generate-report', {
			resume,
			selfDescription,
			jobDescription,
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