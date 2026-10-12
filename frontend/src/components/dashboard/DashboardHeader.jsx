import Link from 'next/link'

import DashboardIcon from './DashboardIcon'

export default function DashboardHeader({
	onMenuClick,
	title = 'Overview',
	description = 'Your career development workspace',
	userInitials = 'SR',
}) {
	return (
		<header className='sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-800/80 bg-[#030712]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8'>
			<div className='flex items-center gap-3'>
				<button
					type='button'
					aria-label='Open navigation'
					onClick={onMenuClick}
					className='rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300 transition-colors hover:bg-slate-800 lg:hidden'
				>
					<DashboardIcon
						name='menu'
						size={20}
					/>
				</button>

				<div>
					<p className='text-sm font-semibold text-white'>{title}</p>

					<p className='hidden text-xs text-slate-500 sm:block'>
						{description}
					</p>
				</div>
			</div>

			<div className='flex items-center gap-3'>
				<Link
					href='/profile'
					aria-label='Open profile'
					className='flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-bold text-indigo-200 transition-colors hover:bg-indigo-500/20'
				>
					{userInitials}
				</Link>

				<div className='hidden sm:block'>
					<p className='text-xs font-semibold text-slate-200'>
						Your Workspace
					</p>

					<p className='mt-0.5 text-[10px] text-slate-500'>
						Career dashboard
					</p>
				</div>
			</div>
		</header>
	)
}