'use client'

import { useState } from 'react'
import Link from 'next/link'

const stats = [
	{
		label: 'Interview Guides',
		value: '04',
		detail: 'Personalized reports generated',
		icon: 'clipboard',
		color: 'indigo',
	},
	{
		label: 'Average Match Score',
		value: '78%',
		detail: 'Across analyzed resumes',
		icon: 'target',
		color: 'blue',
	},
	{
		label: 'Skill Gaps Identified',
		value: '12',
		detail: 'Areas to focus on',
		icon: 'layers',
		color: 'violet',
	},
	{
		label: 'Optimized Resumes',
		value: '03',
		detail: 'Ready for your next application',
		icon: 'file-check',
		color: 'emerald',
	},
]

const navigation = [
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
		label: 'My Reports',
		href: '/reports',
		icon: 'chart',
	},
]

const recentActivities = [
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

const iconPaths = {
	layout: (
		<>
			<rect
				x='3'
				y='3'
				width='7'
				height='7'
				rx='1.5'
			/>
			<rect
				x='14'
				y='3'
				width='7'
				height='7'
				rx='1.5'
			/>
			<rect
				x='14'
				y='14'
				width='7'
				height='7'
				rx='1.5'
			/>
			<rect
				x='3'
				y='14'
				width='7'
				height='7'
				rx='1.5'
			/>
		</>
	),
	message: (
		<>
			<path d='M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z' />
			<path d='M8 12h8' />
			<path d='M8 9h5' />
		</>
	),
	file: (
		<>
			<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
			<path d='M14 2v6h6' />
			<path d='M8 13h8' />
			<path d='M8 17h5' />
		</>
	),
	chart: (
		<>
			<path d='M3 3v18h18' />
			<path d='m19 9-5 5-4-4-5 5' />
		</>
	),
	clipboard: (
		<>
			<rect
				x='5'
				y='4'
				width='14'
				height='17'
				rx='2'
			/>
			<path d='M9 4.5V3h6v1.5' />
			<path d='M9 10h6' />
			<path d='M9 14h6' />
			<path d='M9 18h3' />
		</>
	),
	target: (
		<>
			<circle
				cx='12'
				cy='12'
				r='9'
			/>
			<circle
				cx='12'
				cy='12'
				r='5'
			/>
			<circle
				cx='12'
				cy='12'
				r='1'
			/>
		</>
	),
	layers: (
		<>
			<path d='m12 3 9 5-9 5-9-5 9-5Z' />
			<path d='m3 12 9 5 9-5' />
			<path d='m3 16 9 5 9-5' />
		</>
	),
	'file-check': (
		<>
			<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
			<path d='M14 2v6h6' />
			<path d='m8 14 2 2 5-5' />
		</>
	),
	arrow: (
		<>
			<path d='M5 12h14' />
			<path d='m12 5 7 7-7 7' />
		</>
	),
	plus: (
		<>
			<path d='M12 5v14' />
			<path d='M5 12h14' />
		</>
	),
	sparkles: (
		<>
			<path d='m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z' />
			<path d='m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z' />
		</>
	),
	user: (
		<>
			<circle
				cx='12'
				cy='8'
				r='4'
			/>
			<path d='M5 21v-2a7 7 0 0 1 14 0v2' />
		</>
	),
	settings: (
		<>
			<circle
				cx='12'
				cy='12'
				r='3'
			/>
			<path d='m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z' />
		</>
	),
	menu: (
		<>
			<path d='M4 6h16' />
			<path d='M4 12h16' />
			<path d='M4 18h16' />
		</>
	),
	close: (
		<>
			<path d='m18 6-12 12' />
			<path d='m6 6 12 12' />
		</>
	),
	clock: (
		<>
			<circle
				cx='12'
				cy='12'
				r='9'
			/>
			<path d='M12 7v5l3 2' />
		</>
	),
	check: (
		<>
			<path d='m5 12 4 4L19 6' />
		</>
	),
}

function Icon({ name, size = 20, className = '' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.7'
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'
			className={className}
		>
			{iconPaths[name]}
		</svg>
	)
}

function Brand({ onClick }) {
	return (
		<Link
			href='/dashboard'
			onClick={onClick}
			className='flex items-center gap-3'
		>
			<div className='flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-950/30'>
				<Icon
					name='sparkles'
					size={20}
				/>
			</div>

			<span className='text-lg font-bold tracking-tight text-white'>
				Resume<span className='text-indigo-400'>AI</span>
			</span>
		</Link>
	)
}

function Sidebar({ open, onClose }) {
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
				className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-slate-800/80 bg-[#080c18] transition-transform duration-300 lg:translate-x-0 ${
					open ? 'translate-x-0' : '-translate-x-full'
				}`}
			>
				<div className='flex h-[72px] shrink-0 items-center justify-between border-b border-slate-800/70 px-5'>
					<Brand onClick={onClose} />

					<button
						type='button'
						onClick={onClose}
						aria-label='Close navigation'
						className='rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white lg:hidden'
					>
						<Icon
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
						{navigation.map((item) => {
							const active = item.label === 'Overview'

							return (
								<Link
									key={item.label}
									href={item.href}
									onClick={onClose}
									aria-current={active ? 'page' : undefined}
									className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
										active
											? 'border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'
											: 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
									}`}
								>
									<Icon
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
							href='/profile'
							onClick={onClose}
							className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							<Icon
								name='user'
								size={19}
								className='text-slate-500 group-hover:text-slate-300'
							/>
							My Profile
						</Link>

						<Link
							href='/settings'
							onClick={onClose}
							className='group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							<Icon
								name='settings'
								size={19}
								className='text-slate-500 group-hover:text-slate-300'
							/>
							Settings
						</Link>
					</nav>
				</div>

				{/* Sidebar bottom card */}
				<div className='shrink-0 border-t border-slate-800/70 p-4'>
					<div className='rounded-xl border border-indigo-400/15 bg-linear-to-br from-indigo-500/[0.10] to-blue-500/[0.04] p-4'>
						<div className='mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300'>
							<Icon
								name='sparkles'
								size={17}
							/>
						</div>

						<p className='text-sm font-semibold text-white'>
							Your next opportunity
						</p>

						<p className='mt-1 text-xs leading-5 text-slate-400'>
							Prepare strategically and make every application
							count.
						</p>

						<Link
							href='/interview-preparation'
							onClick={onClose}
							className='mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 transition-colors hover:text-indigo-200'
						>
							Start preparing
							<Icon
								name='arrow'
								size={14}
							/>
						</Link>
					</div>
				</div>
			</aside>
		</>
	)
}

