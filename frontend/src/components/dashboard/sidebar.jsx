'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import DashboardIcon from './icon'
import DashboardBrand from './brand'

const dashboardNavigation = [
	{
		label: 'Overview',
		href: '/dashboard',
		icon: 'layout',
	},
	{
		label: 'Interview Preparation',
		href: '/interview-preparation',
		icon: 'message',
	},
	{
		label: 'Resume Optimization',
		href: '/resume-optimization',
		icon: 'file',
	},
	{
		label: 'Interview Preparation Reports',
		href: '/interview-preparation-reports',
		icon: 'clipboard',
	},
	{
		label: 'Resume Optimization Reports',
		href: '/resume-optimization-reports',
		icon: 'file-check',
	},
]

export default function DashboardSidebar({ open, onClose }) {
	const pathname = usePathname()

	return (
		<>
			{open && (
				<button
					type='button'
					aria-label='Close navigation'
					onClick={onClose}
					className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden'
				/>
			)}

			<aside
				className={`fixed inset-y-0 left-0 z-50 flex w-65 flex-col border-r border-slate-800/80 bg-[#080c18] transition-transform duration-300 lg:translate-x-0 ${
					open ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='flex h-18 shrink-0 items-center justify-between border-b border-slate-800/70 px-5'>
					<DashboardBrand onClick={onClose} />

					<button
						type='button'
						onClick={onClose}
						aria-label='Close navigation'
						className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden'
					>
						<DashboardIcon
							name='close'
							size={19}
						/>
					</button>
				</div>

				<div className='flex-1 overflow-y-auto px-3 py-6'>
					<p className='mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500'>
						Workspace
					</p>

					<nav
						aria-label='Main navigation'
						className='space-y-1'
					>
						{dashboardNavigation.map((item) => {
							const active = pathname === item.href

							return (
								<Link
									key={item.label}
									href={item.href}
									onClick={onClose}
									aria-current={active ? 'page' : undefined}
									className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium transition-all ${
										active
											? 'border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'
											: 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
									}`}
								>
									<DashboardIcon
										name={item.icon}
										size={19}
										className={
											active
												? 'text-indigo-400'
												: 'text-slate-500 group-hover:text-slate-300'
										}
									/>

									<span>{item.label}</span>

									{active && (
										<span className='ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400' />
									)}
								</Link>
							)
						})}
					</nav>

					<div className='my-6 border-t border-slate-800/70' />

					<p className='mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500'>
						Account
					</p>

					<nav
						aria-label='Account navigation'
						className='space-y-1'
					>
						<Link
							href='/dashboard/profile'
							onClick={onClose}
							className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							<DashboardIcon
								name='user'
								size={19}
								className='text-slate-500 group-hover:text-slate-300'
							/>
							My Profile
						</Link>

						<Link
							href='/dashboard/settings'
							onClick={onClose}
							className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							<DashboardIcon
								name='settings'
								size={19}
								className='text-slate-500 group-hover:text-slate-300'
							/>
							Settings
						</Link>
					</nav>
				</div>
			</aside>
		</>
	)
}