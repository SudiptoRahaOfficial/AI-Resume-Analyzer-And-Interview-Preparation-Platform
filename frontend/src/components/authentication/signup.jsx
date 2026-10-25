'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signup } from '@/services/auth.api'

/* -------------------------------------------------------------------------- */
/*  Constants (kept outside the component so they're created only once)       */
/*  These MUST mirror the backend user model rules.                           */
/* -------------------------------------------------------------------------- */

const USERNAME_MAX_LENGTH = 15
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const PASSWORD_RULES = [
	{
		id: 'length',
		label: 'At least 8 characters',
		test: (value) => value.length >= 8,
	},
	{
		id: 'lowercase',
		label: 'One lowercase letter',
		test: (value) => /[a-z]/.test(value),
	},
	{
		id: 'uppercase',
		label: 'One uppercase letter',
		test: (value) => /[A-Z]/.test(value),
	},
	{
		id: 'number',
		label: 'One number',
		test: (value) => /\d/.test(value),
	},
	{
		id: 'symbol',
		label: 'One symbol (e.g. ! @ # $)',
		test: (value) => /[^A-Za-z0-9\s]/.test(value),
	},
	{
		id: 'spaces',
		label: 'No spaces',
		test: (value) => value.length > 0 && !/\s/.test(value),
	},
]

// order matters: used to focus the first invalid field
const FIELD_ORDER = ['username', 'email', 'password', 'confirmPassword']

const GENERIC_SERVER_MESSAGE =
	'Something went wrong on our side. Please try again in a moment.'

const NETWORK_MESSAGE =
	'Unable to reach the server. Please check your internet connection and try again.'

const inputClass =
	'h-10.5 w-full rounded-lg border bg-slate-950/60 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:ring-2'

const inputNormalClass =
	'border-slate-700/80 hover:border-slate-600 focus:border-indigo-400/70 focus:ring-indigo-400/10'

const inputErrorClass =
	'border-rose-500/60 hover:border-rose-500/80 focus:border-rose-400 focus:ring-rose-400/10'

const labelClass = 'mb-1.5 block text-xs font-medium text-slate-300'

/* -------------------------------------------------------------------------- */
/*  Pure helpers                                                              */
/* -------------------------------------------------------------------------- */

// client-side validation, returns { fieldName: 'message' } (empty = valid)
const validate = ({ username, email, password, confirmPassword }) => {
	const errors = {}
	const trimmedUsername = username.trim()
	const trimmedEmail = email.trim()

	if (!trimmedUsername) {
		errors.username = 'Please enter your username.'
	} else if (trimmedUsername.length > USERNAME_MAX_LENGTH) {
		errors.username = `Username must be ${USERNAME_MAX_LENGTH} characters or fewer (currently ${trimmedUsername.length}).`
	}

	if (!trimmedEmail) {
		errors.email = 'Please enter your email address.'
	} else if (!EMAIL_REGEX.test(trimmedEmail)) {
		errors.email = 'Please enter a valid email address.'
	}

	if (!password) {
		errors.password = 'Please create a password.'
	} else if (!PASSWORD_RULES.every((rule) => rule.test(password))) {
		errors.password = 'Your password does not meet all the requirements.'
	}

	if (!confirmPassword) {
		errors.confirmPassword = 'Please confirm your password.'
	} else if (password !== confirmPassword) {
		errors.confirmPassword = 'Passwords do not match.'
	}

	return errors
}

/**
 * Converts whatever the API layer throws into:
 *  - fieldErrors: messages we can show under a specific input
 *  - message: a general message for the banner (when no field matches)
 *
 * Supports these response shapes:
 *  { errors: { username: 'msg' } }
 *  { errors: [{ field: 'username', message: 'msg' }] }
 *  plain { message: '...' } (falls back to keyword matching)
 */
const parseServerError = (error) => {
	// fetch() throws TypeError when the network is down / server unreachable
	if (error instanceof TypeError) {
		return { fieldErrors: {}, message: NETWORK_MESSAGE }
	}

	const status = error?.status ?? error?.response?.status
	const data = error?.data ?? error?.response?.data
	const rawErrors = data?.errors ?? error?.errors
	const fieldErrors = {}

	if (Array.isArray(rawErrors)) {
		rawErrors.forEach((item) => {
			const field = item?.field ?? item?.path
			if (FIELD_ORDER.includes(field) && item?.message) {
				fieldErrors[field] = item.message
			}
		})
	} else if (rawErrors && typeof rawErrors === 'object') {
		Object.entries(rawErrors).forEach(([field, value]) => {
			const message = typeof value === 'string' ? value : value?.message
			if (FIELD_ORDER.includes(field) && message) {
				fieldErrors[field] = message
			}
		})
	}

	// server-side problem (5xx): never show raw/internal messages to the user
	if (status >= 500) {
		return { fieldErrors: {}, message: GENERIC_SERVER_MESSAGE }
	}

	if (Object.keys(fieldErrors).length > 0) {
		return { fieldErrors, message: '' }
	}

	// fallback: attach a plain message to a field by keyword
	// (e.g. "This username is not available", "Already have an account with this email")
	const message = error?.message || GENERIC_SERVER_MESSAGE

	if (/username/i.test(message)) {
		return { fieldErrors: { username: message }, message: '' }
	}
	if (/email/i.test(message)) {
		return { fieldErrors: { email: message }, message: '' }
	}
	if (/password/i.test(message)) {
		return { fieldErrors: { password: message }, message: '' }
	}

	return { fieldErrors: {}, message }
}

