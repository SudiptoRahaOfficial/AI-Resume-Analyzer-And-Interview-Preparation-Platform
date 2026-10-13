import { SettingsCard, SectionHeading, SettingRow, Toggle } from './settingsUi'

export default function AppearanceSection({ settings, onSettingChange }) {
	return (
		<SettingsCard>
			<SectionHeading
				icon='monitor'
				title='Appearance'
				description='Adjust how the application looks.'
			/>

			<SettingRow
				title='Color theme'
				description='ResumeAI currently uses a dark interface.'
			>
				<span className='inline-flex items-center gap-2 rounded-lg border border-indigo-400/20 bg-indigo-500/8 px-3 py-2 text-xs font-medium text-indigo-200'>
					<span className='h-3 w-3 rounded-full border border-indigo-300/30 bg-[#030712]' />
					Dark
					<span className='text-[10px] text-slate-500'>Default</span>
				</span>
			</SettingRow>

			<SettingRow
				title='Compact dashboard'
				description='Prefer tighter spacing in dashboard sections.'
				divider={false}
			>
				<Toggle
					label='Compact dashboard'
					checked={settings.compactDashboard}
					onChange={(value) =>
						onSettingChange('compactDashboard', value)
					}
				/>
			</SettingRow>

			<p className='mt-2 text-[10px] leading-5 text-slate-600'>
				Appearance changes are not persisted or applied to other
				components yet.
			</p>
		</SettingsCard>
	)
}