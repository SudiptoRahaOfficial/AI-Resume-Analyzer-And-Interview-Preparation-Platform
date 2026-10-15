'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/icon'

const TEMP_REPORTS = [
	{
		_id: 'report-001',
		jobTitle: 'Backend Software Engineer',
		matchScore: 78,
		technicalQuestions: [
			{
				question:
					'How do you design error-handling middleware in Express?',
			},
			{
				question: 'How do MongoDB indexes improve query performance?',
			},
			{
				question: 'How do you secure a REST API using JWT?',
			},
		],
		behavioralQuestions: [
			{
				question: 'Describe a challenging production bug.',
			},
			{
				question: 'How do you maintain code quality in a team?',
			},
		],
		skillGaps: [
			{
				skill: 'Production Architecture & System Design',
				priority: 'high',
				severity: 'medium',
			},
			{
				skill: 'Database Optimization and Advanced MongoDB Aggregations',
				priority: 'high',
				severity: 'medium',
			},
			{
				skill: 'Automated Testing',
				priority: 'medium',
				severity: 'high',
			},
			{
				skill: 'DevOps & Cloud Deployment',
				priority: 'medium',
				severity: 'high',
			},
		],
		createdAt: '2026-10-09T07:26:14.607Z',
	},
	{
		_id: 'report-002',
		jobTitle: 'Full Stack Developer',
		matchScore: 91,
		technicalQuestions: [
			{ question: 'How do you manage state in React?' },
			{
				question: 'How do you structure a Node.js application?',
			},
			{ question: 'Explain REST API versioning.' },
			{
				question: 'How do you optimize frontend performance?',
			},
		],
		behavioralQuestions: [
			{ question: 'Tell me about a successful project.' },
			{
				question: 'How do you handle conflicting priorities?',
			},
		],
		skillGaps: [
			{
				skill: 'Advanced System Design',
				priority: 'medium',
				severity: 'low',
			},
		],
		createdAt: '2026-10-07T10:15:00.000Z',
	},
	{
		_id: 'report-003',
		jobTitle: 'Junior Node.js Developer',
		matchScore: 56,
		technicalQuestions: [
			{ question: 'What is the Node.js event loop?' },
			{ question: 'Explain middleware in Express.' },
			{ question: 'How does Mongoose validation work?' },
		],
		behavioralQuestions: [
			{ question: 'How do you learn a new technology?' },
			{
				question: 'Describe a mistake you learned from.',
			},
		],
		skillGaps: [
			{
				skill: 'Asynchronous JavaScript',
				priority: 'high',
				severity: 'high',
			},
			{
				skill: 'Database Design',
				priority: 'high',
				severity: 'high',
			},
			{
				skill: 'Testing Fundamentals',
				priority: 'medium',
				severity: 'medium',
			},
		],
		createdAt: '2026-10-04T08:30:00.000Z',
	},
	{
		_id: 'report-004',
		jobTitle: 'Software Engineer',
		matchScore: 84,
		technicalQuestions: [
			{
				question: 'Explain the principles of clean architecture.',
			},
			{
				question: 'How do you improve database performance?',
			},
			{
				question: 'How do you handle API authentication?',
			},
		],
		behavioralQuestions: [
			{ question: 'How do you approach code reviews?' },
			{
				question: 'Describe a time you worked under pressure.',
			},
		],
		skillGaps: [
			{
				skill: 'Distributed Systems',
				priority: 'medium',
				severity: 'medium',
			},
			{
				skill: 'Cloud Infrastructure',
				priority: 'low',
				severity: 'low',
			},
		],
		createdAt: '2026-09-28T14:45:00.000Z',
	},
]

