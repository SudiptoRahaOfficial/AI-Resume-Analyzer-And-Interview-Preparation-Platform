'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import Icon from '@/components/shared/icon'

const MOCK_RESUME = {
	jobTitle: 'Senior Full Stack Developer',
	createdAt: '2026-10-12T09:00:00.000Z',
	resumePdf: null,
	summary:
		'Full Stack Developer experienced in building responsive web applications, designing REST APIs, and developing maintainable software using React, Next.js, Node.js, and MongoDB.',
	skills: [
		'JavaScript',
		'React',
		'Next.js',
		'Node.js',
		'Express.js',
		'MongoDB',
		'REST API Design',
		'Tailwind CSS',
		'Git',
	],
	experience: [
		{
			role: 'Full Stack Developer',
			company: 'Digital Solutions Studio',
			duration: '2024 – Present',
			description:
				'Developed responsive web applications, integrated backend services, and improved application reliability through reusable components and API validation.',
		},
		{
			role: 'Frontend Developer',
			company: 'Creative Web Labs',
			duration: '2022 – 2024',
			description:
				'Built accessible interfaces, collaborated with designers, and integrated REST APIs into production web experiences.',
		},
	],
	education: [
		{
			degree: 'BSc in Computer Science and Engineering',
			institution: 'Example University',
			year: '2022',
		},
	],
	projects: [
		{
			name: 'ResumeAI',
			description:
				'An AI-powered career preparation platform with resume tools, interview preparation, and a user dashboard.',
			technologies: 'Next.js, React, Node.js, MongoDB',
		},
		{
			name: 'Task Management Platform',
			description:
				'A task management application featuring user authentication, task organization, and responsive layouts.',
			technologies: 'React, Express.js, MongoDB',
		},
	],
	certifications: [
		'Modern JavaScript Development',
		'Full Stack Web Development',
	],
}

function formatDate(value) {
	const date = new Date(value)

	if (Number.isNaN(date.getTime())) return 'Date unavailable'

	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)
}

function SectionHeading({ icon, eyebrow, title, description }) {
	return (
		<div className='mb-5 flex items-start gap-3'>
			<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
				<Icon
					name={icon}
					size={19}
				/>
			</div>

			<div>
				<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300/80'>
					{eyebrow}
				</p>
				<h2 className='mt-1 text-base font-semibold text-white sm:text-lg'>
					{title}
				</h2>
				{description && (
					<p className='mt-1 text-sm leading-6 text-slate-400'>
						{description}
					</p>
				)}
			</div>
		</div>
	)
}

function DetailStat({ label, value, icon, detail }) {
	return (
		<div className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-4 sm:p-5'>
			<div className='flex items-center justify-between gap-3'>
				<p className='text-xs font-medium text-slate-400 sm:text-sm'>
					{label}
				</p>
				<div className='flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-800/70 text-indigo-300'>
					<Icon
						name={icon}
						size={17}
					/>
				</div>
			</div>

			<p className='mt-4 break-words text-lg font-semibold tracking-tight text-white sm:text-xl'>
				{value}
			</p>

			{detail && (
				<p className='mt-1 text-xs leading-5 text-slate-500'>
					{detail}
				</p>
			)}
		</div>
	)
}

function EmptyContent({
	children = 'No information available in this section.',
}) {
	return (
		<div className='rounded-xl border border-dashed border-slate-800 bg-slate-950/30 px-4 py-8 text-center text-sm text-slate-500'>
			{children}
		</div>
	)
}

function ContentSection({ title, value, icon = 'file' }) {
	if (value === undefined || value === null || value === '') return null

	const items = Array.isArray(value) ? value : null

	return (
		<section className='rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 sm:p-6'>
			<SectionHeading
				icon={icon}
				eyebrow='Resume content'
				title={title}
			/>

			{items ? (
				items.length === 0 ? (
					<EmptyContent />
				) : (
					<div className='space-y-3'>
						{items.map((item, index) => (
							<article
								key={`${title}-${index}`}
								className='rounded-xl border border-slate-800/80 bg-[#080d19] p-4 sm:p-5'
							>
								{typeof item === 'string' ||
								typeof item === 'number' ? (
									<div className='flex items-start gap-3'>
										<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400' />
										<p className='text-sm leading-7 text-slate-300'>
											{item}
										</p>
									</div>
								) : (
									<div className='space-y-3'>
										{Object.entries(item).map(
											([key, entryValue]) => (
												<div key={key}>
													<p className='text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500'>
														{key
															.replace(
																/([A-Z])/g,
																' $1',
															)
															.replace(
																/[_-]/g,
																' ',
															)}
													</p>
													<p className='mt-1 whitespace-pre-wrap text-sm leading-7 text-slate-300'>
														{Array.isArray(
															entryValue,
														)
															? entryValue.join(
																	', ',
																)
															: typeof entryValue ===
																		'object' &&
																  entryValue !==
																		null
																? JSON.stringify(
																		entryValue,
																	)
																: String(
																		entryValue ??
																			'',
																	)}
													</p>
												</div>
											),
										)}
									</div>
								)}
							</article>
						))}
					</div>
				)
			) : (
				<p className='whitespace-pre-wrap text-sm leading-7 text-slate-300'>
					{value}
				</p>
			)}
		</section>
	)
}

