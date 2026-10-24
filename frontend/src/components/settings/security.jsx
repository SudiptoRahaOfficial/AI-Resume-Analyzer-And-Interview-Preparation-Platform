'use client'

import {
	SettingsCard,
	SectionHeading,
	SettingRow,
	SettingsIcon,
} from './settingsUi'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'

export default function SecuritySection() {
	const router = useRouter()
	const { signout, signoutAll } = useAuth()

	// signout
	const handleSignout = async () => {
		await signout()
		router.replace('/signin')
	}

	// signout from all devices
	const handleSignoutAll = async () => {
		await signoutAll()
		router.replace('/signin')
	}

	return (
		<SettingsCard>
			<SectionHeading
				icon='shield'
				title='Security & sessions'
				description='Control where your ResumeAI account is signed in.'
			/>

			<div className='rounded-xl border border-emerald-400/10 bg-emerald-500/4 p-4'>
				<div className='flex items-start gap-3'>
					<span className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-300'>
						<SettingsIcon
							name='monitor'
							size={16}
						/>
					</span>

					<div>
						<div className='flex flex-wrap items-center gap-2'>
							<p className='text-sm font-medium text-slate-200'>
								Current session
							</p>
							<span className='rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300'>
								Active
							</span>
						</div>

						<p className='mt-1 text-xs leading-5 text-slate-500'>
							This browser is currently signed in to your account.
						</p>
					</div>
				</div>
			</div>

			<div className='mt-4'>
				<SettingRow
					title='Sign out'
					description='End your current session on this device only.'
				>
					<button
						type='button'
						onClick={handleSignout}
						className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/4 hover:text-white sm:w-auto cursor-pointer'
					>
						<SettingsIcon
							name='logout'
							size={14}
						/>
						Sign out
					</button>
				</SettingRow>

				<SettingRow
					title='Sign out all devices'
					description='End all active sessions, including sessions on other devices.'
					divider={false}
				>
					<button
						type='button'
						onClick={handleSignoutAll}
						className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-400/20 bg-red-500/6 px-3 py-2.5 text-xs font-medium text-red-300 transition-colors hover:border-red-400/40 hover:bg-red-500/12 sm:w-auto cursor-pointer'
					>
						<SettingsIcon
							name='shield'
							size={14}
						/>
						Sign out all
					</button>
				</SettingRow>
			</div>

			<p className='mt-3 text-[11px] leading-5 text-slate-600'>
				If you suspect unauthorized access, sign out all devices and
				sign in again with your credentials.
			</p>
		</SettingsCard>
	)
}