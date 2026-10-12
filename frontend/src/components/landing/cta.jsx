'use client'

import Link from 'next/link'
import ArrowRightIcon from '@/components/common/ArrowRightIcon'

export default function CTA() {
	return (
		<section
			id='cta'
			aria-labelledby='cta-heading'
			className='relative isolate overflow-hidden bg-slate-950 text-slate-300 pt-16 sm:pt-20 lg:pt-24'
		>
			{/* Background glow effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-[120px]' />

				<div className='absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-500/[0.07] blur-[100px]' />
			</div>

			{/* CTA content */}
			<div className='mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-16'>
				<div className='relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-indigo-400/20 bg-slate-900/60 px-6 py-10 shadow-2xl shadow-indigo-950/20 sm:px-10 sm:py-12 lg:px-14 lg:py-14'>
					{/* Decorative accent */}
					<div
						aria-hidden='true'
						className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/70 to-transparent'
					/>

					<div className='flex flex-col items-start gap-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10'>
						{/* Heading and description */}
						<div className='min-w-0 flex-1'>
							<span className='mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300'>
								<span
									aria-hidden='true'
									className='h-1.5 w-1.5 rounded-full bg-indigo-400'
								/>
								YOUR NEXT CAREER MOVE
							</span>

							<h2
								id='cta-heading'
								className='max-w-2xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl'
							>
								Your Next Opportunity Starts with{' '}
								<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
									Better Preparation.
								</span>
							</h2>

							<p className='mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base'>
								Get job-specific interview questions, uncover
								skill gaps, and optimize your resume with
								AI-powered insights tailored to your target
								role.
							</p>
						</div>

						{/* Call-to-action */}
						<div className='flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:items-start'>
							<Link
								href='/signup'
								className='inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto'
							>
								Get Started for Free
								<ArrowRightIcon />
							</Link>

							<p className='text-center text-xs leading-5 text-slate-500 sm:text-left'>
								Start preparing for your next opportunity.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}