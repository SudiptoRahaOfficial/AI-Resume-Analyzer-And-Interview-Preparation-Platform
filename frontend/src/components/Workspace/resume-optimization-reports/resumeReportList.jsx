'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/icon'
import { useAuth } from '@/context/AuthContext'
import { useResume } from '@/context/ResumeContext'

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const RESUME_DETAILS_BASE_PATH = '/resume-optimization-reports'
const NEW_RESUME_PATH = '/resume-optimization'

const FILTER_OPTIONS = [
	{ label: 'All resumes', value: 'all' },
	{ label: 'PDF available', value: 'available' },
	{ label: 'PDF unavailable', value: 'unavailable' },
]

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function formatDate(value) {
	if (!value) return 'Date unavailable'

	const date = new Date(value)

	if (Number.isNaN(date.getTime())) return 'Date unavailable'

	return new Intl.DateTimeFormat('en', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date)
}

// same rule as the details page: only a well-formed https url counts as a pdf,
// so the list and the details page can never disagree about availability
function hasValidPdfUrl(value) {
	if (typeof value !== 'string' || !value.trim()) return false

	try {
		return new URL(value.trim()).protocol === 'https:'
	} catch {
		return false
	}
}

// the ONLY place that knows the API's resume shape.
// everything below works with this clean view-model instead.
function toResumeItem(resume) {
	// a resume without an id cannot be linked to, so we skip it
	if (!resume?._id) return null

	return {
		id: String(resume._id),
		jobTitle: typeof resume.jobTitle === 'string' ? resume.jobTitle : '',
		hasPdf: hasValidPdfUrl(resume.resumePdf),
		createdAt: resume.createdAt,
		// precomputed once so sorting doesn't re-parse dates on every comparison
		createdTime: Date.parse(resume.createdAt) || 0,
	}
}

function matchesFilter(hasPdf, filter) {
	if (filter === 'available') return hasPdf
	if (filter === 'unavailable') return !hasPdf

	return true
}

// translating ApiError (status + message) into something a user can act on
function getListErrorContent(error) {
	if (error?.status === 0) {
		return {
			title: 'Connection problem',
			message:
				'We could not reach the server. Check your internet connection and try again.',
			canRetry: true,
		}
	}

	if (error?.status === 401) {
		return {
			title: 'Session expired',
			message: 'Your session has expired. Please sign in again.',
			canRetry: false,
		}
	}

	return {
		title: 'Could not load resumes',
		// never surface raw 5xx messages: they can leak internals
		message:
			!error?.message || error.status >= 500
				? 'Something went wrong while loading your resumes. Please try again.'
				: error.message,
		canRetry: true,
	}
}

