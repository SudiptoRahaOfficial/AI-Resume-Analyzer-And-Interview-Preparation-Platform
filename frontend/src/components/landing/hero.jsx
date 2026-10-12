'use client'

import Link from 'next/link'
import ArrowRightIcon from '@/components/common/ArrowRightIcon'

export default function Hero() {
	return (
		<section className='relative isolate overflow-hidden bg-slate-950 text-slate-300'>
			{/* Background glow effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl' />
				<div className='absolute right-0 top-1/3 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			<div className='mx-auto flex w-full max-w-[1600px] items-center justify-center px-4 pt-12 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20 xl:px-16'>
				<div className='w-full max-w-6xl text-center'>
					{/* Announcement badge */}
					<div className='mb-7 flex justify-center'>
						<span className='inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300'>
							<span className='h-2 w-2 rounded-full bg-indigo-400' />
							AI-Powered Interview Preparation Platform
						</span>
					</div>

					{/* Main heading */}
					<h1 className='mb-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl'>
						Master Your Next Interview with{' '}
						<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
							AI
						</span>
					</h1>

					{/* Description */}
					<p className='mx-auto mb-10 max-w-3xl text-base leading-8 text-slate-400 sm:text-lg'>
						Turn your experience into opportunity with AI-powered
						interview preparation and ATS-friendly resumes. Discover
						skill gaps, practice job-specific interview questions,
						and follow a personalized preparation plan tailored to
						your target role.
					</p>

					{/* Call-to-action buttons */}
					<div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
						<Link
							href='/signup'
							className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto'
						>
							Start Your Preparation
							<ArrowRightIcon />
						</Link>

						<Link
							href='#how-it-works'
							className='inline-flex w-full items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-7 py-3.5 text-base font-semibold text-slate-200 transition-colors duration-200 hover:border-slate-600 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:w-auto'
						>
							Explore How It Works
						</Link>
					</div>

					{/* Supporting information */}
					<div className='mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-500'>
						<span className='inline-flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='text-indigo-400'
								aria-hidden='true'
							>
								<path d='M20 6 9 17l-5-5' />
							</svg>
							Personalized Interview Guides
						</span>

						<span className='inline-flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='text-indigo-400'
								aria-hidden='true'
							>
								<path d='M20 6 9 17l-5-5' />
							</svg>
							ATS-Friendly Resumes
						</span>
					</div>
				</div>
			</div>
		</section>
	)
}