/* -------------------------------------------------------------------------- */
/*  Small presentational components (same file, no extra files needed)        */
/* -------------------------------------------------------------------------- */

function EyeIcon({ hidden }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.7'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='h-4.5 w-4.5'
			aria-hidden='true'
		>
			{hidden ? (
				<>
					<path d='M3 3l18 18' />
					<path d='M10.58 10.59a2 2 0 0 0 2.83 2.83' />
					<path d='M9.88 5.09A10.9 10.9 0 0 1 12 4.9c5 0 8.27 4.1 9.5 7.1a11.8 11.8 0 0 1-2.16 3.2' />
					<path d='M6.61 6.61A12.2 12.2 0 0 0 2.5 12c1.23 3 4.5 7.1 9.5 7.1a10.8 10.8 0 0 0 4.05-.78' />
				</>
			) : (
				<>
					<path d='M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z' />
					<circle
						cx='12'
						cy='12'
						r='3'
					/>
				</>
			)}
		</svg>
	)
}

function FieldError({ id, message }) {
	if (!message) return null

	return (
		<p
			id={id}
			role='alert'
			className='mt-1.5 text-xs leading-5 text-rose-400'
		>
			{message}
		</p>
	)
}

function PasswordToggle({ visible, onToggle, label }) {
	return (
		<button
			type='button'
			onClick={onToggle}
			aria-label={visible ? `Hide ${label}` : `Show ${label}`}
			aria-pressed={visible}
			className='absolute inset-y-0 right-0 inline-flex w-11 cursor-pointer items-center justify-center rounded-r-lg text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400'
		>
			<EyeIcon hidden={visible} />
		</button>
	)
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                            */
/* -------------------------------------------------------------------------- */

export default function Signup() {
	const router = useRouter()

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	// which fields the user has interacted with (errors show after blur/submit)
	const [touched, setTouched] = useState({})
	const [submitted, setSubmitted] = useState(false)

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [passwordFocused, setPasswordFocused] = useState(false)

	// api call state
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [serverFieldErrors, setServerFieldErrors] = useState({})
	const [serverError, setServerError] = useState('')

	// refs, so we can focus the first invalid input
	const inputRefs = useRef({})

	const clientErrors = validate(formData)

	// server error wins (it's the freshest), otherwise show client error once relevant
	const getError = (name) => {
		if (serverFieldErrors[name]) return serverFieldErrors[name]
		if ((submitted || touched[name]) && clientErrors[name]) {
			return clientErrors[name]
		}
		return ''
	}

	const usernameError = getError('username')
	const emailError = getError('email')
	const passwordError = getError('password')
	const confirmPasswordError = getError('confirmPassword')

	const usernameLength = formData.username.trim().length

	const focusField = (name) => {
		inputRefs.current[name]?.focus()
	}

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormData((previousData) => ({
			...previousData,
			[name]: value,
		}))

		// the user is fixing this field, so its old server error is stale
		if (serverFieldErrors[name]) {
			setServerFieldErrors((previousErrors) => {
				const { [name]: _removed, ...rest } = previousErrors
				return rest
			})
		}

		if (serverError) setServerError('')
	}

	const handleBlur = (event) => {
		const { name } = event.target
		setTouched((previousTouched) => ({ ...previousTouched, [name]: true }))
		if (name === 'password') setPasswordFocused(false)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		// guard against double submits (e.g. pressing Enter twice)
		if (isSubmitting) return

		setSubmitted(true)
		setServerError('')
		setServerFieldErrors({})

		// stop and focus the first invalid field
		const firstInvalidField = FIELD_ORDER.find((name) => clientErrors[name])
		if (firstInvalidField) {
			focusField(firstInvalidField)
			return
		}

		setIsSubmitting(true)

		try {
			const email = formData.email.trim()

			// confirmPassword is only for the UI, never sent to the server
			await signup({
				username: formData.username.trim(),
				email,
				password: formData.password,
			})

			// moving user to the verification page with their email
			router.push(`/verify-email?email=${encodeURIComponent(email)}`)
		} catch (error) {
			const { fieldErrors, message } = parseServerError(error)

			setServerFieldErrors(fieldErrors)
			setServerError(message)

			const firstServerField = FIELD_ORDER.find(
				(name) => fieldErrors[name],
			)
			if (firstServerField) focusField(firstServerField)
		} finally {
			setIsSubmitting(false)
		}
	}

	const getInputClass = (hasError, extra = '') =>
		`${inputClass} ${hasError ? inputErrorClass : inputNormalClass} ${extra}`

	// show the live checklist while typing a password, or after a failed attempt
	const showPasswordChecklist =
		formData.password.length > 0 && (passwordFocused || passwordError)

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-8 text-slate-300 sm:px-6'>
			{/* Background glow effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 overflow-hidden'
			>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl' />
				<div className='absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl' />
				<div className='absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-500/5 blur-3xl' />
			</div>

			<div className='relative w-full max-w-2xl'>
				<section className='rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 lg:p-8'>
					{/* Card header */}
					<div className='mb-6 flex items-start justify-between gap-4'>
						<div className='min-w-0'>
							<p className='mb-2 text-xs font-semibold tracking-wider text-indigo-400'>
								GET STARTED
							</p>

							<h1 className='text-xl font-semibold tracking-tight text-white sm:text-2xl'>
								Create your account
							</h1>

							<p className='mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm'>
								Prepare smarter with personalized AI guidance.
							</p>
						</div>

						{/* ResumeAI branding */}
						<Link
							href='/'
							aria-label='ResumeAI home'
							className='inline-flex shrink-0 items-center text-white'
						>
							<span className='text-xl font-bold tracking-tight'>
								Resume
								<span className='text-indigo-400'>AI</span>
							</span>
						</Link>
					</div>

					{/* Signup form */}
					<form
						onSubmit={handleSubmit}
						noValidate
						className='space-y-4'
					>
						{/* Server error banner (only for errors not tied to a field) */}
						{serverError && (
							<div
								role='alert'
								className='flex items-start gap-2.5 rounded-lg border border-rose-400/20 bg-rose-500/10 px-3.5 py-3 text-xs leading-5 text-rose-300'
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.7'
									strokeLinecap='round'
									strokeLinejoin='round'
									className='mt-0.5 h-4 w-4 shrink-0'
									aria-hidden='true'
								>
									<circle
										cx='12'
										cy='12'
										r='9'
									/>
									<path d='M12 8v4m0 4h.01' />
								</svg>
								<p>{serverError}</p>
							</div>
						)}

						{/* Name and email */}
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<div className='mb-1.5 flex items-center justify-between'>
									<label
										htmlFor='username'
										className='block text-xs font-medium text-slate-300'
									>
										Username
									</label>

									{/* live character counter */}
									<span
										className={`text-xs tabular-nums ${
											usernameLength > USERNAME_MAX_LENGTH
												? 'text-rose-400'
												: 'text-slate-500'
										}`}
										aria-hidden='true'
									>
										{usernameLength}/{USERNAME_MAX_LENGTH}
									</span>
								</div>

								<input
									ref={(element) => {
										inputRefs.current.username = element
									}}
									id='username'
									name='username'
									type='text'
									autoComplete='username'
									placeholder='Enter your username'
									value={formData.username}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									aria-invalid={Boolean(usernameError)}
									aria-describedby={
										usernameError
											? 'username-error'
											: undefined
									}
									className={getInputClass(
										Boolean(usernameError),
									)}
								/>

								<FieldError
									id='username-error'
									message={usernameError}
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className={labelClass}
								>
									Email address
								</label>

								<input
									ref={(element) => {
										inputRefs.current.email = element
									}}
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									placeholder='you@example.com'
									value={formData.email}
									onChange={handleChange}
									onBlur={handleBlur}
									required
									aria-invalid={Boolean(emailError)}
									aria-describedby={
										emailError ? 'email-error' : undefined
									}
									className={getInputClass(
										Boolean(emailError),
									)}
								/>

								<FieldError
									id='email-error'
									message={emailError}
								/>
							</div>
						</div>

						{/* Password and confirmation */}
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							{/* password */}
							<div>
								<label
									htmlFor='password'
									className={labelClass}
								>
									Password
								</label>

								<div className='relative'>
									<input
										ref={(element) => {
											inputRefs.current.password = element
										}}
										id='password'
										name='password'
										type={
											showPassword ? 'text' : 'password'
										}
										autoComplete='new-password'
										placeholder='Create a strong password'
										value={formData.password}
										onChange={handleChange}
										onFocus={() => setPasswordFocused(true)}
										onBlur={handleBlur}
										required
										aria-invalid={Boolean(passwordError)}
										aria-describedby={
											[
												passwordError
													? 'password-error'
													: null,
												showPasswordChecklist
													? 'password-checklist'
													: null,
											]
												.filter(Boolean)
												.join(' ') || undefined
										}
										className={getInputClass(
											Boolean(passwordError),
											'pr-11',
										)}
									/>

									<PasswordToggle
										visible={showPassword}
										onToggle={() =>
											setShowPassword(
												(previous) => !previous,
											)
										}
										label='password'
									/>
								</div>

								<FieldError
									id='password-error'
									message={passwordError}
								/>

								{/* Live requirement checklist */}
								{showPasswordChecklist && (
									<ul
										id='password-checklist'
										className='mt-2 grid grid-cols-1 gap-x-3 gap-y-1 min-[420px]:grid-cols-2'
									>
										{PASSWORD_RULES.map((rule) => {
											const passed = rule.test(
												formData.password,
											)

											return (
												<li
													key={rule.id}
													className={`flex items-center gap-1.5 text-xs ${
														passed
															? 'text-emerald-400'
															: 'text-slate-500'
													}`}
												>
													<svg
														viewBox='0 0 24 24'
														fill='none'
														stroke='currentColor'
														strokeWidth='2'
														strokeLinecap='round'
														strokeLinejoin='round'
														className='h-3.5 w-3.5 shrink-0'
														aria-hidden='true'
													>
														{passed ? (
															<path d='m5 12 4 4 10-10' />
														) : (
															<circle
																cx='12'
																cy='12'
																r='7'
															/>
														)}
													</svg>

													<span>{rule.label}</span>

													<span className='sr-only'>
														{passed
															? '(met)'
															: '(not met)'}
													</span>
												</li>
											)
										})}
									</ul>
								)}
							</div>

							{/* confirm password */}
							<div>
								<label
									htmlFor='confirmPassword'
									className={labelClass}
								>
									Confirm password
								</label>

								<div className='relative'>
									<input
										ref={(element) => {
											inputRefs.current.confirmPassword =
												element
										}}
										id='confirmPassword'
										name='confirmPassword'
										type={
											showConfirmPassword
												? 'text'
												: 'password'
										}
										autoComplete='new-password'
										placeholder='Re-enter your password'
										value={formData.confirmPassword}
										onChange={handleChange}
										onBlur={handleBlur}
										required
										aria-invalid={Boolean(
											confirmPasswordError,
										)}
										aria-describedby={
											confirmPasswordError
												? 'confirm-password-error'
												: undefined
										}
										className={getInputClass(
											Boolean(confirmPasswordError),
											'pr-11',
										)}
									/>

									<PasswordToggle
										visible={showConfirmPassword}
										onToggle={() =>
											setShowConfirmPassword(
												(previous) => !previous,
											)
										}
										label='confirm password'
									/>
								</div>

								<FieldError
									id='confirm-password-error'
									message={confirmPasswordError}
								/>
							</div>
						</div>

						{/* Email verification information */}
						<div className='flex items-start gap-2.5 rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-3.5 py-3'>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='mt-0.5 h-4 w-4 shrink-0 text-indigo-300'
								aria-hidden='true'
							>
								<path
									d='M12 3 5 6v5c0 4.5 2.9 7.7 7 10 4.1-2.3 7-5.5 7-10V6l-7-3Z'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinejoin='round'
								/>
								<path
									d='m9 12 2 2 4-4'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>

							<p className='text-xs leading-5 text-slate-400'>
								We’ll email you a one-time verification code
								(OTP) to verify your email address.
							</p>
						</div>

						{/* Submit button */}
						<button
							type='submit'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
							className='group inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'
						>
							{isSubmitting
								? 'Creating account...'
								: 'Create account'}

							{!isSubmitting && (
								<svg
									viewBox='0 0 24 24'
									fill='none'
									className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5'
									aria-hidden='true'
								>
									<path
										d='M5 12h14m-6-6 6 6-6 6'
										stroke='currentColor'
										strokeWidth='1.7'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							)}
						</button>
					</form>

					{/* Sign-in link */}
					<div className='my-5 border-t border-slate-800/80' />

					<p className='text-center text-xs text-slate-400 sm:text-sm'>
						Already have an account?{' '}
						<Link
							href='/signin'
							className='font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
						>
							Sign in
						</Link>
					</p>
				</section>

				<p className='mt-5 text-center text-xs text-slate-500'>
					AI-powered preparation for your next opportunity.
				</p>
			</div>
		</main>
	)
}