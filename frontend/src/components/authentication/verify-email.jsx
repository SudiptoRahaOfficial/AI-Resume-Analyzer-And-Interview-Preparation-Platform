'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { verifyEmail, resendVerifyEmail } from '@/services/auth.api'

// seconds the user must wait before requesting another OTP
const RESEND_COOLDOWN_SECONDS = 60

export default function VerifyEmail({ email }) {
	const router = useRouter()

	const [otp, setOtp] = useState('')
	const [submitted, setSubmitted] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [isResending, setIsResending] = useState(false)
	const [cooldown, setCooldown] = useState(0)
	const [serverError, setServerError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')

	// counting down the resend cooldown one second at a time
	useEffect(() => {
		if (cooldown <= 0) return

		const timerId = setTimeout(
			() => setCooldown((value) => value - 1),
			1000,
		)

		// cleaning timer on unmount or before next tick
		return () => clearTimeout(timerId)
	}, [cooldown])

	const handleSubmit = async (event) => {
		event.preventDefault()
		setSubmitted(true)
		setServerError('')
		setSuccessMessage('')

		// stopping if otp format is invalid
		if (!/^\d{6}$/.test(otp)) return

		setIsSubmitting(true)

		try {
			await verifyEmail({ email, otp })

			// verified, user can now sign in
			router.push('/signin')
		} catch (error) {
			setServerError(error.message)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleResend = async () => {
		// blocking resend during cooldown or while a request is running
		if (cooldown > 0 || isResending) return

		setServerError('')
		setSuccessMessage('')
		setIsResending(true)

		try {
			const data = await resendVerifyEmail({ email })

			// clearing old code, showing success, and starting cooldown
			setOtp('')
			setSubmitted(false)
			setSuccessMessage(data.message)
			setCooldown(RESEND_COOLDOWN_SECONDS)
		} catch (error) {
			setServerError(error.message)
		} finally {
			setIsResending(false)
		}
	}

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
								EMAIL VERIFICATION
							</p>

							<h1 className='text-xl font-semibold tracking-tight text-white sm:text-2xl'>
								Verify your email
							</h1>

							<p className='mt-1.5 text-xs leading-5 text-slate-400 sm:text-sm'>
								Confirm your email address to get started.
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

					{/* Email information */}
					<div className='mb-4'>
						<p className='text-sm text-slate-300 mb-1.5'>
							Verification code sent to
						</p>
						<p className='text-sm font-mono text-slate-500 text-center rounded-lg border border-slate-800/80 bg-slate-950/50 p-3.5'>
							{email}
						</p>
					</div>

					{/* Verification form */}
					<form
						onSubmit={handleSubmit}
						noValidate
						className='space-y-4'
					>
						<div>
							<label
								htmlFor='otp'
								className='mb-1.5 block text-sm text-slate-300'
							>
								6-digit verification code
							</label>

							<input
								id='otp'
								name='otp'
								type='text'
								inputMode='numeric'
								autoComplete='one-time-code'
								pattern='[0-9]{6}'
								maxLength={6}
								placeholder='000000'
								value={otp}
								onChange={(event) => {
									setOtp(
										event.target.value
											.replace(/\D/g, '')
											.slice(0, 6),
									)
								}}
								required
								aria-invalid={submitted && !/^\d{6}$/.test(otp)}
								aria-describedby={
									submitted && !/^\d{6}$/.test(otp)
										? 'otp-error otp-help'
										: 'otp-help'
								}
								className='w-full h-12 rounded-lg border border-slate-700/80 bg-slate-950/60 text-center text-xl font-semibold tracking-[0.30em] text-white outline-none transition-colors placeholder:text-slate-600 hover:border-slate-600 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-400/10'
							/>

							{submitted && !/^\d{6}$/.test(otp) && (
								<p
									id='otp-error'
									role='alert'
									className='mt-1.5 text-xs text-rose-400'
								>
									Enter a valid six-digit verification code.
								</p>
							)}

							<div
								id='otp-help'
								className='mt-3 flex items-start gap-2.5 rounded-lg border border-indigo-400/10 bg-indigo-500/5 px-3.5 py-3'
							>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									className='mt-0.5 h-4 w-4 shrink-0 text-indigo-300'
									aria-hidden='true'
								>
									<circle
										cx='12'
										cy='12'
										r='9'
										stroke='currentColor'
										strokeWidth='1.5'
									/>

									<path
										d='M12 7v5l3 2'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>

								<p className='text-xs leading-5 text-slate-400'>
									Your verification code expires in 3 minutes.
									Never share it with anyone.
								</p>
							</div>
						</div>

						{/* error message */}
						{serverError && (
							<div
								role='alert'
								className='rounded-lg border border-rose-400/20 bg-rose-500/10 px-3.5 py-3 text-xs leading-5 text-rose-300'
							>
								{serverError}
							</div>
						)}

						{/* success message */}
						{successMessage && (
							<div
								role='status'
								className='rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-3 text-xs leading-5 text-emerald-300'
							>
								{successMessage}
							</div>
						)}

						{/* Verify button */}
						<button
							type='submit'
							disabled={isSubmitting}
							className='group inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
						>
							{isSubmitting ? 'Verifying...' : 'Verify email'}
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5'
								aria-hidden='true'
							>
								<path
									d='m5 12 4 4L19 6'
									stroke='currentColor'
									strokeWidth='1.7'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</form>

					{/* Resend verification */}
					<div className='my-5 border-t border-slate-800/80' />

					<div className='flex items-center justify-between'>
						{/* resend verification code */}
						<div className='flex items-center justify-center gap-1'>
							<p className='text-xs text-slate-400'>
								Didn't receive the email?
							</p>
							<button
								type='button'
								onClick={handleResend}
								disabled={cooldown > 0 || isResending}
								className='text-sm font-medium text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 cursor-pointer disabled:cursor-not-allowed disabled:text-slate-500'
							>
								{isResending
									? 'Sending...'
									: cooldown > 0
										? `Resend in ${cooldown}s`
										: 'Resend verification code'}
							</button>
						</div>

						{/* Back to signup */}
						<div className=''>
							<Link
								href='/signup'
								className='text-sm text-slate-400 transition-colors hover:text-white'
							>
								Back to signup
							</Link>
						</div>
					</div>
				</section>
				<p className='mt-5 text-center text-xs text-slate-500'>
					AI-powered preparation for your next opportunity.
				</p>
			</div>
		</main>
	)
}