// making client component
'use client'

// importing dependencies
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

/**
 * Application routes used by the signup page.
 *
 * Keeping routes centralized prevents hardcoded route strings
 * from being scattered throughout the component.
 */
const AUTH_ROUTES = {
	home: '/',
	signin: '/auth/signin',
	verifyEmail: '/auth/verify-email',
}

/**
 * Product-level content used by the authentication UI.
 *
 * Keeping static product copy together makes future content
 * changes easier and keeps the JSX focused on structure.
 */
const PRODUCT_INFO = {
	name: 'ResumeAI',
	description: 'AI-Powered Interview Preparation Platform',
}

/**
 * Initial signup form state.
 *
 * This object represents the exact payload expected by the
 * existing signup authentication flow.
 */
const INITIAL_FORM_STATE = {
	username: '',
	email: '',
	password: '',
}

/**
 * Shared input class names.
 *
 * Centralizing repeated Tailwind classes prevents styling
 * inconsistencies between authentication fields.
 */
const INPUT_CLASS_NAME =
	'w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'

/**
 * Authentication page background.
 *
 * Responsible only for the decorative background effects.
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
 * Signup page header.
 *
 * Provides the primary heading and supporting description
 * above the form.
 */
function SignupHeader() {
	return (
		<div className='mb-8'>
			<h1 className='text-2xl font-semibold tracking-tight text-white'>
				Create your account
			</h1>

			<p className='mt-2 text-sm leading-6 text-gray-400'>
				Get started with AI-powered resume analysis and interview
				preparation.
			</p>
		</div>
	)
}

/**
 * Reusable form label.
 *
 * Keeping label styling consistent across all fields avoids
 * duplicating the same markup and Tailwind classes.
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
 * Reusable text input field.
 *
 * Used for username and email fields.
 */
function TextField({
	id,
	name,
	type = 'text',
	label,
	placeholder,
	value,
	onChange,
	autoComplete,
}) {
	return (
		<div>
			<FormLabel htmlFor={id}>{label}</FormLabel>

			<input
				id={id}
				name={name}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				autoComplete={autoComplete}
				required
				className={INPUT_CLASS_NAME}
			/>
		</div>
	)
}

/**
 * Password field with visibility toggle.
 *
 * The password visibility state remains local to this field,
 * keeping the parent signup component focused on form behavior.
 */
function PasswordField({ value, onChange, showPassword, onToggleVisibility }) {
	return (
		<div>
			<FormLabel htmlFor='signup-password'>Password</FormLabel>

			<div className='relative'>
				<input
					id='signup-password'
					name='password'
					type={showPassword ? 'text' : 'password'}
					placeholder='Enter password'
					value={value}
					onChange={onChange}
					autoComplete='new-password'
					required
					className={`${INPUT_CLASS_NAME} pr-12`}
				/>

				<button
					type='button'
					onClick={onToggleVisibility}
					aria-label={
						showPassword ? 'Hide password' : 'Show password'
					}
					aria-pressed={showPassword}
					className='absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-gray-500 transition hover:text-cyan-300'
				>
					{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
				</button>
			</div>
		</div>
	)
}

/**
 * Form error message.
 *
 * Uses alert semantics so assistive technologies can announce
 * authentication errors to the user.
 */
function FormError({ message }) {
	if (!message) {
		return null
	}

	return (
		<div
			role='alert'
			aria-live='polite'
			className='rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300'
		>
			{message}
		</div>
	)
}

/**
 * Signup submit button.
 *
 * The button reflects the authentication loading state and
 * prevents duplicate submissions while the request is running.
 */
function SignupButton({ loading }) {
	return (
		<button
			type='submit'
			disabled={loading}
			aria-busy={loading}
			className='w-full cursor-pointer rounded-md bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60'
		>
			{loading ? 'Creating Account...' : 'Create Account'}
		</button>
	)
}

/**
 * Authentication navigation footer.
 *
 * Allows existing users to move directly to the signin page.
 */
function SignupFooter({ onNavigateSignin }) {
	return (
		<div className='mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
			Already have an account?{' '}
			<button
				type='button'
				onClick={onNavigateSignin}
				className='cursor-pointer font-medium text-cyan-300 transition hover:text-cyan-200'
			>
				Sign In
			</button>
		</div>
	)
}

/**
 * Signup legal notice.
 *
 * This is presentation-only and does not change the existing
 * authentication behavior.
 */
function SignupLegalNotice() {
	return (
		<p className='mt-6 text-center text-xs text-gray-600'>
			By creating an account, you agree to our Terms and Privacy Policy.
		</p>
	)
}

/**
 * Signup form card.
 *
 * Groups the signup-specific UI into one isolated component while
 * keeping authentication state and submission logic in the page.
 */
function SignupCard({
	form,
	loading,
	error,
	showPassword,
	onChange,
	onSubmit,
	onTogglePassword,
	onNavigateSignin,
}) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-xl'>
			<SignupHeader />

			<form
				onSubmit={onSubmit}
				className='space-y-5'
				noValidate={false}
			>
				{/* Username */}
				<TextField
					id='signup-username'
					name='username'
					label='Username'
					placeholder='Enter username'
					value={form.username}
					onChange={onChange}
					autoComplete='username'
				/>

				{/* Email */}
				<TextField
					id='signup-email'
					name='email'
					type='email'
					label='Email Address'
					placeholder='Enter email address'
					value={form.email}
					onChange={onChange}
					autoComplete='email'
				/>

				{/* Password */}
				<PasswordField
					value={form.password}
					onChange={onChange}
					showPassword={showPassword}
					onToggleVisibility={onTogglePassword}
				/>

				{/* Authentication error */}
				<FormError message={error} />

				{/* Submit */}
				<SignupButton loading={loading} />
			</form>

			<SignupFooter onNavigateSignin={onNavigateSignin} />
		</div>
	)
}

