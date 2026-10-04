// making client component
'use client'

// importing dependencies
import { useEffect, useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
	ArrowLeft,
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	ChevronDown,
	ChevronRight,
	Clock3,
	FileText,
	Search,
	Sparkles,
	Target,
	X,
} from 'lucide-react'

// importing custom hooks
import { useInterview } from '@/hooks/useInterview'

/**
 * Application routes used by this page.
 */
const ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	interviewPreparation: '/interview-preparation',
	reports: '/interview-preparation-reports',
}

/**
 * Filter configuration used by the reports page.
 */
const FILTER_OPTIONS = {
	score: {
		all: 'all',
		excellent: 'excellent',
		good: 'good',
		needsWork: 'needs-work',
	},
	sort: {
		newest: 'newest',
		oldest: 'oldest',
		highestScore: 'highest-score',
		lowestScore: 'lowest-score',
	},
}

/**
 * Shared card styling used throughout the page.
 */
const CARD_CLASS_NAME =
	'rounded-lg border border-white/10 bg-white/[0.035] backdrop-blur-xl'

/**
 * Background visual effects.
 */
function PageBackground() {
	return (
		<div
			aria-hidden='true'
			className='pointer-events-none fixed inset-0 overflow-hidden'
		>
			<div className='absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl' />

			<div className='absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />

			<div className='absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl' />
		</div>
	)
}

/**
 * Page header containing the application brand and dashboard navigation.
 */
function PageHeader({ onHome, onDashboard }) {
	return (
		<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
				<button
					type='button'
					onClick={onHome}
					aria-label='Go to ResumeAI home page'
					className='ml-14 flex cursor-pointer items-center gap-2.5 transition'
				>
					<span className='text-lg font-semibold tracking-tight text-white'>
						ResumeAI
					</span>
				</button>

				<button
					type='button'
					onClick={onDashboard}
					className='group mr-14 flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-white'
				>
					<ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' />

					<span>Dashboard</span>
				</button>
			</div>
		</header>
	)
}

/**
 * Page heading and introduction.
 */
function PageIntro() {
	return (
		<section className='flex flex-col gap-5 border-b border-white/10 pb-6'>
			<div className='flex items-center gap-3'>
				<div className='flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
					<FileText
						className='h-5 w-5 text-cyan-300'
						aria-hidden='true'
					/>
				</div>

				<div>
					<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
						Interview Reports
					</h1>

					<p className='mt-1 text-sm text-gray-400'>
						Review and continue your AI-powered interview
						preparation.
					</p>
				</div>
			</div>
		</section>
	)
}

/**
 * Individual report statistic card.
 */
function ReportStatCard({ label, value, icon: Icon, iconClassName }) {
	return (
		<div className={`${CARD_CLASS_NAME} p-5`}>
			<div className='flex items-center justify-between'>
				<div>
					<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
						{label}
					</p>

					<p className='mt-2 text-2xl font-semibold text-white'>
						{value}
					</p>
				</div>

				<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/5'>
					<Icon
						className={`h-5 w-5 ${iconClassName}`}
						aria-hidden='true'
					/>
				</div>
			</div>
		</div>
	)
}

/**
 * Report statistics section.
 */
function ReportStatistics({ statistics }) {
	return (
		<section className='mt-6 grid gap-3 sm:grid-cols-3'>
			<ReportStatCard
				label='Total Reports'
				value={statistics.total}
				icon={FileText}
				iconClassName='text-cyan-300'
			/>

			<ReportStatCard
				label='Average Match'
				value={`${statistics.averageScore}%`}
				icon={Target}
				iconClassName='text-blue-300'
			/>

			<ReportStatCard
				label='Highest Match'
				value={`${statistics.highestScore}%`}
				icon={Sparkles}
				iconClassName='text-cyan-300'
			/>
		</section>
	)
}

/**
 * Custom select field used by the filters.
 */
function FilterSelect({ value, onChange, label, children }) {
	return (
		<div className='relative'>
			<label className='sr-only'>{label}</label>

			<select
				value={value}
				onChange={onChange}
				aria-label={label}
				className='h-10 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-black/20 px-3 pr-9 text-sm text-gray-300 outline-none transition focus:border-cyan-400/40 sm:w-45'
			>
				{children}
			</select>

			<ChevronDown
				className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500'
				aria-hidden='true'
			/>
		</div>
	)
}

