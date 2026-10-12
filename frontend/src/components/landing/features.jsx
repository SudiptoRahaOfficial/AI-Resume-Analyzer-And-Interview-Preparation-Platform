'use client'

import InterviewIcon from '@/components/landing/landing-icons/InterviewIcon'
import ResumeIcon from '@/components/landing/landing-icons/ResumeIcon'
import ArrowRightIcon from '@/components/landing/landing-icons/ArrowRightIcon'

const features = [
	{
		id: 'interview-preparation',
		number: '01',
		title: 'AI Interview Preparation Guide',
		description:
			'Prepare for your next interview with job-specific technical and behavioral questions, identify skill gaps, and follow a personalized day wise preparation plan tailored to your target role.',
		href: '#how-it-works',
		icon: <InterviewIcon />,
	},
	{
		id: 'resume-optimization',
		number: '02',
		title: 'AI Resume Analysis & ATS Optimization',
		description:
			'Tailor your resume to any job description in seconds. Generate a professional, ATS-friendly resume tailored to your target role, uncover missing keywords, and download a job-ready PDF instantly.',
		href: '#how-it-works',
		icon: <ResumeIcon />,
	},
]

export default function Features() {
	return (
		<section
			id='features'
			aria-labelledby='features-heading'
			className='relative isolate overflow-hidden bg-slate-950 text-slate-300 pt-16 sm:pt-20 lg:pt-24'
		>
			{/* Background glow */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute left-1/2 top-40 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-500/[0.07] blur-[120px]' />
				<div className='absolute bottom-20 right-0 h-72 w-72 rounded-full bg-blue-500/5 blur-[120px]' />
			</div>

			<div className='mx-auto w-full max-w-[1600px] px-4 sm:px-8 lg:px-12 xl:px-16'>
				<div className='mx-auto max-w-6xl'>
					{/* Section heading */}
					<div className='mx-auto mb-10 max-w-3xl text-center sm:mb-12'>
						<h2
							id='features-heading'
							className='text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl'
						>
							Everything You Need to{' '}
							<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
								Stand Out
							</span>
						</h2>

						<p className='mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:mt-5 sm:text-base sm:leading-8'>
							From optimizing your resume to preparing for
							job-specific interviews, get the AI-powered guidance
							you need to move forward with confidence.
						</p>
					</div>

					{/* Feature cards */}
					<div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
						{features.map((feature) => (
							<article
								key={feature.id}
								className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-4.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-slate-900/70 sm:flex-row sm:gap-4 sm:p-5'
							>
								{/* Hover accent */}
								<div
									aria-hidden='true'
									className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'
								/>

								{/* Icon */}
								<div className='mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 transition-colors duration-300 group-hover:bg-indigo-500/20 sm:mb-0 sm:h-11 sm:w-11'>
									{feature.icon}
								</div>

								{/* Content */}
								<div className='flex min-w-0 grow flex-col'>
									<span className='mb-2 text-[10px] font-semibold tracking-[0.18em] text-indigo-400 sm:text-xs'>
										FEATURE {feature.number}
									</span>

									<h3 className='mb-2.5 text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-indigo-300 sm:text-xl'>
										{feature.title}
									</h3>

									<p className='grow text-sm leading-6 text-slate-400'>
										{feature.description}
									</p>

									<a
										href={feature.href}
										className='mt-3 inline-flex w-fit items-center gap-2 text-sm font-semibold text-indigo-400 transition-colors hover:text-indigo-300 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400'
									>
										Learn More
										<ArrowRightIcon />
									</a>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
