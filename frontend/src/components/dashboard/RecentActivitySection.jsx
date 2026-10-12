import Link from 'next/link'

import DashboardIcon from './icon'
import ActivityRow from './ActivityRow'

const activities = [
	{
		id: '1',
		title: 'Backend Developer Interview',
		subtitle: 'Interview Preparation',
		date: 'Recently generated',
		status: 'Completed',
		score: '78%',
		icon: 'message',
		href: '/interview-preparation-report',
	},
	{
		id: '2',
		title: 'Software Engineer Resume',
		subtitle: 'Resume Optimization',
		date: 'Recently optimized',
		status: 'Completed',
		score: '85%',
		icon: 'file',
		href: '/resume-optimization',
	},
	{
		id: '3',
		title: 'Node.js Developer Preparation',
		subtitle: 'Interview Preparation',
		date: 'Previous report',
		status: 'Completed',
		score: '72%',
		icon: 'message',
		href: '/interview-preparation-report',
	},
]

export default function RecentActivitySection() {
	return (
		<section
			aria-labelledby='activity-heading'
			className='mb-9'
		>
			<div className='mb-4 flex items-end justify-between gap-4'>
				<div>
					<h2
						id='activity-heading'
						className='text-base font-semibold text-white'
					>
						Recent activity
					</h2>

					<p className='mt-1 text-xs text-slate-500'>
						Pick up where you left off
					</p>
				</div>

				<Link
					href='/reports'
					className='inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200'
				>
					View all
					<DashboardIcon
						name='arrow'
						size={14}
					/>
				</Link>
			</div>

			<div className='overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40'>
				{activities.length > 0 ? (
					<div className='divide-y divide-slate-800/70'>
						{activities.map((activity) => (
							<ActivityRow
								key={activity.id}
								activity={activity}
							/>
						))}
					</div>
				) : (
					<div className='px-5 py-10 text-center'>
						<p className='text-sm font-medium text-slate-300'>
							No recent activity
						</p>

						<p className='mt-1 text-xs text-slate-500'>
							Your generated reports will appear here.
						</p>
					</div>
				)}
			</div>
		</section>
	)
}
