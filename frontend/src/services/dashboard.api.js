// importing dependencis
import axios from 'axios'

// making axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/api/dashboard',
	withCredentials: true,
})

// function for calling get dashboard statistics api
export async function callGetDashboardStatisticsApi({ accessToken }) {
	try {
		const response = await api.get('/statistics', {
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