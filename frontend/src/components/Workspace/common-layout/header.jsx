'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Icon from '../../shared/icon'
import { useAuth } from '@/context/AuthContext'
import { useProfile } from '@/context/ProfileContext'

// ---------- constants ----------

const SIGNIN_PATH = '/signin'
const PROFILE_PATH = '/dashboard/profile'
const UPDATE_PROFILE_PATH = '/dashboard/profile/update-profile'
const CREATE_PROFILE_PATH = '/dashboard/profile/create-profile'
const DEFAULT_DISPLAY_NAME = 'Your Workspace'

// shared look for every row inside the dropdown
const MENU_ITEM_CLASS =
	'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-xs font-medium text-slate-300 outline-none transition-colors hover:bg-slate-800/70 hover:text-white focus-visible:bg-slate-800/70 focus-visible:text-white disabled:cursor-not-allowed disabled:opacity-60'

// svg paths for the icons used only by this component
const ICON_PATHS = {
	chevron: 'm6 9 6 6 6-6',
	user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
	edit: 'm14 5 5 5M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z',
	plus: 'M12 5v14m-7-7h14',
	refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5',
	logout: 'M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11',
	devices: 'M4 6h16v10H4zM8 20h8M12 16v4',
}

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

function SvgIcon({ name, className = 'h-4 w-4' }) {
	return (
		<svg
			viewBox='0 0 24 24'
			fill='none'
			className={className}
			aria-hidden='true'
		>
			<path
				d={ICON_PATHS[name]}
				stroke='currentColor'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

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
		<SvgIcon
			name='user'
			className='h-5 w-5'
		/>
	)
}

// ---------- component ----------

