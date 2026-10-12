'use client'

import Link from 'next/link'
import ArrowRightIcon from '@/components/common/ArrowRightIcon'
import CheckIcon from '@/components/common/CheckIcon'

const plans = [
	{
		id: 'free',
		name: 'Free',
		description: 'Explore AI-powered career preparation.',
		price: '$0',
		period: 'forever',
		badge: null,
		features: [
			'AI interview preparation',
			'Job-specific interview questions',
			'Basic skill gap analysis',
			'Personalized preparation plan',
			'Limited resume analysis',
		],
		limitations: ['Limited AI generations', 'Basic resume optimization'],
		cta: 'Get Started Free',
		href: '/signup',
		highlighted: false,
	},
	{
		id: 'pro',
		name: 'Pro',
		description: 'Prepare smarter and stand out to employers.',
		price: '$12',
		period: 'per month',
		badge: 'MOST POPULAR',
		features: [
			'Everything in Free',
			'More AI interview preparations',
			'Detailed technical and behavioral questions',
			'Advanced skill gap analysis',
			'AI-powered resume optimization',
			'ATS-focused resume improvements',
			'Download optimized resumes as PDF',
		],
		limitations: [],
		cta: 'Get Started with Pro',
		href: '/signup',
		highlighted: true,
	},
	{
		id: 'max',
		name: 'Max',
		description: 'Get more support throughout your job search.',
		price: '$25',
		period: 'per month',
		badge: null,
		features: [
			'Everything in Pro',
			'Higher AI usage limits',
			'More resume analyses and optimizations',
			'Extended interview preparation',
			'Multiple target job preparations',
			'More opportunities to refine your resume',
			'Priority access to new features',
		],
		limitations: [],
		cta: 'Choose Max',
		href: '/signup',
		highlighted: false,
	},
]

export default function Pricing() {
	return (
		<section
			id='pricing'
			aria-labelledby='pricing-heading'
			className='relative isolate overflow-hidden bg-slate-950 text-slate-300 pt-16 sm:pt-20 lg:pt-24'
		>
			{/* Background glow effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/8 blur-[120px]' />

				<div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/6 blur-[110px]' />
			</div>

			<div className='mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-16'>
				<div className='mx-auto max-w-6xl'>
					{/* Section heading */}
					<div className='mx-auto mb-12 max-w-3xl text-center sm:mb-16'>
						<h2
							id='pricing-heading'
							className='text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl'
						>
							Choose The Plan Which{' '}
							<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
								Suits You
							</span>
						</h2>

						<p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base sm:leading-8'>
							Whether you are exploring your options or actively
							preparing for your next opportunity, find a plan
							that fits your career goals.
						</p>
					</div>

					{/* Pricing cards */}
					<div className='grid grid-cols-1 items-stretch gap-6 md:grid-cols-3 md:gap-5 lg:gap-6'>
						{plans.map((plan) => (
							<article
								key={plan.id}
								className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-7 ${
									plan.highlighted
										? 'border-indigo-400/60 bg-slate-900/90 shadow-xl shadow-indigo-950/30 ring-1 ring-indigo-400/20'
										: 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
								}`}
							>
								{/* Recommended plan accent */}
								{plan.highlighted && (
									<div
										aria-hidden='true'
										className='absolute inset-x-0 top-0 h-px rounded-t-2xl bg-linear-to-r from-transparent via-indigo-400 to-transparent'
									/>
								)}

								{/* Plan header */}
								<div className='mb-6 flex min-h-7 items-center justify-between gap-3'>
									<h3 className='text-lg font-semibold text-white'>
										{plan.name}
									</h3>

									{plan.badge && (
										<span className='rounded-full bg-indigo-500/15 px-3 py-1 text-[10px] font-bold tracking-wider text-indigo-300'>
											{plan.badge}
										</span>
									)}
								</div>

								<p className='min-h-12 text-sm leading-6 text-slate-400'>
									{plan.description}
								</p>

								{/* Price */}
								<div className='mb-6 mt-5 border-b border-slate-800 pb-6'>
									<div className='flex items-baseline gap-2'>
										<span className='text-4xl font-bold tracking-tight text-white sm:text-5xl'>
											{plan.price}
										</span>

										<span className='text-sm text-slate-500'>
											{plan.period}
										</span>
									</div>
								</div>

								{/* CTA button */}
								<Link
									href={plan.href}
									className={`mb-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
										plan.highlighted
											? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:bg-indigo-400'
											: 'border border-slate-700 bg-slate-800/60 text-slate-200 hover:border-indigo-400/40 hover:bg-slate-800 hover:text-white'
									}`}
								>
									{plan.cta}
									<ArrowRightIcon />
								</Link>

								{/* Included features */}
								<div className='flex-1'>
									<p className='mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500'>
										What's included
									</p>

									<ul className='space-y-3.5'>
										{plan.features.map((feature) => (
											<li
												key={feature}
												className='flex items-start gap-3 text-sm leading-5 text-slate-300'
											>
												<CheckIcon className='mt-0.5 shrink-0 text-indigo-400' />
												<span>{feature}</span>
											</li>
										))}
									</ul>

									{plan.limitations.length > 0 && (
										<div className='mt-6 border-t border-slate-800 pt-5'>
											<p className='mb-3 text-xs font-medium text-slate-500'>
												Free plan limits
											</p>

											<ul className='space-y-3'>
												{plan.limitations.map(
													(limitation) => (
														<li
															key={limitation}
															className='flex items-start gap-3 text-sm leading-5 text-slate-500'
														>
															<span
																aria-hidden='true'
																className='mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-slate-700 text-[10px]'
															>
																!
															</span>
															<span>
																{limitation}
															</span>
														</li>
													),
												)}
											</ul>
										</div>
									)}
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}