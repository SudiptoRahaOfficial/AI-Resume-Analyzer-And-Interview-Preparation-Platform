import Link from 'next/link'

import DashboardIcon from './icon'

const accents = {
	indigo: {
		icon: 'border-indigo-400/20 bg-indigo-500/10 text-indigo-300',
		glow: 'from-indigo-500/[0.08]',
		button: 'border-indigo-400/20 bg-indigo-500/10 text-indigo-200 hover:bg-indigo-500/20',
		dot: 'bg-indigo-400',
	},
	blue: {
		icon: 'border-blue-400/20 bg-blue-500/10 text-blue-300',
		glow: 'from-blue-500/[0.08]',
		button: 'border-blue-400/20 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20',
		dot: 'bg-blue-400',
	},
}

export default function FeatureCard({
	eyebrow,
	title,
	description,
	href,
	icon,
	points,
	accent = 'indigo',
}) {
	const style = accents[accent] ?? accents.indigo

	return (
		<article className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-700 sm:p-6'>
			<div
				aria-hidden='true'
				className={`pointer-events-none absolute inset-0 bg-linear-to-br ${style.glow} to-transparent opacity-70`}
			/>

			<div className='relative flex h-full flex-col'>
				<div className='mb-5 flex items-start justify-between gap-4'>
					<div
						className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${style.icon}`}
					>
						<DashboardIcon
							name={icon}
							size={21}
						/>
					</div>

					<span className='rounded-full border border-slate-700/80 bg-slate-950/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400'>
						{eyebrow}
					</span>
				</div>

				<h3 className='text-sm font-semibold tracking-tight text-white'>
					{title}
				</h3>

				<p className='mt-2 text-xs leading-6 text-slate-400'>
					{description}
				</p>

				<ul className='mt-5 space-y-3'>
					{points.map((point) => (
						<li
							key={point}
							className='flex items-center gap-2.5 text-xs text-slate-300'
						>
							<span
								className={`h-1.5 w-1.5 shrink-0 rounded-full ${style.dot}`}
							/>

							{point}
						</li>
					))}
				</ul>

				<Link
					href={href}
					className={`mt-6 inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border px-4 py-2.5 text-xs font-semibold transition-all ${style.button}`}
				>
					Get started
					<DashboardIcon
						name='arrow'
						size={16}
						className='transition-transform group-hover:translate-x-0.5'
					/>
				</Link>
			</div>
		</article>
	)
}