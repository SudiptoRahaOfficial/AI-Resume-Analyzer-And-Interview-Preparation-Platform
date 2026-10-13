import { SettingsCard, SectionHeading, SettingsIcon } from './settingsUi'

export default function PrivacySection() {
	return (
		<SettingsCard>
			<SectionHeading
				icon='lock'
				title='Privacy & data'
				description='Understand and manage your account data.'
			/>

			<div className='rounded-xl border border-white/6 bg-white/2 p-4'>
				<p className='text-sm font-medium text-slate-200'>
					Your data stays associated with your account
				</p>

				<p className='mt-2 text-xs leading-5 text-slate-500'>
					Your profile information, interview preparation reports, and
					generated resume records are account-related data.
				</p>
			</div>

			<div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
				<div>
					<p className='text-sm font-medium text-slate-200'>
						Account deletion
					</p>

					<p className='mt-1 text-xs leading-5 text-slate-500'>
						Permanently remove your account and associated data,
						subject to your retention policy.
					</p>
				</div>

				<button
					type='button'
					disabled
					title='Account deletion is not implemented yet'
					className='inline-flex shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-red-400/10 px-3 py-2.5 text-xs font-medium text-red-300/50 opacity-70'
				>
					<SettingsIcon
						name='trash'
						size={14}
					/>
					Delete account
				</button>
			</div>

			<p className='mt-2 text-[10px] text-slate-600'>
				Account deletion is not connected yet.
			</p>
		</SettingsCard>
	)
}