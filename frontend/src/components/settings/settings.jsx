'use client'

import { useState } from 'react'
import Link from 'next/link'

const initialSettings = {
	preparationDuration: '7',
	interviewFocus: ['Technical', 'Behavioral'],
	resumeFormat: 'ats',
	prioritizeATS: true,
	compactDashboard: false,
}

const focusOptions = [
	'Technical',
	'Behavioral',
	'System Design',
	'Problem Solving',
]

function SettingsIcon({ name, size = 18, className = '' }) {
	const common = {
		xmlns: 'http://www.w3.org/2000/svg',
		width: size,
		height: size,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 1.7,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className,
		'aria-hidden': true,
	}

	const paths = {
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
		shield: (
			<>
				<path d='M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z' />
				<path d='m9 12 2 2 4-4' />
			</>
		),
		sparkles: (
			<>
				<path d='m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z' />
				<path d='m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z' />
			</>
		),
		file: (
			<>
				<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
				<path d='M14 2v6h6M8 13h8M8 17h8' />
			</>
		),
		monitor: (
			<>
				<rect
					x='3'
					y='4'
					width='18'
					height='13'
					rx='2'
				/>
				<path d='M8 21h8M12 17v4' />
			</>
		),
		lock: (
			<>
				<rect
					x='4'
					y='10'
					width='16'
					height='11'
					rx='2'
				/>
				<path d='M8 10V7a4 4 0 1 1 8 0v3' />
			</>
		),
		help: (
			<>
				<circle
					cx='12'
					cy='12'
					r='10'
				/>
				<path d='M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3' />
				<path d='M12 17h.01' />
			</>
		),
		arrow: (
			<>
				<path d='M7 17 17 7M7 7h10v10' />
			</>
		),
		logout: (
			<>
				<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
				<path d='M16 17l5-5-5-5M21 12H9' />
			</>
		),
		check: <path d='m5 12 4 4L19 6' />,
		close: <path d='m18 6-12 12M6 6l12 12' />,
		chevron: <path d='m9 18 6-6-6-6' />,
		trash: (
			<>
				<path d='M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5' />
			</>
		),
	}

	return <svg {...common}>{paths[name] || null}</svg>
}

function SectionHeading({ icon, title, description }) {
	return (
		<div className='mb-5 flex items-start gap-3'>
			<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'>
				<SettingsIcon
					name={icon}
					size={17}
				/>
			</div>

			<div className='min-w-0'>
				<h2 className='text-sm font-semibold text-white'>{title}</h2>
				<p className='mt-1 text-xs leading-5 text-slate-500'>
					{description}
				</p>
			</div>
		</div>
	)
}

function SettingsCard({ children, className = '' }) {
	return (
		<section
			className={`rounded-2xl border border-white/8 bg-slate-900/40 p-5 sm:p-6 ${className}`}
		>
			{children}
		</section>
	)
}

function SettingRow({ title, description, children, divider = true }) {
	return (
		<div
			className={`flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${
				divider ? 'border-b border-white/6' : ''
			}`}
		>
			<div className='min-w-0 sm:pr-5'>
				<p className='text-sm font-medium text-slate-200'>{title}</p>
				{description && (
					<p className='mt-1 text-xs leading-5 text-slate-500'>
						{description}
					</p>
				)}
			</div>

			<div className='shrink-0 sm:max-w-[55%]'>{children}</div>
		</div>
	)
}

function Toggle({ checked, onChange, label }) {
	return (
		<button
			type='button'
			role='switch'
			aria-checked={checked}
			aria-label={label}
			onClick={() => onChange(!checked)}
			className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] ${
				checked
					? 'border-indigo-400/40 bg-indigo-500'
					: 'border-white/10 bg-slate-700'
			}`}
		>
			<span
				className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
					checked ? 'translate-x-5' : 'translate-x-1'
				}`}
			/>
		</button>
	)
}

function SelectField({ value, onChange, children, label }) {
	return (
		<div className='relative'>
			<select
				aria-label={label}
				value={value}
				onChange={onChange}
				className='w-full min-w-36 appearance-none rounded-lg border border-white/10 bg-[#080d1b] py-2 pl-3 pr-9 text-xs text-slate-200 outline-none transition-colors focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10'
			>
				{children}
			</select>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='14'
				height='14'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
				aria-hidden='true'
			>
				<path d='m6 9 6 6 6-6' />
			</svg>
		</div>
	)
}