/**
 * Search input used to search interview reports.
 */
function ReportSearch({ value, onChange, onClear }) {
	return (
		<div className='relative min-w-0 flex-1'>
			<Search
				className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500'
				aria-hidden='true'
			/>

			<input
				type='search'
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder='Search interview reports...'
				aria-label='Search interview reports'
				className='h-10 w-full rounded-md border border-white/10 bg-black/20 pl-9 pr-9 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.035]'
			/>

			{value && (
				<button
					type='button'
					onClick={onClear}
					aria-label='Clear search'
					className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-white'
				>
					<X
						className='h-4 w-4'
						aria-hidden='true'
					/>
				</button>
			)}
		</div>
	)
}

/**
 * Filters section used to search, filter and sort reports.
 */
function ReportFilters({
	searchQuery,
	scoreFilter,
	sortBy,
	hasActiveFilters,
	filteredCount,
	totalCount,
	onSearchChange,
	onScoreChange,
	onSortChange,
	onClear,
}) {
	return (
		<section className='mt-6 rounded-lg border border-white/10 bg-white/2.5 p-4 backdrop-blur-xl sm:p-5'>
			<div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
				<ReportSearch
					value={searchQuery}
					onChange={onSearchChange}
					onClear={() => onSearchChange('')}
				/>

				<FilterSelect
					value={scoreFilter}
					onChange={(event) => onScoreChange(event.target.value)}
					label='Filter reports by match score'
				>
					<option value={FILTER_OPTIONS.score.all}>All scores</option>

					<option value={FILTER_OPTIONS.score.excellent}>
						80%+ Match
					</option>

					<option value={FILTER_OPTIONS.score.good}>
						60–79% Match
					</option>

					<option value={FILTER_OPTIONS.score.needsWork}>
						Below 60%
					</option>
				</FilterSelect>

				<FilterSelect
					value={sortBy}
					onChange={(event) => onSortChange(event.target.value)}
					label='Sort interview reports'
				>
					<option value={FILTER_OPTIONS.sort.newest}>
						Newest first
					</option>

					<option value={FILTER_OPTIONS.sort.oldest}>
						Oldest first
					</option>

					<option value={FILTER_OPTIONS.sort.highestScore}>
						Highest match
					</option>

					<option value={FILTER_OPTIONS.sort.lowestScore}>
						Lowest match
					</option>
				</FilterSelect>

				{hasActiveFilters && (
					<button
						type='button'
						onClick={onClear}
						className='h-10 cursor-pointer rounded-md border border-white/10 px-4 text-sm text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white'
					>
						Clear
					</button>
				)}
			</div>

			<div className='mt-3 flex items-center justify-between text-xs text-gray-500'>
				<span>
					Showing {filteredCount} of {totalCount} reports
				</span>

				{hasActiveFilters && (
					<span className='text-cyan-400'>Filters active</span>
				)}
			</div>
		</section>
	)
}

/**
 * Loading state displayed while reports are being fetched.
 */
function ReportsLoadingState() {
	return (
		<div
			className={`${CARD_CLASS_NAME} p-10 text-center`}
			role='status'
			aria-live='polite'
		>
			<div
				className='mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400'
				aria-hidden='true'
			/>

			<p className='mt-4 text-sm text-gray-400'>
				Loading your interview reports...
			</p>
		</div>
	)
}

/**
 * Empty state displayed when the user has no reports.
 */
function EmptyReportsState({ onCreate }) {
	return (
		<div className={`${CARD_CLASS_NAME} px-6 py-14 text-center`}>
			<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10'>
				<Target
					className='h-6 w-6 text-cyan-300'
					aria-hidden='true'
				/>
			</div>

			<h3 className='mt-5 text-lg font-semibold text-white'>
				No interview reports yet
			</h3>

			<p className='mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500'>
				Generate your first AI-powered interview preparation guide to
				analyze your resume, identify skill gaps, and prepare for
				technical and behavioral questions.
			</p>

			<button
				type='button'
				onClick={onCreate}
				className='mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
			>
				<Sparkles
					className='h-4 w-4'
					aria-hidden='true'
				/>
				Create Interview Guide
				<ArrowRight
					className='h-4 w-4'
					aria-hidden='true'
				/>
			</button>
		</div>
	)
}

