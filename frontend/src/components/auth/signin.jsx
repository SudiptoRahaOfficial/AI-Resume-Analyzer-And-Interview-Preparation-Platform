'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signin() {
	const router = useRouter()

	const [identifier, setIdentifier] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		const value = identifier.trim()

		if (!value || !password) {
			setError('Username or email and password are required')
			return
		}

		setLoading(true)

		try {
			const isEmail = value.includes('@')

			const payload = isEmail
				? { email: value.toLowerCase(), password }
				: { username: value, password }

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signin`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
					body: JSON.stringify(payload),
				},
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || 'Signin failed')
			}

			localStorage.setItem('accessToken', data.accessToken)

			router.push('/dashboard')
		} catch (err) {
			setError(err.message)
		} finally {
			setLoading(false)
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

							<input
								type='password'
								placeholder='Enter password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
							/>
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