'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function NotFound() {
	const router = useRouter()

	const handleGoBack = () => {
		if (window.history.length > 1) {
			router.back()
		} else {
			router.push('/')
		}
	}

	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-16 text-slate-300'>
			{/* Subtle background accent */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/4 blur-3xl'
			/>

			{/* Main content */}
			<section className='relative w-full max-w-xl text-center'>
				{/* Error code */}
				<div className='mb-6'>
					<p className='text-7xl font-bold tracking-widest text-indigo-400'>
						404
					</p>
				</div>

				{/* Heading and description */}
				<div className='space-y-4'>
					<h1 className='text-3xl font-semibold tracking-tight text-white sm:text-4xl'>
						We couldn&apos;t find that page
					</h1>

					<p className='mx-auto max-w-md text-sm leading-7 text-slate-400 sm:text-base'>
						The page you&apos;re looking for doesn&apos;t exist or
						may have been moved. Check the URL or return to your
						ResumeAI workspace.
					</p>
				</div>

				{/* Divider */}
				<div className='mx-auto my-8 h-px w-16 bg-slate-800' />

				{/* Actions */}
				<div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
					<Link
						href='/'
						className='inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:w-auto'
					>
						Return to Home
					</Link>

					<button
						type='button'
						onClick={handleGoBack}
						className='inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-slate-800 px-6 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-slate-700 hover:bg-slate-900 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:w-auto cursor-pointer'
					>
						Go Back
					</button>
				</div>

				{/* Footer */}
				<p className='mt-10 text-xs text-slate-600'>
					ResumeAI
					<span
						aria-hidden='true'
						className='mx-2 text-slate-700'
					>
						/
					</span>
					Your next career move starts here.
				</p>
			</section>
		</main>
	)
}