/**
 * Empty state displayed when filters return no reports.
 */
function NoSearchResults({ onClear }) {
	return (
		<div className={`${CARD_CLASS_NAME} px-6 py-12 text-center`}>
			<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/5'>
				<Search
					className='h-5 w-5 text-gray-500'
					aria-hidden='true'
				/>
			</div>

			<h3 className='mt-4 text-base font-semibold text-white'>
				No reports found
			</h3>

			<p className='mt-1 text-sm text-gray-500'>
				Try changing your search or filters.
			</p>

			<button
				type='button'
				onClick={onClear}
				className='mt-4 cursor-pointer text-sm font-medium text-cyan-300 transition hover:text-cyan-200'
			>
				Clear all filters
			</button>
		</div>
	)
}

/**
 * Safely extracts a report date value.
 *
 * Supports normal ISO dates as well as MongoDB extended JSON dates.
 */
function getReportDateValue(date) {
	if (!date) {
		return null
	}

	return typeof date === 'object' && date?.$date ? date.$date : date
}

/**
 * Formats the report creation date.
 */
function formatReportDate(date) {
	const value = getReportDateValue(date)

	if (!value) {
		return 'Unknown date'
	}

	const parsedDate = new Date(value)

	if (Number.isNaN(parsedDate.getTime())) {
		return 'Unknown date'
	}

	return parsedDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

/**
 * Formats the report creation time.
 */
function formatReportTime(date) {
	const value = getReportDateValue(date)

	if (!value) {
		return ''
	}

	const parsedDate = new Date(value)

	if (Number.isNaN(parsedDate.getTime())) {
		return ''
	}

	return parsedDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	})
}

/**
 * Individual interview report card.
 */
function InterviewReportCard({ report, onOpen }) {
	const technicalCount = report.technicalQuestions?.length ?? 0
	const behavioralCount = report.behavioralQuestions?.length ?? 0
	const skillGapCount = report.skillGaps?.length ?? 0
	const score = Number(report.matchScore ?? 0)

	return (
		<button
			type='button'
			onClick={() => onOpen(report._id)}
			aria-label={`Open interview report for ${
				report.jobTitle || 'Interview Preparation'
			}`}
			className='group relative flex min-h-65 w-full cursor-pointer flex-col rounded-lg border border-white/10 bg-white/2.5 p-5 text-left backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/4 focus:outline-none focus:ring-2 focus:ring-cyan-400/40'
		>
			{/* Card top */}
			<div className='flex items-start justify-between gap-4'>
				<div className='flex min-w-0 items-center gap-3'>
					<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
						<BriefcaseBusiness
							className='h-4 w-4 text-cyan-300'
							aria-hidden='true'
						/>
					</div>

					<div className='min-w-0'>
						<h3 className='truncate text-sm font-semibold text-white'>
							{report.jobTitle || 'Interview Preparation Report'}
						</h3>

						<p className='mt-1 truncate text-xs text-gray-500'>
							Interview preparation guide
						</p>
					</div>
				</div>

				{/* Match score */}
				<div className='shrink-0 text-right'>
					<p className='text-2xl font-semibold text-cyan-300'>
						{score}%
					</p>

					<p className='text-[10px] uppercase tracking-wider text-gray-600'>
						Match
					</p>
				</div>
			</div>

			{/* Divider */}
			<div className='my-5 border-t border-white/5' />

			{/* Report statistics */}
			<div className='grid grid-cols-3 gap-2'>
				<ReportCardStat
					value={technicalCount}
					label='Technical'
				/>

				<ReportCardStat
					value={behavioralCount}
					label='Behavioral'
				/>

				<ReportCardStat
					value={skillGapCount}
					label='Skill Gaps'
				/>
			</div>

			{/* Card footer */}
			<div className='mt-auto flex items-center justify-between pt-5'>
				<div className='flex items-center gap-2 text-xs text-gray-500'>
					<CalendarDays
						className='h-3.5 w-3.5'
						aria-hidden='true'
					/>

					<span>{formatReportDate(report.createdAt)}</span>

					{formatReportTime(report.createdAt) && (
						<>
							<span
								className='text-gray-700'
								aria-hidden='true'
							>
								•
							</span>

							<Clock3
								className='h-3.5 w-3.5'
								aria-hidden='true'
							/>

							<span>{formatReportTime(report.createdAt)}</span>
						</>
					)}
				</div>

				<div className='flex items-center gap-1 text-xs font-medium text-gray-500 transition group-hover:text-cyan-300'>
					View report
					<ChevronRight
						className='h-3.5 w-3.5 transition group-hover:translate-x-0.5'
						aria-hidden='true'
					/>
				</div>
			</div>
		</button>
	)
}

