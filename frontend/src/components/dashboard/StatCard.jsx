import DashboardIcon from './icon'

const styles = {
	indigo: {
		icon: 'border-indigo-400/15 bg-indigo-500/10 text-indigo-300',
		glow: 'from-indigo-500/[0.07]',
	},
	blue: {
		icon: 'border-blue-400/15 bg-blue-500/10 text-blue-300',
		glow: 'from-blue-500/[0.07]',
	},
	violet: {
		icon: 'border-violet-400/15 bg-violet-500/10 text-violet-300',
		glow: 'from-violet-500/[0.07]',
	},
	emerald: {
		icon: 'border-emerald-400/15 bg-emerald-500/10 text-emerald-300',
		glow: 'from-emerald-500/[0.06]',
	},
}

export default function StatCard({ stat }) {
	const style = styles[stat.color] ?? styles.indigo

	return (
		<article className='group relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 transition-all duration-300 hover:border-slate-700 sm:p-5'>
			<div
				aria-hidden='true'
				className={`pointer-events-none absolute inset-0 bg-linear-to-br ${style.glow} to-transparent opacity-70`}
			/>

			<div className='relative'>
				<div className='flex items-center justify-between gap-3'>
					<p className='text-xs font-medium text-slate-400 sm:text-sm'>
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

				<p className='mt-4 text-3xl font-bold tracking-tight text-white sm:text-[2rem]'>
					{stat.value}
				</p>

				<p className='mt-1.5 text-xs leading-5 text-slate-500'>
					{stat.detail}
				</p>
			</div>
		</article>
	)
}
