import {
	SettingsCard,
	SectionHeading,
	SettingRow,
	SelectField,
} from './settingsUi'

const FOCUS_OPTIONS = [
	'Technical',
	'Behavioral',
	'System Design',
	'Problem Solving',
]

const PREPARATION_DURATIONS = [
	{ value: '5', label: '5 days' },
	{ value: '7', label: '7 days' },
	{ value: '10', label: '10 days' },
	{ value: '14', label: '14 days' },
]

export default function InterviewPreferences({
	settings,
	onSettingChange,
	onToggleFocus,
}) {
	return (
		<SettingsCard>
			<SectionHeading
				icon='sparkles'
				title='Interview preferences'
				description='Personalize your AI-generated preparation plans.'
			/>

			<SettingRow
				title='Preparation plan duration'
				description='Choose the default length of your study plan.'
			>
				<SelectField
					label='Preparation plan duration'
					value={settings.preparationDuration}
					onChange={(event) =>
						onSettingChange(
							'preparationDuration',
							event.target.value,
						)
					}
				>
					{PREPARATION_DURATIONS.map(({ value, label }) => (
						<option
							key={value}
							value={value}
						>
							{label}
						</option>
					))}
				</SelectField>
			</SettingRow>

			<div className='py-4'>
				<p className='text-sm font-medium text-slate-200'>
					Interview focus
				</p>

				<p className='mt-1 text-xs leading-5 text-slate-500'>
					Select the topics you want to prioritize.
				</p>

				<div className='mt-3 flex flex-wrap gap-2'>
					{FOCUS_OPTIONS.map((focus) => {
						const selected = settings.interviewFocus.includes(focus)

						return (
							<button
								key={focus}
								type='button'
								aria-pressed={selected}
								onClick={() => onToggleFocus(focus)}
								className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
									selected
										? 'border-indigo-400/30 bg-indigo-500/10 text-indigo-200'
										: 'border-white/10 bg-white/2 text-slate-400 hover:border-white/20 hover:text-slate-200'
								}`}
							>
								{selected && <span className='mr-1'>✓</span>}
								{focus}
							</button>
						)
					})}
				</div>
			</div>

			<div className='rounded-lg border border-indigo-400/10 bg-indigo-500/4 px-3 py-2.5'>
				<p className='text-xs leading-5 text-slate-400'>
					These preferences are currently held in page state. They
					will not affect generated reports until they are persisted
					and passed to the report generation flow.
				</p>
			</div>
		</SettingsCard>
	)
}