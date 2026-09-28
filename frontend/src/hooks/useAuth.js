// importing dependencis
import { useContext } from 'react'
import { AuthContext } from '@/context/auth.context'
import {
	callSignupApi,
	callVerifyEmailApi,
	callResendVerifyEmailApi,
	callSigninApi,
} from '@/services/auth.api'

// making useAuth custom hook
export const useAuth = () => {
	const context = useContext(AuthContext)
	const { user, setUser, loading, setLoading } = context

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

	const handleSignin = async ({ identifier, password }) => {
		setLoading(true)
		const data = await callSigninApi({ identifier, password })
		setUser(data.user)
		setLoading(false)
	}

	return {
		user,
		loading,
		handleSignup,
		handleVerifyEmail,
		handleResendOTP,
		handleSignin,
	}
}