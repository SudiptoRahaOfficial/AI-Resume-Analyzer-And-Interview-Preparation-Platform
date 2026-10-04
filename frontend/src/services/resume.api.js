// importing dependencies
import axios from 'axios'

// creating axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/api/resume',
	withCredentials: true,
})

// generate resume api
export async function callGenerateResumeApi({
	resumeFile,
	selfDescription,
	jobDescription,
	accessToken,
}) {
	const formData = new FormData()

	if (resumeFile) {
		formData.append('resume', resumeFile)
	}

	formData.append('selfDescription', selfDescription)
	formData.append('jobDescription', jobDescription)

	try {
		const response = await api.post('/generate-resume', formData, {
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

// get resume by id api
export async function callGetResumeByIdApi({ resumeId, accessToken }) {
	try {
		const response = await api.get(`/resumes/${resumeId}`, {
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

// get all resumes of a user
export async function callGetResumesApi({ accessToken }) {
	try {
		const response = await api.get('/resumes', {
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