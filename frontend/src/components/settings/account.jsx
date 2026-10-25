import Link from 'next/link'
import {
	SettingsCard,
	SectionHeading,
	SettingRow,
	SettingsIcon,
} from './settingsUi'

export default function AccountSection({ account }) {
	const initials = [account?.firstName?.[0], account?.lastName?.[0]]
		.filter(Boolean)
		.join('')
		.toUpperCase()

	return (
		<SettingsCard>
			<SectionHeading
				icon='user'
				title='Account'
				description='Your identity and account verification.'
			/>

			<div className='flex items-center gap-4 rounded-xl border border-white/6 bg-white/2 p-4'>
				<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-500/20 to-cyan-500/10 text-lg font-semibold text-indigo-200'>
					{initials || '?'}
				</div>

				<div className='min-w-0 flex-1'>
					<p className='truncate text-sm font-semibold text-white'>
						{[account?.firstName, account?.lastName]
							.filter(Boolean)
							.join(' ') || 'User'}
					</p>

					<p className='mt-1 truncate text-xs text-slate-400'>
						{account?.profession || 'Profession not set'}
					</p>

					<div className='mt-2 flex flex-wrap items-center gap-2'>
						<span
							className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${
								account?.isVerified
									? 'border-emerald-400/15 bg-emerald-500/8 text-emerald-300'
									: 'border-amber-400/15 bg-amber-500/8 text-amber-300'
							}`}
						>
							<SettingsIcon
								name={account?.isVerified ? 'check' : 'shield'}
								size={11}
							/>
							{account?.isVerified
								? 'Email verified'
								: 'Email not verified'}
						</span>
					</div>
				</div>

				<Link
					href='/dashboard/profile'
					aria-label='view profile'
					className='rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:border-indigo-400/30 hover:text-white'
				>
					<SettingsIcon
						name='arrow'
						size={15}
					/>
				</Link>
			</div>

			<div className='mt-4'>
				<SettingRow
					title='Email address'
					description='Used for sign-in and account notifications.'
					divider={false}
				>
					<p className='break-all text-xs text-slate-300'>
						{account?.email || 'Email unavailable'}
					</p>
				</SettingRow>
			</div>

			<div className='mt-2 rounded-lg border border-white/6 bg-white/2 px-3 py-2.5'>
				<p className='text-xs leading-5 text-slate-500'>
					To change your personal details, update your profile.
				</p>

				<Link
					href='/dashboard/profile/update-profile'
					className='mt-2 inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200'
				>
					Manage profile
					<SettingsIcon
						name='chevron'
						size={12}
					/>
				</Link>
			</div>
		</SettingsCard>
	)
}