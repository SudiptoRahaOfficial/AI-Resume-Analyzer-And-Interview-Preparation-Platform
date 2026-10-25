'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/icon'
import { useAuth } from '@/context/AuthContext'
import { useInterview } from '@/context/InterviewContext'

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function formatDate(value) {
	if (!value) return 'Date unavailable'

	const date = new Date(value)

	if (Number.isNaN(date.getTime())) return 'Date unavailable'

	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date)
}

// matchScore may be missing or out of range; returning null means "unknown"
function normalizeScore(score) {
	const value = Number(score)

	if (score == null || Number.isNaN(value)) return null

	return Math.min(100, Math.max(0, Math.round(value)))
}

function getScoreColor(score) {
	if (score == null) return 'text-slate-400'
	if (score >= 80) return 'text-emerald-300'
	if (score >= 60) return 'text-amber-300'
	return 'text-rose-300'
}

function getPriorityColor(priority) {
	const value = String(priority ?? '').toLowerCase()

	if (value === 'high') {
		return 'border-rose-400/20 bg-rose-400/10 text-rose-300'
	}

	if (value === 'medium') {
		return 'border-amber-400/20 bg-amber-400/10 text-amber-300'
	}

	if (value === 'low') {
		return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
	}

	// unknown value: neutral, so we never show a misleading colour
	return 'border-slate-700 bg-slate-800/60 text-slate-300'
}

// translating ApiError (status + message) into something a user can act on
function getErrorContent(error) {
	switch (error?.status) {
		case 0:
			return {
				title: 'Connection problem',
				message:
					'We could not reach the server. Check your internet connection and try again.',
				canRetry: true,
			}
		case 400:
		case 403:
		case 404:
			return {
				title: 'Report not found',
				message:
					'This report does not exist, or you do not have access to it.',
				canRetry: false,
			}
		case 401:
			return {
				title: 'Session expired',
				message: 'Your session has expired. Please sign in again.',
				canRetry: false,
			}
		default:
			return {
				title: 'Could not load report',
				message:
					error?.message ||
					'Something went wrong while loading this report.',
				canRetry: true,
			}
	}
}

/* -------------------------------------------------------------------------- */
/*                              Presentational parts                          */
/* -------------------------------------------------------------------------- */

function SectionHeading({ icon, eyebrow, title, description, count }) {
	return (
		<div className='mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
			<div className='flex items-start gap-3'>
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

			{count !== undefined && (
				<span className='w-fit shrink-0 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-xs text-slate-300'>
					{count} {count === 1 ? 'item' : 'items'}
				</span>
			)}
		</div>
	)
}

