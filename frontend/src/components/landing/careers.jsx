import Link from 'next/link'

export default function Careers() {
	// dummy data | it should comes from api
	const positions = [
		{
			id: 1,
			title: 'Backend Engineer',
			type: 'Full-time',
			location: 'Remote',
			description:
				'Build and maintain scalable REST APIs, design efficient database schemas, and develop secure backend services that power ResumeAI’s AI-driven career tools.',
			applicationUrl: '/contact',
		},
		{
			id: 2,
			title: 'Frontend Engineer',
			type: 'Full-time',
			location: 'Remote',
			description:
				'Develop responsive, accessible, and intuitive user interfaces using React and Next.js while collaborating with the team to deliver a seamless user experience.',
			applicationUrl: '/contact',
		},
	]

	return (
		<main className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-300'>
			{/* Open positions */}
			<section
				id='open-positions'
				className='relative mx-auto max-w-7xl scroll-mt-24 px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24'
			>
				{/* Background glow effects */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
				>
					<div className='absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[120px]' />

					<div className='absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/6 blur-[110px]' />
				</div>

				{/* Page heading */}
				<div className='mx-auto mb-12 max-w-3xl text-center sm:mb-16'>
					<h2
						id='faq-heading'
						className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'
					>
						Career Opportunities In
						<span className='ml-2 bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
							ResumeAI
						</span>
					</h2>

					<p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base'>
						Interested in building the next generation of career
						tools with us? Reach out with your career questions,
						feedback, or suggestions and let's start a conversation.
					</p>
				</div>

				{positions.length > 0 ? (
					<div className='mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2'>
						{positions.map((position) => (
							<article
								key={position.id}
								className='rounded-2xl border border-white/10 bg-white/3 p-7 transition-colors hover:border-indigo-400/30'
							>
								<div className='flex flex-wrap items-center justify-between gap-3'>
									<span className='rounded-full border border-indigo-400/20 bg-indigo-400/8 px-3 py-1 text-xs font-medium text-indigo-300'>
										{position.type}
									</span>

									<span className='text-xs text-slate-500'>
										{position.location}
									</span>
								</div>

								<h3 className='mt-5 text-xl font-semibold text-white'>
									{position.title}
								</h3>

								<p className='mt-3 text-sm leading-7 text-slate-400'>
									{position.description}
								</p>

								<a
									href={position.applicationUrl}
									className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200'
								>
									Apply for this role
									<span aria-hidden='true'>→</span>
								</a>
							</article>
						))}
					</div>
				) : (
					<div className='mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white/2 px-6 py-8 text-center sm:px-10 sm:py-9'>
						{/* Icon */}
						<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/8 text-indigo-300'>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
								aria-hidden='true'
								className='h-6 w-6'
							>
								<rect
									x='3'
									y='7'
									width='18'
									height='14'
									rx='2'
								/>
								<path d='M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
								<path d='M3 12h18' />
								<path d='M10 12v2h4v-2' />
							</svg>
						</div>

						{/* Content */}
						<h3 className='mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl'>
							No Open Positions
						</h3>

						<p className='mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400'>
							There are no open positions at the moment. Please
							check back later for future opportunities to join
							the ResumeAI team.
						</p>

						{/* Action */}
						<Link
							href='/contact'
							className='mt-5 inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/4 px-4 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:border-indigo-400/30 hover:bg-indigo-400/10 hover:text-white'
						>
							Get in Touch
							<svg
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.8'
								strokeLinecap='round'
								strokeLinejoin='round'
								aria-hidden='true'
								className='h-4 w-4'
							>
								<path d='M7 17 17 7' />
								<path d='M7 7h10v10' />
							</svg>
						</Link>
					</div>
				)}
			</section>
		</main>
	)
}