'use client'

// ============================================================================
// Dependencies
// ============================================================================

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

import { useAuth } from '@/hooks/useAuth'

// ============================================================================
// Constants
// ============================================================================

// Centralized authentication routes.
// Keeping routes in one place prevents route strings from being scattered
// throughout the component.
const AUTH_ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	signup: '/auth/signup',
	verifyEmail: '/auth/verify-email',
}

// Static product information displayed on the authentication page.
const PRODUCT_INFO = {
	name: 'ResumeAI',
	tagline: 'AI-Powered Interview Preparation Platform',
	description:
		'Sign in to continue to your resume analysis and interview preparation workspace.',
	footerText: 'Secure access to your ResumeAI workspace.',
}

// ============================================================================
// Reusable UI Components
// ============================================================================

/**
 * Authentication page background.
 *
 * Provides the same ambient cyan and blue background effects used
 * throughout the ResumeAI authentication experience.
 */
function AuthBackground() {
	return (
		<div
			className='pointer-events-none absolute inset-0'
			aria-hidden='true'
		>
			{/* Top-center cyan ambient glow. */}
			<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />

			{/* Bottom-right blue ambient glow. */}
			<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
		</div>
	)
}

/**
 * ResumeAI branding section.
 *
 * Displays the product name and authentication page tagline.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onBrandClick - Callback used to navigate home.
 */
function AuthBrand({ onBrandClick }) {
	return (
		<div className='mb-8 text-center'>
			{/* Brand navigation button. */}
			<button
				type='button'
				onClick={onBrandClick}
				className='cursor-pointer text-3xl font-semibold tracking-tight text-white transition hover:text-cyan-300'
			>
				{PRODUCT_INFO.name}
			</button>

			{/* Product tagline. */}
			<p className='mt-2 text-sm text-gray-500'>{PRODUCT_INFO.tagline}</p>
		</div>
	)
}

/**
 * Authentication card header.
 *
 * Displays the page heading and supporting description.
 */
function SigninHeader() {
	return (
		<div className='mb-8'>
			{/* Page heading. */}
			<h1 className='text-2xl font-semibold tracking-tight text-white'>
				Welcome back
			</h1>

			{/* Supporting authentication description. */}
			<p className='mt-2 text-sm leading-6 text-gray-400'>
				{PRODUCT_INFO.description}
			</p>
		</div>
	)
}

/**
 * Generic form field label.
 *
 * This keeps label styling consistent across the authentication form.
 *
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Label content.
 * @param {string} props.htmlFor - Associated input ID.
 */
function FormLabel({ children, htmlFor }) {
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
 * Username/email input field.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.value - Current input value.
 * @param {Function} props.onChange - Input change handler.
 */
function IdentifierField({ value, onChange }) {
	return (
		<div>
			{/* Identifier field label. */}
			<FormLabel htmlFor='identifier'>Username or Email</FormLabel>

			{/* Username/email input. */}
			<input
				id='identifier'
				name='identifier'
				type='text'
				autoComplete='username'
				placeholder='Enter username or email'
				value={value}
				onChange={onChange}
				required
				className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
			/>
		</div>
	)
}

/**
 * Password input field with visibility toggle.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.value - Current password value.
 * @param {Function} props.onChange - Input change handler.
 * @param {boolean} props.visible - Whether the password is currently visible.
 * @param {Function} props.onToggleVisibility - Visibility toggle callback.
 */
function PasswordField({ value, onChange, visible, onToggleVisibility }) {
	return (
		<div>
			{/* Password field label. */}
			<FormLabel htmlFor='password'>Password</FormLabel>

			<div className='relative'>
				{/* Password input. */}
				<input
					id='password'
					name='password'
					type={visible ? 'text' : 'password'}
					autoComplete='current-password'
					placeholder='Enter password'
					value={value}
					onChange={onChange}
					required
					className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 pr-12 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
				/>

				{/* Password visibility control. */}
				<button
					type='button'
					onClick={onToggleVisibility}
					aria-label={visible ? 'Hide password' : 'Show password'}
					aria-pressed={visible}
					className='absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-gray-500 transition hover:text-cyan-300'
				>
					{visible ? (
						<EyeOff
							size={18}
							aria-hidden='true'
						/>
					) : (
						<Eye
							size={18}
							aria-hidden='true'
						/>
					)}
				</button>
			</div>
		</div>
	)
}

/**
 * Authentication error message.
 *
 * The component is rendered only when an authentication error exists.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.message - Error message.
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
 * Sign-in submit button.
 *
 * Separating this from the form keeps the main form easier to scan and
 * provides one place to manage loading/disabled presentation.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.loading - Whether authentication is in progress.
 */
function SigninButton({ loading }) {
	return (
		<button
			type='submit'
			disabled={loading}
			aria-busy={loading}
			className='w-full cursor-pointer rounded-md bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60'
		>
			{loading ? 'Signing In...' : 'Sign In'}
		</button>
	)
}

/**
 * Authentication footer.
 *
 * Provides navigation from sign-in to account creation.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onSignup - Callback for signup navigation.
 */
function SigninFooter({ onSignup }) {
	return (
		<div className='mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
			Don't have an account?{' '}
			<button
				type='button'
				onClick={onSignup}
				className='cursor-pointer font-medium text-cyan-300 transition hover:text-cyan-200'
			>
				Create Account
			</button>
		</div>
	)
}

/**
 * Authentication card.
 *
 * Contains the sign-in form and all associated controls.
 *
 * @param {Object} props - Component properties.
 */
function SigninCard({
	identifier,
	password,
	showPassword,
	error,
	loading,
	onIdentifierChange,
	onPasswordChange,
	onTogglePassword,
	onSubmit,
	onSignup,
}) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-xl'>
			{/* Authentication card header. */}
			<SigninHeader />

			{/* Sign-in form. */}
			<form
				onSubmit={onSubmit}
				className='space-y-5'
				noValidate
			>
				{/* Username/email field. */}
				<IdentifierField
					value={identifier}
					onChange={onIdentifierChange}
				/>

				{/* Password field. */}
				<PasswordField
					value={password}
					onChange={onPasswordChange}
					visible={showPassword}
					onToggleVisibility={onTogglePassword}
				/>

				{/* Authentication error. */}
				<FormError message={error} />

				{/* Form submission action. */}
				<SigninButton loading={loading} />
			</form>

			{/* Account creation navigation. */}
			<SigninFooter onSignup={onSignup} />
		</div>
	)
}

