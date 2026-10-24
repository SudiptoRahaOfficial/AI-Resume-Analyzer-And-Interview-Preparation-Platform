'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signup } from '@/services/auth.api'

export default function Signup() {
	const router = useRouter()

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	})

	const [submitted, setSubmitted] = useState(false)

	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	// states for api call
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [serverError, setServerError] = useState('')

	const passwordRequirements =
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s])\S{8,}$/

	const isPasswordValid = passwordRequirements.test(formData.password)

	const doPasswordsMatch = formData.password === formData.confirmPassword

	const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
		formData.email.trim(),
	)

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

		// stopping if any field is invalid
		if (
			!formData.username.trim() ||
			!isEmailValid ||
			!isPasswordValid ||
			!doPasswordsMatch
		) {
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
			// showing the backend message (duplicate account, server error, etc.)
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
						{/* Name and email */}
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='username'
									className={labelClass}
								>
									Username
								</label>

								<input
									id='username'
									name='username'
									type='text'
									autoComplete='name'
									placeholder='Enter your username'
									value={formData.username}
									onChange={handleChange}
									required
									aria-invalid={
										submitted && !formData.username.trim()
									}
									className={inputClass}
								/>

								{submitted && !formData.username.trim() && (
									<p
										role='alert'
										className='mt-1.5 text-xs text-rose-400'
									>
										Please enter your username.
									</p>
								)}
							</div>

							<div>
								<label
									htmlFor='email'
									className={labelClass}
								>
									Email address
								</label>

								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									placeholder='you@example.com'
									value={formData.email}
									onChange={handleChange}
									required
									aria-invalid={
										submitted &&
										(!formData.email.trim() ||
											!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
												formData.email.trim(),
											))
									}
									className={inputClass}
								/>

								{submitted && !formData.email.trim() && (
									<p
										role='alert'
										className='mt-1.5 text-xs text-rose-400'
									>
										Please enter your email address.
									</p>
								)}

								{submitted &&
									formData.email.trim() &&
									!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
										formData.email.trim(),
									) && (
										<p
											role='alert'
											className='mt-1.5 text-xs text-rose-400'
										>
											Please enter a valid email address.
										</p>
									)}
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
										id='password'
										name='password'
										type={
											showPassword ? 'text' : 'password'
										}
										autoComplete='new-password'
										placeholder='Create a strong password'
										value={formData.password}
										onChange={handleChange}
										required
										aria-invalid={
											submitted && !isPasswordValid
										}
										aria-describedby={
											submitted && !isPasswordValid
												? 'password-requirements'
												: undefined
										}
										className={`${inputClass} pr-11`}
									/>

									{/* Hide/Show password button */}
									<button
										type='button'
										onClick={() =>
											setShowPassword(
												(previousState) =>
													!previousState,
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
											/* Eye-off icon */
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
											/* Eye icon */
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

								{/* Password validation */}
								{submitted && !isPasswordValid && (
									<p
										id='password-requirements'
										role='alert'
										className='mt-1.5 text-xs leading-5 text-rose-400'
									>
										Use at least 8 characters, including an
										uppercase letter, a lowercase letter, a
										number, and a symbol. Spaces are not
										allowed.
									</p>
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
										required
										aria-invalid={
											submitted && !doPasswordsMatch
										}
										aria-describedby={
											submitted && !doPasswordsMatch
												? 'confirm-password-error'
												: undefined
										}
										className={`${inputClass} pr-11`}
									/>

									{/* Hide/Show confirm password button */}
									<button
										type='button'
										onClick={() =>
											setShowConfirmPassword(
												(previousState) =>
													!previousState,
											)
										}
										aria-label={
											showConfirmPassword
												? 'Hide confirm password'
												: 'Show confirm password'
										}
										aria-pressed={showConfirmPassword}
										className='absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center rounded-r-lg text-slate-500 transition-colors hover:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-400 cursor-pointer'
									>
										{showConfirmPassword ? (
											/* Eye-off icon */
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
											/* Eye icon */
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

								{/* Password confirmation validation */}
								{submitted && !doPasswordsMatch && (
									<p
										id='confirm-password-error'
										role='alert'
										className='mt-1.5 text-xs text-rose-400'
									>
										Passwords do not match.
									</p>
								)}
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

						{/* Server error message */}
						{serverError && (
							<div
								role='alert'
								className='rounded-lg border border-rose-400/20 bg-rose-500/10 px-3.5 py-3 text-xs leading-5 text-rose-300'
							>
								{serverError}
							</div>
						)}

						{/* Submit button */}
						<button
							type='submit'
							disabled={isSubmitting}
							className='group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer'
						>
							{isSubmitting
								? 'Creating account...'
								: 'Create account'}
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