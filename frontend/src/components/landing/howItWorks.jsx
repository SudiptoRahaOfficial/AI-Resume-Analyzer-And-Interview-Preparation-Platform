'use client'

const steps = [
	{
		number: '01',
		title: 'Upload Your Resume',
		description:
			'Share your current resume in PDF format so AI can understand your experience, education, technical skills, and professional background.',
		icon: (
			<>
				<path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
				<path d='m17 8-5-5-5 5' />
				<path d='M12 3v12' />
			</>
		),
	},
	{
		number: '02',
		title: 'Describe Yourself',
		description:
			'Tell us about your background, strengths, career goals, and relevant experience. Add context that may not be fully captured in your resume.',
		icon: (
			<>
				<circle
					cx='12'
					cy='8'
					r='4'
				/>
				<path d='M5 21v-2a7 7 0 0 1 14 0v2' />
				<path d='m16 11 2 2 4-4' />
			</>
		),
	},
	{
		number: '03',
		title: 'Add Your Target Job',
		description:
			'Paste the job description for the role you want. AI uses its requirements to understand the skills, qualifications, and experience the employer expects.',
		icon: (
			<>
				<rect
					x='3'
					y='4'
					width='18'
					height='16'
					rx='2'
				/>
				<path d='M7 8h10' />
				<path d='M7 12h10' />
				<path d='M7 16h6' />
			</>
		),
	},
]

const outcomes = [
	{
		id: 'interview',
		number: '01',
		label: 'INTERVIEW PREPARATION',
		title: 'Walk Into Interviews Prepared',
		description:
			'Get a personalized interview preparation report based on your background and the requirements of your target role.',
		benefits: [
			{
				title: 'Technical Questions',
				description:
					'Practice role-specific technical questions tailored to the target job.',
			},
			{
				title: 'Behavioral Questions',
				description:
					'Prepare for questions about your experience, decisions, and problem-solving.',
			},
			{
				title: 'Skill Gap Analysis',
				description:
					'Identify missing or underdeveloped skills compared with job requirements.',
			},
			{
				title: 'Day wise Preparation Plan',
				description:
					'Follow a day-by-day roadmap to focus your preparation effectively.',
			},
		],
		icon: (
			<>
				<path d='M12 3 4 7v5c0 5 3.4 7.9 8 9 4.6-1.1 8-4 8-9V7l-8-4Z' />
				<path d='m9 12 2 2 4-4' />
			</>
		),
	},
	{
		id: 'resume',
		number: '02',
		label: 'RESUME OPTIMIZATION',
		title: 'Build an ATS-Friendly Resume',
		description:
			'Turn your existing experience into a job-targeted resume that clearly communicates your qualifications and aligns with the target role.',
		benefits: [
			{
				title: 'Job-Relevant Content',
				description:
					'Highlight your relevant experience, skills, and qualifications.',
			},
			{
				title: 'ATS-Friendly Structure',
				description:
					'Generate a clean, readable resume designed for applicant tracking systems.',
			},
			{
				title: 'Targeted Optimization',
				description:
					'Align your resume content with the target job without inventing qualifications.',
			},
			{
				title: 'Download Your Resume',
				description:
					'Export your optimized resume as a PDF for job applications.',
			},
		],
		icon: (
			<>
				<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
				<path d='M14 2v6h6' />
				<path d='M8 13h8' />
				<path d='M8 17h5' />
				<path d='m8 9 1 1 2-2' />
			</>
		),
	},
]

function Icon({ children, size = 22, className = '' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.7'
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'
			className={className}
		>
			{children}
		</svg>
	)
}