export default function Header({
	onMenuClick,
	title = 'Workspace',
	description = 'Your career development workspace',
}) {
	const router = useRouter()
	const menuId = useId()

	const { user, isLoading: isAuthLoading, signout, signoutAll } = useAuth()
	const {
		profile,
		hasProfile,
		isProfileLoading,
		profileError,
		refetchProfile,
	} = useProfile()

	const [isOpen, setIsOpen] = useState(false)
	const [isConfirmingAll, setIsConfirmingAll] = useState(false)
	const [isSigningOut, setIsSigningOut] = useState(false)

	const containerRef = useRef(null)
	const triggerRef = useRef(null)
	const menuRef = useRef(null)

	// ----- display values (all derived, no extra state) -----

	// true while we don't yet know who the user is or whether they have a profile
	const isBusy = isAuthLoading || isProfileLoading

	const fullName = hasProfile
		? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
		: ''
	const displayName = fullName || DEFAULT_DISPLAY_NAME
	const initials = fullName ? getInitials(fullName) : ''
	const profileImage = hasProfile ? profile.profileImage : null

	// small second line inside the dropdown (field names depend on your auth user object)
	const accountLine = user?.email ?? user?.username ?? ''

	// ----- menu open / close -----

	const closeMenu = useCallback(() => {
		setIsOpen(false)
		setIsConfirmingAll(false)
	}, [])

	// closing on outside click / Escape while the menu is open
	useEffect(() => {
		if (!isOpen) return

		const handlePointerDown = (event) => {
			if (!containerRef.current?.contains(event.target)) closeMenu()
		}

		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				closeMenu()
				triggerRef.current?.focus()
			}
		}

		document.addEventListener('pointerdown', handlePointerDown)
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown)
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [isOpen, closeMenu])

	// moving focus into the menu when it opens (keyboard users land on the first item)
	useEffect(() => {
		if (isOpen) menuRef.current?.querySelector('[role="menuitem"]')?.focus()
	}, [isOpen])

	// arrow keys / Home / End move between menu items (standard menu pattern)
	const handleMenuKeyDown = (event) => {
		const items = Array.from(
			menuRef.current?.querySelectorAll(
				'[role="menuitem"]:not(:disabled)',
			) ?? [],
		)
		if (items.length === 0) return

		const index = items.indexOf(document.activeElement)
		let nextItem

		switch (event.key) {
			case 'ArrowDown':
				nextItem = items[(index + 1) % items.length]
				break
			case 'ArrowUp':
				nextItem = items[(index - 1 + items.length) % items.length]
				break
			case 'Home':
				nextItem = items[0]
				break
			case 'End':
				nextItem = items[items.length - 1]
				break
			case 'Tab':
				closeMenu()
				return
			default:
				return
		}

		event.preventDefault()
		nextItem.focus()
	}

	// ----- sign out -----

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
			closeMenu()
			setIsSigningOut(false)
			router.replace(SIGNIN_PATH)
		}
	}

	// ----- render -----

	return (
		<header className='sticky top-0 z-30 flex h-18 items-center justify-between border-b border-slate-800/80 bg-[#030712]/90 px-4 backdrop-blur-xl sm:px-6 lg:px-8'>
			<div className='flex items-center gap-3'>
				<button
					type='button'
					aria-label='Open navigation'
					onClick={onMenuClick}
					className='rounded-lg border border-slate-800 bg-slate-900/60 p-2 text-slate-300 transition-colors hover:bg-slate-800 lg:hidden'
				>
					<Icon
						name='menu'
						size={20}
					/>
				</button>

				<div>
					<p className='text-sm font-semibold text-white'>{title}</p>

					<p className='hidden text-xs text-slate-500 sm:block'>
						{description}
					</p>
				</div>
			</div>

			{/* Account menu */}
			<div
				ref={containerRef}
				className='relative'
			>
				<button
					ref={triggerRef}
					type='button'
					aria-haspopup='menu'
					aria-expanded={isOpen}
					aria-controls={isOpen ? menuId : undefined}
					aria-label={`Account menu for ${displayName}`}
					onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
					className='flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40'
				>
					<span className='flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-indigo-400/20 bg-indigo-500/10 text-xs font-bold text-indigo-200'>
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
					</span>

					<span className='hidden text-left sm:block'>
						{isBusy ? (
							<>
								<span
									aria-hidden='true'
									className='block h-3 w-24 animate-pulse rounded bg-slate-800'
								/>
								<span
									aria-hidden='true'
									className='mt-1.5 block h-2 w-16 animate-pulse rounded bg-slate-800/70'
								/>
							</>
						) : (
							<>
								<span className='block max-w-40 truncate text-xs font-semibold text-slate-200'>
									{displayName}
								</span>
								<span className='mt-0.5 block text-[10px] text-slate-500'>
									Career Dashboard
								</span>
							</>
						)}
					</span>

					<SvgIcon
						name='chevron'
						className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
							isOpen ? 'rotate-180' : ''
						}`}
					/>
				</button>

				{isOpen && (
					<div
						id={menuId}
						className='absolute right-0 top-full z-40 mt-2 w-64 overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40'
					>
						{/* who is signed in (also the only place the name shows on mobile) */}
						<div className='border-b border-slate-800/80 px-4 py-3'>
							<p className='truncate text-sm font-semibold text-white'>
								{displayName}
							</p>
							{accountLine && (
								<p className='mt-0.5 truncate text-xs text-slate-500'>
									{accountLine}
								</p>
							)}
						</div>

						<div
							ref={menuRef}
							role='menu'
							aria-label='Account menu'
							onKeyDown={handleMenuKeyDown}
							className='p-1.5'
						>
							{/* profile actions depend on whether a profile exists */}
							{hasProfile ? (
								<>
									<Link
										href={PROFILE_PATH}
										role='menuitem'
										tabIndex={-1}
										onClick={closeMenu}
										className={MENU_ITEM_CLASS}
									>
										<SvgIcon name='user' />
										View profile
									</Link>

									<Link
										href={UPDATE_PROFILE_PATH}
										role='menuitem'
										tabIndex={-1}
										onClick={closeMenu}
										className={MENU_ITEM_CLASS}
									>
										<SvgIcon name='edit' />
										Edit profile
									</Link>
								</>
							) : profileError ? (
								// we don't know whether a profile exists, so we must not offer "Create"
								<button
									type='button'
									role='menuitem'
									tabIndex={-1}
									onClick={() => {
										refetchProfile()
										closeMenu()
									}}
									className={MENU_ITEM_CLASS}
								>
									<SvgIcon name='refresh' />
									Retry loading profile
								</button>
							) : (
								<Link
									href={CREATE_PROFILE_PATH}
									role='menuitem'
									tabIndex={-1}
									onClick={closeMenu}
									className={MENU_ITEM_CLASS}
								>
									<SvgIcon name='plus' />
									Create profile
								</Link>
							)}

							<div
								role='separator'
								className='my-1.5 h-px bg-slate-800/80'
							/>

							{isConfirmingAll ? (
								// two-step confirm: this ends the session on every device
								<div className='rounded-lg border border-red-400/20 bg-red-500/5 p-3'>
									<p className='text-xs leading-5 text-slate-300'>
										Sign out from all devices?
									</p>

									<div className='mt-2 flex gap-2'>
										<button
											type='button'
											role='menuitem'
											tabIndex={-1}
											disabled={isSigningOut}
											onClick={() =>
												runSignout(signoutAll)
											}
											className='flex-1 cursor-pointer rounded-md bg-red-500/90 px-3 py-2 text-xs font-semibold text-white outline-none transition-colors hover:bg-red-500 focus-visible:ring-2 focus-visible:ring-red-300 disabled:cursor-not-allowed disabled:opacity-60'
										>
											{isSigningOut
												? 'Signing out…'
												: 'Yes, sign out'}
										</button>

										<button
											type='button'
											role='menuitem'
											tabIndex={-1}
											disabled={isSigningOut}
											onClick={() =>
												setIsConfirmingAll(false)
											}
											className='flex-1 cursor-pointer rounded-md border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 outline-none transition-colors hover:bg-slate-800/70 focus-visible:ring-2 focus-visible:ring-indigo-400/40 disabled:cursor-not-allowed disabled:opacity-60'
										>
											Cancel
										</button>
									</div>
								</div>
							) : (
								<>
									<button
										type='button'
										role='menuitem'
										tabIndex={-1}
										disabled={isSigningOut}
										onClick={() => setIsConfirmingAll(true)}
										className={MENU_ITEM_CLASS}
									>
										<SvgIcon name='devices' />
										Sign out from all devices
									</button>

									<button
										type='button'
										role='menuitem'
										tabIndex={-1}
										disabled={isSigningOut}
										onClick={() => runSignout(signout)}
										className={`${MENU_ITEM_CLASS} text-red-300 hover:text-red-200 focus-visible:text-red-200`}
									>
										<SvgIcon name='logout' />
										{isSigningOut
											? 'Signing out…'
											: 'Sign out'}
									</button>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</header>
	)
}