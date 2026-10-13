import Link from 'next/link'

function ChevronIcon({ size = 18, className = '' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={1.7}
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
			aria-hidden={true}
		>
			<path d='m9 18 6-6-6-6' />
		</svg>
	)
}

export default function Profile() {
	const profile = {
		firstName: 'Sudipto',
		lastName: 'Raha',
		profession: 'Backend Developer',
		bio: 'Backend developer building production-ready applications',
		phone: '+8801712345678',
		location: {
			city: 'Dhaka',
			country: 'Bangladesh',
		},
		experience: 2,
		skills: ['JavaScript', 'Node.js', 'Express.js', 'MongoDB'],
		socialLinks: [
			{
				platform: 'GitHub',
				url: 'https://github.com',
			},
			{
				platform: 'LinkedIn',
				url: 'https://linkedin.com',
			},
		],
	}

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10'>
			<div className='mx-auto max-w-5xl'>
				<div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
					<div>
						<div className='mb-2 flex items-center gap-2 text-sm text-slate-500'>
							<Link
								href='/dashboard'
								className='transition-colors hover:text-slate-300'
							>
								Dashboard
							</Link>
							<ChevronIcon />
							<span className='text-indigo-400'>Profile</span>
						</div>

						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							My profile
						</h1>

						<p className='mt-2 text-sm text-slate-400'>
							Your professional identity in one place.
						</p>
					</div>

					<Link
						href='/dashboard/profile/update-profile'
						className='inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-700 bg-slate-900/60 px-4 text-xs font-semibold text-slate-200 transition-colors hover:border-indigo-400/30 hover:bg-slate-800 sm:self-auto'
					>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-4 w-4'
							aria-hidden='true'
						>
							<path
								d='m14 5 5 5M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Edit profile
					</Link>
				</div>

				<section className='relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-8'>
					<div
						aria-hidden='true'
						className='pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-indigo-500/8 blur-[100px]'
					/>

					<div className='relative flex flex-col gap-5 sm:flex-row sm:items-center'>
						<div className='flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-2xl font-semibold text-indigo-300'>
							{profile.firstName[0]}
							{profile.lastName[0]}
						</div>

						<div className='min-w-0 flex-1'>
							<h2 className='text-xl font-semibold tracking-tight text-white'>
								{profile.firstName} {profile.lastName}
							</h2>

							<p className='mt-1 text-sm font-medium text-indigo-300'>
								{profile.profession}
							</p>

							<div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400'>
								<span className='inline-flex items-center gap-1.5'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4 text-slate-500'
										aria-hidden='true'
									>
										<path
											d='M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z'
											stroke='currentColor'
											strokeWidth='1.5'
										/>
										<circle
											cx='12'
											cy='10'
											r='2.5'
											stroke='currentColor'
											strokeWidth='1.5'
										/>
									</svg>
									{profile.location.city},{' '}
									{profile.location.country}
								</span>

								<span className='inline-flex items-center gap-1.5'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4 text-slate-500'
										aria-hidden='true'
									>
										<circle
											cx='12'
											cy='12'
											r='9'
											stroke='currentColor'
											strokeWidth='1.5'
										/>
										<path
											d='M12 7v5l3 2'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
									{profile.experience}{' '}
									{profile.experience === 1
										? 'year'
										: 'years'}{' '}
									of experience
								</span>
							</div>
						</div>

						<div className='inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300'>
							<span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
							Profile overview
						</div>
					</div>
				</section>

				<div className='mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]'>
					<div className='space-y-5'>
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4'
										aria-hidden='true'
									>
										<path
											d='M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</div>

								<h2 className='text-sm font-semibold text-white'>
									About me
								</h2>
							</div>

							<p className='text-sm leading-7 text-slate-400'>
								{profile.bio}
							</p>
						</section>

						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4'
										aria-hidden='true'
									>
										<path
											d='M4 7h16M4 12h16M4 17h10'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</div>

								<h2 className='text-sm font-semibold text-white'>
									Skills and expertise
								</h2>
							</div>

							<div className='flex flex-wrap gap-2'>
								{profile.skills.map((skill) => (
									<span
										key={skill}
										className='rounded-lg border border-slate-700/80 bg-slate-950/50 px-3 py-2 text-xs font-medium text-slate-300'
									>
										{skill}
									</span>
								))}
							</div>
						</section>
					</div>

					<div className='space-y-5'>
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<h2 className='mb-5 text-sm font-semibold text-white'>
								Contact information
							</h2>

							<div className='space-y-4'>
								<div className='flex items-start gap-3'>
									<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/70 text-slate-400'>
										<svg
											viewBox='0 0 24 24'
											fill='none'
											className='h-4 w-4'
											aria-hidden='true'
										>
											<rect
												x='3'
												y='5'
												width='18'
												height='14'
												rx='2'
												stroke='currentColor'
												strokeWidth='1.5'
											/>
											<path
												d='m4 7 8 6 8-6'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinejoin='round'
											/>
										</svg>
									</div>

									<div className='min-w-0'>
										<p className='text-xs text-slate-500'>
											Phone
										</p>
										<p className='mt-1 break-all text-sm text-slate-300'>
											{profile.phone}
										</p>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/70 text-slate-400'>
										<svg
											viewBox='0 0 24 24'
											fill='none'
											className='h-4 w-4'
											aria-hidden='true'
										>
											<path
												d='M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z'
												stroke='currentColor'
												strokeWidth='1.5'
											/>
											<circle
												cx='12'
												cy='10'
												r='2.5'
												stroke='currentColor'
												strokeWidth='1.5'
											/>
										</svg>
									</div>

									<div>
										<p className='text-xs text-slate-500'>
											Location
										</p>
										<p className='mt-1 text-sm text-slate-300'>
											{profile.location.city},{' '}
											{profile.location.country}
										</p>
									</div>
								</div>
							</div>
						</section>

						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<h2 className='mb-4 text-sm font-semibold text-white'>
								Professional links
							</h2>

							<div className='space-y-2'>
								{profile.socialLinks.map((link) => (
									<a
										key={link.platform}
										href={link.url}
										target='_blank'
										rel='noopener noreferrer'
										className='flex items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 px-3.5 py-3 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-400/30 hover:text-indigo-300'
									>
										<span>{link.platform}</span>

										<svg
											viewBox='0 0 24 24'
											fill='none'
											className='h-4 w-4 shrink-0 text-slate-500'
											aria-hidden='true'
										>
											<path
												d='M14 5h5v5m0-5-9 9'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
											<path
												d='M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinecap='round'
											/>
										</svg>
									</a>
								))}
							</div>
						</section>
					</div>
				</div>

				<div className='mt-6 rounded-xl border border-slate-800/70 bg-slate-900/20 px-4 py-4 sm:px-5'>
					<div className='flex items-center justify-center gap-2'>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-4 w-4 shrink-0 text-indigo-300'
							aria-hidden='true'
						>
							<path
								d='M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinejoin='round'
							/>
							<path
								d='m9 12 2 2 4-4'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<p className='text-center text-xs leading-5 text-slate-500'>
							Your account information is managed through your
							ResumeAI account.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}