/**
 * Authentication page footer note.
 */
function AuthFooter() {
	return (
		<p className='mt-6 text-center text-xs text-gray-600'>
			{PRODUCT_INFO.footerText}
		</p>
	)
}

// ============================================================================
// Signin Page
// ============================================================================

/**
 * Sign-in page.
 *
 * Responsibilities:
 * - Manage sign-in form state.
 * - Determine whether the identifier is an email or username.
 * - Delegate authentication to the useAuth hook.
 * - Redirect authenticated users to the dashboard.
 * - Redirect unverified email users to email verification.
 *
 * UI responsibilities are delegated to smaller authentication components.
 */
export default function Signin() {
	// --------------------------------------------------------------------------
	// Navigation
	// --------------------------------------------------------------------------

	// Next.js router used for client-side authentication navigation.
	const router = useRouter()

	// --------------------------------------------------------------------------
	// Authentication
	// --------------------------------------------------------------------------

	// Extract the sign-in action and global authentication loading state.
	const { handleSignin, loading } = useAuth()

	// --------------------------------------------------------------------------
	// Form State
	// --------------------------------------------------------------------------

	// Stores the username or email entered by the user.
	const [identifier, setIdentifier] = useState('')

	// Stores the user's password.
	const [password, setPassword] = useState('')

	// Controls whether the password is displayed as plain text.
	const [showPassword, setShowPassword] = useState(false)

	// Stores the authentication error displayed to the user.
	const [error, setError] = useState('')

	// --------------------------------------------------------------------------
	// Event Handlers
	// --------------------------------------------------------------------------

	/**
	 * Handles username/email input changes.
	 *
	 * Clearing the previous authentication error when the user starts
	 * correcting the identifier provides a cleaner form experience.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - Input event.
	 */
	const handleIdentifierChange = (event) => {
		setIdentifier(event.target.value)
		setError('')
	}

	/**
	 * Handles password input changes.
	 *
	 * Clearing the previous authentication error allows the user to retry
	 * without an outdated error remaining visible.
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} event - Input event.
	 */
	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
		setError('')
	}

	/**
	 * Toggles password visibility.
	 */
	const handleTogglePassword = () => {
		setShowPassword((previousState) => !previousState)
	}

	/**
	 * Handles sign-in form submission.
	 *
	 * The backend authentication API accepts either:
	 * - username
	 * - email
	 *
	 * The existing application behavior determines which field to send
	 * based on whether the identifier contains "@". This behavior is
	 * intentionally preserved.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} event - Form submit event.
	 */
	const handleSubmit = async (event) => {
		event.preventDefault()

		// Clear any previous authentication error before submitting.
		setError('')

		// Determine whether the identifier should be treated as an email.
		const isEmail = identifier.includes('@')

		try {
			// Delegate authentication to the centralized auth hook.
			await handleSignin({
				username: isEmail ? undefined : identifier,
				email: isEmail ? identifier : undefined,
				password,
			})

			// Authentication succeeded, so navigate to the dashboard.
			router.push(AUTH_ROUTES.dashboard)
		} catch (error) {
			// Handle the special case where the account exists but
			// email verification has not been completed.
			if (error.message === 'Email not verified' && isEmail) {
				// Preserve the user's email when redirecting to verification.
				const verificationUrl = `${AUTH_ROUTES.verifyEmail}?email=${encodeURIComponent(
					identifier,
				)}`

				router.push(verificationUrl)

				return
			}

			// Display all other authentication errors.
			setError(error.message)
		}
	}

	// --------------------------------------------------------------------------
	// Page Rendering
	// --------------------------------------------------------------------------

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 py-12 text-white'>
			{/* Authentication page background effects. */}
			<AuthBackground />

			{/* Main authentication content. */}
			<div className='relative z-10 w-full max-w-xl'>
				{/* ResumeAI branding. */}
				<AuthBrand onBrandClick={() => router.push(AUTH_ROUTES.home)} />

				{/* Sign-in card and form. */}
				<SigninCard
					identifier={identifier}
					password={password}
					showPassword={showPassword}
					error={error}
					loading={loading}
					onIdentifierChange={handleIdentifierChange}
					onPasswordChange={handlePasswordChange}
					onTogglePassword={handleTogglePassword}
					onSubmit={handleSubmit}
					onSignup={() => router.push(AUTH_ROUTES.signup)}
				/>

				{/* Authentication security footer. */}
				<AuthFooter />
			</div>
		</main>
	)
}