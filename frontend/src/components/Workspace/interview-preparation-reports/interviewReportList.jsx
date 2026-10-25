'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/icon'
import { useAuth } from '@/context/AuthContext'
import { useInterview } from '@/context/InterviewContext'

/* -------------------------------------------------------------------------- */
/*                                  Constants                                 */
/* -------------------------------------------------------------------------- */

const FILTER_OPTIONS = [
	{ label: 'All reports', value: 'all' },
	{ label: 'Strong match (80%+)', value: 'strong' },
	{ label: 'Good match (60–79%)', value: 'good' },
	{ label: 'Needs improvement (<60%)', value: 'low' },
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

// returns 0–100, or null when the score is missing/invalid ("unknown" is not 0)
function normalizeScore(score) {
	if (score == null || score === '') return null

	const value = Number(score)

	if (!Number.isFinite(value)) return null

	return Math.min(100, Math.max(0, Math.round(value)))
}

const countOf = (value) => (Array.isArray(value) ? value.length : 0)

// the ONLY place that knows the API's report shape.
// everything below works with this clean view-model instead.
function toReportItem(report) {
	// a report without an id cannot be linked to, so we skip it
	if (!report?._id) return null

	return {
		id: String(report._id),
		jobTitle: typeof report.jobTitle === 'string' ? report.jobTitle : '',
		score: normalizeScore(report.matchScore),
		createdAt: report.createdAt,
		// precomputed once so sorting doesn't re-parse dates on every comparison
		createdTime: Date.parse(report.createdAt) || 0,
		questionCount:
			countOf(report.technicalQuestions) +
			countOf(report.behavioralQuestions),
		skillGapCount: countOf(report.skillGaps),
	}
}

function getScoreStyle(score) {
	if (score == null) {
		return {
			label: 'Score unavailable',
			text: 'text-slate-400',
			background: 'bg-slate-800/60',
			border: 'border-slate-700',
			progress: 'bg-slate-600',
		}
	}

	if (score >= 80) {
		return {
			label: 'Strong match',
			text: 'text-emerald-300',
			background: 'bg-emerald-500/10',
			border: 'border-emerald-400/20',
			progress: 'bg-emerald-400',
		}
	}

	if (score >= 60) {
		return {
			label: 'Good match',
			text: 'text-indigo-300',
			background: 'bg-indigo-500/10',
			border: 'border-indigo-400/20',
			progress: 'bg-indigo-400',
		}
	}

	return {
		label: 'Needs improvement',
		text: 'text-amber-300',
		background: 'bg-amber-500/10',
		border: 'border-amber-400/20',
		progress: 'bg-amber-400',
	}
}

function matchesFilter(score, filter) {
	if (filter === 'all') return true

	// reports with an unknown score only appear under "All reports"
	if (score == null) return false

	if (filter === 'strong') return score >= 80
	if (filter === 'good') return score >= 60 && score < 80
	if (filter === 'low') return score < 60

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
		title: 'Could not load reports',
		// never surface raw 5xx messages: they can leak internals
		message:
			!error?.message || error.status >= 500
				? 'Something went wrong while loading your reports. Please try again.'
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

function ReportCard({ report }) {
	const { id, jobTitle, score, createdAt, questionCount, skillGapCount } =
		report
	const scoreStyle = getScoreStyle(score)

	return (
		<Link
			href={`/interview-preparation-reports/${encodeURIComponent(id)}`}
			aria-label={`View interview report for ${jobTitle || 'untitled position'}`}
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
							{jobTitle || 'Untitled interview report'}
						</h3>

						<p className='mt-1 text-xs text-slate-500'>
							Created {formatDate(createdAt)}
						</p>
					</div>

					<div className='shrink-0 text-right'>
						<div className='flex items-baseline justify-end gap-1'>
							<span
								className={`text-xl font-semibold tracking-tight ${scoreStyle.text}`}
							>
								{score == null ? 'N/A' : score}
							</span>

							{score != null && (
								<span className='text-xs text-slate-500'>
									/ 100
								</span>
							)}
						</div>

						<span
							className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${scoreStyle.text} ${scoreStyle.background} ${scoreStyle.border}`}
						>
							{scoreStyle.label}
						</span>
					</div>

					<div className='hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-950/50 text-slate-500 transition group-hover:border-indigo-400/30 group-hover:text-indigo-300 sm:flex'>
						<Icon
							name='arrow'
							size={15}
						/>
					</div>
				</div>

				{/* the progress bar only makes sense when we have a score */}
				{score != null && (
					<div className='mt-3 flex items-center gap-3 pl-0 sm:pl-13'>
						<div
							className='h-1 flex-1 overflow-hidden rounded-full bg-slate-800'
							role='progressbar'
							aria-label={`Job match score for ${jobTitle || 'untitled report'}`}
							aria-valuenow={score}
							aria-valuemin={0}
							aria-valuemax={100}
						>
							<div
								className={`h-full rounded-full transition-all ${scoreStyle.progress}`}
								style={{ width: `${score}%` }}
							/>
						</div>

						<span className='shrink-0 text-[11px] tabular-nums text-slate-500'>
							{score}% match
						</span>
					</div>
				)}

				<div className='mt-3 flex flex-wrap items-center gap-2 pl-0 sm:pl-13'>
					<span className='inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950/50 px-2 py-1 text-[11px] text-slate-400'>
						<Icon
							name='message'
							size={13}
						/>
						{questionCount}{' '}
						{questionCount === 1 ? 'question' : 'questions'}
					</span>

					<span className='inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950/50 px-2 py-1 text-[11px] text-slate-400'>
						<Icon
							name='target'
							size={13}
						/>
						{skillGapCount}{' '}
						{skillGapCount === 1 ? 'skill gap' : 'skill gaps'}
					</span>

					<span className='ml-auto inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition group-hover:text-indigo-200'>
						View report
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
			<span className='sr-only'>Loading interview reports…</span>

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
						className='h-24'
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
					className='mt-6 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
				>
					Try again
				</button>
			)}
		</div>
	)
}

// the user has no reports at all (different from "filters matched nothing")
function NoReportsState() {
	return (
		<div className='flex flex-col items-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/20 px-6 py-16 text-center'>
			<div className='flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
				<Icon
					name='file'
					size={22}
				/>
			</div>

			<h2 className='mt-5 text-lg font-semibold text-white'>
				No interview reports yet
			</h2>
			<p className='mt-2 max-w-md text-sm leading-6 text-slate-400'>
				Upload your resume and a job description to generate your first
				interview preparation report.
			</p>

			<Link
				href='/interview-preparation'
				className='mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
			>
				<Icon
					name='plus'
					size={16}
				/>
				Create your first report
			</Link>
		</div>
	)
}

/* -------------------------------------------------------------------------- */
/*                                 Main component                             */
/* -------------------------------------------------------------------------- */

export default function InterviewReportList() {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	const { reports, reportsError, fetchReports } = useInterview()

	// context state can hold data/errors from an earlier visit on the first render.
	// this flag means "this mount has actually started a request".
	const [hasRequested, setHasRequested] = useState(false)

	const [searchTerm, setSearchTerm] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')

	useEffect(() => {
		// waiting for auth so the first request never goes out without a token
		if (isAuthLoading || !isAuthenticated) return

		setHasRequested(true)

		// silent: cached reports stay on screen while we refresh in the background.
		// on a first load `reports` is null, so the skeleton shows anyway.
		fetchReports({ silent: true })
	}, [isAuthLoading, isAuthenticated, fetchReports])

	const handleRetry = useCallback(() => {
		fetchReports({ silent: true })
	}, [fetchReports])

	// API shape -> UI view-model (recomputed only when the API data changes)
	const items = useMemo(
		() => (reports ?? []).map(toReportItem).filter(Boolean),
		[reports],
	)

	const averageScore = useMemo(() => {
		// reports with an unknown score must not drag the average down
		const scored = items.filter((item) => item.score != null)

		if (scored.length === 0) return null

		const total = scored.reduce((sum, item) => sum + item.score, 0)

		return Math.round(total / scored.length)
	}, [items])

	const strongMatches = useMemo(
		() => items.filter((item) => (item.score ?? -1) >= 80).length,
		[items],
	)

	const filteredItems = useMemo(() => {
		const query = searchTerm.trim().toLowerCase()

		// .filter() returns a new array, so .sort() never mutates context state
		return items
			.filter((item) => item.jobTitle.toLowerCase().includes(query))
			.filter((item) => matchesFilter(item.score, activeFilter))
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
	} else if (reports === null) {
		// nothing to show yet: either still fetching, or the first fetch failed
		status = hasRequested && reportsError ? 'error' : 'loading'
	}

	const errorContent =
		status === 'error' ? getListErrorContent(reportsError) : null

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
						<span>INTERVIEW PREPARATION</span>
					</div>

					<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
						Interview Reports
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
						Review your interview preparation reports, track your
						job match scores, and identify skills to improve.
					</p>
				</div>

				<Link
					href='/interview-preparation'
					className='inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] sm:self-auto'
				>
					<Icon
						name='plus'
						size={16}
					/>
					New interview report
				</Link>
			</div>

			{status === 'loading' && <ListSkeleton />}

			{status === 'unauthenticated' && (
				<StatusMessage
					title='Sign in required'
					message='Please sign in to view your interview reports.'
				/>
			)}

			{status === 'error' && (
				<StatusMessage
					title={errorContent.title}
					message={errorContent.message}
					onRetry={errorContent.canRetry ? handleRetry : undefined}
				/>
			)}

			{status === 'ready' && items.length === 0 && <NoReportsState />}

			{status === 'ready' && items.length > 0 && (
				<>
					{/* a background refresh failed, but we still have data to show */}
					{hasRequested && reportsError && (
						<div
							role='alert'
							className='flex flex-col gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200 sm:flex-row sm:items-center sm:justify-between'
						>
							<p>
								We could not refresh your reports. You are
								seeing the last loaded data.
							</p>
							<button
								type='button'
								onClick={handleRetry}
								className='w-fit rounded-lg border border-amber-400/30 px-3 py-1.5 text-xs font-medium transition hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60'
							>
								Retry
							</button>
						</div>
					)}

					{/* Summary statistics */}
					<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
						<SummaryCard
							icon='layers'
							label='Total reports'
							value={items.length}
							description='Interview reports generated'
						/>

						<SummaryCard
							icon='chart'
							label='Average match score'
							value={
								averageScore == null ? '—' : `${averageScore}%`
							}
							description='Average across all reports'
						/>

						<SummaryCard
							icon='target'
							label='Strong matches'
							value={strongMatches}
							description='Reports with an 80% match or higher'
						/>
					</div>

					{/* Reports section */}
					<div className='overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/20'>
						<div className='border-b border-slate-800/80 px-4 py-4 sm:px-5'>
							<div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
								<div>
									<h2 className='text-base font-semibold text-white'>
										Your reports
									</h2>

									<p className='mt-1 text-xs leading-5 text-slate-500'>
										Your previously generated interview
										analyses.
									</p>
								</div>

								<span
									aria-live='polite'
									className='mt-2 inline-flex self-start rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-400 sm:mt-0'
								>
									{filteredItems.length} of {items.length}{' '}
									reports
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
										aria-label='Search interview reports by job title'
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
										aria-label='Filter reports by match score'
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

						{/* Report results */}
						<div className='space-y-2.5 p-3 sm:p-4'>
							{filteredItems.length > 0 ? (
								filteredItems.map((item) => (
									<ReportCard
										key={item.id}
										report={item}
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
										No reports found
									</h3>

									<p className='mt-2 max-w-sm text-sm leading-6 text-slate-500'>
										Try a different job title or match-score
										filter to find the report you are
										looking for.
									</p>

									<button
										type='button'
										onClick={clearFilters}
										className='mt-4 rounded-lg border border-slate-700 px-4 py-2 text-xs font-medium text-slate-300 transition hover:border-indigo-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 cursor-pointer'
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
									Showing {filteredItems.length} interview{' '}
									{filteredItems.length === 1
										? 'report'
										: 'reports'}
									.
								</p>
							</div>
						)}
					</div>
				</>
			)}
		</section>
	)
}