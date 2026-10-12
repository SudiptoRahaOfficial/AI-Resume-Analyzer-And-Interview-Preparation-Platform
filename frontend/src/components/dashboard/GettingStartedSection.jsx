import Link from 'next/link'

import DashboardIcon from './icon'

export default function GettingStartedSection() {
	return (
		<section
			aria-labelledby='getting-started-heading'
			className='relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6'
		>
			<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
				<div className='flex items-start gap-4'>
					<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
						<DashboardIcon
							name='clock'
							size={21}
						/>
					</div>

					<div>
						<h2
							id='getting-started-heading'
							className='text-sm font-semibold text-white sm:text-base'
						>
							A small step toward your next role
						</h2>

						<p className='mt-1 max-w-xl text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6'>
							Start with a targeted interview preparation report
							or optimize your resume for the role you want.
						</p>
					</div>
				</div>

				<Link
					href='/interview-preparation'
					className='inline-flex min-h-10 shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-indigo-400/30 hover:bg-indigo-500/10 hover:text-white sm:self-center'
				>
					Start preparing
					<DashboardIcon
						name='arrow'
						size={15}
					/>
				</Link>
			</div>
		</section>
	)
}