function ReportStat({ label, value, icon, detail, valueClass = 'text-white' }) {
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

			<p
				className={`mt-4 text-2xl font-semibold tracking-tight ${valueClass}`}
			>
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

function EmptySection({ children }) {
	return (
		<div className='rounded-xl border border-dashed border-slate-800 bg-slate-950/30 px-4 py-8 text-center text-sm text-slate-500'>
			{children}
		</div>
	)
}

function QuestionList({ title, questions, icon }) {
	return (
		<section className='rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 sm:p-6'>
			<SectionHeading
				icon={icon}
				eyebrow='Interview preparation'
				title={title}
				count={questions.length}
			/>

			{questions.length === 0 ? (
				<EmptySection>
					No questions available in this section.
				</EmptySection>
			) : (
				<div className='space-y-4'>
					{questions.map((item, index) => (
						<article
							key={`${title}-${index}`}
							className='rounded-xl border border-slate-800/80 bg-[#080d19] p-4 sm:p-5'
						>
							<div className='flex items-start gap-3'>
								<span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-xs font-semibold text-indigo-300'>
									{String(index + 1).padStart(2, '0')}
								</span>

								<div className='min-w-0 flex-1'>
									<h3 className='wrap-break-word text-sm font-semibold leading-6 text-slate-100 sm:text-base'>
										{item?.question}
									</h3>

									{item?.intention && (
										<div className='mt-4'>
											<p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
												What this evaluates
											</p>
											<p className='mt-1 text-sm leading-6 text-slate-400'>
												{item.intention}
											</p>
										</div>
									)}

									{item?.answer && (
										<div className='mt-4 rounded-lg border border-emerald-400/10 bg-emerald-400/4 p-3 sm:p-4'>
											<p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-300/80'>
												Suggested answer
											</p>
											<p className='mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-300'>
												{item.answer}
											</p>
										</div>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	)
}

function SkillGapsSection({ skillGaps }) {
	return (
		<section className='rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 sm:p-6'>
			<SectionHeading
				icon='target'
				eyebrow='Areas to improve'
				title='Skill gaps'
				description='Focus on the skills identified as needing further development.'
				count={skillGaps.length}
			/>

			{skillGaps.length === 0 ? (
				<EmptySection>No skill gaps identified.</EmptySection>
			) : (
				<div className='grid gap-3 sm:grid-cols-2'>
					{skillGaps.map((gap, index) => (
						<article
							key={`${gap?.skill}-${index}`}
							className='rounded-xl border border-slate-800/80 bg-[#080d19] p-4'
						>
							<div className='flex items-center justify-between gap-3'>
								<h3 className='wrap-break-word text-sm font-semibold text-slate-100'>
									{gap?.skill}
								</h3>

								<div className='flex flex-col gap-2 min-w-29'>
									{/* rendering a badge only when the API provided that field */}
									{gap?.priority && (
										<span
											className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold text-center uppercase tracking-wide ${getPriorityColor(
												gap.priority,
											)}`}
										>
											Priority: {gap.priority}
										</span>
									)}

									{gap?.severity && (
										<span
											className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold text-center uppercase tracking-wide ${getPriorityColor(
												gap.severity,
											)}`}
										>
											Severity: {gap.severity}
										</span>
									)}
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	)
}

function PreparationPlanSection({ preparationPlan }) {
	return (
		<section className='rounded-2xl border border-slate-800/80 bg-slate-900/30 p-4 sm:p-6'>
			<SectionHeading
				icon='layers'
				eyebrow='Your next steps'
				title='Preparation plan'
				description='Use this plan to organize your interview preparation.'
				count={preparationPlan.length}
			/>

			{preparationPlan.length === 0 ? (
				<EmptySection>No preparation steps available.</EmptySection>
			) : (
				<div className='space-y-4'>
					{preparationPlan.map((day, index) => {
						const tasks = Array.isArray(day?.tasks) ? day.tasks : []

						return (
							<article
								key={`${day?.day}-${index}`}
								className='rounded-xl border border-slate-800/80 bg-[#080d19] p-4 sm:p-5'
							>
								<div className='flex items-start gap-3'>
									<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
										<Icon
											name='clock'
											size={18}
										/>
									</div>

									<div className='min-w-0 flex-1'>
										<p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-indigo-300/80'>
											Day {day?.day ?? index + 1}
										</p>
										<h3 className='mt-1 text-sm font-semibold text-white sm:text-base'>
											{day?.focus}
										</h3>

										{tasks.length > 0 && (
											<ul className='mt-4 space-y-3'>
												{tasks.map(
													(task, taskIndex) => (
														<li
															key={`${index}-task-${taskIndex}`}
															className='flex items-start gap-2.5 text-sm leading-6 text-slate-300'
														>
															<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400' />
															<span>{task}</span>
														</li>
													),
												)}
											</ul>
										)}
									</div>
								</div>
							</article>
						)
					})}
				</div>
			)}
		</section>
	)
}

/* -------------------------------------------------------------------------- */
/*                                 Page states                                */
/* -------------------------------------------------------------------------- */

// shared layout + breadcrumb so every state looks like the same page
function PageShell({ children }) {
	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-slate-100 sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-5xl space-y-6'>
				<nav
					aria-label='Breadcrumb'
					className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'
				>
					<Link
						href='/dashboard'
						className='transition hover:text-slate-300'
					>
						Dashboard
					</Link>
					<span>/</span>
					<Link
						href='/interview-preparation-reports'
						className='transition hover:text-slate-300'
					>
						Interview reports
					</Link>
					<span>/</span>
					<span className='text-indigo-400'>Report details</span>
				</nav>

				{children}
			</div>
		</main>
	)
}

function SkeletonBlock({ className = '' }) {
	return (
		<div
			className={`animate-pulse rounded-2xl border border-slate-800/80 bg-slate-900/40 ${className}`}
		/>
	)
}

function LoadingState() {
	return (
		<PageShell>
			<div
				role='status'
				aria-busy='true'
				aria-live='polite'
				className='space-y-6'
			>
				<span className='sr-only'>Loading interview report…</span>

				<SkeletonBlock className='h-40' />

				<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
					{Array.from({ length: 4 }).map((_, index) => (
						<SkeletonBlock
							key={index}
							className='h-28'
						/>
					))}
				</div>

				<SkeletonBlock className='h-72' />
				<SkeletonBlock className='h-56' />
			</div>
		</PageShell>
	)
}

function MessageState({ title, message, onRetry }) {
	return (
		<PageShell>
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

				<h1 className='mt-5 text-xl font-semibold text-white'>
					{title}
				</h1>
				<p className='mt-2 max-w-md text-sm leading-6 text-slate-400'>
					{message}
				</p>

				<div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
					{onRetry && (
						<button
							type='button'
							onClick={onRetry}
							className='rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400'
						>
							Try again
						</button>
					)}

					<Link
						href='/interview-preparation-reports'
						className='inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800'
					>
						<Icon
							name='arrow'
							size={16}
						/>
						All reports
					</Link>
				</div>
			</div>
		</PageShell>
	)
}

/* -------------------------------------------------------------------------- */
/*                                 Main component                             */
/* -------------------------------------------------------------------------- */

export default function InterviewDetails({ reportId }) {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	const { activeReport, isReportLoading, reportError, fetchReport } =
		useInterview()

	// the id we have actually started fetching for.
	// context state can still hold the PREVIOUS report on the first render,
	// so we never trust it until this matches the current reportId.
	const [requestedId, setRequestedId] = useState(null)

	useEffect(() => {
		// waiting for auth so the first request doesn't go out without a token
		if (isAuthLoading || !isAuthenticated || !reportId) return

		setRequestedId(reportId)
		fetchReport(reportId)
	}, [isAuthLoading, isAuthenticated, reportId, fetchReport])

	const handleRetry = useCallback(() => {
		if (reportId) fetchReport(reportId)
	}, [fetchReport, reportId])

	/* ------------------------------ guard states ----------------------------- */

	if (!reportId) {
		return (
			<MessageState
				title='Report not found'
				message='No report was specified in the link.'
			/>
		)
	}

	if (isAuthLoading) return <LoadingState />

	if (!isAuthenticated) {
		return (
			<MessageState
				title='Sign in required'
				message='Please sign in to view this interview report.'
			/>
		)
	}

	// request has not started yet, or is in flight
	if (requestedId !== reportId || isReportLoading) return <LoadingState />

	if (reportError) {
		const { title, message, canRetry } = getErrorContent(reportError)

		return (
			<MessageState
				title={title}
				message={message}
				onRetry={canRetry ? handleRetry : undefined}
			/>
		)
	}

	// request finished without error but there is no usable report
	if (!activeReport) {
		return (
			<MessageState
				title='Report unavailable'
				message='The report could not be loaded. Please try again.'
				onRetry={handleRetry}
			/>
		)
	}

	/* ------------------------------ success state ---------------------------- */

	const report = activeReport

	const technicalQuestions = Array.isArray(report.technicalQuestions)
		? report.technicalQuestions
		: []
	const behavioralQuestions = Array.isArray(report.behavioralQuestions)
		? report.behavioralQuestions
		: []
	const skillGaps = Array.isArray(report.skillGaps) ? report.skillGaps : []
	const preparationPlan = Array.isArray(report.preparationPlan)
		? report.preparationPlan
		: []

	const totalQuestions =
		technicalQuestions.length + behavioralQuestions.length
	const matchScore = normalizeScore(report.matchScore)

	return (
		<PageShell>
			<header className='rounded-2xl border border-slate-800/80 bg-linear-to-br from-indigo-500/10 via-slate-900/60 to-slate-900/20 p-5 sm:p-7'>
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
								Interview analysis
							</p>
							<h1 className='mt-2 wrap-break-word text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
								{report.jobTitle || 'Untitled position'}
							</h1>
							<p className='mt-2 text-sm leading-6 text-slate-400'>
								Review your interview questions, skill gaps, and
								recommended preparation plan.
							</p>
							<p className='mt-4 text-xs text-slate-500'>
								Created {formatDate(report.createdAt)}
							</p>
						</div>
					</div>

					<Link
						href='/interview-preparation-reports'
						className='inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800'
					>
						<Icon
							name='arrow'
							size={16}
						/>
						All reports
					</Link>
				</div>
			</header>

			<section className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
				<ReportStat
					label='Match score'
					value={matchScore == null ? 'N/A' : `${matchScore}%`}
					icon='target'
					detail='How well your profile fits this role'
					valueClass={getScoreColor(matchScore)}
				/>
				<ReportStat
					label='Total questions'
					value={totalQuestions}
					icon='message'
					detail='Technical and behavioral'
				/>
				<ReportStat
					label='Skill gaps'
					value={skillGaps.length}
					icon='layers'
					detail='Areas to improve'
				/>
				<ReportStat
					label='Plan steps'
					value={preparationPlan.length}
					icon='clock'
					detail='Preparation schedule'
				/>
			</section>

			<QuestionList
				title='Technical questions'
				questions={technicalQuestions}
				icon='file'
			/>

			<QuestionList
				title='Behavioral questions'
				questions={behavioralQuestions}
				icon='message'
			/>

			<SkillGapsSection skillGaps={skillGaps} />
			<PreparationPlanSection preparationPlan={preparationPlan} />

			<footer className='border-t border-slate-800/70 py-5 text-center text-xs text-slate-500'>
				ResumeAI · Interview preparation report
			</footer>
		</PageShell>
	)
}