/**
 * Small statistic displayed inside an interview report card.
 */
function ReportCardStat({ value, label }) {
	return (
		<div className='rounded-md border border-white/5 bg-black/20 p-3'>
			<p className='text-lg font-semibold text-gray-200'>{value}</p>

			<p className='mt-1 text-[10px] uppercase tracking-wide text-gray-600'>
				{label}
			</p>
		</div>
	)
}

/**
 * Interview report cards grid.
 */
function ReportsGrid({ reports, onOpen }) {
	return (
		<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
			{reports.map((report) => (
				<InterviewReportCard
					key={report._id}
					report={report}
					onOpen={onOpen}
				/>
			))}
		</div>
	)
}

/**
 * Bottom call-to-action for generating another interview guide.
 */
function GenerateAnotherGuide({ onGenerate }) {
	return (
		<section className='mt-8 overflow-hidden rounded-lg border border-cyan-400/10 bg-linear-to-r from-cyan-400/6 to-blue-500/4 p-6 sm:p-7'>
			<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
				<div className='max-w-xl'>
					<div className='flex items-center gap-2'>
						<Sparkles
							className='h-4 w-4 text-cyan-300'
							aria-hidden='true'
						/>

						<span className='text-xs font-semibold uppercase tracking-wider text-cyan-300'>
							Keep improving
						</span>
					</div>

					<h2 className='mt-2 text-lg font-semibold text-white'>
						Prepare for your next interview
					</h2>

					<p className='mt-1 text-sm leading-6 text-gray-500'>
						Generate another personalized guide and continue
						improving your interview readiness.
					</p>
				</div>

				<button
					type='button'
					onClick={onGenerate}
					className='inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
				>
					Generate New Guide
					<ArrowRight
						className='h-4 w-4'
						aria-hidden='true'
					/>
				</button>
			</div>
		</section>
	)
}

/**
 * Reports section containing the section heading and report states.
 */
function ReportsSection({
	loading,
	reports,
	filteredReports,
	onCreate,
	onClearFilters,
	onOpenReport,
}) {
	return (
		<section className='mt-6'>
			{/* Section heading */}
			<div className='mb-4 flex items-center justify-between'>
				<div>
					<h2 className='text-lg font-semibold text-white'>
						All Interview Reports
					</h2>

					<p className='mt-1 text-sm text-gray-500'>
						Your generated interview preparation guides.
					</p>
				</div>
			</div>

			{/* Loading state */}
			{loading && <ReportsLoadingState />}

			{/* Empty state */}
			{!loading && reports.length === 0 && (
				<EmptyReportsState onCreate={onCreate} />
			)}

			{/* No filtered results */}
			{!loading && reports.length > 0 && filteredReports.length === 0 && (
				<NoSearchResults onClear={onClearFilters} />
			)}

			{/* Report cards */}
			{!loading && filteredReports.length > 0 && (
				<ReportsGrid
					reports={filteredReports}
					onOpen={onOpenReport}
				/>
			)}
		</section>
	)
}

/**
 * Main interview reports page.
 */