export default function HowItWorks() {
	return (
		<section
			id='how-it-works'
			aria-labelledby='how-it-works-heading'
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
					<div className='mx-auto mb-10 max-w-4xl text-center sm:mb-12'>
						<h2
							id='how-it-works-heading'
							className='text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl'
						>
							How{' '}
							<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
								ResumeAI Works
							</span>
						</h2>

						<p className='mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-400 sm:mt-5 sm:text-base sm:leading-7'>
							Share your resume, tell us about yourself, and add
							your target job description. Get personalized
							interview preparation or an ATS-friendly resume
							tailored to your career goals.
						</p>
					</div>

					{/* Input steps */}
					<div className='relative'>
						{/* Connecting line */}
						<div
							aria-hidden='true'
							className='absolute left-6 top-10 hidden h-px w-[calc(100%-3rem)] bg-linear-to-r from-indigo-500/10 via-indigo-400/40 to-blue-500/10 md:block'
						/>

						<div className='grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5'>
							{steps.map((step) => (
								<article
									key={step.number}
									className='group relative rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/30 hover:bg-slate-900/70 sm:p-6'
								>
									{/* Step icon */}
									<div className='mb-5 flex items-center justify-between'>
										<div className='flex h-11 w-11 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 transition-colors duration-300 group-hover:bg-indigo-500/20'>
											<Icon>{step.icon}</Icon>
										</div>

										<span className='text-sm font-semibold tracking-widest text-slate-600 transition-colors group-hover:text-indigo-400'>
											{step.number}
										</span>
									</div>

									<h3 className='mb-2 text-lg font-semibold text-white'>
										{step.title}
									</h3>

									<p className='text-sm leading-6 text-slate-400'>
										{step.description}
									</p>
								</article>
							))}
						</div>
					</div>
					{/* Transition */}
					<div className='flex flex-col items-center pt-4 sm:pt-6 pb-6 sm:pb-8'>
						<div className='flex h-10 w-10 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-400'>
							<Icon size={20}>
								<path d='M12 5v14' />
								<path d='m19 12-7 7-7-7' />
							</Icon>
						</div>
						<p className='text-center text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mt-3'>
							AI analyzes your profile against your target role
							and provides
						</p>
					</div>
					{/* Feature outcomes */}
					<div className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8'>
						{outcomes.map((outcome) => (
							<article
								key={outcome.id}
								className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-slate-900/70 sm:p-6'
							>
								{/* Hover accent */}
								<div
									aria-hidden='true'
									className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100'
								/>

								{/* Outcome heading */}
								<div className='mb-5 flex items-start gap-3'>
									<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-400'>
										<Icon>{outcome.icon}</Icon>
									</div>

									<div className='min-w-0 flex-1'>
										<span className='text-[10px] font-semibold tracking-[0.16em] text-indigo-400 sm:text-xs'>
											{outcome.label}
										</span>

										<h4 className='mt-1.5 text-lg font-semibold leading-snug text-white transition-colors duration-300 group-hover:text-indigo-300 sm:text-xl'>
											{outcome.title}
										</h4>
									</div>

									<span className='text-xs font-semibold text-slate-600'>
										{outcome.number}
									</span>
								</div>

								<p className='mb-5 text-sm leading-6 text-slate-400'>
									{outcome.description}
								</p>

								{/* Deliverables */}
								<ul className='space-y-4'>
									{outcome.benefits.map((benefit) => (
										<li
											key={benefit.title}
											className='flex items-start gap-3'
										>
											<span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400'>
												<Icon size={13}>
													<path d='m5 12 4 4L19 6' />
												</Icon>
											</span>

											<div className='min-w-0'>
												<h5 className='text-sm font-medium text-slate-200'>
													{benefit.title}
												</h5>

												<p className='mt-1 text-xs leading-5 text-slate-400 sm:text-sm'>
													{benefit.description}
												</p>
											</div>
										</li>
									))}
								</ul>

								{/* Bottom accent */}
								<div className='mt-6 border-t border-slate-800/80 pt-4'>
									<div className='flex items-center gap-2 text-xs font-medium text-indigo-300'>
										<Icon size={15}>
											{outcome.id === 'interview' ? (
												<>
													<circle
														cx='12'
														cy='12'
														r='10'
													/>
													<path d='m9 12 2 2 4-4' />
												</>
											) : (
												<>
													<path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
													<path d='m7 10 5 5 5-5' />
													<path d='M12 15V3' />
												</>
											)}
										</Icon>

										{outcome.id === 'interview'
											? 'A personalized interview preparation report'
											: 'A downloadable, ATS-friendly PDF resume'}
									</div>
								</div>
							</article>
						))}
					</div>
					{/* Closing message */}
					<div className='mx-auto mt-10 max-w-2xl text-center sm:mt-12'>
						<p className='text-sm leading-7 text-slate-400 sm:text-base'>
							Use the same three inputs to prepare for interviews
							or create a more relevant resume
							<br />
							<span className='font-medium text-white'>
								Take the next step in your career with ResumeAI.
							</span>
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}