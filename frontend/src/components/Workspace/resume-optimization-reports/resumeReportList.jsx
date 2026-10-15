'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/icon'

const TEMP_RESUMES = [
	{
		_id: 'resume-001',
		jobTitle: 'Backend Software Engineer',
		resumePdf: 'https://example.com/resumes/backend-engineer.pdf',
		createdAt: '2026-10-09T07:26:14.607Z',
	},
	{
		_id: 'resume-002',
		jobTitle: 'Full Stack Developer',
		resumePdf: 'https://example.com/resumes/full-stack-developer.pdf',
		createdAt: '2026-10-07T10:15:00.000Z',
	},
	{
		_id: 'resume-003',
		jobTitle: 'Junior Node.js Developer',
		resumePdf: '',
		createdAt: '2026-10-04T08:30:00.000Z',
	},
	{
		_id: 'resume-004',
		jobTitle: 'Software Engineer',
		resumePdf: 'https://example.com/resumes/software-engineer.pdf',
		createdAt: '2026-09-28T14:45:00.000Z',
	},
]

const FILTER_OPTIONS = [
	{ label: 'All resumes', value: 'all' },
	{ label: 'PDF available', value: 'available' },
	{ label: 'PDF unavailable', value: 'unavailable' },
]

function formatDate(dateString) {
	const date = new Date(dateString)

	if (Number.isNaN(date.getTime())) {
		return 'Date unavailable'
	}

	return new Intl.DateTimeFormat('en', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date)
}

function SummaryCard({ icon, label, value, description }) {
	return (
		<div className='rounded-xl border border-slate-800/80 bg-slate-900/30 p-4'>
			<div className='flex items-center justify-between gap-3'>
				<p className='text-sm text-slate-400'>{label}</p>

				<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'>
					<Icon
						name={icon}
						size={18}
					/>
				</div>
			</div>

			<p className='mt-3 text-2xl font-semibold tracking-tight text-white'>
				{value}
			</p>

			<p className='mt-1 text-xs leading-5 text-slate-500'>
				{description}
			</p>
		</div>
	)
}

