import Link from 'next/link'
import { SettingsIcon } from './settingsUi'

export default function SettingsHeader() {
	return (
		<header className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
			<div>
				<nav className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'>
					<Link
						href='/dashboard'
						className='transition hover:text-slate-300'
					>
						Dashboard
					</Link>
					<span>/</span>
					<span className='text-indigo-400'>Settings</span>
				</nav>

				<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
					Settings
				</h1>

				<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
					Manage your account, security, and AI preparation
					preferences.
				</p>
			</div>

			<Link
				href='/dashboard/profile'
				className='inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/3 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-indigo-500/5 hover:text-white'
			>
				<SettingsIcon
					name='user'
					size={15}
				/>
				View profile
				<SettingsIcon
					name='arrow'
					size={13}
				/>
			</Link>
		</header>
	)
}