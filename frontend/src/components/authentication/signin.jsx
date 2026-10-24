'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function Signin() {
	const router = useRouter()
	const { signin } = useAuth()

	const [formData, setFormData] = useState({
		identifier: '',
		password: '',
	})

	const [submitted, setSubmitted] = useState(false)
	const [showPassword, setShowPassword] = useState(false)

	const [isSubmitting, setIsSubmitting] = useState(false)
	const [serverError, setServerError] = useState('')

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormData((previousData) => ({
			...previousData,
			[name]: value,
		}))
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		setSubmitted(true)
		setServerError('')

		const identifier = formData.identifier.trim()

		// stopping if required fields are empty
		if (!identifier || !formData.password) return

		setIsSubmitting(true)

		try {
			// backend expects either email or username, never both
			const credentials = identifier.includes('@')
				? { email: identifier, password: formData.password }
				: { username: identifier, password: formData.password }

			await signin(credentials)

			router.replace('/dashboard')
		} catch (error) {
			setServerError(error.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	const inputClass =
		'h-10.5 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition-colors placeholder:text-slate-600 hover:border-slate-600 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-400/10'

	const labelClass = 'mb-1.5 block text-xs font-medium text-slate-300'

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

			<div className='relative w-full max-w-xl'>
				<section className='rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-7 lg:p-8'>
					{/* Card header */}
					<div className='mb-6 flex items-start justify-between gap-4'>
						<div className='min-w-0'>
							<p className='mb-2 text-xs font-semibold tracking-wider text-indigo-400'>
								WELCOME BACK
							</p>

							<h1 className='text-xl font-semibold tracking-tight text-white sm:text-2xl'>
								Sign in to your account
							</h1>

							<p className='mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm'>
								Continue preparing for your next career
								opportunity.
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

					{/* Signin form */}
					<form
						onSubmit={handleSubmit}
						noValidate
						className='space-y-4'
					>
						{/* Username or email */}
						<div>
							<label
								htmlFor='identifier'
								className={labelClass}
							>
								Username or email
							</label>

							<input
								id='identifier'
								name='identifier'
								type='text'
								autoComplete='username'
								placeholder='Enter your username or email'
								value={formData.identifier}
								onChange={handleChange}
								required
								aria-invalid={
									submitted && !formData.identifier.trim()
								}
								aria-describedby={
									submitted && !formData.identifier.trim()
										? 'identifier-error'
										: undefined
								}
								className={inputClass}
							/>

							{submitted && !formData.identifier.trim() && (
								<p
									id='identifier-error'
									role='alert'
									className='mt-1.5 text-xs text-rose-400'
								>
									Please enter your username or email.
								</p>
							)}
						</div>

						{/* Password */}
						<div>
							<label
								htmlFor='password'
								className={labelClass}
							>
								Password
							</label>

							{/* Input wrapper */}
							<div className='relative'>
								<input
									id='password'
									name='password'
									type={showPassword ? 'text' : 'password'}
									autoComplete='current-password'
									placeholder='Enter your password'
									value={formData.password}
									onChange={handleChange}
									required
									aria-invalid={
										submitted && !formData.password
									}
									aria-describedby={
										submitted && !formData.password
											? 'password-error'
											: undefined
									}
									className={`${inputClass} pr-11`}
								/>

								{/* Hide/Show password button */}
								<button
									type='button'
									onClick={() =>
										setShowPassword(
											(previousState) => !previousState,
										)
									}
									aria-label={
										showPassword
											? 'Hide password'
											: 'Show password'
									}
									aria-pressed={showPassword}
									className='absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-lg text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400 cursor-pointer'
								>
									{showPassword ? (
										/* Eye-off icon: password is visible */
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
											<path d='M3 3l18 18' />
											<path d='M10.58 10.59a2 2 0 0 0 2.83 2.83' />
											<path d='M9.88 5.09A10.9 10.9 0 0 1 12 4.9c5 0 8.27 4.1 9.5 7.1a11.8 11.8 0 0 1-2.16 3.2' />
											<path d='M6.61 6.61A12.2 12.2 0 0 0 2.5 12c1.23 3 4.5 7.1 9.5 7.1a10.8 10.8 0 0 0 4.05-.78' />
										</svg>
									) : (
										/* Eye icon: password is hidden */
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
											<path d='M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z' />
											<circle
												cx='12'
												cy='12'
												r='3'
											/>
										</svg>
									)}
								</button>
							</div>

							{/* Validation error */}
							{submitted && !formData.password && (
								<p
									id='password-error'
									role='alert'
									className='mt-1.5 text-xs text-rose-400'
								>
									Please enter your password.
								</p>
							)}
						</div>

						{/* Server error */}
						{serverError && (
							<p
								role='alert'
								className='rounded-lg border border-rose-500/20 bg-rose-500/10 px-3.5 py-2.5 text-xs text-rose-300'
							>
								{serverError}
							</p>
						)}

						{/* Submit button */}
						<button
							type='submit'
							disabled={isSubmitting}
							aria-busy={isSubmitting}
							className='group inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0'
						>
							{isSubmitting ? 'Signing in...' : 'Sign in'}
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
						</button>
					</form>

					{/* Signup link */}
					<div className='my-5 border-t border-slate-800/80' />

					<p className='text-center text-xs text-slate-400 sm:text-sm'>
						New to ResumeAI?{' '}
						<Link
							href='/signup'
							className='font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
						>
							Create an account
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