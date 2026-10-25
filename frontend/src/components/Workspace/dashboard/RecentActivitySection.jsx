'use client'

import { useEffect, useMemo } from 'react'
import Link from 'next/link'

import DashboardIcon from '../../shared/icon'
import ActivityRow from './ActivityRow'
import { useAuth } from '@/context/AuthContext'
import { useInterview } from '@/context/InterviewContext'
import { useResume } from '@/context/ResumeContext'

/* ------------------------------------------------------------------ */
/* Helpers: converting api records into the shape ActivityRow expects  */
/* (pure functions, defined outside the component so they are created  */
/* once and never re-created on render)                                */
/* ------------------------------------------------------------------ */

// how many rows each card shows
const RECENT_ACTIVITY_LIMIT = 3

// mongoose gives `id` (virtual) or `_id` depending on toJSON config, so accepting both
function getId(item) {
	return item?.id ?? item?._id ?? null
}

// turning a date value into a number we can sort by (invalid / missing => 0)
function toTimestamp(value) {
	if (!value) return 0

	const time = new Date(value).getTime()
	return Number.isNaN(time) ? 0 : time
}

// formatting a date for display, with a fallback when the backend sent none
// (checking `!value` first because new Date(null) is 1970, not "invalid")
function formatDate(value, fallback) {
	if (!value) return fallback

	const date = new Date(value)
	if (Number.isNaN(date.getTime())) return fallback

	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date)
}

// turning a numeric score into "78%" (returns null when there is no usable score)
function formatScore(score) {
	// Number(null) is 0, so null / undefined must be rejected first
	if (score == null || score === '') return null

	const number = Number(score)
	if (!Number.isFinite(number)) return null

	// clamping so a bad value can never render as "340%"
	return `${Math.min(100, Math.max(0, Math.round(number)))}%`
}

// newest first, then keeping only the latest few
// (sorting a copy: state coming from context must never be mutated)
function getLatest(items) {
	return [...items]
		.sort((a, b) => toTimestamp(b.createdAt) - toTimestamp(a.createdAt))
		.slice(0, RECENT_ACTIVITY_LIMIT)
}

// interview reports => rows
function mapInterviewReports(reports) {
	return getLatest(reports)
		.filter((report) => getId(report) !== null)
		.map((report) => {
			const id = getId(report)

			return {
				id: `interview-${id}`,
				title: report.jobTitle || 'Untitled interview report',
				subtitle: 'Interview Preparation',
				date: formatDate(report.createdAt, 'Recently generated'),
				status: 'Completed',
				score: formatScore(report.matchScore),
				scoreLabel: 'Readiness',
				icon: 'message',
				href: `/interview-preparation-reports/${encodeURIComponent(id)}`,
			}
		})
}

// resumes => rows
function mapResumes(resumes) {
	return getLatest(resumes)
		.filter((resume) => getId(resume) !== null)
		.map((resume) => {
			const id = getId(resume)

			return {
				id: `resume-${id}`,
				title: resume.jobTitle || 'Untitled resume',
				subtitle: 'Resume Optimization',
				date: formatDate(resume.createdAt, 'Recently optimized'),
				status: 'Completed',
				// the list endpoint has no score today, so no score is shown
				// (if you add one later: score: formatScore(resume.atsScore))
				score: null,
				scoreLabel: 'ATS Match',
				icon: 'file-check',
				href: `/resume-optimization-reports/${encodeURIComponent(id)}`,
			}
		})
}

// deciding which of the 4 states a card is in
// - `items === null` means "never loaded successfully"
// - once we have data we keep showing it, even if a background refresh fails
function getStatus(items, error, activities) {
	if (items === null) return error ? 'error' : 'loading'
	return activities.length > 0 ? 'ready' : 'empty'
}

/* ------------------------------------------------------------------ */
/* UI                                                                  */
/* ------------------------------------------------------------------ */

// placeholder row shown while the first request is running
function ActivityRowSkeleton() {
	return (
		<div className='flex items-center gap-3 px-4 py-4 sm:px-5'>
			<div className='h-10 w-10 shrink-0 animate-pulse rounded-lg bg-slate-800/70' />

			<div className='min-w-0 flex-1 space-y-2'>
				<div className='h-3 w-2/3 animate-pulse rounded bg-slate-800/70' />
				<div className='h-2.5 w-1/3 animate-pulse rounded bg-slate-800/50' />
			</div>
		</div>
	)
}