const FILTER_OPTIONS = [
	{ label: 'All reports', value: 'all' },
	{ label: 'Strong match (80%+)', value: 'strong' },
	{ label: 'Good match (60–79%)', value: 'good' },
	{ label: 'Needs improvement (<60%)', value: 'low' },
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

function getScoreStyle(score) {
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
	const score = Number.isFinite(Number(report.matchScore))
		? Math.min(100, Math.max(0, Number(report.matchScore)))
		: 0

	const scoreStyle = getScoreStyle(score)

	const technicalCount = Array.isArray(report.technicalQuestions)
		? report.technicalQuestions.length
		: 0

	const behavioralCount = Array.isArray(report.behavioralQuestions)
		? report.behavioralQuestions.length
		: 0

	const skillGapCount = Array.isArray(report.skillGaps)
		? report.skillGaps.length
		: 0

	return (
		<Link
			href={`/interview-preparation-reports/${report._id}`}
			aria-label={`View interview report for ${report.jobTitle || 'untitled position'}`}
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
							{report.jobTitle || 'Untitled interview report'}
						</h3>

						<p className='mt-1 text-xs text-slate-500'>
							Created {formatDate(report.createdAt)}
						</p>
					</div>

					<div className='shrink-0 text-right'>
						<div className='flex items-baseline justify-end gap-1'>
							<span
								className={`text-xl font-semibold tracking-tight ${scoreStyle.text}`}
							>
								{score}
							</span>

							<span className='text-xs text-slate-500'>
								/ 100
							</span>
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

				<div className='mt-3 flex items-center gap-3 pl-0 sm:pl-13'>
					<div
						className='h-1 flex-1 overflow-hidden rounded-full bg-slate-800'
						role='progressbar'
						aria-label={`Job match score for ${report.jobTitle || 'untitled report'}`}
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

				<div className='mt-3 flex flex-wrap items-center gap-2 pl-0 sm:pl-13'>
					<span className='inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950/50 px-2 py-1 text-[11px] text-slate-400'>
						<Icon
							name='message'
							size={13}
						/>
						{technicalCount + behavioralCount} questions
					</span>

					<span className='inline-flex items-center gap-1.5 rounded-md border border-slate-800 bg-slate-950/50 px-2 py-1 text-[11px] text-slate-400'>
						<Icon
							name='target'
							size={13}
						/>
						{skillGapCount} skill gaps
					</span>

					<span className='ml-auto inline-flex items-center gap-1 text-xs font-medium text-indigo-300 transition group-hover:text-indigo-200 sm:hidden'>
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

export default function InterviewReportList() {
	const [reports] = useState(TEMP_REPORTS)
	const [searchTerm, setSearchTerm] = useState('')
	const [activeFilter, setActiveFilter] = useState('all')

	const averageScore = useMemo(() => {
		if (reports.length === 0) return 0

		const totalScore = reports.reduce(
			(total, report) => total + (Number(report.matchScore) || 0),
			0,
		)

		return Math.round(totalScore / reports.length)
	}, [reports])

	const strongMatches = useMemo(
		() =>
			reports.filter((report) => Number(report.matchScore) >= 80).length,
		[reports],
	)

	const filteredReports = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase()

		return reports
			.filter((report) =>
				(report.jobTitle || '')
					.toLowerCase()
					.includes(normalizedSearch),
			)
			.filter((report) => {
				const score = Number(report.matchScore) || 0

				if (activeFilter === 'strong') {
					return score >= 80
				}

				if (activeFilter === 'good') {
					return score >= 60 && score < 80
				}

				if (activeFilter === 'low') {
					return score < 60
				}

				return true
			})
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime(),
			)
	}, [reports, searchTerm, activeFilter])

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

			{/* Summary statistics */}
			<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
				<SummaryCard
					icon='layers'
					label='Total reports'
					value={reports.length}
					description='Interview reports generated'
				/>

				<SummaryCard
					icon='chart'
					label='Average match score'
					value={`${averageScore}%`}
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
								Your previously generated interview analyses.
							</p>
						</div>

						<span className='mt-2 inline-flex self-start rounded-full border border-slate-800 bg-slate-950/60 px-2.5 py-1 text-xs text-slate-400 sm:mt-0'>
							{filteredReports.length} of {reports.length} reports
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
					{filteredReports.length > 0 ? (
						filteredReports.map((report) => (
							<ReportCard
								key={report._id}
								report={report}
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
								Try a different job title or match-score filter
								to find the report you are looking for.
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
				{filteredReports.length > 0 && (
					<div className='border-t border-slate-800/80 px-4 py-3 sm:px-5'>
						<p className='text-center text-xs leading-5 text-slate-500'>
							Showing {filteredReports.length} interview{' '}
							{filteredReports.length === 1
								? 'report'
								: 'reports'}
							.
						</p>
					</div>
				)}
			</div>
		</section>
	)
}