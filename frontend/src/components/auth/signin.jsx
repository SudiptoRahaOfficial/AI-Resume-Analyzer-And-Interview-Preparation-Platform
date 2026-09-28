// making client component
'use client'

// importing dependencis
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'

export default function Signin() {
	// router for page navigation
	const router = useRouter()

	// extracting from custom useAuth hook
	const { handleSignin, loading } = useAuth()

	// required states
	const [identifier, setIdentifier] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [error, setError] = useState('')

	// function for handle submit
	const handleSubmit = async (e) => {
		e.preventDefault()

		setError('')

		const isEmail = identifier.includes('@')

		try {
			await handleSignin({
				username: isEmail ? undefined : identifier,
				email: isEmail ? identifier : undefined,
				password,
			})

			router.push('/dashboard')
		} catch (err) {
			if (err.message === 'Email not verified' && isEmail) {
				router.push(
					`/auth/verify-email?email=${encodeURIComponent(identifier)}`,
				)
				return
			}

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

			{/* Signin Card */}
			<div className='relative z-10 w-full max-w-xl'>
				{/* Brand */}
				<div className='mb-8 text-center'>
					<button
						type='button'
						onClick={() => router.push('/')}
						className='text-3xl font-semibold tracking-tight text-white transition hover:text-cyan-300 cursor-pointer'
					>
						ResumeAI
					</button>

					<p className='mt-2 text-sm text-gray-500'>
						AI-Powered Interview Preparation Platform
					</p>
				</div>

				<div className='rounded-lg border border-white/10 bg-white/3 p-8 shadow-2xl backdrop-blur-xl'>
					{/* Header */}
					<div className='mb-8'>
						<h1 className='text-2xl font-semibold tracking-tight text-white'>
							Welcome back
						</h1>

						<p className='mt-2 text-sm leading-6 text-gray-400'>
							Sign in to continue to your resume analysis and
							interview preparation workspace.
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className='space-y-5'
					>
						{/* Identifier */}
						<div>
							<label className='mb-2 block text-sm font-medium text-gray-300'>
								Username or Email
							</label>

							<input
								type='text'
								placeholder='Enter username or email'
								value={identifier}
								onChange={(e) => setIdentifier(e.target.value)}
								className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
							/>
						</div>

						{/* Password */}
						<div>
							<label className='mb-2 block text-sm font-medium text-gray-300'>
								Password
							</label>

							<div className='relative'>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder='Enter password'
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
									className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 pr-12 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
								/>

								<button
									type='button'
									onClick={() =>
										setShowPassword((prev) => !prev)
									}
									aria-label={
										showPassword
											? 'Hide password'
											: 'Show password'
									}
									className='absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 transition hover:text-cyan-300 cursor-pointer'
								>
									{showPassword ? (
										<EyeOff size={18} />
									) : (
										<Eye size={18} />
									)}
								</button>
							</div>
						</div>

						{/* Error */}
						{error && (
							<div className='rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-5 text-red-300'>
								{error}
							</div>
						)}

						{/* Submit */}
						<button
							type='submit'
							disabled={loading}
							className='w-full rounded-md bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer'
						>
							{loading ? 'Signing In...' : 'Sign In'}
						</button>
					</form>

					{/* Footer */}
					<div className='mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
						Don't have an account?{' '}
						<button
							type='button'
							onClick={() => router.push('/auth/signup')}
							className='font-medium text-cyan-300 transition hover:text-cyan-200 cursor-pointer'
						>
							Create Account
						</button>
					</div>
				</div>

				<p className='mt-6 text-center text-xs text-gray-600'>
					Secure access to your ResumeAI workspace.
				</p>
			</div>
		</main>
	)
}