/**
 * Signup page.
 *
 * Responsibilities:
 * - Manage signup form state.
 * - Handle user input.
 * - Submit signup credentials through useAuth.
 * - Redirect verified signup flow to email verification.
 * - Display authentication errors.
 *
 * Presentation concerns are delegated to smaller components above.
 */
export default function Signup() {
	// router for page navigation
	const router = useRouter()

	// extracting signup functionality and loading state
	// from the centralized authentication hook
	const { handleSignup, loading } = useAuth()

	// signup form state
	const [form, setForm] = useState(INITIAL_FORM_STATE)

	// password visibility state
	const [showPassword, setShowPassword] = useState(false)

	// authentication error state
	const [error, setError] = useState('')

	/**
	 * Handles changes to all signup input fields.
	 *
	 * The input name determines which property in the form
	 * state is updated, allowing one handler to manage all fields.
	 */
	const handleChange = (event) => {
		const { name, value } = event.target

		setForm((previousForm) => ({
			...previousForm,
			[name]: value,
		}))

		// Clear the previous server error once the user
		// starts correcting the form.
		if (error) {
			setError('')
		}
	}

	/**
	 * Handles signup form submission.
	 *
	 * Existing behavior is preserved:
	 * 1. Submit credentials through handleSignup.
	 * 2. Read the returned user's email.
	 * 3. Redirect to email verification.
	 * 4. Display authentication errors when signup fails.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()

		// Clear any previous authentication error.
		setError('')

		try {
			const data = await handleSignup(form)

			// Redirect the newly registered user to email verification.
			router.push(
				`${AUTH_ROUTES.verifyEmail}?email=${encodeURIComponent(
					data.user.email,
				)}`,
			)
		} catch (err) {
			// Safely extract an error message without allowing
			// an unexpected error object to break the UI.
			const message =
				err instanceof Error
					? err.message
					: 'Unable to create your account. Please try again.'

			setError(message)
		}
	}

	/**
	 * Navigates to the landing page.
	 */
	const handleNavigateHome = () => {
		router.push(AUTH_ROUTES.home)
	}

	/**
	 * Navigates to the signin page.
	 */
	const handleNavigateSignin = () => {
		router.push(AUTH_ROUTES.signin)
	}

	/**
	 * Toggles password visibility.
	 */
	const handleTogglePassword = () => {
		setShowPassword((previousValue) => !previousValue)
	}

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 py-12 text-white'>
			{/* Decorative background */}
			<AuthBackground />

			{/* Authentication content */}
			<div className='relative z-10 w-full max-w-xl'>
				{/* Product branding */}
				<AuthBrand onNavigateHome={handleNavigateHome} />

				{/* Signup form */}
				<SignupCard
					form={form}
					loading={loading}
					error={error}
					showPassword={showPassword}
					onChange={handleChange}
					onSubmit={handleSubmit}
					onTogglePassword={handleTogglePassword}
					onNavigateSignin={handleNavigateSignin}
				/>

				{/* Legal notice */}
				<SignupLegalNotice />
			</div>
		</main>
	)
}