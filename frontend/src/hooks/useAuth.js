// importing dependencis
import { useContext } from 'react'
import { AuthContext } from '@/context/auth.context'
import {
	callSignupApi,
	callVerifyEmailApi,
	callResendVerifyEmailApi,
	callSigninApi,
	callRefreshTokenApi,
	callSignoutApi,
	callSignoutAllApi,
} from '@/services/auth.api'

// making useAuth custom hook
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used inside AuthProvider')
	}
	const {
		user,
		setUser,
		loading,
		setLoading,
		accessToken,
		setAccessToken,
		isAuthenticated,
		setIsAuthenticated,
		authInitialized,
		setAuthInitialized,
	} = context

	const handleSignup = async ({ username, email, password }) => {
		try {
			setLoading(true)

			const data = await callSignupApi({
				username,
				email,
				password,
			})

			setUser(data.user)

			return data
		} finally {
			setLoading(false)
		}
	}

	const handleVerifyEmail = async ({ otp, email }) => {
		try {
			setLoading(true)

			const data = await callVerifyEmailApi({
				otp,
				email,
			})

			setUser(data.user)

			return data
		} finally {
			setLoading(false)
		}
	}

	const handleResendOTP = async (email) => {
		try {
			setLoading(true)

			const data = await callResendVerifyEmailApi({
				email,
			})

			return data
		} finally {
			setLoading(false)
		}
	}

	const handleSignin = async ({ username, email, password }) => {
		try {
			setLoading(true)

			const data = await callSigninApi({
				username,
				email,
				password,
			})

			setUser(data.user)
			setAccessToken(data.accessToken)
			setIsAuthenticated(true)

			return data
		} finally {
			setLoading(false)
		}
	}

	const refreshAccessToken = async () => {
		try {
			const data = await callRefreshTokenApi()

			setAccessToken(data.accessToken)
			setIsAuthenticated(true)

			return data.accessToken
		} catch (error) {
			setUser(null)
			setAccessToken(null)
			setIsAuthenticated(false)

			throw error
		}
	}

	const initializeAuth = async () => {
		try {
			setLoading(true)

			const data = await callRefreshTokenApi()

			setAccessToken(data.accessToken)
			setUser(data.user)
			setIsAuthenticated(true)
		} catch (error) {
			setUser(null)
			setAccessToken(null)
			setIsAuthenticated(false)
		} finally {
			setAuthInitialized(true)
			setLoading(false)
		}
	}

	const handleSignout = async () => {
		try {
			setLoading(true)

			const data = await callSignoutApi()

			setUser(null)
			setAccessToken(null)
			setIsAuthenticated(false)

			return data
		} finally {
			setLoading(false)
		}
	}

	const handleSignoutAll = async () => {
		try {
			setLoading(true)

			const data = await callSignoutAllApi()

			setUser(null)
			setAccessToken(null)
			setIsAuthenticated(false)

			return data
		} finally {
			setLoading(false)
		}
	}

	return {
		user,
		loading,
		accessToken,
		isAuthenticated,
		authInitialized,
		handleSignup,
		handleVerifyEmail,
		handleResendOTP,
		handleSignin,
		refreshAccessToken,
		initializeAuth,
		handleSignout,
		handleSignoutAll,
	}
}