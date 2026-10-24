// file: StatisticsSection.jsx
// responsibility: maps dashboard statistics from context to stat cards

'use client'

import { useDashboard } from '@/context/DashboardContext'
import StatCard from './StatCard'

// static presentation config; `key` must match the field in the API response
const STAT_CONFIG = [
	{
		key: 'interviewGuides',
		label: 'Interview Guides',
		detail: 'Personalized reports generated',
		emptyDetail: 'Generate your first interview guide',
		icon: 'clipboard',
		color: 'indigo',
	},
	{
		key: 'generatedResumes',
		label: 'Optimized Resumes',
		detail: 'Ready for your next application',
		emptyDetail: 'Optimize your first resume',
		icon: 'file-check',
		color: 'blue',
	},
]

// 4 -> '04' (numbers above 99 are left untouched by padStart)
const formatCount = (count) => String(count).padStart(2, '0')

export default function StatisticsSection() {
	const {
		statistics,
		isStatisticsLoading,
		statisticsError,
		refetchStatistics,
	} = useDashboard()

	// skeletons only on the first load; later silent refetches keep the old numbers
	const showSkeleton = isStatisticsLoading && !statistics

	// full error panel only if we have nothing to show; otherwise stale data is better than an error
	const showError = Boolean(statisticsError) && !statistics

	const stats = STAT_CONFIG.map(({ detail, emptyDetail, ...config }) => {
		// ?? 0 protects against a missing field in the response
		const count = statistics?.[config.key] ?? 0

		return {
			...config,
			value: formatCount(count),
			detail: count === 0 ? emptyDetail : detail,
		}
	})

	return (
		<section
			aria-labelledby='stats-heading'
			aria-busy={showSkeleton}
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
			</div>

			{showError ? (
				<div
					role='alert'
					className='flex items-center justify-between gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4'
				>
					<div>
						<p className='text-sm font-medium text-red-300'>
							Couldn&apos;t load your statistics
						</p>
						<p className='mt-1 text-xs text-slate-400'>
							{statisticsError.message}
						</p>
					</div>

					{/* arrow wrapper: otherwise the click event is passed as the options argument */}
					<button
						type='button'
						onClick={() => refetchStatistics()}
						className='shrink-0 rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800'
					>
						Try again
					</button>
				</div>
			) : (
				<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'>
					{stats.map((stat) => (
						<StatCard
							key={stat.key}
							stat={stat}
							isLoading={showSkeleton}
						/>
					))}
				</div>
			)}
		</section>
	)
}