'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import {
	SettingsCard,
	SectionHeading,
	SettingRow,
	SettingsIcon,
} from './settingsUi'

// ---------- constants ----------

const SIGNIN_PATH = '/signin'

const BUTTON_BASE =
	'inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'

const BUTTON_NEUTRAL = `${BUTTON_BASE} border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/4 hover:text-white focus-visible:ring-indigo-400/40`
const BUTTON_DANGER_SOFT = `${BUTTON_BASE} border-red-400/20 bg-red-500/6 text-red-300 hover:border-red-400/40 hover:bg-red-500/12 focus-visible:ring-red-400/40`
const BUTTON_DANGER_SOLID = `${BUTTON_BASE} border-transparent bg-red-500/90 font-semibold text-white hover:bg-red-500 focus-visible:ring-red-300`

// ---------- component ----------

export default function SecuritySection() {
	const router = useRouter()
	const { signout, signoutAll } = useAuth()

	// true while the "are you sure?" step is showing
	const [isConfirmingAll, setIsConfirmingAll] = useState(false)

	// true while any sign-out request is running (blocks double clicks)
	const [isSigningOut, setIsSigningOut] = useState(false)

	// refs for focus management
	const signoutAllButtonRef = useRef(null)
	const cancelButtonRef = useRef(null)
	const shouldRestoreFocusRef = useRef(false)

	// moving focus to the SAFE option (Cancel) when the confirm step opens,
	// and back to the original button when the user cancels
	useEffect(() => {
		if (isConfirmingAll) {
			cancelButtonRef.current?.focus()
		} else if (shouldRestoreFocusRef.current) {
			shouldRestoreFocusRef.current = false
			signoutAllButtonRef.current?.focus()
		}
	}, [isConfirmingAll])

	const cancelConfirm = () => {
		shouldRestoreFocusRef.current = true
		setIsConfirmingAll(false)
	}

	// Escape cancels the confirm step (unless a request is already running)
	const handleConfirmKeyDown = (event) => {
		if (event.key === 'Escape' && !isSigningOut) {
			event.stopPropagation()
			cancelConfirm()
		}
	}

	// runs signout / signoutAll, then always leaves the dashboard
	const runSignout = async (signoutAction) => {
		if (isSigningOut) return

		setIsSigningOut(true)

		try {
			await signoutAction()
		} catch {
			// AuthContext clears the local session even when the api call fails,
			// so the user is signed out locally either way
		} finally {
			setIsSigningOut(false)
			router.replace(SIGNIN_PATH)
		}
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
						disabled={isSigningOut}
						onClick={() => runSignout(signout)}
						className={BUTTON_NEUTRAL}
					>
						<SettingsIcon
							name='logout'
							size={14}
						/>
						{isSigningOut && !isConfirmingAll
							? 'Signing out…'
							: 'Sign out'}
					</button>
				</SettingRow>

				<SettingRow
					title='Sign out all devices'
					description={
						isConfirmingAll
							? 'This ends every active session, including this one on this device. You will need to sign in again everywhere. Continue?'
							: 'End all active sessions, including sessions on other devices.'
					}
					divider={false}
				>
					{isConfirmingAll ? (
						// two-step confirm: this is destructive and affects every device
						<div
							role='group'
							aria-label='Confirm sign out of all devices'
							onKeyDown={handleConfirmKeyDown}
							className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'
						>
							<button
								ref={cancelButtonRef}
								type='button'
								disabled={isSigningOut}
								onClick={cancelConfirm}
								className={BUTTON_NEUTRAL}
							>
								Cancel
							</button>

							<button
								type='button'
								disabled={isSigningOut}
								onClick={() => runSignout(signoutAll)}
								className={BUTTON_DANGER_SOLID}
							>
								{isSigningOut
									? 'Signing out…'
									: 'Yes, sign out all'}
							</button>
						</div>
					) : (
						<button
							ref={signoutAllButtonRef}
							type='button'
							disabled={isSigningOut}
							onClick={() => setIsConfirmingAll(true)}
							className={BUTTON_DANGER_SOFT}
						>
							<SettingsIcon
								name='shield'
								size={14}
							/>
							Sign out from all devices
						</button>
					)}
				</SettingRow>
			</div>

			<p className='mt-3 text-[11px] leading-5 text-slate-600'>
				If you suspect unauthorized access, sign out all devices and
				sign in again with your credentials.
			</p>

			{/* announcing the state change to screen readers */}
			<p
				role='status'
				className='sr-only'
			>
				{isSigningOut ? 'Signing out…' : ''}
			</p>
		</SettingsCard>
	)
}