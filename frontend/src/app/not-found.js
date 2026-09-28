'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
	const router = useRouter()

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			{/* 404 Card */}
			<div className='relative z-10 w-full max-w-lg rounded-xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-xl'>
				{/* 404 */}
				<p className='text-sm font-medium uppercase tracking-[0.3em] text-cyan-400'>
					Error 404
				</p>

				<h1 className='mt-3 text-6xl font-bold tracking-tight'>
					Page Not Found
				</h1>

				<p className='mt-5 leading-7 text-gray-400'>
					The page you're looking for doesn't exist, may have been
					moved, or the URL is incorrect.
				</p>

				{/* Actions */}
				<div className='mt-10 flex flex-col gap-3 sm:flex-row'>
					<button
						onClick={() => router.push('/')}
						className='flex-1 rounded-md bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300'
					>
						Go Home
					</button>

					<button
						onClick={() => router.back()}
						className='flex-1 rounded-md border border-white/10 px-5 py-3 font-medium text-gray-300 transition hover:bg-white/5 hover:text-white'
					>
						Go Back
					</button>
				</div>

				<div className='mt-8 border-t border-white/10 pt-6'>
					<h2 className='text-lg font-semibold'>ResumeAI</h2>

					<p className='mt-2 text-sm text-gray-500'>
						AI-Powered Interview Preparation Platform
					</p>
				</div>
			</div>
		</main>
	)
}