export default function ResumeDetails() {
	const params = useParams()
	const resumeId = params?.resumeId

	const resume = MOCK_RESUME

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-slate-100 sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-5xl space-y-6'>
				<nav className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'>
					<Link
						href='/dashboard'
						className='transition hover:text-slate-300'
					>
						Dashboard
					</Link>
					<span>/</span>
					<Link
						href='/resume-optimization-reports'
						className='transition hover:text-slate-300'
					>
						Resume reports
					</Link>
					<span>/</span>
					<span className='text-slate-300'>Resume details</span>
				</nav>

				<header className='rounded-2xl border border-slate-800/80 bg-gradient-to-br from-indigo-500/[0.10] via-slate-900/60 to-slate-900/20 p-5 sm:p-7'>
					<div className='flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between'>
						<div className='flex items-start gap-4'>
							<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
								<Icon
									name='file-check'
									size={23}
								/>
							</div>

							<div className='min-w-0'>
								<p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300'>
									Resume details
								</p>
								<h1 className='mt-2 break-words text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
									{resume.jobTitle}
								</h1>
								<p className='mt-2 text-sm leading-6 text-slate-400'>
									Review your saved resume, professional
									experience, skills, and projects.
								</p>
								<p className='mt-4 text-xs text-slate-500'>
									Created {formatDate(resume.createdAt)}
								</p>
								{resumeId && (
									<p className='mt-1 text-[10px] text-slate-600'>
										Preview ID: {resumeId}
									</p>
								)}
							</div>
						</div>

						<Link
							href='/resume-optimization-reports'
							className='inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800'
						>
							<Icon
								name='arrow'
								size={16}
							/>
							All resumes
						</Link>
					</div>
				</header>

				<section className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>
					<DetailStat
						label='Job title'
						value={resume.jobTitle}
						icon='briefcase'
						detail='Role associated with this resume'
					/>
					<DetailStat
						label='PDF status'
						value={resume.resumePdf ? 'Available' : 'Not attached'}
						icon='file'
						detail='Uploaded document availability'
					/>
					<DetailStat
						label='Created'
						value={formatDate(resume.createdAt)}
						icon='clock'
						detail='Resume record creation date'
					/>
				</section>

				{/* PDF section */}
				<section className='rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 sm:p-6'>
					<SectionHeading
						icon='file'
						eyebrow='Uploaded document'
						title='Resume PDF'
						description='Preview the document area and its actions before connecting the PDF API.'
					/>

					{resume.resumePdf ? (
						<div className='flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-[#080d19] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5'>
							<div className='flex min-w-0 items-center gap-3'>
								<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300'>
									<Icon
										name='file-check'
										size={20}
									/>
								</div>
								<div>
									<p className='text-sm font-semibold text-slate-100'>
										Resume PDF
									</p>
									<p className='mt-1 text-xs text-slate-500'>
										Document attached
									</p>
								</div>
							</div>

							<div className='flex flex-wrap gap-2'>
								<button
									type='button'
									className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800'
								>
									<Icon
										name='arrow'
										size={15}
									/>
									Open PDF
								</button>
								<button
									type='button'
									className='inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400'
								>
									<Icon
										name='upload'
										size={15}
									/>
									Download
								</button>
							</div>
						</div>
					) : (
						<EmptyContent>
							No PDF is attached in this demo record. The document
							actions will be connected later.
						</EmptyContent>
					)}
				</section>

				<ContentSection
					title='Professional summary'
					value={resume.summary}
					icon='user'
				/>

				<ContentSection
					title='Skills'
					value={resume.skills}
					icon='target'
				/>

				<ContentSection
					title='Work experience'
					value={resume.experience}
					icon='briefcase'
				/>

				<ContentSection
					title='Education'
					value={resume.education}
					icon='layers'
				/>

				<ContentSection
					title='Projects'
					value={resume.projects}
					icon='clipboard'
				/>

				<ContentSection
					title='Certifications'
					value={resume.certifications}
					icon='file-check'
				/>

				<footer className='border-t border-slate-800/70 py-5 text-center text-xs text-slate-500'>
					ResumeAI · Resume details
				</footer>
			</div>
		</main>
	)
}