export default function InterviewPreparationReports() {
	const router = useRouter()

	// interview hook
	const { reports, loading, handleGetReports } = useInterview()

	// local filter states
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState(FILTER_OPTIONS.sort.newest)
	const [scoreFilter, setScoreFilter] = useState(FILTER_OPTIONS.score.all)

	/**
	 * Fetch all interview reports when the page mounts.
	 */
	useEffect(() => {
		const fetchReports = async () => {
			try {
				await handleGetReports()
			} catch (error) {
				console.error('Failed to fetch interview reports:', error)
			}
		}

		fetchReports()
	}, [handleGetReports])

	/**
	 * Filter and sort interview reports.
	 */
	const filteredReports = useMemo(() => {
		let result = [...reports]

		// Apply search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim()

			result = result.filter((report) => {
				const searchableText = [
					report.title,
					report.role,
					report.position,
					report.jobTitle,
					report._id,
				]
					.filter(Boolean)
					.join(' ')
					.toLowerCase()

				return searchableText.includes(query)
			})
		}

		// Apply score filter
		if (scoreFilter !== FILTER_OPTIONS.score.all) {
			result = result.filter((report) => {
				const score = Number(report.matchScore ?? 0)

				if (scoreFilter === FILTER_OPTIONS.score.excellent) {
					return score >= 80
				}

				if (scoreFilter === FILTER_OPTIONS.score.good) {
					return score >= 60 && score < 80
				}

				if (scoreFilter === FILTER_OPTIONS.score.needsWork) {
					return score < 60
				}

				return true
			})
		}

		// Apply sorting
		result.sort((a, b) => {
			if (sortBy === FILTER_OPTIONS.sort.newest) {
				return (
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				)
			}

			if (sortBy === FILTER_OPTIONS.sort.oldest) {
				return (
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
				)
			}

			if (sortBy === FILTER_OPTIONS.sort.highestScore) {
				return Number(b.matchScore ?? 0) - Number(a.matchScore ?? 0)
			}

			if (sortBy === FILTER_OPTIONS.sort.lowestScore) {
				return Number(a.matchScore ?? 0) - Number(b.matchScore ?? 0)
			}

			return 0
		})

		return result
	}, [reports, searchQuery, scoreFilter, sortBy])

	/**
	 * Calculate summary statistics from all reports.
	 */
	const reportStats = useMemo(() => {
		if (!reports.length) {
			return {
				total: 0,
				averageScore: 0,
				highestScore: 0,
			}
		}

		const scores = reports.map((report) => Number(report.matchScore ?? 0))

		const totalScore = scores.reduce((sum, score) => sum + score, 0)

		return {
			total: reports.length,
			averageScore: Math.round(totalScore / reports.length),
			highestScore: Math.max(...scores),
		}
	}, [reports])

	/**
	 * Clear all active filters and restore defaults.
	 */
	const handleClearFilters = () => {
		setSearchQuery('')
		setScoreFilter(FILTER_OPTIONS.score.all)
		setSortBy(FILTER_OPTIONS.sort.newest)
	}

	/**
	 * Determine whether any non-default filter is active.
	 */
	const hasActiveFilters =
		searchQuery.trim() !== '' ||
		scoreFilter !== FILTER_OPTIONS.score.all ||
		sortBy !== FILTER_OPTIONS.sort.newest

	/**
	 * Navigate to the home page.
	 */
	const handleGoHome = () => {
		router.push(ROUTES.home)
	}

	/**
	 * Navigate to the dashboard.
	 */
	const handleGoToDashboard = () => {
		router.push(ROUTES.dashboard)
	}

	/**
	 * Navigate to the interview preparation page.
	 */
	const handleCreateReport = () => {
		router.push(ROUTES.interviewPreparation)
	}

	/**
	 * Navigate to a specific interview report.
	 */
	const handleOpenReport = (reportId) => {
		if (!reportId) {
			return
		}

		router.push(`${ROUTES.reports}/${reportId}`)
	}

	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			<PageBackground />

			<PageHeader
				onHome={handleGoHome}
				onDashboard={handleGoToDashboard}
			/>

			<div className='relative mx-auto w-full max-w-375 px-4 py-6 sm:px-6 lg:px-8'>
				<PageIntro />

				<ReportStatistics statistics={reportStats} />

				<ReportFilters
					searchQuery={searchQuery}
					scoreFilter={scoreFilter}
					sortBy={sortBy}
					hasActiveFilters={hasActiveFilters}
					filteredCount={filteredReports.length}
					totalCount={reports.length}
					onSearchChange={setSearchQuery}
					onScoreChange={setScoreFilter}
					onSortChange={setSortBy}
					onClear={handleClearFilters}
				/>

				<ReportsSection
					loading={loading}
					reports={reports}
					filteredReports={filteredReports}
					onCreate={handleCreateReport}
					onClearFilters={handleClearFilters}
					onOpenReport={handleOpenReport}
				/>

				{!loading && reports.length > 0 && (
					<GenerateAnotherGuide onGenerate={handleCreateReport} />
				)}
			</div>
		</main>
	)
}