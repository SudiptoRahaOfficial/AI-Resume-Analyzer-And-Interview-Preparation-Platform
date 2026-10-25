'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useProfile } from '@/context/ProfileContext'
import LoadingScreen from '@/components/shared/loadingScreen'

// ---------- constants ----------

const MAX_SOCIAL_LINKS = 10
const MAX_SKILLS = 20
const MAX_EXPERIENCE = 50
const BIO_MAX_LENGTH = 500
const MAX_IMAGE_SIZE = 3 * 1024 * 1024 // 3 MB
const ALLOWED_IMAGE_TYPES = ['image/jpg', 'image/jpeg', 'image/png']
const PROFILE_PATH = '/dashboard/profile'

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

const SOCIAL_PLACEHOLDERS = {
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

const getSocialPlaceholder = (platform) =>
	SOCIAL_PLACEHOLDERS[platform] || 'https://example.com'

// shared input styles (border colour switches to red when the field has an error)
const INPUT_BASE =
	'w-full rounded-lg border bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 disabled:opacity-60'
const INPUT_OK =
	'border-slate-700/80 focus:border-indigo-400/60 focus:ring-indigo-400/10'
const INPUT_ERROR =
	'border-red-400/60 focus:border-red-400/70 focus:ring-red-400/10'

const INITIAL_VALUES = {
	firstName: '',
	lastName: '',
	profession: '',
	bio: '',
	phone: '',
	experience: '',
	city: '',
	country: '',
	skills: '',
}

// ---------- pure helpers (no React, easy to test) ----------

// "js, node , JS" -> ['js', 'node'] (trimmed, no empties, case-insensitive dedupe)
function parseSkills(value) {
	const seen = new Set()
	const skills = []

	for (const rawSkill of value.split(',')) {
		const skill = rawSkill.trim()
		const key = skill.toLowerCase()

		if (skill && !seen.has(key)) {
			seen.add(key)
			skills.push(skill)
		}
	}

	return skills
}

// only http / https links are accepted (blocks javascript: and data: URLs)
function isValidHttpUrl(value) {
	try {
		const url = new URL(value)
		return url.protocol === 'http:' || url.protocol === 'https:'
	} catch {
		return false
	}
}

// returns { fieldId: 'message' } in visual order, so the first key is the first invalid field
function validateForm(values, skills, socialLinks) {
	const errors = {}

	if (!values.firstName.trim()) errors.firstName = 'First name is required.'
	if (!values.lastName.trim()) errors.lastName = 'Last name is required.'

	if (values.bio.trim().length > BIO_MAX_LENGTH) {
		errors.bio = `Bio must be ${BIO_MAX_LENGTH} characters or fewer.`
	}

	if (
		values.phone.trim() &&
		!/^\+?[0-9\s\-()]{7,20}$/.test(values.phone.trim())
	) {
		errors.phone = 'Enter a valid phone number.'
	}

	if (values.experience !== '') {
		const years = Number(values.experience)

		if (!Number.isInteger(years) || years < 0 || years > MAX_EXPERIENCE) {
			errors.experience = `Enter a whole number between 0 and ${MAX_EXPERIENCE}.`
		}
	}

	if (skills.length > MAX_SKILLS) {
		errors.skills = `You can add up to ${MAX_SKILLS} skills (you entered ${skills.length}).`
	}

	// only rows with a URL are validated, empty rows are ignored on submit
	for (const link of socialLinks) {
		const url = link.url.trim()

		if (url && !isValidHttpUrl(url)) {
			errors[`socialUrl${link.id}`] =
				'Enter a valid URL starting with http:// or https://'
		}
	}

	return errors
}

// builds the plain object that profile.api.js turns into FormData
// (optional fields are left out entirely instead of being sent empty)
function buildPayload(values, skills, socialLinks, imageFile) {
	const payload = {
		firstName: values.firstName.trim(),
		lastName: values.lastName.trim(),
	}

	for (const field of ['profession', 'bio', 'phone']) {
		const value = values[field].trim()
		if (value) payload[field] = value
	}

	if (values.experience !== '') payload.experience = Number(values.experience)

	const location = {}
	if (values.city.trim()) location.city = values.city.trim()
	if (values.country.trim()) location.country = values.country.trim()
	if (Object.keys(location).length > 0) payload.location = location

	if (skills.length > 0) payload.skills = skills

	// sending only the link fields the backend schema knows about (no local `id`)
	const filledLinks = socialLinks
		.filter((link) => link.url.trim())
		.map((link) => ({ platform: link.platform, url: link.url.trim() }))
	if (filledLinks.length > 0) payload.socialLinks = filledLinks

	if (imageFile) payload.profileImage = imageFile

	return payload
}

// ---------- small reusable field ----------

// label + input/textarea + hint or error, wired together for accessibility
function TextField({
	id,
	label,
	error,
	hint,
	multiline = false,
	className = '',
	...controlProps
}) {
	const Control = multiline ? 'textarea' : 'input'
	const describedBy = error ? `${id}Error` : hint ? `${id}Hint` : undefined

	return (
		<div className={className}>
			<label
				htmlFor={id}
				className='mb-2 block text-xs font-medium text-slate-300'
			>
				{label}
				{controlProps.required && (
					<span
						className='ml-0.5 text-red-400'
						aria-hidden='true'
					>
						*
					</span>
				)}
			</label>

			<Control
				id={id}
				name={id}
				aria-invalid={Boolean(error)}
				aria-describedby={describedBy}
				className={`${INPUT_BASE} ${error ? INPUT_ERROR : INPUT_OK} ${
					multiline ? 'resize-y py-3 leading-6' : 'h-11'
				}`}
				{...controlProps}
			/>

			{error ? (
				<p
					id={`${id}Error`}
					role='alert'
					className='mt-2 text-xs text-red-400'
				>
					{error}
				</p>
			) : hint ? (
				<p
					id={`${id}Hint`}
					className='mt-2 text-xs text-slate-500'
				>
					{hint}
				</p>
			) : null}
		</div>
	)
}

// ---------- page component ----------

export default function CreateProfile() {
	const router = useRouter()
	const {
		hasProfile,
		isProfileLoading,
		profileError,
		createProfile,
		refetchProfile,
	} = useProfile()

	// text / number inputs
	const [values, setValues] = useState(INITIAL_VALUES)

	// dynamic social link rows (the local `id` is only for React keys, never sent to the API)
	const [socialLinks, setSocialLinks] = useState([
		{ id: 1, platform: 'LinkedIn', url: '' },
		{ id: 2, platform: 'GitHub', url: '' },
	])

	// chosen image file + its temporary preview url
	const [imageFile, setImageFile] = useState(null)
	const [imagePreview, setImagePreview] = useState(null)

	// per-field errors, and one form-level error for server failures
	const [errors, setErrors] = useState({})
	const [submitError, setSubmitError] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	// creating / cleaning up the preview url (revoking prevents a memory leak)
	useEffect(() => {
		if (!imageFile) {
			setImagePreview(null)
			return
		}

		const previewUrl = URL.createObjectURL(imageFile)
		setImagePreview(previewUrl)

		return () => URL.revokeObjectURL(previewUrl)
	}, [imageFile])

	// a user can only have one profile: sending them to it if it already exists
	useEffect(() => {
		if (!isProfileLoading && hasProfile) router.replace(PROFILE_PATH)
	}, [isProfileLoading, hasProfile, router])

	// removing one field's error as soon as the user edits that field
	const clearError = (key) => {
		setErrors((previousErrors) => {
			if (!previousErrors[key]) return previousErrors
			const nextErrors = { ...previousErrors }
			delete nextErrors[key]
			return nextErrors
		})
	}

	// one handler for every text/number/textarea input (input `name` matches the state key)
	const handleChange = (event) => {
		const { name, value } = event.target
		setValues((previousValues) => ({ ...previousValues, [name]: value }))
		clearError(name)
	}

	// validating the chosen image on the client for fast feedback (server must still re-check)
	const handleImageChange = (event) => {
		const file = event.target.files?.[0]

		// resetting the input so choosing the same file again still fires onChange
		event.target.value = ''

		if (!file) return

		if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
			setErrors((previousErrors) => ({
				...previousErrors,
				profileImage: 'Please choose a JPG, JPEG or PNG image.',
			}))
			return
		}

		if (file.size > MAX_IMAGE_SIZE) {
			setErrors((previousErrors) => ({
				...previousErrors,
				profileImage: 'Image must be 3 MB or smaller.',
			}))
			return
		}

		clearError('profileImage')
		setImageFile(file)
	}

	const removeImage = () => {
		setImageFile(null)
		clearError('profileImage')
	}

	// social link handlers
	const updateSocialLink = (id, field, value) => {
		setSocialLinks((previousLinks) =>
			previousLinks.map((link) =>
				link.id === id ? { ...link, [field]: value } : link,
			),
		)

		if (field === 'url') clearError(`socialUrl${id}`)
	}

	const addSocialLink = () => {
		setSocialLinks((previousLinks) => {
			if (previousLinks.length >= MAX_SOCIAL_LINKS) return previousLinks

			const nextId =
				Math.max(0, ...previousLinks.map((link) => link.id)) + 1

			return [
				...previousLinks,
				{ id: nextId, platform: 'Other', url: '' },
			]
		})
	}

	const removeSocialLink = (id) => {
		setSocialLinks((previousLinks) =>
			previousLinks.filter((link) => link.id !== id),
		)
		clearError(`socialUrl${id}`)
	}

	// validating, then calling the API through the context
	const handleSubmit = async (event) => {
		event.preventDefault()

		// blocking double submits (fast double click / Enter key)
		if (isSubmitting) return

		setSubmitError(null)

		const skills = parseSkills(values.skills)
		const validationErrors = validateForm(values, skills, socialLinks)

		// keeping an image error from handleImageChange alive across submits
		if (errors.profileImage)
			validationErrors.profileImage = errors.profileImage

		setErrors(validationErrors)

		// focusing the first invalid field so keyboard / screen reader users land on it
		const firstInvalidId = Object.keys(validationErrors)[0]
		if (firstInvalidId) {
			document.getElementById(firstInvalidId)?.focus()
			return
		}

		setIsSubmitting(true)

		try {
			await createProfile(
				buildPayload(values, skills, socialLinks, imageFile),
			)
			router.replace(PROFILE_PATH)
		} catch (error) {
			// ApiError.message is already user-friendly (network error or backend message)
			setSubmitError(error.message || 'Could not create your profile.')
		} finally {
			setIsSubmitting(false)
		}
	}

	// ----- non-form states -----

	// waiting for the "does a profile already exist?" check, or redirecting away
	if (isProfileLoading || hasProfile) {
		return <LoadingScreen />
	}

	// the existence check failed for a real reason (not 404), so we can't safely show the form
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

	// ----- form -----

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-8 flex items-start justify-between gap-4'>
					<div>
						<nav className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'>
							<Link
								href='/dashboard'
								className='transition hover:text-slate-300'
							>
								Dashboard
							</Link>
							<span>/</span>
							<Link
								href={PROFILE_PATH}
								className='transition hover:text-slate-300'
							>
								Profile
							</Link>
							<span>/</span>
							<span className='text-indigo-400'>
								Create Profile
							</span>
						</nav>

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

				{/* noValidate: our own validation shows consistent messages instead of browser popups */}
				<form
					onSubmit={handleSubmit}
					noValidate
					className='space-y-6'
				>
					{/* fieldset disables every control while the request is running */}
					<fieldset
						disabled={isSubmitting}
						className='m-0 min-w-0 space-y-6 border-0 p-0'
					>
						{/* Profile information */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
							<div className='mb-6'>
								<h2 className='text-base font-semibold text-white'>
									Profile information
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Start with your name and professional
									identity.
								</p>
							</div>

							<div className='mb-6 rounded-xl border border-slate-800/80 bg-slate-950/40 p-4'>
								<div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
									{/* preview of the chosen image, or the placeholder icon */}
									<div className='flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
										{imagePreview ? (
											// plain <img>: next/image can't optimise a local blob: url
											// eslint-disable-next-line @next/next/no-img-element
											<img
												src={imagePreview}
												alt='Selected profile preview'
												className='h-full w-full object-cover'
											/>
										) : (
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
										)}
									</div>

									<div className='min-w-0 flex-1'>
										<p className='text-sm font-medium text-slate-200'>
											Profile photo
										</p>
										<p className='mt-1 text-xs leading-5 text-slate-500'>
											{imageFile
												? imageFile.name
												: 'Choose a clear JPG, JPEG or PNG image. Maximum file size: 3 MB.'}
										</p>
									</div>

									<div className='flex shrink-0 items-center gap-2'>
										<label className='inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors focus-within:ring-2 focus-within:ring-indigo-400/40 hover:border-slate-600 hover:bg-slate-800/60'>
											{imageFile
												? 'Change image'
												: 'Upload image'}
											<input
												id='profileImage'
												type='file'
												accept={ALLOWED_IMAGE_TYPES.join(
													',',
												)}
												onChange={handleImageChange}
												aria-invalid={Boolean(
													errors.profileImage,
												)}
												aria-describedby={
													errors.profileImage
														? 'profileImageError'
														: undefined
												}
												className='sr-only'
											/>
										</label>

										{imageFile && (
											<button
												type='button'
												onClick={removeImage}
												className='inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-red-400/20 px-3 text-xs font-medium text-red-400 transition-colors hover:border-red-400/40 hover:bg-red-500/10'
											>
												Remove
											</button>
										)}
									</div>
								</div>

								{errors.profileImage && (
									<p
										id='profileImageError'
										role='alert'
										className='mt-3 text-xs text-red-400'
									>
										{errors.profileImage}
									</p>
								)}
							</div>

							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
								<TextField
									id='firstName'
									label='First name'
									type='text'
									required
									placeholder='Enter your first name'
									autoComplete='given-name'
									value={values.firstName}
									onChange={handleChange}
									error={errors.firstName}
								/>

								<TextField
									id='lastName'
									label='Last name'
									type='text'
									required
									placeholder='Enter your last name'
									autoComplete='family-name'
									value={values.lastName}
									onChange={handleChange}
									error={errors.lastName}
								/>

								<TextField
									id='profession'
									label='Professional title'
									type='text'
									placeholder='e.g. Backend Developer'
									className='sm:col-span-2'
									value={values.profession}
									onChange={handleChange}
									error={errors.profession}
								/>

								<TextField
									id='bio'
									label='Professional bio'
									multiline
									rows={4}
									placeholder='Briefly describe your experience, strengths, and what you build.'
									className='sm:col-span-2'
									value={values.bio}
									onChange={handleChange}
									error={errors.bio}
									hint={`Keep it concise, specific, and professional. ${values.bio.trim().length}/${BIO_MAX_LENGTH}`}
								/>
							</div>
						</section>

						{/* Contact and experience */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
							<div className='mb-6'>
								<h2 className='text-base font-semibold text-white'>
									Contact and experience
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Add your contact details and current
									experience.
								</p>
							</div>

							<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
								<TextField
									id='phone'
									label='Phone number'
									type='tel'
									autoComplete='tel'
									placeholder='+880 1XXX XXXXXX'
									value={values.phone}
									onChange={handleChange}
									error={errors.phone}
								/>

								<TextField
									id='experience'
									label='Years of experience'
									type='number'
									inputMode='numeric'
									min='0'
									max={MAX_EXPERIENCE}
									step='1'
									placeholder='e.g. 2'
									value={values.experience}
									onChange={handleChange}
									error={errors.experience}
								/>

								<TextField
									id='city'
									label='City'
									type='text'
									autoComplete='address-level2'
									placeholder='e.g. Dhaka'
									value={values.city}
									onChange={handleChange}
									error={errors.city}
								/>

								<TextField
									id='country'
									label='Country'
									type='text'
									autoComplete='country-name'
									placeholder='e.g. Bangladesh'
									value={values.country}
									onChange={handleChange}
									error={errors.country}
								/>
							</div>
						</section>

						{/* Skills and expertise */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
							<div className='mb-6'>
								<h2 className='text-base font-semibold text-white'>
									Skills and expertise
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Highlight the technologies and skills you
									work with.
								</p>
							</div>

							<TextField
								id='skills'
								label='Skills'
								type='text'
								placeholder='e.g. JavaScript, Node.js, MongoDB'
								value={values.skills}
								onChange={handleChange}
								error={errors.skills}
								hint={`Enter up to ${MAX_SKILLS} skills, separated by commas.`}
							/>
						</section>

						{/* Dynamic social links */}
						<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
							<div className='mb-6'>
								<h2 className='text-base font-semibold text-white'>
									Social links
								</h2>
								<p className='mt-1 text-xs text-slate-500'>
									Help others discover your work and
									professional presence.
								</p>
							</div>

							<div className='space-y-4'>
								{socialLinks.map((socialLink) => {
									const urlId = `socialUrl${socialLink.id}`
									const urlError = errors[urlId]

									return (
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
														value={
															socialLink.platform
														}
														onChange={(event) =>
															updateSocialLink(
																socialLink.id,
																'platform',
																event.target
																	.value,
															)
														}
														className='h-11 w-full appearance-none rounded-xl border border-slate-700/80 bg-slate-900/80 px-3.5 pr-10 text-sm font-medium text-slate-200 outline-none transition-all duration-200 hover:border-slate-600 focus:border-indigo-400/70 focus:ring-2 focus:ring-indigo-500/15 disabled:opacity-60'
													>
														{SOCIAL_PLATFORMS.map(
															(platform) => (
																<option
																	key={
																		platform.value
																	}
																	value={
																		platform.value
																	}
																	className='bg-slate-900 text-white'
																>
																	{
																		platform.label
																	}
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
													htmlFor={urlId}
													className='mb-2 block text-xs font-medium text-slate-300'
												>
													URL
												</label>

												<div className='flex items-center gap-2'>
													<input
														id={urlId}
														name={urlId}
														type='url'
														inputMode='url'
														value={socialLink.url}
														onChange={(event) =>
															updateSocialLink(
																socialLink.id,
																'url',
																event.target
																	.value,
															)
														}
														aria-invalid={Boolean(
															urlError,
														)}
														aria-describedby={
															urlError
																? `${urlId}Error`
																: undefined
														}
														placeholder={getSocialPlaceholder(
															socialLink.platform,
														)}
														className={`${INPUT_BASE} ${urlError ? INPUT_ERROR : INPUT_OK} h-11 min-w-0 flex-1`}
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
															className='flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-red-400/20 bg-red-500/5 text-red-400 transition hover:border-red-400/40 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/40'
														>
															<svg
																xmlns='http://www.w3.org/2000/svg'
																fill='none'
																viewBox='0 0 24 24'
																strokeWidth={
																	1.7
																}
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

												{urlError && (
													<p
														id={`${urlId}Error`}
														role='alert'
														className='mt-2 text-xs text-red-400'
													>
														{urlError}
													</p>
												)}
											</div>
										</div>
									)
								})}

								{socialLinks.length < MAX_SOCIAL_LINKS && (
									<button
										type='button'
										onClick={addSocialLink}
										className='inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-slate-700/80 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-indigo-400/50 hover:bg-indigo-500/5 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/40'
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
											({socialLinks.length}/
											{MAX_SOCIAL_LINKS})
										</span>
									</button>
								)}

								<p className='text-xs leading-5 text-slate-500'>
									Add links to your GitHub, LinkedIn,
									portfolio, or other professional profiles.
									Rows left empty are ignored. You can add up
									to {MAX_SOCIAL_LINKS} links.
								</p>
							</div>
						</section>
					</fieldset>

					{/* server / network failure */}
					{submitError && (
						<div
							role='alert'
							className='rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300'
						>
							{submitError}
						</div>
					)}

					{/* Form actions */}
					<div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end py-6'>
						<Link
							href='/dashboard'
							className='inline-flex h-11 items-center justify-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							Cancel
						</Link>

						<button
							type='submit'
							disabled={isSubmitting}
							className='inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] disabled:cursor-not-allowed disabled:opacity-70'
						>
							{isSubmitting ? (
								<>
									<svg
										viewBox='0 0 24 24'
										fill='none'
										className='h-4 w-4 animate-spin'
										aria-hidden='true'
									>
										<circle
											cx='12'
											cy='12'
											r='9'
											stroke='currentColor'
											strokeWidth='3'
											className='opacity-25'
										/>
										<path
											d='M21 12a9 9 0 0 0-9-9'
											stroke='currentColor'
											strokeWidth='3'
											strokeLinecap='round'
										/>
									</svg>
									Creating profile…
								</>
							) : (
								<>
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
								</>
							)}
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}