'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/context/ProfileContext'
import LoadingScreen from '@/components/shared/loadingScreen'

// ---------- constants ----------

const UPDATE_PROFILE_PATH = '/dashboard/profile/update-profile'
const CREATE_PROFILE_PATH = '/dashboard/profile/create-profile'

// ---------- pure helpers ----------

// only http / https links become clickable (defence in depth against javascript: and data: URLs)
function isSafeHttpUrl(value) {
	try {
		const url = new URL(value)
		return url.protocol === 'http:' || url.protocol === 'https:'
	} catch {
		return false
	}
}

// "+880 1712-345678" -> "+8801712345678" so the tel: link works
function toTelHref(phone) {
	return `tel:${phone.replace(/[^\d+]/g, '')}`
}

// "Dhaka, Bangladesh" / "Dhaka" / "Bangladesh" / '' (whichever parts exist)
function formatLocation(location) {
	return [location?.city, location?.country].filter(Boolean).join(', ')
}

// "Oct 9, 2026" (returns '' when the date is missing or invalid)
function formatDate(value) {
	const date = new Date(value)
	if (!value || Number.isNaN(date.getTime())) return ''

	return new Intl.DateTimeFormat('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	}).format(date)
}

// ---------- small reusable pieces ----------

// shows the photo, or initials if there is no photo / the image fails to load
// (the parent passes key={src} so the failed state resets when the image changes)
function Avatar({ src, initials }) {
	const [hasFailed, setHasFailed] = useState(false)

	if (src && !hasFailed) {
		return (
			// plain <img>: works for any CDN host without next.config image domains
			// eslint-disable-next-line @next/next/no-img-element
			<img
				src={src}
				alt='Profile photo'
				onError={() => setHasFailed(true)}
				className='h-full w-full object-cover'
			/>
		)
	}

	return <span aria-hidden='true'>{initials}</span>
}

// muted text for fields the user has not filled in yet
function EmptyText({ children }) {
	return <p className='text-sm italic text-slate-600'>{children}</p>
}

// ---------- profile view (only mounted once the profile exists) ----------

function ProfileView({ profile }) {
	// deriving display values once, so the JSX below stays simple
	const fullName = `${profile.firstName} ${profile.lastName}`.trim()
	const initials =
		`${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase() ||
		'?'

	const locationText = formatLocation(profile.location)
	const hasExperience = typeof profile.experience === 'number'
	const skills = profile.skills ?? []
	const updatedOn = formatDate(profile.updatedAt)

	// dropping any link that is not a safe http(s) url
	const socialLinks = (profile.socialLinks ?? []).filter((link) =>
		isSafeHttpUrl(link.url),
	)

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10'>
			<div className='mx-auto max-w-5xl'>
				<div className='mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end'>
					<div>
						<nav className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'>
							<Link
								href='/dashboard'
								className='transition hover:text-slate-300'
							>
								Dashboard
							</Link>
							<span>/</span>
							<span className='text-indigo-400'>Profile</span>
						</nav>

						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							My profile
						</h1>

						<p className='mt-2 text-sm text-slate-400'>
							Your professional identity in one place.
						</p>
					</div>

					<Link
						href={UPDATE_PROFILE_PATH}
						className='inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg border border-slate-700 bg-slate-900/60 px-4 text-xs font-semibold text-slate-200 transition-colors hover:border-indigo-400/30 hover:bg-slate-800 sm:self-auto'
					>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-4 w-4'
							aria-hidden='true'
						>
							<path
								d='m14 5 5 5M4 20l4.5-1 10.8-10.8a2.1 2.1 0 0 0-3-3L5.5 16 4 20Z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Edit profile
					</Link>
				</div>

				{/* Header card */}
				<section className='relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-8'>
					<div
						aria-hidden='true'
						className='pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-indigo-500/8 blur-[100px]'
					/>

					<div className='relative flex flex-col gap-5 sm:flex-row sm:items-center'>
						<div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-2xl font-semibold text-indigo-300'>
							<Avatar
								key={profile.profileImage ?? 'no-image'}
								src={profile.profileImage}
								initials={initials}
							/>
						</div>

						<div className='min-w-0 flex-1'>
							<h2 className='wrap-break-word text-xl font-semibold tracking-tight text-white'>
								{fullName}
							</h2>

							{profile.profession && (
								<p className='mt-1 text-sm font-medium text-indigo-300'>
									{profile.profession}
								</p>
							)}

							{(locationText || hasExperience) && (
								<div className='mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400'>
									{locationText && (
										<span className='inline-flex items-center gap-1.5'>
											<svg
												viewBox='0 0 24 24'
												fill='none'
												className='h-4 w-4 text-slate-500'
												aria-hidden='true'
											>
												<path
													d='M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z'
													stroke='currentColor'
													strokeWidth='1.5'
												/>
												<circle
													cx='12'
													cy='10'
													r='2.5'
													stroke='currentColor'
													strokeWidth='1.5'
												/>
											</svg>
											{locationText}
										</span>
									)}

									{hasExperience && (
										<span className='inline-flex items-center gap-1.5'>
											<svg
												viewBox='0 0 24 24'
												fill='none'
												className='h-4 w-4 text-slate-500'
												aria-hidden='true'
											>
												<circle
													cx='12'
													cy='12'
													r='9'
													stroke='currentColor'
													strokeWidth='1.5'
												/>
												<path
													d='M12 7v5l3 2'
													stroke='currentColor'
													strokeWidth='1.5'
													strokeLinecap='round'
												/>
											</svg>
											{profile.experience}{' '}
											{profile.experience === 1
												? 'year'
												: 'years'}{' '}
											of experience
										</span>
									)}
								</div>
							)}
						</div>

						{updatedOn && (
							<div className='inline-flex w-fit items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-500/[0.07] px-3 py-1.5 text-xs font-medium text-emerald-300'>
								<span
									aria-hidden='true'
									className='h-1.5 w-1.5 rounded-full bg-emerald-400'
								/>
								Updated {updatedOn}
							</div>
						)}
					</div>
				</section>

				<div className='mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]'>
					<div className='space-y-5'>
						{/* About */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4'
										aria-hidden='true'
									>
										<path
											d='M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</div>

								<h2 className='text-sm font-semibold text-white'>
									About me
								</h2>
							</div>

							{profile.bio ? (
								// whitespace-pre-line keeps the line breaks the user typed
								<p className='whitespace-pre-line wrap-break-word text-sm leading-7 text-slate-400'>
									{profile.bio}
								</p>
							) : (
								<EmptyText>No bio added yet.</EmptyText>
							)}
						</section>

						{/* Skills */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<div className='mb-4 flex items-center gap-3'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/15 bg-blue-500/10 text-blue-300'>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4'
										aria-hidden='true'
									>
										<path
											d='M4 7h16M4 12h16M4 17h10'
											stroke='currentColor'
											strokeWidth='1.5'
											strokeLinecap='round'
										/>
									</svg>
								</div>

								<h2 className='text-sm font-semibold text-white'>
									Skills and expertise
								</h2>
							</div>

							{skills.length > 0 ? (
								<ul className='flex flex-wrap gap-2'>
									{skills.map((skill) => (
										<li
											key={skill}
											className='rounded-lg border border-slate-700/80 bg-slate-950/50 px-3 py-2 text-xs font-medium text-slate-300'
										>
											{skill}
										</li>
									))}
								</ul>
							) : (
								<EmptyText>No skills added yet.</EmptyText>
							)}
						</section>
					</div>

					<div className='space-y-5'>
						{/* Contact */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<h2 className='mb-5 text-sm font-semibold text-white'>
								Contact information
							</h2>

							<div className='space-y-4'>
								<div className='flex items-start gap-3'>
									<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/70 text-slate-400'>
										<svg
											viewBox='0 0 24 24'
											fill='none'
											className='h-4 w-4'
											aria-hidden='true'
										>
											<path
												d='M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z'
												stroke='currentColor'
												strokeWidth='1.5'
												strokeLinejoin='round'
											/>
										</svg>
									</div>

									<div className='min-w-0'>
										<p className='text-xs text-slate-500'>
											Phone
										</p>
										<div className='mt-1'>
											{profile.phone ? (
												<a
													href={toTelHref(
														profile.phone,
													)}
													className='break-all text-sm text-slate-300 transition-colors hover:text-indigo-300'
												>
													{profile.phone}
												</a>
											) : (
												<EmptyText>Not added</EmptyText>
											)}
										</div>
									</div>
								</div>

								<div className='flex items-start gap-3'>
									<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/70 text-slate-400'>
										<svg
											viewBox='0 0 24 24'
											fill='none'
											className='h-4 w-4'
											aria-hidden='true'
										>
											<path
												d='M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z'
												stroke='currentColor'
												strokeWidth='1.5'
											/>
											<circle
												cx='12'
												cy='10'
												r='2.5'
												stroke='currentColor'
												strokeWidth='1.5'
											/>
										</svg>
									</div>

									<div className='min-w-0'>
										<p className='text-xs text-slate-500'>
											Location
										</p>
										<div className='mt-1'>
											{locationText ? (
												<p className='text-sm text-slate-300'>
													{locationText}
												</p>
											) : (
												<EmptyText>Not added</EmptyText>
											)}
										</div>
									</div>
								</div>
							</div>
						</section>

						{/* Social links */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-6'>
							<h2 className='mb-4 text-sm font-semibold text-white'>
								Professional links
							</h2>

							{socialLinks.length > 0 ? (
								<ul className='space-y-2'>
									{socialLinks.map((link) => (
										<li
											key={
												link._id ??
												`${link.platform}-${link.url}`
											}
										>
											<a
												href={link.url}
												target='_blank'
												rel='noopener noreferrer'
												className='flex items-center justify-between gap-3 rounded-lg border border-slate-800/80 bg-slate-950/40 px-3.5 py-3 text-xs font-medium text-slate-300 transition-colors hover:border-indigo-400/30 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40'
											>
												<span>
													{link.platform}
													<span className='sr-only'>
														{' '}
														(opens in a new tab)
													</span>
												</span>

												<svg
													viewBox='0 0 24 24'
													fill='none'
													className='h-4 w-4 shrink-0 text-slate-500'
													aria-hidden='true'
												>
													<path
														d='M14 5h5v5m0-5-9 9'
														stroke='currentColor'
														strokeWidth='1.5'
														strokeLinecap='round'
														strokeLinejoin='round'
													/>
													<path
														d='M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5'
														stroke='currentColor'
														strokeWidth='1.5'
														strokeLinecap='round'
													/>
												</svg>
											</a>
										</li>
									))}
								</ul>
							) : (
								<EmptyText>No links added yet.</EmptyText>
							)}
						</section>
					</div>
				</div>

				<div className='mt-6 rounded-xl border border-slate-800/70 bg-slate-900/20 px-4 py-4 sm:px-5'>
					<div className='flex items-center justify-center gap-2'>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-4 w-4 shrink-0 text-indigo-300'
							aria-hidden='true'
						>
							<path
								d='M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinejoin='round'
							/>
							<path
								d='m9 12 2 2 4-4'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>

						<p className='text-center text-xs leading-5 text-slate-500'>
							Your profile information is managed through your
							ResumeAI account.
						</p>
					</div>
				</div>
			</div>
		</main>
	)
}

// ---------- page component (data gate) ----------

export default function Profile() {
	const router = useRouter()
	const {
		profile,
		hasProfile,
		isProfileLoading,
		profileError,
		refetchProfile,
	} = useProfile()

	// no profile yet: sending the user to the create page
	useEffect(() => {
		if (!isProfileLoading && !profileError && !hasProfile) {
			router.replace(CREATE_PROFILE_PATH)
		}
	}, [isProfileLoading, profileError, hasProfile, router])

	// waiting for the profile to load
	if (isProfileLoading) {
		return <LoadingScreen />
	}

	// loading failed for a real reason (not 404)
	if (profileError) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-[#030712] px-4 text-white'>
				<div className='max-w-sm text-center'>
					<p className='text-sm text-slate-300'>
						{profileError.message}
					</p>
					<button
						type='button'
						onClick={refetchProfile}
						className='mt-4 inline-flex h-10 cursor-pointer items-center justify-center rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
					>
						Try again
					</button>
				</div>
			</main>
		)
	}

	// no profile: the effect above is redirecting
	if (!hasProfile) {
		return <LoadingScreen />
	}

	return <ProfileView profile={profile} />
}