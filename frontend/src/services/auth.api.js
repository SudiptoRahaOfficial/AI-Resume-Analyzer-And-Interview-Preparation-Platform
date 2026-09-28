// importing dependencis
import axios from 'axios'

// making axios instance
const api = axios.create({
	baseURL: 'http://localhost:3000/api/auth',
	withCredentials: true,
})

// function for calling signup api
export async function callSignupApi({ username, email, password }) {
	try {
		const response = await api.post('/signup', {
			username,
			email,
			password,
		})
		return response.data
	} catch (error) {
		console.log(error)
	}
}

// function for calling signin api
export async function callSigninApi({ identifier, password }) {
	try {
		const response = await api.post('/signin', { identifier, password })
		return response.data
	} catch (error) {
		console.log(error)
	}
}