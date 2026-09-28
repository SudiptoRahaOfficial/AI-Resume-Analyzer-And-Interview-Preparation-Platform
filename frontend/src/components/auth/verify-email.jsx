// making client component
'use client'

// importing dependencis
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function VerifyEmail() {
	// router for page navigation
	const router = useRouter()

	// email extraction
	const searchParams = useSearchParams()
	const email = searchParams.get('email')
	useEffect(() => {
		if (!email) {
			router.replace('/auth/signup')
		}
	}, [email])

	// extracting from custom useAuth hook
	const { handleVerifyEmail, handleResendOTP, loading } = useAuth()

	// required states
	const [otp, setOtp] = useState('')
	const [error, setError] = useState('')
	const [message, setMessage] = useState('')

	// function for handle submit
	const handleSubmit = async (e) => {
		e.preventDefault()

		setError('')
		setMessage('')

		try {
			await handleVerifyEmail({
				email,
				otp,
			})

			router.push('/auth/signin')
		} catch (err) {
			setError(err.message)
		}
	}

	// function for handle resend
	const handleResend = async () => {
		setError('')
		setMessage('')

		try {
			const data = await handleResendOTP(email)

			setMessage(data.message)
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 py-12 text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			<div className='relative z-10 w-full max-w-xl'>
				{/* Brand */}
				<div className='mb-8 text-center'>
					<button
						onClick={() => router.push('/')}
						className='cursor-pointer text-3xl font-semibold tracking-tight transition hover:text-cyan-300'
					>
						ResumeAI
					</button>

					<p className='mt-2 text-sm text-gray-500'>
						AI-Powered Interview Preparation Platform
					</p>
				</div>

				{/* Card */}
				<div className='rounded-lg border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-xl'>
					{/* Header */}
					<div className='mb-8'>
						<div className='mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
							<svg
								className='h-7 w-7 text-cyan-300'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.8'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z'
								/>
							</svg>
						</div>

						<h1 className='text-2xl font-semibold tracking-tight'>
							Verify your email
						</h1>

						<p className='mt-2 text-sm leading-6 text-gray-400'>
							Enter the 6-digit verification code we sent to your
							email address. The code expires in 3 minutes.
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className='space-y-5'
					>
						{/* Email */}
						<div>
							<label className='mb-2 block text-sm font-medium text-gray-300'>
								Email Address
							</label>

							<input
								type='email'
								value={email}
								disabled
								className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
							/>
						</div>

						{/* OTP */}
						<div>
							<label className='mb-2 block text-sm font-medium text-gray-300'>
								Verification Code
							</label>

							<input
								type='text'
								inputMode='numeric'
								maxLength={6}
								placeholder='000000'
								value={otp}
								onChange={(e) =>
									setOtp(e.target.value.replace(/\D/g, ''))
								}
								className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-center text-lg tracking-[0.35em] text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
							/>
						</div>

						{/* error */}
						{error && (
							<div className='rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300'>
								{error}
							</div>
						)}

						{message && (
							<div className='rounded-md border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300'>
								{message}
							</div>
						)}

						{/* Submit */}
						<button
							type='submit'
							disabled={loading}
							className='w-full cursor-pointer rounded-md bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10'
						>
							{loading ? 'Verifying...' : 'Verify Email'}
						</button>
					</form>

					{/* Divider */}
					<div className='my-6 border-t border-white/10' />

					{/* Resend */}
					<div className='space-y-3 text-center'>
						<p className='text-sm text-gray-500'>
							Didn&apos;t receive the code?
						</p>

						<button
							type='button'
							onClick={handleResend}
							disabled={loading}
							className='w-full cursor-pointer rounded-md border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-cyan-300 transition hover:bg-white/10 hover:text-cyan-200'
						>
							{loading
								? 'Sending...'
								: 'Resend Verification Code'}
						</button>
					</div>

					{/* Back */}
					<div className='mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
						Wrong email?{' '}
						<button
							onClick={() => router.push('/auth/signup')}
							className='cursor-pointer font-medium text-cyan-300 transition hover:text-cyan-200'
						>
							Create another account
						</button>
					</div>
				</div>

				<p className='mt-6 text-center text-xs text-gray-600'>
					Protecting your account with secure email verification.
				</p>
			</div>
		</main>
	)
}