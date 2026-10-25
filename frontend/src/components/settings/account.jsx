'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/context/ProfileContext'
import {
	SettingsCard,
	SectionHeading,
	SettingRow,
	SettingsIcon,
} from './settingsUi'

// ---------- constants ----------

const PROFILE_PATH = '/dashboard/profile'
const UPDATE_PROFILE_PATH = '/dashboard/profile/update-profile'
const CREATE_PROFILE_PATH = '/dashboard/profile/create-profile'

const ICON_BUTTON_CLASS =
	'rounded-lg border border-white/10 p-2 text-slate-400 transition-colors hover:border-indigo-400/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40'

const TEXT_LINK_CLASS =
	'mt-2 inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200 focus-visible:outline-none focus-visible:underline'

// ---------- pure helpers ----------

// first letter of the first 2 words; one word gives one letter
function getInitials(fullName) {
	return fullName
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((word) => Array.from(word)[0])
		.join('')
		.toUpperCase()
}

// ---------- small reusable pieces ----------

// shows the photo, else the initials, else a default silhouette
// (the parent passes key={src} so the failed state resets when the image changes)
function Avatar({ src, initials }) {
	const [hasFailed, setHasFailed] = useState(false)

	if (src && !hasFailed) {
		return (
			// plain <img>: works for any CDN host without next.config image domains
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={src}
				alt=''
				onError={() => setHasFailed(true)}
				className='h-full w-full object-cover'
			/>
		)
	}

	if (initials) return <span aria-hidden='true'>{initials}</span>

	return (
		<SettingsIcon
			name='user'
			size={24}
		/>
	)
}

// ---------- component ----------

export default function AccountSection() {
	const { user, isLoading: isAuthLoading } = useAuth()
	const {
		profile,
		hasProfile,
		isProfileLoading,
		profileError,
		refetchProfile,
	} = useProfile()

	// ----- display values (all derived, no extra state) -----

	// true while we don't yet know who the user is or whether they have a profile
	const isBusy = isAuthLoading || isProfileLoading

	const fullName = hasProfile
		? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
		: ''

	// without a profile, falling back to the account username, then a generic label
	const displayName = fullName || user?.username || 'User'
	const initials = fullName ? getInitials(fullName) : ''
	const profileImage = hasProfile ? profile.profileImage : null

	// the line under the name explains the profile state instead of a misleading blank
	const subtitle = hasProfile
		? profile.profession || 'Profession not set'
		: profileError
			? 'Could not load your profile'
			: 'No profile created yet'

	// only showing the badge when the backend actually tells us the value
	const hasVerificationStatus = typeof user?.isVerified === 'boolean'
	const isVerified = user?.isVerified === true

	return (
		<SettingsCard>
			<SectionHeading
				icon='user'
				title='Account'
				description='Your identity and account verification.'
			/>

			<div className='flex items-center gap-4 rounded-xl border border-white/6 bg-white/2 p-4'>
				<div className='flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-indigo-400/20 bg-linear-to-br from-indigo-500/20 to-cyan-500/10 text-lg font-semibold text-indigo-200'>
					{isBusy ? (
						<span
							aria-hidden='true'
							className='h-full w-full animate-pulse bg-slate-800'
						/>
					) : (
						<Avatar
							key={profileImage ?? 'no-image'}
							src={profileImage}
							initials={initials}
						/>
					)}
				</div>

				<div className='min-w-0 flex-1'>
					{isBusy ? (
						<div
							role='status'
							aria-label='Loading account'
						>
							<span
								aria-hidden='true'
								className='block h-3.5 w-32 animate-pulse rounded bg-slate-800'
							/>
							<span
								aria-hidden='true'
								className='mt-2 block h-3 w-24 animate-pulse rounded bg-slate-800/70'
							/>
						</div>
					) : (
						<>
							<p className='truncate text-sm font-semibold text-white'>
								{displayName}
							</p>

							<p className='mt-1 truncate text-xs text-slate-400'>
								{subtitle}
							</p>

							{hasVerificationStatus && (
								<div className='mt-2 flex flex-wrap items-center gap-2'>
									<span
										className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${
											isVerified
												? 'border-emerald-400/15 bg-emerald-500/8 text-emerald-300'
												: 'border-amber-400/15 bg-amber-500/8 text-amber-300'
										}`}
									>
										<SettingsIcon
											name={
												isVerified ? 'check' : 'shield'
											}
											size={11}
										/>
										{isVerified
											? 'Email verified'
											: 'Email not verified'}
									</span>
								</div>
							)}
						</>
					)}
				</div>

				{/* the shortcut on the right depends on the profile state */}
				{!isBusy &&
					(hasProfile ? (
						<Link
							href={PROFILE_PATH}
							aria-label='View profile'
							className={ICON_BUTTON_CLASS}
						>
							<SettingsIcon
								name='arrow'
								size={15}
							/>
						</Link>
					) : profileError ? null : (
						<Link
							href={CREATE_PROFILE_PATH}
							aria-label='Create profile'
							className={ICON_BUTTON_CLASS}
						>
							<SettingsIcon
								name='arrow'
								size={15}
							/>
						</Link>
					))}
			</div>

			<div className='mt-4'>
				<SettingRow
					title='Email address'
					description='Used for sign-in and account notifications.'
					divider={false}
				>
					{isAuthLoading ? (
						<span
							role='status'
							aria-label='Loading email'
							className='block h-3 w-40 animate-pulse rounded bg-slate-800'
						/>
					) : (
						<p className='break-all text-xs text-slate-300'>
							{user?.email || 'Email unavailable'}
						</p>
					)}
				</SettingRow>
			</div>

			{/* guidance card: wording and action follow the profile state */}
			{!isBusy && (
				<div className='mt-2 rounded-lg border border-white/6 bg-white/2 px-3 py-2.5'>
					{hasProfile ? (
						<>
							<p className='text-xs leading-5 text-slate-500'>
								To change your personal details, update your
								profile.
							</p>

							<Link
								href={UPDATE_PROFILE_PATH}
								className={TEXT_LINK_CLASS}
							>
								Manage profile
								<SettingsIcon
									name='chevron'
									size={12}
								/>
							</Link>
						</>
					) : profileError ? (
						// we don't know whether a profile exists, so we must not offer "Create"
						<>
							<p
								role='alert'
								className='text-xs leading-5 text-slate-500'
							>
								We couldn’t load your profile.{' '}
								{profileError.message}
							</p>

							<button
								type='button'
								onClick={refetchProfile}
								className={TEXT_LINK_CLASS}
							>
								Try again
							</button>
						</>
					) : (
						<>
							<p className='text-xs leading-5 text-slate-500'>
								Create your profile to add your name, photo, and
								experience.
							</p>

							<Link
								href={CREATE_PROFILE_PATH}
								className={TEXT_LINK_CLASS}
							>
								Create profile
								<SettingsIcon
									name='chevron'
									size={12}
								/>
							</Link>
						</>
					)}
				</div>
			)}
		</SettingsCard>
	)
}