/* -------------------------------------------------------------------------- */
/*                              Presentational parts                          */
/* -------------------------------------------------------------------------- */

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
	const { id, jobTitle, hasPdf, createdAt } = resume

	return (
		<Link
			href={`${RESUME_DETAILS_BASE_PATH}/${encodeURIComponent(id)}`}
			aria-label={`View resume for ${jobTitle || 'untitled position'}`}
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
							{jobTitle || 'Untitled resume'}
						</h3>

						<p className='mt-1 text-xs text-slate-500'>
							Created {formatDate(createdAt)}
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

					<span className='ml-auto inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition group-hover:text-indigo-200'>
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

function SkeletonBlock({ className = '' }) {
	return (
		<div
			className={`animate-pulse rounded-xl border border-slate-800/80 bg-slate-900/40 ${className}`}
		/>
	)
}

function ListSkeleton() {
	return (
		<div
			role='status'
			aria-busy='true'
			aria-live='polite'
			className='space-y-5'
		>
			<span className='sr-only'>Loading resumes…</span>

			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
				{Array.from({ length: 3 }).map((_, index) => (
					<SkeletonBlock
						key={index}
						className='h-28'
					/>
				))}
			</div>

			<div className='space-y-2.5 rounded-2xl border border-slate-800/80 bg-slate-900/20 p-4'>
				{Array.from({ length: 4 }).map((_, index) => (
					<SkeletonBlock
						key={index}
						className='h-20'
					/>
				))}
			</div>
		</div>
	)
}

function StatusMessage({ title, message, onRetry }) {
	return (
		<div
			role='alert'
			className='flex flex-col items-center rounded-2xl border border-slate-800/80 bg-slate-900/30 px-6 py-14 text-center'
		>
			<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300'>
				<Icon
					name='file'
					size={22}
				/>
			</div>

			<h2 className='mt-5 text-lg font-semibold text-white'>{title}</h2>
			<p className='mt-2 max-w-md text-sm leading-6 text-slate-400'>
				{message}
			</p>

			{onRetry && (
				<button
					type='button'
					onClick={onRetry}
					className='mt-6 cursor-pointer rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
				>
					Try again
				</button>
			)}
		</div>
	)
}

// the user has no resumes at all (different from "filters matched nothing")
function NoResumesState() {
	return (
		<div className='flex flex-col items-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 px-6 py-16 text-center'>
			<div className='flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
				<Icon
					name='file'
					size={22}
				/>
			</div>

			<h2 className='mt-5 text-lg font-semibold text-white'>
				No resumes yet
			</h2>
			<p className='mt-2 max-w-md text-sm leading-6 text-slate-400'>
				Upload your resume and a job description to generate your first
				optimized resume.
			</p>

			<Link
				href={NEW_RESUME_PATH}
				className='mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
			>
				<Icon
					name='plus'
					size={16}
				/>
				Optimize your first resume
			</Link>
		</div>
	)
}

/* -------------------------------------------------------------------------- */
/*                                 Main component                             */
/* -------------------------------------------------------------------------- */

export default function ResumeReportList() {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	const { resumes, resumesError, fetchResumes } = useResume()

	// context state can hold data/errors from an earlier visit on the first render.
	// this flag means "this mount has actually started a request".
	const [hasRequested, setHasRequested] = useState(false)

	const [searchTerm, setSearchTerm] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')

	useEffect(() => {
		// waiting for auth so the first request never goes out without a token
		if (isAuthLoading || !isAuthenticated) return

		setHasRequested(true)

		// silent: cached resumes stay on screen while we refresh in the background.
		// on a first load `resumes` is null, so the skeleton shows anyway.
		fetchResumes({ silent: true })
	}, [isAuthLoading, isAuthenticated, fetchResumes])

	const handleRetry = useCallback(() => {
		fetchResumes({ silent: true })
	}, [fetchResumes])

	// API shape -> UI view-model (recomputed only when the API data changes)
	const items = useMemo(
		() => (resumes ?? []).map(toResumeItem).filter(Boolean),
		[resumes],
	)

	const pdfAvailableCount = useMemo(
		() => items.filter((item) => item.hasPdf).length,
		[items],
	)

	const filteredItems = useMemo(() => {
		const query = searchTerm.trim().toLowerCase()

		// .filter() returns a new array, so .sort() never mutates context state
		return items
			.filter((item) => item.jobTitle.toLowerCase().includes(query))
			.filter((item) => matchesFilter(item.hasPdf, activeFilter))
			.sort((a, b) => b.createdTime - a.createdTime)
	}, [items, searchTerm, activeFilter])

	function clearFilters() {
		setSearchTerm('')
		setActiveFilter('all')
	}

	// one explicit status instead of scattered boolean checks
	let status = 'ready'

	if (isAuthLoading) {
		status = 'loading'
	} else if (!isAuthenticated) {
		status = 'unauthenticated'
	} else if (resumes === null) {
		// nothing to show yet: either still fetching, or the first fetch failed
		status = hasRequested && resumesError ? 'error' : 'loading'
	}

	const errorContent =
		status === 'error' ? getListErrorContent(resumesError) : null

	return (
		<section className='mx-auto w-full max-w-375 space-y-5'>
			{/* Page heading: always visible, whatever the data state */}
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
						documents, and keep track of your resumes.
					</p>
				</div>

				<Link
					href={NEW_RESUME_PATH}
					className='inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:self-auto'
				>
					<Icon
						name='plus'
						size={16}
					/>
					Optimize resume
				</Link>
			</div>

			{status === 'loading' && <ListSkeleton />}

			{status === 'unauthenticated' && (
				<StatusMessage
					title='Sign in required'
					message='Please sign in to view your resumes.'
				/>
			)}

			{status === 'error' && (
				<StatusMessage
					title={errorContent.title}
					message={errorContent.message}
					onRetry={errorContent.canRetry ? handleRetry : undefined}
				/>
			)}

			{status === 'ready' && items.length === 0 && <NoResumesState />}

			{status === 'ready' && items.length > 0 && (
				<>
					{/* a background refresh failed, but we still have data to show */}
					{hasRequested && resumesError && (
						<div
							role='alert'
							className='flex flex-col gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 sm:flex-row sm:items-center sm:justify-between'
						>
							<p>
								We could not refresh your resumes. You are
								seeing the last loaded data.
							</p>
							<button
								type='button'
								onClick={handleRetry}
								className='w-fit cursor-pointer rounded-lg border border-amber-400/30 px-3 py-1.5 text-xs font-medium transition hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60'
							>
								Retry
							</button>
						</div>
					)}

					{/* Summary statistics */}
					<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
						<SummaryCard
							icon='layers'
							label='Total resumes'
							value={items.length}
							description='Resumes generated for job applications'
						/>

						<SummaryCard
							icon='file-check'
							label='PDF available'
							value={pdfAvailableCount}
							description='Resumes with an available PDF'
						/>

						<SummaryCard
							icon='clock'
							label='PDF unavailable'
							value={items.length - pdfAvailableCount}
							description='Resumes without a usable PDF'
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
										Your previously generated resume
										documents.
									</p>
								</div>

								<span
									aria-live='polite'
									className='mt-2 inline-flex self-start rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-400 sm:mt-0'
								>
									{filteredItems.length} of {items.length}{' '}
									resumes
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
							{filteredItems.length > 0 ? (
								filteredItems.map((item) => (
									<ResumeCard
										key={item.id}
										resume={item}
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
										Try a different job title or PDF
										availability filter to find the resume
										you are looking for.
									</p>

									<button
										type='button'
										onClick={clearFilters}
										className='mt-4 cursor-pointer rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60'
									>
										Clear filters
									</button>
								</div>
							)}
						</div>

						{/* List footer */}
						{filteredItems.length > 0 && (
							<div className='border-t border-slate-800/80 px-4 py-3 sm:px-5'>
								<p className='text-center text-xs leading-5 text-slate-500'>
									Showing {filteredItems.length} resume
									{filteredItems.length === 1 ? '' : 's'}.
								</p>
							</div>
						)}
					</div>
				</>
			)}
		</section>
	)
}