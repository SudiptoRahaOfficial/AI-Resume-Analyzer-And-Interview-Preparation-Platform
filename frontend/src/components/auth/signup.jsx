'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Signup() {
	const router = useRouter()

	const [form, setForm] = useState({
		username: '',
		email: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleChange = (e) => {
		setForm((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('')

		const username = form.username.trim()
		const email = form.email.trim().toLowerCase()

		if (!username || !email || !form.password) {
			setError('All fields are required')
			return
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address')
			return
		}

		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

		if (!passwordRegex.test(form.password)) {
			setError(
				'Password must contain 8+ characters, uppercase, lowercase, number and special character',
			)
			return
		}

		setLoading(true)

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username,
						email,
						password: form.password,
					}),
				},
			)

			const data = await response.json()

			if (!response.ok) {
				throw new Error(data.message || 'Signup failed')
			}

			router.push(`/verify-email?email=${encodeURIComponent(email)}`)
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

			{/* Signup Card */}
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
							Create your account
						</h1>

						<p className='mt-2 text-sm leading-6 text-gray-400'>
							Get started with AI-powered resume analysis and
							interview preparation.
						</p>
					</div>

					{/* Form */}
					<form
						onSubmit={handleSubmit}
						className='space-y-5'
					>
						{/* Full Name */}
						<div>
							<label className='mb-2 block text-sm font-medium text-gray-300'>
								Username
							</label>

							<input
								type='text'
								name='name'
								placeholder='Enter username'
								value={form.name}
								onChange={handleChange}
								className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
							/>
						</div>

						{/* Email */}
						<div>
							<label className='mb-2 block text-sm font-medium text-gray-300'>
								Email Address
							</label>

							<input
								type='email'
								name='email'
								placeholder='Enter email address'
								value={form.email}
								onChange={handleChange}
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
								name='password'
								placeholder='Enter password'
								value={form.password}
								onChange={handleChange}
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
							{loading ? 'Creating Account...' : 'Create Account'}
						</button>
					</form>

					{/* Footer */}
					<div className='mt-7 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
						Already have an account?{' '}
						<button
							type='button'
							onClick={() => router.push('/auth/signin')}
							className='font-medium text-cyan-300 transition hover:text-cyan-200 cursor-pointer'
						>
							Sign In
						</button>
					</div>
				</div>

				<p className='mt-6 text-center text-xs text-gray-600'>
					By creating an account, you agree to our Terms and Privacy
					Policy.
				</p>
			</div>
		</main>
	)
}