// one card (used for both interview reports and resumes)
// status is one of: 'loading' | 'error' | 'empty' | 'ready'
function ActivitySection({
	title,
	description,
	activities,
	status,
	viewAllHref,
	emptyMessage,
	emptyDescription,
	errorMessage,
	onRetry,
}) {
	return (
		<section
			className='min-w-0 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40'
			aria-busy={status === 'loading'}
		>
			{/* Card header */}
			<div className='flex items-center justify-between gap-3 border-b border-slate-800/70 px-4 py-4 sm:px-5'>
				<div className='min-w-0'>
					<h3 className='text-sm font-semibold text-white'>
						{title}
					</h3>

					<p className='mt-1 text-xs text-slate-500'>{description}</p>
				</div>

				<Link
					href={viewAllHref}
					className='inline-flex shrink-0 items-center gap-1 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200'
				>
					View all
					<DashboardIcon
						name='arrow'
						size={14}
					/>
				</Link>
			</div>

			{/* Loading: skeleton rows */}
			{status === 'loading' && (
				<div className='divide-y divide-slate-800/70'>
					{Array.from(
						{ length: RECENT_ACTIVITY_LIMIT },
						(_, index) => (
							<ActivityRowSkeleton key={index} />
						),
					)}
				</div>
			)}

			{/* Error: message + retry (only when we have nothing to show) */}
			{status === 'error' && (
				<div
					role='alert'
					className='px-4 py-10 text-center sm:px-5'
				>
					<div className='mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-rose-400/20 bg-rose-500/[0.07] text-rose-300'>
						<DashboardIcon
							name='file'
							size={20}
						/>
					</div>

					<p className='mt-4 text-sm font-medium text-slate-300'>
						{errorMessage}
					</p>

					<button
						type='button'
						onClick={onRetry}
						className='mt-3 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200'
					>
						Try again
					</button>
				</div>
			)}

			{/* Empty: user has no records yet */}
			{status === 'empty' && (
				<div className='px-4 py-10 text-center sm:px-5'>
					<div className='mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-800/60 text-slate-400'>
						<DashboardIcon
							name='file'
							size={20}
						/>
					</div>

					<p className='mt-4 text-sm font-medium text-slate-300'>
						{emptyMessage}
					</p>

					<p className='mt-1 text-xs leading-5 text-slate-500'>
						{emptyDescription}
					</p>
				</div>
			)}

			{/* Ready: the rows */}
			{status === 'ready' && (
				<div className='divide-y divide-slate-800/70'>
					{activities.map((activity) => (
						<ActivityRow
							key={activity.id}
							activity={activity}
						/>
					))}
				</div>
			)}
		</section>
	)
}

export default function RecentActivitySection() {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	const { reports, reportsError, fetchReports } = useInterview()
	const { resumes, resumesError, fetchResumes } = useResume()

	// fetching both lists once auth is ready
	// silent = true: the skeleton is derived from "no data yet", so the context loader isn't needed,
	// and revisiting the dashboard refreshes quietly instead of flashing a loader
	useEffect(() => {
		if (isAuthLoading || !isAuthenticated) return

		fetchReports({ silent: true })
		fetchResumes({ silent: true })
	}, [isAuthLoading, isAuthenticated, fetchReports, fetchResumes])

	// mapping api data into row data (only recomputed when the data changes)
	const interviewActivities = useMemo(
		() => (reports ? mapInterviewReports(reports) : []),
		[reports],
	)
	const resumeActivities = useMemo(
		() => (resumes ? mapResumes(resumes) : []),
		[resumes],
	)

	return (
		<section aria-labelledby='activity-heading'>
			{/* Main section heading */}
			<div className='mb-4 flex items-end justify-between gap-4'>
				<div>
					<h2
						id='activity-heading'
						className='text-base font-semibold text-white'
					>
						Recent activity
					</h2>

					<p className='mt-1 text-xs text-slate-500'>
						Pick up where you left off
					</p>
				</div>
			</div>

			{/* Two report sections side by side */}
			<div className='grid grid-cols-1 items-start gap-3 sm:gap-4 lg:grid-cols-2'>
				<ActivitySection
					title='Recent Interview Preparation'
					description='Your latest interview reports'
					activities={interviewActivities}
					status={getStatus(
						reports,
						reportsError,
						interviewActivities,
					)}
					viewAllHref='/interview-preparation-reports'
					emptyMessage='No interview reports yet'
					emptyDescription='Your generated interview preparation reports will appear here.'
					errorMessage="Couldn't load your interview reports"
					onRetry={() => fetchReports({ silent: true })}
				/>

				<ActivitySection
					title='Recent Resume Optimization'
					description='Your latest optimized resumes'
					activities={resumeActivities}
					status={getStatus(resumes, resumesError, resumeActivities)}
					viewAllHref='/resume-optimization-reports'
					emptyMessage='No optimized resumes yet'
					emptyDescription='Your optimized resumes will appear here.'
					errorMessage="Couldn't load your resumes"
					onRetry={() => fetchResumes({ silent: true })}
				/>
			</div>
		</section>
	)
}