'use client'

import { useState } from 'react'
import Link from 'next/link'

function ChevronIcon({ size = 18, className = '' }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth={1.7}
			strokeLinecap='round'
			strokeLinejoin='round'
			className={className}
			aria-hidden={true}
		>
			<path d='m9 18 6-6-6-6' />
		</svg>
	)
}

const MAX_SOCIAL_LINKS = 10

const SOCIAL_PLATFORMS = [
	{ value: 'Adobe Portfolio', label: 'Adobe Portfolio' },
	{ value: 'AngelList', label: 'AngelList' },
	{ value: 'ArtStation', label: 'ArtStation' },
	{ value: 'Behance', label: 'Behance' },
	{ value: 'Bitbucket', label: 'Bitbucket' },
	{ value: 'Blogger', label: 'Blogger' },
	{ value: 'Contra', label: 'Contra' },
	{ value: 'Dev.to', label: 'DEV Community' },
	{ value: 'Dribbble', label: 'Dribbble' },
	{ value: 'Facebook', label: 'Facebook' },
	{ value: 'Figma', label: 'Figma' },
	{ value: 'Fiverr', label: 'Fiverr' },
	{ value: 'Freelancer', label: 'Freelancer' },
	{ value: 'GitHub', label: 'GitHub' },
	{ value: 'GitLab', label: 'GitLab' },
	{ value: 'Google Scholar', label: 'Google Scholar' },
	{ value: 'HackerRank', label: 'HackerRank' },
	{ value: 'Instagram', label: 'Instagram' },
	{ value: 'LeetCode', label: 'LeetCode' },
	{ value: 'LinkedIn', label: 'LinkedIn' },
	{ value: 'Medium', label: 'Medium' },
	{ value: 'ORCID', label: 'ORCID' },
	{ value: 'Other', label: 'Other' },
	{ value: 'Pinterest', label: 'Pinterest' },
	{ value: 'Portfolio', label: 'Personal Website / Portfolio' },
	{ value: 'Product Hunt', label: 'Product Hunt' },
	{ value: 'Reddit', label: 'Reddit' },
	{ value: 'ResearchGate', label: 'ResearchGate' },
	{ value: 'Snapchat', label: 'Snapchat' },
	{ value: 'SoundCloud', label: 'SoundCloud' },
	{ value: 'Spotify', label: 'Spotify' },
	{ value: 'Stack Overflow', label: 'Stack Overflow' },
	{ value: 'Substack', label: 'Substack' },
	{ value: 'Threads', label: 'Threads' },
	{ value: 'TikTok', label: 'TikTok' },
	{ value: 'Twitch', label: 'Twitch' },
	{ value: 'Upwork', label: 'Upwork' },
	{ value: 'Vimeo', label: 'Vimeo' },
	{ value: 'Wellfound', label: 'Wellfound' },
	{ value: 'WordPress', label: 'WordPress' },
	{ value: 'X', label: 'X (Twitter)' },
	{ value: 'YouTube', label: 'YouTube' },
]

const getSocialPlaceholder = (platform) => {
	const placeholders = {
		'Adobe Portfolio': 'https://yourportfolio.myportfolio.com',
		AngelList: 'https://angel.co/u/yourusername',
		ArtStation: 'https://artstation.com/yourusername',
		Behance: 'https://behance.net/yourusername',
		Bitbucket: 'https://bitbucket.org/yourusername',
		Blogger: 'https://yourblog.blogspot.com',
		Contra: 'https://contra.com/yourusername',
		'Dev.to': 'https://dev.to/yourusername',
		Dribbble: 'https://dribbble.com/yourusername',
		Facebook: 'https://facebook.com/yourusername',
		Figma: 'https://figma.com/@yourusername',
		Fiverr: 'https://www.fiverr.com/yourusername',
		Freelancer: 'https://www.freelancer.com/u/yourusername',
		GitHub: 'https://github.com/yourusername',
		GitLab: 'https://gitlab.com/yourusername',
		'Google Scholar': 'https://scholar.google.com/citations?user=your-id',
		HackerRank: 'https://hackerrank.com/profile/yourusername',
		Instagram: 'https://instagram.com/yourusername',
		LeetCode: 'https://leetcode.com/u/yourusername',
		LinkedIn: 'https://linkedin.com/in/yourusername',
		Medium: 'https://medium.com/@yourusername',
		ORCID: 'https://orcid.org/0000-0000-0000-0000',
		Other: 'https://example.com',
		Pinterest: 'https://pinterest.com/yourusername',
		Portfolio: 'https://yourportfolio.com',
		'Product Hunt': 'https://producthunt.com/@yourusername',
		Reddit: 'https://reddit.com/user/yourusername',
		ResearchGate: 'https://researchgate.net/profile/Your-Name',
		Snapchat: 'https://snapchat.com/add/yourusername',
		SoundCloud: 'https://soundcloud.com/yourusername',
		Spotify: 'https://open.spotify.com/user/your-id',
		'Stack Overflow': 'https://stackoverflow.com/users/your-id',
		Substack: 'https://yourpublication.substack.com',
		Threads: 'https://threads.net/@yourusername',
		TikTok: 'https://tiktok.com/@yourusername',
		Twitch: 'https://twitch.tv/yourusername',
		Upwork: 'https://www.upwork.com/freelancers/yourusername',
		Vimeo: 'https://vimeo.com/yourusername',
		Wellfound: 'https://wellfound.com/u/yourusername',
		WordPress: 'https://yourwebsite.wordpress.com',
		X: 'https://x.com/yourusername',
		YouTube: 'https://youtube.com/@yourchannel',
	}

	return placeholders[platform] || 'https://example.com'
}

