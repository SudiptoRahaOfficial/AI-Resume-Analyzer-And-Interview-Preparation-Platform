// making client component
'use client'

// importing dependencis
import { useRouter } from 'next/navigation'

export default function Dashboard() {
	// router for page navigation
	const router = useRouter()

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			{/* Header */}
			<header className='relative z-20 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
				<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
					<button
						onClick={() => router.push('/')}
						className='text-lg font-semibold tracking-tight transition hover:text-cyan-300 cursor-pointer'
					>
						ResumeAI
					</button>

					<div className='flex items-center gap-3'>
						<button
							onClick={() => router.push('/settings')}
							className='rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
						>
							Settings
						</button>

						<button
							onClick={() => router.push('/profile')}
							className='flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/20 cursor-pointer'
						>
							SR
						</button>
					</div>
				</div>
			</header>

			<div className='relative z-10 mx-auto max-w-7xl px-6 py-10'>
				{/* Welcome */}
				<section className='mb-10'>
					<div className='rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'>
						<div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
							<div>
								<p className='text-sm font-medium uppercase tracking-wider text-cyan-400'>
									Dashboard
								</p>

								<h1 className='mt-2 text-4xl font-bold tracking-tight'>
									Welcome back, Sudipto 👋
								</h1>

								<p className='mt-4 max-w-2xl text-gray-400'>
									Manage your resumes, analyze job
									descriptions, identify skill gaps, and
									prepare for interviews from one workspace.
								</p>
							</div>

							<button className='rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'>
								+ Upload Resume
							</button>
						</div>
					</div>
				</section>

				{/* Stats */}
				<section className='mb-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
					<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<p className='text-sm text-gray-400'>Total Resumes</p>
						<h2 className='mt-3 text-3xl font-bold'>08</h2>
						<p className='mt-2 text-xs text-emerald-300'>
							+2 this month
						</p>
					</div>

					<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<p className='text-sm text-gray-400'>AI Analyses</p>
						<h2 className='mt-3 text-3xl font-bold'>23</h2>
						<p className='mt-2 text-xs text-cyan-300'>
							Resume insights generated
						</p>
					</div>

					<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<p className='text-sm text-gray-400'>Interview Sets</p>
						<h2 className='mt-3 text-3xl font-bold'>14</h2>
						<p className='mt-2 text-xs text-cyan-300'>
							Technical & behavioral
						</p>
					</div>

					<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<p className='text-sm text-gray-400'>ATS Score</p>
						<h2 className='mt-3 text-3xl font-bold text-cyan-400'>
							92%
						</h2>
						<p className='mt-2 text-xs text-emerald-300'>
							Excellent optimization
						</p>
					</div>
				</section>

				{/* Quick Actions */}
				<section className='mb-10'>
					<h2 className='mb-5 text-xl font-semibold'>
						Quick Actions
					</h2>

					<div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
						<div className='cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/8'>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 5v14m7-7H5'
									/>
								</svg>
							</div>

							<h3 className='font-semibold'>Upload Resume</h3>
							<p className='mt-2 text-sm text-gray-400'>
								Add a new PDF resume for AI analysis.
							</p>
						</div>

						<div className='cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/8'>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M14 3v5h5'
									/>
								</svg>
							</div>

							<h3 className='font-semibold'>Analyze Resume</h3>
							<p className='mt-2 text-sm text-gray-400'>
								Generate ATS and AI improvement reports.
							</p>
						</div>

						<div className='cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/8'>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M8 10h8M8 14h5M6 4h12a2 2 0 012 2v9a2 2 0 01-2 2H10l-4 3v-3H6a2 2 0 01-2-2V6a2 2 0 012-2z'
									/>
								</svg>
							</div>

							<h3 className='font-semibold'>Interview Prep</h3>
							<p className='mt-2 text-sm text-gray-400'>
								Create personalized interview questions.
							</p>
						</div>

						<div
							onClick={() => router.push('/settings')}
							className='cursor-pointer rounded-xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/30 hover:bg-white/8'
						>
							<div className='mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M10.325 4.317a1 1 0 011.35-.936l.99.396a1 1 0 00.88 0l.99-.396a1 1 0 011.35.936l.14 1.052a1 1 0 00.64.82l.99.396a1 1 0 01.57 1.27l-.396.99a1 1 0 000 .88l.396.99a1 1 0 01-.57 1.27l-.99.396a1 1 0 00-.64.82l-.14 1.052a1 1 0 01-1.35.936l-.99-.396a1 1 0 00-.88 0l-.99.396a1 1 0 01-1.35-.936l-.14-1.052a1 1 0 00-.64-.82l-.99-.396a1 1 0 01-.57-1.27l.396-.99a1 1 0 000-.88l-.396-.99a1 1 0 01.57-1.27l.99-.396a1 1 0 00.64-.82l.14-1.052z'
									/>
									<circle
										cx='12'
										cy='12'
										r='3'
									/>
								</svg>
							</div>

							<h3 className='font-semibold'>Settings</h3>
							<p className='mt-2 text-sm text-gray-400'>
								Manage account security and sessions.
							</p>
						</div>
					</div>
				</section>

				{/* Recent Activity + Profile */}
				<section className='grid gap-6 lg:grid-cols-3'>
					{/* Activity */}
					<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-2'>
						<h2 className='mb-5 text-xl font-semibold'>
							Recent Activity
						</h2>

						<div className='space-y-4'>
							<div className='flex items-start gap-4 rounded-lg border border-white/5 bg-black/20 p-4'>
								<div className='mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400' />

								<div>
									<p className='font-medium'>
										Frontend Developer Resume analyzed
									</p>
									<p className='mt-1 text-sm text-gray-400'>
										ATS score improved from 84% to 92%.
									</p>
									<p className='mt-2 text-xs text-gray-500'>
										2 hours ago
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4 rounded-lg border border-white/5 bg-black/20 p-4'>
								<div className='mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400' />

								<div>
									<p className='font-medium'>
										Interview question set generated
									</p>
									<p className='mt-1 text-sm text-gray-400'>
										Node.js Backend Engineer • 25 questions.
									</p>
									<p className='mt-2 text-xs text-gray-500'>
										Yesterday
									</p>
								</div>
							</div>

							<div className='flex items-start gap-4 rounded-lg border border-white/5 bg-black/20 p-4'>
								<div className='mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400' />

								<div>
									<p className='font-medium'>
										New resume uploaded
									</p>
									<p className='mt-1 text-sm text-gray-400'>
										Resume_2026.pdf added successfully.
									</p>
									<p className='mt-2 text-xs text-gray-500'>
										3 days ago
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Profile */}
					<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<div className='flex flex-col items-center text-center'>
							<div className='flex h-20 w-20 items-center justify-center rounded-full bg-cyan-400/10 text-2xl font-bold text-cyan-300 ring-1 ring-cyan-400/20'>
								SR
							</div>

							<h3 className='mt-4 text-xl font-semibold'>
								Sudipto Raha
							</h3>

							<p className='mt-1 text-sm text-gray-400'>
								Backend Developer
							</p>

							<div className='mt-6 w-full border-t border-white/10 pt-6'>
								<div className='flex items-center justify-between py-2'>
									<span className='text-sm text-gray-400'>
										Account
									</span>
									<span className='text-sm text-emerald-300'>
										Verified
									</span>
								</div>

								<div className='flex items-center justify-between py-2'>
									<span className='text-sm text-gray-400'>
										Plan
									</span>
									<span className='text-sm text-white'>
										Free
									</span>
								</div>

								<div className='flex items-center justify-between py-2'>
									<span className='text-sm text-gray-400'>
										Member Since
									</span>
									<span className='text-sm text-white'>
										2026
									</span>
								</div>
							</div>

							<button
								onClick={() => router.push('/settings')}
								className='mt-6 w-full rounded-md border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white'
							>
								Open Settings
							</button>
						</div>
					</div>
				</section>
			</div>
		</main>
	)
}