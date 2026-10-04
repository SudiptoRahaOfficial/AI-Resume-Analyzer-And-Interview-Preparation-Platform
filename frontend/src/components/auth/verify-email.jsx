// making client component
'use client'

// importing dependencies
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

/**
 * Authentication routes used by the verification page.
 *
 * Centralizing routes prevents hardcoded paths from being
 * repeated throughout the component.
 */
const AUTH_ROUTES = {
	home: '/',
	signup: '/auth/signup',
	signin: '/auth/signin',
	verifyEmail: '/auth/verify-email',
}

/**
 * Product-level authentication content.
 *
 * Keeping static product information together makes the page
 * easier to maintain and keeps the JSX focused on structure.
 */
const PRODUCT_INFO = {
	name: 'ResumeAI',
	description: 'AI-Powered Interview Preparation Platform',
}

/**
 * Verification configuration.
 *
 * These values are used by the OTP input and validation logic.
 */
const VERIFICATION_CONFIG = {
	otpLength: 6,
	otpExpirationMinutes: 3,
}

/**
 * Shared authentication input styles.
 *
 * Centralizing the repeated input styling keeps the page
 * visually consistent with the signin and signup pages.
 */
const INPUT_CLASS_NAME =
	'w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'

/**
 * Authentication page background.
 *
 * Responsible only for decorative background effects.
 */
function AuthBackground() {
	return (
		<div
			aria-hidden='true'
			className='pointer-events-none absolute inset-0'
		>
			<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />

			<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
		</div>
	)
}

/**
 * Authentication brand section.
 *
 * Clicking the brand returns the user to the landing page.
 */
function AuthBrand({ onNavigateHome }) {
	return (
		<div className='mb-8 text-center'>
			<button
				type='button'
				onClick={onNavigateHome}
				className='cursor-pointer text-3xl font-semibold tracking-tight text-white transition hover:text-cyan-300'
			>
				{PRODUCT_INFO.name}
			</button>

			<p className='mt-2 text-sm text-gray-500'>
				{PRODUCT_INFO.description}
			</p>
		</div>
	)
}

/**
 * Verification page header.
 *
 * Contains the email icon, title, and supporting instructions.
 */
function VerificationHeader() {
	return (
		<div className='mb-8'>
			{/* Verification icon */}
			<div className='mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
				<Mail
					aria-hidden='true'
					className='h-7 w-7 text-cyan-300'
					strokeWidth={1.8}
				/>
			</div>

			{/* Heading */}
			<h1 className='text-2xl font-semibold tracking-tight text-white'>
				Verify your email
			</h1>

			{/* Instructions */}
			<p className='mt-2 text-sm leading-6 text-gray-400'>
				Enter the 6-digit verification code we sent to your email
				address. The code expires in{' '}
				{VERIFICATION_CONFIG.otpExpirationMinutes} minutes.
			</p>
		</div>
	)
}

/**
 * Reusable form label.
 */
function FormLabel({ htmlFor, children }) {
	return (
		<label
			htmlFor={htmlFor}
			className='mb-2 block text-sm font-medium text-gray-300'
		>
			{children}
		</label>
	)
}

/**
 * Email field.
 *
 * The email comes from the URL query parameter and cannot be
 * edited on this page.
 */
function EmailField({ email }) {
	return (
		<div>
			<FormLabel htmlFor='verification-email'>Email Address</FormLabel>

			<input
				id='verification-email'
				name='email'
				type='email'
				value={email}
				disabled
				autoComplete='email'
				aria-describedby='verification-email-description'
				className={`${INPUT_CLASS_NAME} cursor-not-allowed opacity-60`}
			/>

			<span
				id='verification-email-description'
				className='sr-only'
			>
				The email address associated with this verification request.
			</span>
		</div>
	)
}

/**
 * OTP field.
 *
 * Only numeric characters are accepted. The value is normalized
 * before being stored in component state.
 */
