import Link from 'next/link'

import DashboardIcon from './icon'

export default function WelcomeSection() {
	return (
		<section className='relative mb-8 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7 lg:p-8'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-[90px]'
			/>

			<div
				aria-hidden='true'
				className='pointer-events-none absolute -bottom-36 right-1/3 h-56 w-56 rounded-full bg-blue-500/6 blur-[90px]'
			/>

			<div className='relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
				<div className='max-w-2xl'>
					<div className='mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300'>
						<DashboardIcon
							name='sparkles'
							size={13}
						/>
						Your AI career assistant
					</div>

					<h1 className='text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl'>
						Your next opportunity
						<br className='hidden sm:block' /> starts with{' '}
						<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
							better preparation
						</span>
					</h1>

					<p className='mt-3 max-w-xl text-xs leading-6 text-slate-400'>
						Analyze your resume, identify skill gaps, and prepare
						for your next interview with personalized AI guidance.
					</p>
				</div>

				<div className='flex shrink-0 flex-col gap-3 sm:flex-row'>
					<Link
						href='/interview-preparation'
						className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all hover:bg-indigo-400'
					>
						<DashboardIcon
							name='message'
							size={17}
						/>
						Prepare for Interview
						<DashboardIcon
							name='arrow'
							size={15}
						/>
					</Link>

					<Link
						href='/resume-optimization'
						className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/40 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800/60'
					>
						<DashboardIcon
							name='file'
							size={17}
						/>
						Optimize Resume
					</Link>
				</div>
			</div>
		</section>
	)
}