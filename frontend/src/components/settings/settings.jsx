'use client'

import { useState } from 'react'

import SettingsHeader from './header'
import AccountSection from './account'
import SecuritySection from './security'
import PrivacySection from './privacy'
import InterviewPreferences from './interviewPreferences'
import ResumePreferences from './resumePreferences'
import AppearanceSection from './appearance'
import SupportSection from './support'

import { ConfirmDialog, SettingsNotice, SettingsFooter } from './settingsUi'

export const INITIAL_SETTINGS = {
	preparationDuration: '7',
	interviewFocus: ['Technical', 'Behavioral'],
	resumeFormat: 'ats',
	prioritizeATS: true,
	compactDashboard: false,
}

export default function Settings() {
	const [settings, setSettings] = useState(() => ({
		...INITIAL_SETTINGS,
		interviewFocus: [...INITIAL_SETTINGS.interviewFocus],
	}))

	const [dialog, setDialog] = useState(null)
	const [notice, setNotice] = useState('')

	// Temporary UI data. Replace with authenticated user data later.
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
		setSettings((current) => {
			const selected = current.interviewFocus.includes(focus)

			return {
				...current,
				interviewFocus: selected
					? current.interviewFocus.filter((item) => item !== focus)
					: [...current.interviewFocus, focus],
			}
		})

		setNotice('')
	}

	// UI-only placeholders. Connect AuthProvider methods later.
	const handleConfirmSignout = () => {
		setDialog(null)
		setNotice(
			'Sign out is not connected yet. Connect this action to AuthProvider.signout().',
		)
	}

	const handleConfirmSignoutAll = () => {
		setDialog(null)
		setNotice(
			'Sign out all is not connected yet. Connect this action to AuthProvider.signoutAll().',
		)
	}

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-6xl'>
				<SettingsHeader />

				<SettingsNotice
					notice={notice}
					onDismiss={() => setNotice('')}
				/>

				<div className='grid items-start gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]'>
					{/* Left column */}
					<div className='space-y-5'>
						<AccountSection account={account} />

						<SecuritySection
							onRequestSignout={() => setDialog('current')}
							onRequestSignoutAll={() => setDialog('all')}
						/>

						<PrivacySection />
					</div>

					{/* Right column */}
					<div className='space-y-5'>
						<InterviewPreferences
							settings={settings}
							onSettingChange={updateSetting}
							onToggleFocus={toggleFocus}
						/>

						<ResumePreferences
							settings={settings}
							onSettingChange={updateSetting}
						/>

						<AppearanceSection
							settings={settings}
							onSettingChange={updateSetting}
						/>

						<SupportSection />
					</div>
				</div>

				<SettingsFooter />
			</div>

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