// file: StatCard.jsx
// responsibility: presentational card for a single dashboard statistic (with loading skeleton)

import DashboardIcon from '../../shared/icon'

const styles = {
	indigo: {
		icon: 'border-indigo-400/15 bg-indigo-500/10 text-indigo-300',
		glow: 'from-indigo-500/[0.07]',
	},
	blue: {
		icon: 'border-blue-400/15 bg-blue-500/10 text-blue-300',
		glow: 'from-blue-500/[0.07]',
	},
}

export default function StatCard({ stat, isLoading = false }) {
	const style = styles[stat.color] ?? styles.indigo

	return (
		<article className='group relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 transition-all duration-300 hover:border-slate-700 sm:p-5'>
			<div
				aria-hidden='true'
				className={`pointer-events-none absolute inset-0 bg-linear-to-br ${style.glow} to-transparent opacity-70`}
			/>

			<div className='relative'>
				<div className='flex items-center justify-between gap-3'>
					<p className='text-xs font-medium text-slate-400'>
						{stat.label}
					</p>

					<div
						className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${style.icon}`}
					>
						<DashboardIcon
							name={stat.icon}
							size={18}
						/>
					</div>
				</div>

				{isLoading ? (
					<div
						aria-hidden='true'
						className='mt-4 h-8 w-14 animate-pulse rounded-md bg-slate-800'
					/>
				) : (
					<p className='mt-4 text-2xl font-bold tracking-tight text-white'>
						{stat.value}
					</p>
				)}

				{isLoading ? (
					<div
						aria-hidden='true'
						className='mt-1.5 flex h-5 items-center'
					>
						<div className='h-3 w-40 animate-pulse rounded bg-slate-800/70' />
					</div>
				) : (
					<p className='mt-1.5 text-xs leading-5 text-slate-500'>
						{stat.detail}
					</p>
				)}
			</div>
		</article>
	)
}