function ConfirmDialog({ type, onCancel, onConfirm }) {
	const isAll = type === 'all'

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm'
			onMouseDown={(event) => {
				if (event.target === event.currentTarget) {
					onCancel()
				}
			}}
		>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby='confirm-title'
				className='w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1120] p-6 shadow-2xl shadow-black/40'
			>
				<div
					className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
						isAll
							? 'border-red-400/20 bg-red-500/10 text-red-300'
							: 'border-amber-400/20 bg-amber-500/10 text-amber-300'
					}`}
				>
					<SettingsIcon
						name={isAll ? 'shield' : 'logout'}
						size={20}
					/>
				</div>

				<h2
					id='confirm-title'
					className='mt-5 text-base font-semibold text-white'
				>
					{isAll ? 'Sign out all devices?' : 'Sign out?'}
				</h2>

				<p className='mt-2 text-sm leading-6 text-slate-400'>
					{isAll
						? 'You will be signed out on this device and all other active sessions associated with your account. You may need to sign in again on your other devices.'
						: 'You will be signed out of ResumeAI on this device. Other active sessions will remain signed in.'}
				</p>

				<div className='mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					<button
						type='button'
						onClick={onCancel}
						className='rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white'
					>
						Cancel
					</button>

					<button
						type='button'
						onClick={onConfirm}
						className='rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20'
					>
						{isAll ? 'Sign out all devices' : 'Sign out'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default function Settings() {
	const [settings, setSettings] = useState(initialSettings)
	const [dialog, setDialog] = useState(null)
	const [notice, setNotice] = useState('')

	// Illustrative account data. Replace with the authenticated user.
	const account = {
		firstName: 'Sudipto',
		lastName: 'Raha',
		profession: 'Backend Developer',
		email: 'sudipto@example.com',
		isVerified: true,
	}

	const updateSetting = (key, value) => {
		setSettings((current) => ({
			...current,
			[key]: value,
		}))
		setNotice('')
	}

	const toggleFocus = (focus) => {
		setSettings((current) => ({
			...current,
			interviewFocus: current.interviewFocus.includes(focus)
				? current.interviewFocus.filter((item) => item !== focus)
				: [...current.interviewFocus, focus],
		}))
		setNotice('')
	}

	const handleConfirmSignout = () => {
		// UI placeholder:
		// Connect this action to AuthProvider.signout().
		setDialog(null)
		setNotice(
			'Sign out is a UI placeholder. Connect it to your authentication provider.',
		)
	}

	const handleConfirmSignoutAll = () => {
		// UI placeholder:
		// Connect this action to AuthProvider.signoutAll().
		setDialog(null)
		setNotice(
			'Sign out all is a UI placeholder. Connect it to your authentication provider.',
		)
	}

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-6xl'>
				{/* Page heading */}
				<header className='mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
					<div>
						<div className='mb-2 flex items-center gap-2 text-xs text-slate-500'>
							<Link
								href='/dashboard'
								className='transition-colors hover:text-slate-300'
							>
								Dashboard
							</Link>
							<SettingsIcon
								name='chevron'
								size={12}
							/>
							<span className='text-indigo-300'>Settings</span>
						</div>

						<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
							Settings
						</h1>

						<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
							Manage your account, security, and AI preparation
							preferences.
						</p>
					</div>

					<Link
						href='/profile'
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

				{/* Local UI feedback */}
				{notice && (
					<div
						role='status'
						className='mb-6 rounded-xl border border-amber-400/15 bg-amber-500/6 px-4 py-3 text-xs leading-5 text-amber-200'
					>
						{notice}
					</div>
				)}

				<div className='grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'>
					{/* Left column */}
					<div className='space-y-5'>
						{/* Account */}
						<SettingsCard>
							<SectionHeading
								icon='user'
								title='Account'
								description='Your identity and account verification.'
							/>

							<div className='flex items-center gap-4 rounded-xl border border-white/6 bg-white/2 p-4'>
								<div className='flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-500/20 to-cyan-500/10 text-lg font-semibold text-indigo-200'>
									{account.firstName[0]}
									{account.lastName[0]}
								</div>

								<div className='min-w-0 flex-1'>
									<p className='truncate text-sm font-semibold text-white'>
										{account.firstName} {account.lastName}
									</p>
									<p className='mt-1 truncate text-xs text-slate-400'>
										{account.profession}
									</p>
									<div className='mt-2 flex flex-wrap items-center gap-2'>
										<span className='inline-flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-500/8 px-2 py-1 text-[10px] font-medium text-emerald-300'>
											<SettingsIcon
												name='check'
												size={11}
											/>
											Email verified
										</span>
									</div>
								</div>

								<Link
									href='/profile/update'
									aria-label='Edit profile'
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
										{account.email}
									</p>
								</SettingRow>
							</div>

							<div className='mt-2 rounded-lg border border-white/6 bg-white/2 px-3 py-2.5'>
								<p className='text-xs leading-5 text-slate-500'>
									To change your personal details, update your
									profile.
								</p>
								<Link
									href='/profile/update'
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

						{/* Security */}
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
											This browser is currently signed in
											to your account.
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
										onClick={() => setDialog('current')}
										className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:border-white/20 hover:bg-white/4 hover:text-white sm:w-auto'
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
										onClick={() => setDialog('all')}
										className='inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-400/20 bg-red-500/6 px-3 py-2.5 text-xs font-medium text-red-300 transition-colors hover:border-red-400/40 hover:bg-red-500/12 sm:w-auto'
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
								If you suspect unauthorized access, sign out all
								devices and sign in again with your credentials.
							</p>
						</SettingsCard>

						{/* Privacy */}
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
									Your profile information, interview
									preparation reports, and generated resume
									records are account-related data.
								</p>
							</div>

							<div className='mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
								<div>
									<p className='text-sm font-medium text-slate-200'>
										Account deletion
									</p>
									<p className='mt-1 text-xs leading-5 text-slate-500'>
										Permanently remove your account and
										associated data, subject to your
										retention policy.
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
					</div>

					{/* Right column */}
					<div className='space-y-5'>
						{/* Interview preferences */}
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
										updateSetting(
											'preparationDuration',
											event.target.value,
										)
									}
								>
									<option value='5'>5 days</option>
									<option value='7'>7 days</option>
									<option value='10'>10 days</option>
									<option value='14'>14 days</option>
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
									{focusOptions.map((focus) => {
										const selected =
											settings.interviewFocus.includes(
												focus,
											)

										return (
											<button
												key={focus}
												type='button'
												aria-pressed={selected}
												onClick={() =>
													toggleFocus(focus)
												}
												className={`rounded-full border px-3 py-2 text-xs font-medium transition-colors ${
													selected
														? 'border-indigo-400/30 bg-indigo-500/10 text-indigo-200'
														: 'border-white/10 bg-white/2 text-slate-400 hover:border-white/20 hover:text-slate-200'
												}`}
											>
												{selected && (
													<span className='mr-1'>
														✓
													</span>
												)}
												{focus}
											</button>
										)
									})}
								</div>
							</div>

							<div className='rounded-lg border border-indigo-400/10 bg-indigo-500/4 px-3 py-2.5'>
								<p className='text-xs leading-5 text-slate-400'>
									These preferences are local UI state only.
									They will not affect generated reports until
									saved and used by the report generation
									flow.
								</p>
							</div>
						</SettingsCard>

						{/* Resume preferences */}
						<SettingsCard>
							<SectionHeading
								icon='file'
								title='Resume preferences'
								description='Set your default resume optimization options.'
							/>

							<div className='space-y-3'>
								<button
									type='button'
									aria-pressed={
										settings.resumeFormat === 'ats'
									}
									onClick={() =>
										updateSetting('resumeFormat', 'ats')
									}
									className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
										settings.resumeFormat === 'ats'
											? 'border-indigo-400/30 bg-indigo-500/6'
											: 'border-white/[0.07] bg-white/1.5 hover:border-white/15'
									}`}
								>
									<span
										className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
											settings.resumeFormat === 'ats'
												? 'border-indigo-400 bg-indigo-400'
												: 'border-slate-600'
										}`}
									>
										{settings.resumeFormat === 'ats' && (
											<span className='h-1.5 w-1.5 rounded-full bg-[#030712]' />
										)}
									</span>
									<span>
										<span className='block text-sm font-medium text-slate-200'>
											ATS-friendly resume
										</span>
										<span className='mt-1 block text-xs leading-5 text-slate-500'>
											Prioritize clear structure, standard
											headings, and applicant tracking
											system readability.
										</span>
									</span>
								</button>

								<button
									type='button'
									aria-pressed={
										settings.resumeFormat === 'modern'
									}
									onClick={() =>
										updateSetting('resumeFormat', 'modern')
									}
									className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
										settings.resumeFormat === 'modern'
											? 'border-indigo-400/30 bg-indigo-500/6'
											: 'border-white/[0.07] bg-white/1.5 hover:border-white/15'
									}`}
								>
									<span
										className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
											settings.resumeFormat === 'modern'
												? 'border-indigo-400 bg-indigo-400'
												: 'border-slate-600'
										}`}
									>
										{settings.resumeFormat === 'modern' && (
											<span className='h-1.5 w-1.5 rounded-full bg-[#030712]' />
										)}
									</span>
									<span>
										<span className='block text-sm font-medium text-slate-200'>
											Modern professional
										</span>
										<span className='mt-1 block text-xs leading-5 text-slate-500'>
											Prefer a contemporary presentation
											while maintaining professional
											structure.
										</span>
									</span>
								</button>
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
										updateSetting('prioritizeATS', value)
									}
								/>
							</SettingRow>
						</SettingsCard>

						{/* Appearance */}
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
									<span className='text-[10px] text-slate-500'>
										Default
									</span>
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
										updateSetting('compactDashboard', value)
									}
								/>
							</SettingRow>

							<p className='mt-2 text-[10px] leading-5 text-slate-600'>
								Appearance changes are not persisted or applied
								to other components yet.
							</p>
						</SettingsCard>

						{/* Support */}
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
										Have a question about your account or
										preparation reports?
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
					</div>
				</div>

				<footer className='mt-8 border-t border-white/6 pt-5 text-center text-[11px] text-slate-600'>
					ResumeAI · Account and application settings
				</footer>
			</div>

			{/* Sign-out confirmation */}
			{dialog && (
				<ConfirmDialog
					type={dialog === 'all' ? 'all' : 'current'}
					onCancel={() => setDialog(null)}
					onConfirm={
						dialog === 'all'
							? handleConfirmSignoutAll
							: handleConfirmSignout
					}
				/>
			)}
		</main>
	)
}