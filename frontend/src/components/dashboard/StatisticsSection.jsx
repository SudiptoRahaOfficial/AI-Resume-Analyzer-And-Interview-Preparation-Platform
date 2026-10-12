import Link from 'next/link'

import DashboardIcon from './icon'
import StatCard from './StatCard'

const stats = [
	{
		label: 'Interview Guides',
		value: '04',
		detail: 'Personalized reports generated',
		icon: 'clipboard',
		color: 'indigo',
	},
	{
		label: 'Optimized Resumes',
		value: '03',
		detail: 'Ready for your next application',
		icon: 'file-check',
		color: 'blue',
	},
]

export default function StatisticsSection() {
	return (
		<section
			aria-labelledby='stats-heading'
			className='mb-9'
		>
			<div className='mb-4 flex items-center justify-between'>
				<div>
					<h2
						id='stats-heading'
						className='text-base font-semibold text-white'
					>
						Your progress
					</h2>

					<p className='mt-1 text-xs text-slate-500'>
						A snapshot of your career preparation
					</p>
				</div>

				<Link
					href='/reports'
					className='hidden items-center gap-1.5 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200 sm:inline-flex'
				>
					View reports
					<DashboardIcon
						name='arrow'
						size={14}
					/>
				</Link>
			</div>

			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
				{stats.map((stat) => (
					<StatCard
						key={stat.label}
						stat={stat}
					/>
				))}
			</div>
		</section>
	)
}