function ResumeCard({ resume }) {
	const hasPdf =
		typeof resume.resumePdf === 'string' &&
		resume.resumePdf.trim().length > 0

	return (
		<Link
			href={`/resume-optimization-reports/${resume._id}`}
			aria-label={`View resume for ${resume.jobTitle || 'untitled position'}`}
			className='group block rounded-xl outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]'
		>
			<article className='rounded-xl border border-slate-800/80 bg-slate-900/25 px-4 py-3 transition-colors group-hover:border-indigo-400/30 group-hover:bg-slate-900/50 sm:px-5'>
				<div className='flex items-center gap-3'>
					<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'>
						<Icon
							name='file'
							size={19}
						/>
					</div>

					<div className='min-w-0 flex-1'>
						<h3 className='truncate text-sm font-semibold text-white transition-colors group-hover:text-indigo-200 sm:text-base'>
							{resume.jobTitle || 'Untitled resume'}
						</h3>

						<p className='mt-1 text-xs text-slate-500'>
							Created {formatDate(resume.createdAt)}
						</p>
					</div>

					<div className='shrink-0 text-right'>
						<span
							className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium ${
								hasPdf
									? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-300'
									: 'border-amber-400/20 bg-amber-500/10 text-amber-300'
							}`}
						>
							<Icon
								name={hasPdf ? 'check' : 'clock'}
								size={12}
							/>
							{hasPdf ? 'PDF available' : 'No PDF'}
						</span>
					</div>

					<div className='hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/50 text-slate-500 transition group-hover:border-indigo-400/30 group-hover:text-indigo-300 sm:flex'>
						<Icon
							name='arrow'
							size={15}
						/>
					</div>
				</div>

				<div className='mt-3 flex flex-wrap items-center gap-2 pl-0 sm:pl-13'>
					<span className='inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950/50 px-2 py-1 text-[11px] text-slate-400'>
						<Icon
							name='file-check'
							size={13}
						/>
						Resume document
					</span>

					<span className='ml-auto inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition group-hover:text-indigo-200 sm:hidden'>
						View resume
						<Icon
							name='arrow'
							size={13}
						/>
					</span>
				</div>
			</article>
		</Link>
	)
}

export default function ResumeReportList() {
	const [resumes] = useState(TEMP_RESUMES)
	const [searchTerm, setSearchTerm] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')

	const pdfAvailableCount = useMemo(
		() =>
			resumes.filter(
				(resume) =>
					typeof resume.resumePdf === 'string' &&
					resume.resumePdf.trim().length > 0,
			).length,
		[resumes],
	)

	const filteredResumes = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase()

		return resumes
			.filter((resume) =>
				(resume.jobTitle || '')
					.toLowerCase()
					.includes(normalizedSearch),
			)
			.filter((resume) => {
				const hasPdf =
					typeof resume.resumePdf === 'string' &&
					resume.resumePdf.trim().length > 0

				if (activeFilter === 'available') {
					return hasPdf
				}

				if (activeFilter === 'unavailable') {
					return !hasPdf
				}

				return true
			})
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime(),
			)
	}, [resumes, searchTerm, activeFilter])

	function clearFilters() {
		setSearchTerm('')
		setActiveFilter('all')
	}

	return (
		<section className='mx-auto w-full max-w-375 space-y-5'>
			{/* Page heading */}
			<div className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
				<div>
					<div className='mb-2 flex items-center gap-2 text-xs font-medium text-indigo-400'>
						<Icon
							name='file'
							size={15}
						/>
						<span>RESUME OPTIMIZATION</span>
					</div>

					<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
						Resume Reports
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
						Manage your generated resumes, access your PDF
						documents, and keep tracking of resumes.
					</p>
				</div>

				<Link
					href='/resume-optimization'
					className='inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:self-auto'
				>
					<Icon
						name='plus'
						size={16}
					/>
					Optimize resume
				</Link>
			</div>

			{/* Summary statistics */}
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
				<SummaryCard
					icon='layers'
					label='Total resumes'
					value={resumes.length}
					description='Resumes generated for job applications'
				/>

				<SummaryCard
					icon='file-check'
					label='PDF available'
					value={pdfAvailableCount}
					description='Resumes with an available PDF reference'
				/>

				<SummaryCard
					icon='clock'
					label='PDF unavailable'
					value={resumes.length - pdfAvailableCount}
					description='Resumes without a PDF reference'
				/>
			</div>

			{/* Resumes section */}
			<div className='overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/20'>
				<div className='border-b border-slate-800/80 px-4 py-4 sm:px-5'>
					<div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
						<div>
							<h2 className='text-base font-semibold text-white'>
								Your resumes
							</h2>

							<p className='mt-1 text-xs leading-5 text-slate-500'>
								Your previously generated resume documents.
							</p>
						</div>

						<span className='mt-2 inline-flex self-start rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-400 sm:mt-0'>
							{filteredResumes.length} of {resumes.length} resumes
						</span>
					</div>

					{/* Search and filter */}
					<div className='mt-4 flex flex-col gap-3 md:flex-row'>
						<div className='relative min-w-0 flex-1'>
							<Icon
								name='search'
								size={17}
								className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'
							/>

							<input
								type='search'
								value={searchTerm}
								onChange={(event) =>
									setSearchTerm(event.target.value)
								}
								placeholder='Search by job title...'
								aria-label='Search resumes by job title'
								className='h-10 w-full rounded-lg border border-slate-800 bg-[#080d19] pl-10 pr-4 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 hover:border-slate-700 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/10'
							/>
						</div>

						<div className='relative md:w-64 md:shrink-0'>
							<Icon
								name='sliders-horizontal'
								size={16}
								className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'
							/>

							<select
								value={activeFilter}
								onChange={(event) =>
									setActiveFilter(event.target.value)
								}
								aria-label='Filter resumes by PDF availability'
								className='h-10 w-full appearance-none rounded-lg border border-slate-800 bg-[#080d19] pl-9 pr-9 text-sm text-slate-300 outline-none transition hover:border-slate-700 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/10'
							>
								{FILTER_OPTIONS.map((option) => (
									<option
										key={option.value}
										value={option.value}
									>
										{option.label}
									</option>
								))}
							</select>

							<Icon
								name='chevron-down'
								size={15}
								className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
							/>
						</div>
					</div>
				</div>

				{/* Resume results */}
				<div className='space-y-2.5 p-3 sm:p-4'>
					{filteredResumes.length > 0 ? (
						filteredResumes.map((resume) => (
							<ResumeCard
								key={resume._id}
								resume={resume}
							/>
						))
					) : (
						<div className='flex flex-col items-center justify-center px-4 py-12 text-center'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400'>
								<Icon
									name='search-x'
									size={21}
								/>
							</div>

							<h3 className='mt-4 text-sm font-semibold text-slate-200'>
								No resumes found
							</h3>

							<p className='mt-2 max-w-sm text-sm leading-6 text-slate-500'>
								Try a different job title or PDF availability
								filter to find the resume you are looking for.
							</p>

							<button
								type='button'
								onClick={clearFilters}
								className='mt-4 rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60'
							>
								Clear filters
							</button>
						</div>
					)}
				</div>

				{/* List footer */}
				{filteredResumes.length > 0 && (
					<div className='border-t border-slate-800/80 px-4 py-3 sm:px-5'>
						<p className='text-center text-xs leading-5 text-slate-500'>
							Showing {filteredResumes.length} resume
							{filteredResumes.length === 1 ? '' : 's'}.
						</p>
					</div>
				)}
			</div>
		</section>
	)
}