export default function CreateProfile() {
	const [socialLinks, setSocialLinks] = useState([
		{ id: 1, platform: 'LinkedIn', url: '' },
		{ id: 2, platform: 'GitHub', url: '' },
	])

	const updateSocialLink = (id, field, value) => {
		setSocialLinks((previousLinks) =>
			previousLinks.map((link) =>
				link.id === id ? { ...link, [field]: value } : link,
			),
		)
	}

	const addSocialLink = () => {
		setSocialLinks((previousLinks) => {
			if (previousLinks.length >= MAX_SOCIAL_LINKS) {
				return previousLinks
			}

			const nextId =
				Math.max(0, ...previousLinks.map((link) => link.id)) + 1

			return [
				...previousLinks,
				{
					id: nextId,
					platform: 'Other',
					url: '',
				},
			]
		})
	}

	const removeSocialLink = (id) => {
		setSocialLinks((previousLinks) =>
			previousLinks.filter((link) => link.id !== id),
		)
	}

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-8 flex items-start justify-between gap-4'>
					<div>
						<div className='mb-2 flex items-center gap-2 text-sm text-slate-500'>
							<Link
								href='/dashboard'
								className='transition-colors hover:text-slate-300'
							>
								Dashboard
							</Link>
							<ChevronIcon />
							<Link
								href='/dashboard/profile'
								className='transition-colors hover:text-slate-300'
							>
								Profile
							</Link>
							<ChevronIcon />
							<span className='text-indigo-400'>
								Create Profile
							</span>
						</div>

						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							Create your profile
						</h1>

						<p className='mt-2 max-w-3xl text-sm leading-6 text-slate-400'>
							Tell us about your experience, skills, and career
							goals. Build a professional profile that represents
							your strengths.
						</p>
					</div>
				</div>

				<form
					className='space-y-6'
					encType='multipart/form-data'
				>
					{/* Profile information */}
					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Profile information
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Start with your name and professional identity.
							</p>
						</div>

						<div className='mb-6 flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 sm:flex-row sm:items-center'>
							<div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									className='h-7 w-7'
									aria-hidden='true'
								>
									<circle
										cx='12'
										cy='8'
										r='4'
										stroke='currentColor'
										strokeWidth='1.5'
									/>
									<path
										d='M4.5 20a7.5 7.5 0 0 1 15 0'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</div>

							<div className='min-w-0 flex-1'>
								<p className='text-sm font-medium text-slate-200'>
									Profile photo
								</p>
								<p className='mt-1 text-xs leading-5 text-slate-500'>
									Choose a clear image for your professional
									profile. Maximum file size: 3 MB.
								</p>
							</div>

							<label className='inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800/60'>
								Upload image
								<input
									type='file'
									name='profileImage'
									accept='image/*'
									className='sr-only'
								/>
							</label>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='firstName'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									First name
								</label>
								<input
									id='firstName'
									name='firstName'
									type='text'
									placeholder='Enter your first name'
									autoComplete='given-name'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='lastName'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Last name
								</label>
								<input
									id='lastName'
									name='lastName'
									type='text'
									placeholder='Enter your last name'
									autoComplete='family-name'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='profession'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Professional title
								</label>
								<input
									id='profession'
									name='profession'
									type='text'
									placeholder='e.g. Backend Developer'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='bio'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Professional bio
								</label>
								<textarea
									id='bio'
									name='bio'
									rows={4}
									placeholder='Briefly describe your experience, strengths, and what you build.'
									className='w-full resize-y rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
								<p className='mt-2 text-xs text-slate-500'>
									Keep it concise, specific, and professional.
								</p>
							</div>
						</div>
					</section>

					{/* Contact and experience */}
					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Contact and experience
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Add your contact details and current experience.
							</p>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='phone'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Phone number
								</label>
								<input
									id='phone'
									name='phone'
									type='tel'
									autoComplete='tel'
									placeholder='+880 1XXX XXXXXX'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='experience'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Years of experience
								</label>
								<input
									id='experience'
									name='experience'
									type='number'
									min='0'
									step='1'
									placeholder='e.g. 2'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='city'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									City
								</label>
								<input
									id='city'
									name='city'
									type='text'
									autoComplete='address-level2'
									placeholder='e.g. Dhaka'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='country'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Country
								</label>
								<input
									id='country'
									name='country'
									type='text'
									autoComplete='country-name'
									placeholder='e.g. Bangladesh'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>
						</div>
					</section>

					{/* Skills and expertise */}
					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Skills and expertise
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Highlight the technologies and skills you work
								with.
							</p>
						</div>

						<div>
							<label
								htmlFor='skills'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Skills
							</label>
							<input
								id='skills'
								name='skills'
								type='text'
								placeholder='e.g. JavaScript, Node.js, MongoDB'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
							<p className='mt-2 text-xs text-slate-500'>
								Enter up to 20 skills, separated by commas.
							</p>
						</div>
					</section>

					{/* Dynamic social links */}
					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Social links
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Help others discover your work and professional
								presence.
							</p>
						</div>

						<div className='space-y-4'>
							{socialLinks.map((socialLink) => (
								<div
									key={socialLink.id}
									className='grid grid-cols-1 gap-3 sm:grid-cols-[150px_minmax(0,1fr)]'
								>
									<div>
										<label
											htmlFor={`socialPlatform${socialLink.id}`}
											className='mb-2 block text-xs font-medium text-slate-300'
										>
											Platform
										</label>

										<div className='relative'>
											<select
												id={`socialPlatform${socialLink.id}`}
												name={`socialPlatform${socialLink.id}`}
												value={socialLink.platform}
												onChange={(event) =>
													updateSocialLink(
														socialLink.id,
														'platform',
														event.target.value,
													)
												}
												className='h-11 w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 pr-10 text-sm font-medium text-slate-200 outline-none transition-all duration-200 hover:border-slate-600 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-500/15'
											>
												{SOCIAL_PLATFORMS.map(
													(platform) => (
														<option
															key={platform.value}
															value={
																platform.value
															}
															className='bg-slate-900 text-white'
														>
															{platform.label}
														</option>
													),
												)}
											</select>

											<div className='pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400'>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													viewBox='0 0 20 20'
													fill='currentColor'
													className='h-4 w-4'
													aria-hidden='true'
												>
													<path
														fillRule='evenodd'
														d='M5.22 7.22a.75.75 0 011.06 0L10 10.94l3.72-3.72a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 8.28a.75.75 0 010-1.06z'
														clipRule='evenodd'
													/>
												</svg>
											</div>
										</div>
									</div>

									<div>
										<label
											htmlFor={`socialUrl${socialLink.id}`}
											className='mb-2 block text-xs font-medium text-slate-300'
										>
											URL
										</label>

										<div className='flex items-center gap-2'>
											<input
												id={`socialUrl${socialLink.id}`}
												name={`socialUrl${socialLink.id}`}
												type='url'
												value={socialLink.url}
												onChange={(event) =>
													updateSocialLink(
														socialLink.id,
														'url',
														event.target.value,
													)
												}
												placeholder={getSocialPlaceholder(
													socialLink.platform,
												)}
												className='h-11 min-w-0 flex-1 rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
											/>

											{socialLinks.length > 1 && (
												<button
													type='button'
													onClick={() =>
														removeSocialLink(
															socialLink.id,
														)
													}
													aria-label={`Remove ${socialLink.platform} social link`}
													title='Remove social link'
													className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/5 text-red-400 transition hover:border-red-400/40 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														fill='none'
														viewBox='0 0 24 24'
														strokeWidth={1.7}
														stroke='currentColor'
														className='h-5 w-5'
														aria-hidden='true'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															d='M6 7h12m-10 0V5a1 1 0 011-1h6a1 1 0 011 1v2m-9 0l.7 12.1a1 1 0 001 .9h6.6a1 1 0 001-.9L17 7M10 11v5m4-5v5'
														/>
													</svg>
												</button>
											)}
										</div>
									</div>
								</div>
							))}

							{socialLinks.length < MAX_SOCIAL_LINKS && (
								<button
									type='button'
									onClick={addSocialLink}
									className='inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-700/80 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/5 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 24 24'
										strokeWidth={1.8}
										stroke='currentColor'
										className='h-4 w-4'
										aria-hidden='true'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											d='M12 5v14m-7-7h14'
										/>
									</svg>
									Add Social Platform
									<span className='text-xs text-slate-500'>
										({socialLinks.length}/{MAX_SOCIAL_LINKS}
										)
									</span>
								</button>
							)}

							<p className='text-xs leading-5 text-slate-500'>
								Add links to your GitHub, LinkedIn, portfolio,
								or other professional profiles. You can add up
								to {MAX_SOCIAL_LINKS} links.
							</p>
						</div>
					</section>

					{/* Form actions */}
					<div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
						<Link
							href='/dashboard'
							className='inline-flex h-11 items-center justify-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							Cancel
						</Link>

						<button
							type='submit'
							className='inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] cursor-pointer'
						>
							Create profile
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='h-4 w-4'
								aria-hidden='true'
							>
								<path
									d='M5 12h14m-6-6 6 6-6 6'
									stroke='currentColor'
									strokeWidth='1.6'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}