function OtpField({ otp, onChange }) {
	/**
	 * Handles OTP input changes.
	 *
	 * Removes every non-numeric character and limits the value
	 * to the configured OTP length.
	 */
	const handleOtpChange = (event) => {
		const numericValue = event.target.value
			.replace(/\D/g, '')
			.slice(0, VERIFICATION_CONFIG.otpLength)

		onChange(numericValue)
	}

	return (
		<div>
			<FormLabel htmlFor='verification-otp'>Verification Code</FormLabel>

			<input
				id='verification-otp'
				name='otp'
				type='text'
				inputMode='numeric'
				pattern='[0-9]{6}'
				maxLength={VERIFICATION_CONFIG.otpLength}
				placeholder='000000'
				value={otp}
				onChange={handleOtpChange}
				autoComplete='one-time-code'
				required
				aria-describedby='verification-otp-description'
				className={`${INPUT_CLASS_NAME} text-center text-lg tracking-[0.35em]`}
			/>

			<p
				id='verification-otp-description'
				className='mt-2 text-xs text-gray-600'
			>
				Enter the 6-digit code from your email.
			</p>
		</div>
	)
}

/**
 * Authentication status message.
 *
 * Handles both error and success states using appropriate
 * accessibility semantics.
 */
function StatusMessage({ error, message }) {
	if (error) {
		return (
			<div
				role='alert'
				aria-live='assertive'
				className='rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300'
			>
				{error}
			</div>
		)
	}

	if (message) {
		return (
			<div
				role='status'
				aria-live='polite'
				className='rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm leading-5 text-green-300'
			>
				{message}
			</div>
		)
	}

	return null
}

/**
 * Verify button.
 *
 * Disabled while authentication is processing to prevent
 * duplicate verification requests.
 */
function VerifyButton({ loading }) {
	return (
		<button
			type='submit'
			disabled={loading}
			aria-busy={loading}
			className='w-full cursor-pointer rounded-md bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60'
		>
			{loading ? 'Verifying...' : 'Verify Email'}
		</button>
	)
}

/**
 * Resend verification section.
 *
 * Allows the user to request another OTP without leaving the
 * verification page.
 */
function ResendVerification({ loading, onResend }) {
	return (
		<div className='space-y-3 text-center'>
			<p className='text-sm text-gray-500'>
				Didn&apos;t receive the code?
			</p>

			<button
				type='button'
				onClick={onResend}
				disabled={loading}
				aria-busy={loading}
				className='w-full cursor-pointer rounded-md border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-white/10 hover:text-cyan-200 disabled:cursor-not-allowed disabled:opacity-60'
			>
				{loading ? 'Sending...' : 'Resend Verification Code'}
			</button>
		</div>
	)
}

/**
 * Verification navigation footer.
 *
 * Gives users a way to return to signup when they entered
 * the wrong email address.
 */
function VerificationFooter({ onNavigateSignup }) {
	return (
		<div className='mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
			Wrong email?{' '}
			<button
				type='button'
				onClick={onNavigateSignup}
				className='cursor-pointer font-medium text-cyan-300 transition hover:text-cyan-200'
			>
				Create another account
			</button>
		</div>
	)
}

/**
 * Verification card.
 *
 * Contains the complete email verification interface while
 * leaving authentication behavior inside the main page component.
 */
function VerificationCard({
	email,
	otp,
	error,
	message,
	loading,
	onOtpChange,
	onSubmit,
	onResend,
	onNavigateSignup,
}) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-xl'>
			{/* Header */}
			<VerificationHeader />

			{/* Verification form */}
			<form
				onSubmit={onSubmit}
				className='space-y-5'
			>
				{/* Email */}
				<EmailField email={email} />

				{/* OTP */}
				<OtpField
					otp={otp}
					onChange={onOtpChange}
				/>

				{/* Authentication status */}
				<StatusMessage
					error={error}
					message={message}
				/>

				{/* Verify */}
				<VerifyButton loading={loading} />
			</form>

			{/* Divider */}
			<div
				aria-hidden='true'
				className='my-6 border-t border-white/10'
			/>

			{/* Resend */}
			<ResendVerification
				loading={loading}
				onResend={onResend}
			/>

			{/* Navigation */}
			<VerificationFooter onNavigateSignup={onNavigateSignup} />
		</div>
	)
}