function StatCard({ stat }) {
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

	const style = styles[stat.color]

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
						<Icon
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

function FeatureCard({
	eyebrow,
	title,
	description,
	href,
	icon,
	points,
	accent = 'indigo',
}) {
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

	const style = accents[accent]

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
						<Icon
							name={icon}
							size={21}
						/>
					</div>

					<span className='rounded-full border border-slate-700/80 bg-slate-950/50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400'>
						{eyebrow}
					</span>
				</div>

				<h3 className='text-lg font-semibold tracking-tight text-white sm:text-xl'>
					{title}
				</h3>

				<p className='mt-2 text-sm leading-6 text-slate-400'>
					{description}
				</p>

				<ul className='mt-5 space-y-3'>
					{points.map((point) => (
						<li
							key={point}
							className='flex items-center gap-2.5 text-xs text-slate-300 sm:text-sm'
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
					className={`mt-6 inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${style.button}`}
				>
					Get started
					<Icon
						name='arrow'
						size={16}
						className='transition-transform group-hover:translate-x-0.5'
					/>
				</Link>
			</div>
		</article>
	)
}

function ActivityRow({ activity }) {
	return (
		<Link
			href={activity.href}
			className='group flex items-center gap-3 px-4 py-4 transition-colors hover:bg-slate-800/30 sm:px-5'
		>
			<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700/70 bg-slate-800/60 text-slate-300 transition-colors group-hover:border-indigo-400/20 group-hover:text-indigo-300'>
				<Icon
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
					<Icon
						name='check'
						size={12}
					/>
					{activity.status}
				</span>

				<p className='mt-1.5 text-xs text-slate-500'>
					Score{' '}
					<span className='font-semibold text-slate-300'>
						{activity.score}
					</span>
				</p>
			</div>

			<Icon
				name='arrow'
				size={17}
				className='shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-300'
			/>
		</Link>
	)
}

export default function Dashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	return (
		<div className='min-h-screen bg-[#030712] text-slate-300 selection:bg-indigo-500/30'>
			<Sidebar
				open={sidebarOpen}
				onClose={() => setSidebarOpen(false)}
			/>

			{/* Main workspace */}
			<div className='min-h-screen lg:pl-[260px]'>
				{/* Top navigation */}
				<header className='sticky top-0 z-30 flex h-[72px] items-center justify-between border-b border-slate-800/80 bg-[#030712]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8'>
					<div className='flex items-center gap-3'>
						<button
							type='button'
							aria-label='Open navigation'
							onClick={() => setSidebarOpen(true)}
							className='rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300 transition-colors hover:bg-slate-800 lg:hidden'
						>
							<Icon
								name='menu'
								size={20}
							/>
						</button>

						<div>
							<p className='text-sm font-semibold text-white'>
								Overview
							</p>
							<p className='hidden text-xs text-slate-500 sm:block'>
								Your career development workspace
							</p>
						</div>
					</div>

					<div className='flex items-center gap-3'>
						<Link
							href='/profile'
							aria-label='Open profile'
							className='flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-bold text-indigo-200 transition-colors hover:bg-indigo-500/20'
						>
							SR
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

				<main className='mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10'>
					{/* Welcome */}
					<section className='relative mb-8 overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7 lg:p-8'>
						<div
							aria-hidden='true'
							className='pointer-events-none absolute -right-16 -top-28 h-72 w-72 rounded-full bg-indigo-500/[0.10] blur-[90px]'
						/>

						<div
							aria-hidden='true'
							className='pointer-events-none absolute -bottom-36 right-1/3 h-56 w-56 rounded-full bg-blue-500/[0.06] blur-[90px]'
						/>

						<div className='relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
							<div className='max-w-2xl'>
								<div className='mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/[0.08] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300'>
									<Icon
										name='sparkles'
										size={13}
									/>
									Your AI career assistant
								</div>

								<h1 className='text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl'>
									Your next opportunity
									<br className='hidden sm:block' /> starts
									with{' '}
									<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
										better preparation
									</span>
								</h1>

								<p className='mt-3 max-w-xl text-sm leading-6 text-slate-400 sm:text-base sm:leading-7'>
									Analyze your resume, identify skill gaps,
									and prepare for your next interview with
									personalized AI guidance.
								</p>
							</div>

							<div className='flex shrink-0 flex-col gap-3 sm:flex-row'>
								<Link
									href='/interview-preparation'
									className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/30 transition-all hover:bg-indigo-400'
								>
									<Icon
										name='message'
										size={17}
									/>
									Prepare for Interview
									<Icon
										name='arrow'
										size={15}
									/>
								</Link>

								<Link
									href='/resume-optimization'
									className='inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-950/40 px-4 py-2.5 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800/60'
								>
									<Icon
										name='file'
										size={17}
									/>
									Optimize Resume
								</Link>
							</div>
						</div>
					</section>

					{/* Statistics */}
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
								<Icon
									name='arrow'
									size={14}
								/>
							</Link>
						</div>

						<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4'>
							{stats.map((stat) => (
								<StatCard
									key={stat.label}
									stat={stat}
								/>
							))}
						</div>
					</section>

					{/* Feature launch cards */}
					<section
						aria-labelledby='tools-heading'
						className='mb-9'
					>
						<div className='mb-4'>
							<h2
								id='tools-heading'
								className='text-base font-semibold text-white'
							>
								Your AI tools
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Everything you need to move closer to your next
								role
							</p>
						</div>

						<div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
							<FeatureCard
								eyebrow='Interview preparation'
								title='Prepare with a clear strategy'
								description='Generate a role-specific interview report based on your resume, your background, and the job you want.'
								href='/interview-preparation'
								icon='message'
								accent='indigo'
								points={[
									'Technical and behavioral questions',
									'Personalized skill gap analysis',
									'Day-by-day 7-day preparation plan',
								]}
							/>

							<FeatureCard
								eyebrow='Resume optimization'
								title='Create a stronger application'
								description='Transform your existing experience into a job-targeted resume designed for clarity, relevance, and ATS readability.'
								href='/resume-optimization'
								icon='file-check'
								accent='blue'
								points={[
									'Job description alignment',
									'Relevant skills and experience',
									'Downloadable PDF resume',
								]}
							/>
						</div>
					</section>

					{/* Recent activity */}
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
								<Icon
									name='arrow'
									size={14}
								/>
							</Link>
						</div>

						<div className='overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40'>
							<div className='divide-y divide-slate-800/70'>
								{recentActivities.map((activity) => (
									<ActivityRow
										key={activity.id}
										activity={activity}
									/>
								))}
							</div>
						</div>
					</section>

					{/* Getting started */}
					<section
						aria-labelledby='getting-started-heading'
						className='relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/30 p-5 sm:p-6'
					>
						<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
							<div className='flex items-start gap-4'>
								<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
									<Icon
										name='clock'
										size={21}
									/>
								</div>

								<div>
									<h2
										id='getting-started-heading'
										className='text-sm font-semibold text-white sm:text-base'
									>
										Make your next move count
									</h2>

									<p className='mt-1.5 max-w-2xl text-xs leading-5 text-slate-400 sm:text-sm sm:leading-6'>
										Start with your current resume and a
										target job description. ResumeAI will
										help you understand where you stand and
										what to do next.
									</p>
								</div>
							</div>

							<Link
								href='/interview-preparation'
								className='inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-200 transition-colors hover:border-indigo-400/30 hover:text-white'
							>
								Get started
								<Icon
									name='arrow'
									size={15}
								/>
							</Link>
						</div>
					</section>

					{/* Footer */}
					<footer className='mt-8 flex flex-col gap-2 border-t border-slate-800/70 pt-5 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between'>
						<p>© 2026 ResumeAI. Built for your next opportunity.</p>

						<p className='flex items-center gap-1.5'>
							Powered by AI
							<span className='h-1 w-1 rounded-full bg-indigo-400' />
							Designed for your career growth
						</p>
					</footer>
				</main>
			</div>
		</div>
	)
}