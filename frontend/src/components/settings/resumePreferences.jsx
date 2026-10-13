import { SettingsCard, SectionHeading, SettingRow, Toggle } from './settingsUi'

function ResumeFormatOption({ value, selected, title, description, onSelect }) {
	return (
		<button
			type='button'
			aria-pressed={selected}
			onClick={() => onSelect(value)}
			className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
				selected
					? 'border-indigo-400/30 bg-indigo-500/6'
					: 'border-white/[0.07] bg-white/1.5 hover:border-white/15'
			}`}
		>
			<span
				className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
					selected
						? 'border-indigo-400 bg-indigo-400'
						: 'border-slate-600'
				}`}
			>
				{selected && (
					<span className='h-1.5 w-1.5 rounded-full bg-[#030712]' />
				)}
			</span>

			<span>
				<span className='block text-sm font-medium text-slate-200'>
					{title}
				</span>

				<span className='mt-1 block text-xs leading-5 text-slate-500'>
					{description}
				</span>
			</span>
		</button>
	)
}

export default function ResumePreferences({ settings, onSettingChange }) {
	return (
		<SettingsCard>
			<SectionHeading
				icon='file'
				title='Resume preferences'
				description='Set your default resume optimization options.'
			/>

			<div className='space-y-3'>
				<ResumeFormatOption
					value='ats'
					selected={settings.resumeFormat === 'ats'}
					title='ATS-friendly resume'
					description='Prioritize clear structure, standard headings, and applicant tracking system readability.'
					onSelect={(value) => onSettingChange('resumeFormat', value)}
				/>

				<ResumeFormatOption
					value='modern'
					selected={settings.resumeFormat === 'modern'}
					title='Modern professional'
					description='Prefer a contemporary presentation while maintaining professional structure.'
					onSelect={(value) => onSettingChange('resumeFormat', value)}
				/>
			</div>

			<SettingRow
				title='Prioritize ATS compatibility'
				description='Emphasize relevant skills and job-description keywords.'
				divider={false}
			>
				<Toggle
					label='Prioritize ATS compatibility'
					checked={settings.prioritizeATS}
					onChange={(value) =>
						onSettingChange('prioritizeATS', value)
					}
				/>
			</SettingRow>
		</SettingsCard>
	)
}