/**
 * Verification page.
 *
 * Responsibilities:
 * - Read the email address from the URL.
 * - Redirect invalid verification URLs back to signup.
 * - Manage OTP input state.
 * - Verify the submitted OTP.
 * - Resend verification codes.
 * - Display authentication feedback.
 * - Navigate between authentication pages.
 *
 * Presentation responsibilities are delegated to smaller
 * components above.
 */
export default function VerifyEmail() {
	// router for page navigation
	const router = useRouter()

	// access URL query parameters
	const searchParams = useSearchParams()

	// extract the email associated with this verification request
	const email = searchParams.get('email')

	// authentication actions and loading state
	const { handleVerifyEmail, handleResendOTP, loading } = useAuth()

	// OTP input state
	const [otp, setOtp] = useState('')

	// authentication error state
	const [error, setError] = useState('')

	// successful operation message state
	const [message, setMessage] = useState('')

	/**
	 * Validate the verification URL.
	 *
	 * The verification page requires an email query parameter.
	 * If it is missing, the user cannot complete verification,
	 * so they are returned to signup.
	 */
	useEffect(() => {
		if (!email) {
			router.replace(AUTH_ROUTES.signup)
		}
	}, [email, router])

	/**
	 * Handles OTP form submission.
	 *
	 * Existing behavior is preserved:
	 * 1. Submit email + OTP.
	 * 2. Redirect to signin after successful verification.
	 * 3. Display the authentication error when verification fails.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()

		// Clear previous feedback.
		setError('')
		setMessage('')

		// Prevent an incomplete OTP from being submitted.
		if (otp.length !== VERIFICATION_CONFIG.otpLength) {
			setError(
				`Please enter the ${VERIFICATION_CONFIG.otpLength}-digit verification code.`,
			)
			return
		}

		try {
			await handleVerifyEmail({
				email,
				otp,
			})

			// Email verification succeeded.
			router.push(AUTH_ROUTES.signin)
		} catch (err) {
			// Safely extract the error message.
			const message =
				err instanceof Error
					? err.message
					: 'Unable to verify your email. Please try again.'

			setError(message)
		}
	}

	/**
	 * Handles verification code resend.
	 *
	 * The existing resend API behavior is preserved.
	 */
	const handleResend = async () => {
		// Clear previous feedback.
		setError('')
		setMessage('')

		try {
			const data = await handleResendOTP(email)

			// Display the API success message.
			setMessage(data.message)
		} catch (err) {
			// Safely extract the error message.
			const message =
				err instanceof Error
					? err.message
					: 'Unable to resend the verification code. Please try again.'

			setError(message)
		}
	}

	/**
	 * Updates the OTP state.
	 */
	const handleOtpChange = (value) => {
		// Clear previous feedback as soon as the user
		// starts entering a new verification code.
		if (error || message) {
			setError('')
			setMessage('')
		}

		setOtp(value)
	}

	/**
	 * Navigates to the landing page.
	 */
	const handleNavigateHome = () => {
		router.push(AUTH_ROUTES.home)
	}

	/**
	 * Navigates to the signup page.
	 */
	const handleNavigateSignup = () => {
		router.push(AUTH_ROUTES.signup)
	}

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 py-12 text-white'>
			{/* Decorative background */}
			<AuthBackground />

			{/* Authentication content */}
			<div className='relative z-10 w-full max-w-xl'>
				{/* Product branding */}
				<AuthBrand onNavigateHome={handleNavigateHome} />

				{/* Verification interface */}
				{email && (
					<VerificationCard
						email={email}
						otp={otp}
						error={error}
						message={message}
						loading={loading}
						onOtpChange={handleOtpChange}
						onSubmit={handleSubmit}
						onResend={handleResend}
						onNavigateSignup={handleNavigateSignup}
					/>
				)}

				{/* Security notice */}
				<p className='mt-6 text-center text-xs text-gray-600'>
					Protecting your account with secure email verification.
				</p>
			</div>
		</main>
	)
}