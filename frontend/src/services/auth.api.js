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

		console.log('========== SIGNUP API ERROR ==========')
		console.log('error:', error)
		console.log('error.response:', error.response)
		console.log('error.response?.data:', error.response?.data)
		console.log('error.message:', error.message)
		console.log('======================================')

		throw (
			error.response?.data ?? {
				message: 'Something went wrong',
				success: false,
			}
		)
	}
}

// function for calling verify-email api
export async function callVerifyEmailApi({ otp, email }) {
	try {
		const response = await api.post('/verify-email', {
			otp,
			email,
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

// function for calling resend-verify-email api
export async function callResendVerifyEmailApi({ email }) {
	try {
		const response = await api.post('/resend-verify-email', {
			email,
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

// function for calling signin api
export async function callSigninApi({ username, email, password }) {
	try {
		const response = await api.post('/signin', {
			username,
			email,
			password,
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

// function for calling refresh-token api
export async function callRefreshTokenApi() {
	try {
		const response = await api.post('/refresh-token')

		return response.data
	} catch (error) {
		throw (
			error.response?.data ?? {
				message: 'Unauthenticated',
				success: false,
			}
		)
	}
}

// function for calling signout api
export async function callSignoutApi() {
	try {
		const response = await api.post('/signout')
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

// function for calling signout-all api
export async function callSignoutAllApi() {
	try {
		const response = await api.post('/signout-all')
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