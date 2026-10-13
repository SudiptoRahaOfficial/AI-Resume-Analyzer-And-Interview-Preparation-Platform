import Link from 'next/link'
import { SettingsCard, SectionHeading, SettingsIcon } from './settingsUi'

export default function SupportSection() {
	return (
		<SettingsCard>
			<SectionHeading
				icon='help'
				title='Help & support'
				description='Get assistance with ResumeAI.'
			/>

			<div className='flex items-center gap-3'>
				<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/3 text-slate-300'>
					<SettingsIcon
						name='help'
						size={18}
					/>
				</div>

				<div className='min-w-0 flex-1'>
					<p className='text-sm font-medium text-slate-200'>
						Need help?
					</p>

					<p className='mt-1 text-xs leading-5 text-slate-500'>
						Have a question about your account or preparation
						reports?
					</p>
				</div>
			</div>

			<Link
				href='/contact'
				className='mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/2 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-400/30 hover:bg-indigo-500/5 hover:text-white'
			>
				Contact support
				<SettingsIcon
					name='arrow'
					size={13}
				/>
			</Link>
		</SettingsCard>
	)
}