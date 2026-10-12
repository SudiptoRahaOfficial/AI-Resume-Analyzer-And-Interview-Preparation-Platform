import Link from 'next/link'

import DashboardIcon from './icon'

export default function ActivityRow({ activity }) {
	return (
		<Link
			href={activity.href}
			className='group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-slate-800/30 sm:px-5'
		>
			<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-800/60 text-slate-300 transition-colors group-hover:border-indigo-400/20 group-hover:text-indigo-300'>
				<DashboardIcon
					name={activity.icon}
					size={19}
				/>
			</div>

			<div className='min-w-0 flex-1'>
				<p className='truncate text-sm font-medium text-slate-200 transition-colors group-hover:text-white'>
					{activity.title}
				</p>

				<p className='mt-1 text-xs text-slate-500'>
					{activity.subtitle}

					<span className='mx-1.5 text-slate-700'>·</span>

					{activity.date}
				</p>
			</div>

			<div className='hidden shrink-0 text-right sm:block'>
				<span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-2.5 py-1 text-[10px] font-medium text-emerald-300'>
					<DashboardIcon
						name='check'
						size={12}
					/>

					{activity.status}
				</span>

				<p className='mt-1.5 text-xs text-slate-500'>
					{activity.scoreLabel || 'Score'}{' '}
					<span className='font-semibold text-slate-300'>
						{activity.score}
					</span>
				</p>
			</div>

			<DashboardIcon
				name='arrow'
				size={17}
				className='shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-300'
			/>
		</Link>
	)
}