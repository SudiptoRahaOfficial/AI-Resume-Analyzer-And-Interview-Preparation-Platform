'use client'

// ============================================================================
// Dependencies
// ============================================================================

// Import React hooks used for side effects, memoized calculations, and local
// component state management.
import { useEffect, useMemo, useState } from 'react'

// Import Next.js router for client-side navigation.
import { useRouter } from 'next/navigation'

// Import icons used throughout the generated resumes interface.
import {
	ArrowDownToLine,
	ArrowLeft,
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	ChevronDown,
	ChevronRight,
	FileCheck2,
	FileText,
	Search,
	Sparkles,
	X,
} from 'lucide-react'

// Import the custom resume hook responsible for resume data and API operations.
import { useResume } from '@/hooks/useResume'

// ============================================================================
// Constants
// ============================================================================

// Define the default sorting option used by the resumes page.
const DEFAULT_SORT_OPTION = 'newest'

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Normalizes a resume date value.
 *
 * MongoDB dates can arrive either as regular date-compatible values or as
 * objects containing a `$date` property. This helper keeps that handling in
 * one place.
 *
 * @param {string|Date|Object|null|undefined} date - Resume date value.
 * @returns {Date|null} Parsed date or null when invalid.
 */
function parseResumeDate(date) {
	// Return null when no date value is available.
	if (!date) {
		return null
	}

	// Support MongoDB Extended JSON date objects.
	const value = typeof date === 'object' && date?.$date ? date.$date : date

	// Convert the normalized value into a JavaScript Date instance.
	const parsedDate = new Date(value)

	// Return null when the date could not be parsed.
	if (Number.isNaN(parsedDate.getTime())) {
		return null
	}

	return parsedDate
}

/**
 * Formats a resume creation date for display.
 *
 * @param {string|Date|Object|null|undefined} date - Resume creation date.
 * @returns {string} Formatted date or fallback text.
 */
function formatResumeDate(date) {
	// Parse the supplied date using the shared date utility.
	const parsedDate = parseResumeDate(date)

	// Return the existing fallback when the date is invalid.
	if (!parsedDate) {
		return 'Unknown date'
	}

	// Format the date consistently across the application.
	return parsedDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

/**
 * Formats a resume creation time for display.
 *
 * @param {string|Date|Object|null|undefined} date - Resume creation date.
 * @returns {string} Formatted time or an empty string.
 */
function formatResumeTime(date) {
	// Parse the supplied date using the shared date utility.
	const parsedDate = parseResumeDate(date)

	// Return an empty value when the date is invalid.
	if (!parsedDate) {
		return ''
	}

	// Format the time consistently using the user's locale.
	return parsedDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	})
}

// ============================================================================
// Page Header
// ============================================================================

/**
 * Renders the shared generated resumes page header.
 *
 * Navigation handlers are injected into the component so routing remains
 * outside this presentational component.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onNavigateHome - Home navigation handler.
 * @param {Function} props.onNavigateDashboard - Dashboard navigation handler.
 * @returns {JSX.Element} Generated resumes page header.
 */
function ResumesHeader({ onNavigateHome, onNavigateDashboard }) {
	return (
		<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
				{/* ResumeAI brand navigation. */}
				<button
					type='button'
					onClick={onNavigateHome}
					className='ml-14 flex cursor-pointer items-center gap-2.5 transition'
				>
					<span className='text-lg font-semibold tracking-tight text-white'>
						ResumeAI
					</span>
				</button>

				{/* Dashboard navigation. */}
				<button
					type='button'
					onClick={onNavigateDashboard}
					className='group mr-14 flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-white'
				>
					<ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' />

					<span>Dashboard</span>
				</button>
			</div>
		</header>
	)
}

// ============================================================================
// Page Introduction
// ============================================================================

/**
 * Renders the generated resumes page heading and supporting description.
 *
 * @returns {JSX.Element} Page introduction.
 */
function ResumesPageIntro() {
	return (
		<section className='flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between'>
			{/* Page title content. */}
			<div>
				<div className='flex items-center gap-3'>
					{/* Page icon. */}
					<div className='flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
						<FileText className='h-5 w-5 text-cyan-300' />
					</div>

					{/* Page title and description. */}
					<div>
						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							Generated Resumes
						</h1>

						<p className='mt-1 text-sm text-gray-400'>
							Manage and access your AI-generated resumes.
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}

// ============================================================================
// Statistics
// ============================================================================

/**
 * Renders a reusable resume statistic card.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - Statistic label.
 * @param {string|number} props.value - Statistic value.
 * @param {React.ReactNode} props.icon - Statistic icon.
 * @param {string} props.iconClassName - Icon container styling.
 * @param {string} props.iconColorClassName - Icon color styling.
 * @returns {JSX.Element} Statistic card.
 */
function ResumeStatisticCard({
	label,
	value,
	icon,
	iconClassName,
	iconColorClassName,
}) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl'>
			<div className='flex items-center justify-between'>
				{/* Statistic information. */}
				<div>
					<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
						{label}
					</p>

					<p className='mt-2 text-2xl font-semibold text-white'>
						{value}
					</p>
				</div>

				{/* Statistic icon. */}
				<div
					className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClassName}`}
				>
					<span className={iconColorClassName}>{icon}</span>
				</div>
			</div>
		</div>
	)
}

/**
 * Renders the generated resume statistics section.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.stats - Calculated resume statistics.
 * @returns {JSX.Element} Resume statistics.
 */
function ResumeStatistics({ stats }) {
	return (
		<section className='mt-6 grid gap-3 sm:grid-cols-2'>
			{/* Total resumes statistic. */}
			<ResumeStatisticCard
				label='Total Resumes'
				value={stats.total}
				icon={<FileText className='h-5 w-5' />}
				iconClassName='bg-cyan-400/10'
				iconColorClassName='text-cyan-300'
			/>

			{/* Latest generated statistic. */}
			<ResumeStatisticCard
				label='Latest Generated'
				value={
					stats.latestDate ? formatResumeDate(stats.latestDate) : '—'
				}
				icon={<CalendarDays className='h-5 w-5' />}
				iconClassName='bg-blue-400/10'
				iconColorClassName='text-blue-300'
			/>
		</section>
	)
}

// ============================================================================
// Filters
// ============================================================================

/**
 * Renders the resume search and sorting controls.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.searchQuery - Current search query.
 * @param {Function} props.onSearchChange - Search change handler.
 * @param {string} props.sortBy - Current sorting option.
 * @param {Function} props.onSortChange - Sorting change handler.
 * @param {boolean} props.hasActiveFilters - Whether any filter is active.
 * @param {Function} props.onClearFilters - Filter reset handler.
 * @param {number} props.filteredCount - Number of filtered resumes.
 * @param {number} props.totalCount - Total number of resumes.
 * @returns {JSX.Element} Resume filter controls.
 */
function ResumeFilters({
	searchQuery,
	onSearchChange,
	sortBy,
	onSortChange,
	hasActiveFilters,
	onClearFilters,
	filteredCount,
	totalCount,
}) {
	return (
		<section className='mt-6 rounded-lg border border-white/10 bg-white/2.5 p-4 backdrop-blur-xl sm:p-5'>
			<div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
				{/* ------------------------------------------------------------
                    Search
                ------------------------------------------------------------- */}

				<div className='relative min-w-0 flex-1'>
					{/* Search icon. */}
					<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />

					{/* Search input. */}
					<input
						type='text'
						value={searchQuery}
						onChange={(event) => onSearchChange(event.target.value)}
						placeholder='Search resumes by target role...'
						className='h-10 w-full rounded-md border border-white/10 bg-black/20 pl-9 pr-9 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/40 focus:bg-white/[0.035]'
					/>

					{/* Clear search control. */}
					{searchQuery && (
						<button
							type='button'
							onClick={() => onSearchChange('')}
							aria-label='Clear search'
							className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-white'
						>
							<X className='h-4 w-4' />
						</button>
					)}
				</div>

				{/* ------------------------------------------------------------
                    Sorting
                ------------------------------------------------------------- */}

				<div className='relative'>
					{/* Sorting select. */}
					<select
						value={sortBy}
						onChange={(event) => onSortChange(event.target.value)}
						className='h-10 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-black/20 px-3 pr-9 text-sm text-gray-300 outline-none transition focus:border-cyan-400/40 sm:w-48'
					>
						<option value='newest'>Newest first</option>
						<option value='oldest'>Oldest first</option>
						<option value='title-az'>Role A–Z</option>
						<option value='title-za'>Role Z–A</option>
					</select>

					{/* Custom select icon. */}
					<ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
				</div>

				{/* ------------------------------------------------------------
                    Clear Filters
                ------------------------------------------------------------- */}

				{hasActiveFilters && (
					<button
						type='button'
						onClick={onClearFilters}
						className='h-10 cursor-pointer rounded-md border border-white/10 px-4 text-sm text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white'
					>
						Clear
					</button>
				)}
			</div>

			{/* Filter result summary. */}
			<div className='mt-3 flex items-center justify-between text-xs text-gray-500'>
				<span>
					Showing {filteredCount} of {totalCount} resumes
				</span>

				{hasActiveFilters && (
					<span className='text-cyan-400'>Filters active</span>
				)}
			</div>
		</section>
	)
}

// ============================================================================
// Resume Card
// ============================================================================

/**
 * Renders an individual generated resume card.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.resume - Resume data.
 * @param {Function} props.onView - Resume details navigation handler.
 * @returns {JSX.Element} Resume card.
 */
function ResumeCard({ resume, onView }) {
	// Format the resume creation date once for this card.
	const createdDate = formatResumeDate(resume.createdAt)

	// Format the resume creation time once for this card.
	const createdTime = formatResumeTime(resume.createdAt)

	/**
	 * Handles keyboard activation of the complete card.
	 *
	 * @param {React.KeyboardEvent} event - Keyboard event.
	 */
	const handleCardKeyDown = (event) => {
		// Support both Enter and Space for accessible card activation.
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onView(resume._id)
		}
	}

	/**
	 * Prevents the download control from triggering card navigation.
	 *
	 * @param {React.MouseEvent} event - Mouse event.
	 */
	const handleDownloadClick = (event) => {
		event.stopPropagation()
	}

	/**
	 * Handles the explicit View button.
	 *
	 * @param {React.MouseEvent} event - Mouse event.
	 */
	const handleViewClick = (event) => {
		event.stopPropagation()
		onView(resume._id)
	}

	return (
		<div
			role='button'
			tabIndex={0}
			onClick={() => onView(resume._id)}
			onKeyDown={handleCardKeyDown}
			className='group relative flex min-h-65 w-full cursor-pointer flex-col rounded-lg border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/4'
		>
			{/* ================================================================
                Card Header
            ================================================================= */}

			<div className='flex items-start justify-between gap-4'>
				{/* Resume identity. */}
				<div className='flex min-w-0 items-center gap-3'>
					{/* Target role icon. */}
					<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
						<BriefcaseBusiness className='h-4 w-4 text-cyan-300' />
					</div>

					{/* Resume title. */}
					<div className='min-w-0'>
						<h3 className='truncate text-sm font-semibold text-white'>
							{resume.jobTitle || 'Generated Resume'}
						</h3>

						<p className='mt-1 truncate text-xs text-gray-500'>
							AI-generated resume
						</p>
					</div>
				</div>

				{/* Generated PDF status. */}
				<div className='flex shrink-0 items-center gap-1.5 rounded-md border border-emerald-400/10 bg-emerald-400/5 px-2 py-1'>
					<FileCheck2 className='h-3 w-3 text-emerald-300' />

					<span className='text-[10px] font-medium text-emerald-300'>
						PDF
					</span>
				</div>
			</div>

			{/* ================================================================
                Divider
            ================================================================= */}

			<div className='my-5 border-t border-white/5' />

			{/* ================================================================
                Resume Information
            ================================================================= */}

			<div className='grid grid-cols-2 gap-2'>
				{/* Target role. */}
				<div className='rounded-md border border-white/5 bg-black/20 p-3'>
					<p className='text-[10px] uppercase tracking-wide text-gray-600'>
						Target role
					</p>

					<p className='mt-1.5 truncate text-xs font-medium text-gray-300'>
						{resume.jobTitle || 'Not specified'}
					</p>
				</div>

				{/* Resume status. */}
				<div className='rounded-md border border-white/5 bg-black/20 p-3'>
					<p className='text-[10px] uppercase tracking-wide text-gray-600'>
						Status
					</p>

					<p className='mt-1.5 text-xs font-medium text-emerald-300'>
						Ready
					</p>
				</div>
			</div>

			{/* ================================================================
                Card Footer
            ================================================================= */}

			<div className='mt-auto flex items-center justify-between gap-3 pt-5'>
				{/* Creation date/time. */}
				<div className='flex min-w-0 items-center gap-2 text-xs text-gray-500'>
					<CalendarDays className='h-3.5 w-3.5 shrink-0' />

					<span className='truncate'>{createdDate}</span>

					{createdTime && (
						<>
							<span className='text-gray-700'>•</span>

							<span>{createdTime}</span>
						</>
					)}
				</div>

				{/* Resume actions. */}
				<div className='flex shrink-0 items-center gap-2'>
					{/* Resume download. */}
					<a
						href={resume.resumePdf}
						download
						target='_blank'
						onClick={handleDownloadClick}
						aria-label='Download resume'
						title='Download resume'
						className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 text-gray-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300'
					>
						<ArrowDownToLine className='h-3.5 w-3.5' />
					</a>

					{/* Resume details navigation. */}
					<button
						type='button'
						onClick={handleViewClick}
						className='group/view flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 transition hover:text-cyan-300'
					>
						View
						<ChevronRight className='h-3.5 w-3.5 transition group-hover/view:translate-x-0.5' />
					</button>
				</div>
			</div>
		</div>
	)
}

// ============================================================================
// Loading State
// ============================================================================

/**
 * Renders the loading state while generated resumes are being fetched.
 *
 * @returns {JSX.Element} Loading state.
 */
function ResumesLoadingState() {
	return (
		<div className='rounded-lg border border-white/10 bg-white/2.5 p-10 text-center'>
			{/* Loading indicator. */}
			<div className='mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400' />

			{/* Loading message. */}
			<p className='mt-4 text-sm text-gray-400'>
				Loading your generated resumes...
			</p>
		</div>
	)
}

// ============================================================================
// Empty State
// ============================================================================

/**
 * Renders the empty state shown when the user has not generated any resumes.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onCreateResume - Resume creation navigation handler.
 * @returns {JSX.Element} Empty resumes state.
 */
function ResumesEmptyState({ onCreateResume }) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/2.5 px-6 py-14 text-center backdrop-blur-xl'>
			{/* Empty state icon. */}
			<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10'>
				<FileText className='h-6 w-6 text-cyan-300' />
			</div>

			{/* Empty state heading. */}
			<h3 className='mt-5 text-lg font-semibold text-white'>
				No resumes yet
			</h3>

			{/* Empty state description. */}
			<p className='mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500'>
				Create your first AI-powered resume tailored to a specific
				target role and start building your application portfolio.
			</p>

			{/* Resume creation action. */}
			<button
				type='button'
				onClick={onCreateResume}
				className='mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
			>
				<Sparkles className='h-4 w-4' />
				Create Resume
				<ArrowRight className='h-4 w-4' />
			</button>
		</div>
	)
}

// ============================================================================
// Search Empty State
// ============================================================================

/**
 * Renders the empty state when filters produce no matching resumes.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onClearFilters - Filter reset handler.
 * @returns {JSX.Element} No-search-results state.
 */
function ResumeSearchEmptyState({ onClearFilters }) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/2.5 px-6 py-12 text-center'>
			{/* Search empty-state icon. */}
			<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/5'>
				<Search className='h-5 w-5 text-gray-500' />
			</div>

			{/* Empty-state heading. */}
			<h3 className='mt-4 text-base font-semibold text-white'>
				No resumes found
			</h3>

			{/* Empty-state description. */}
			<p className='mt-1 text-sm text-gray-500'>
				Try changing your search or sorting options.
			</p>

			{/* Clear filters action. */}
			<button
				type='button'
				onClick={onClearFilters}
				className='mt-4 cursor-pointer text-sm font-medium text-cyan-300 transition hover:text-cyan-200'
			>
				Clear all filters
			</button>
		</div>
	)
}

// ============================================================================
// Resume List
// ============================================================================

/**
 * Renders the resume collection after loading and empty states have been
 * handled.
 *
 * @param {Object} props - Component properties.
 * @param {Object[]} props.resumes - Resumes to display.
 * @param {Function} props.onViewResume - Resume details navigation handler.
 * @returns {JSX.Element} Resume card grid.
 */
function ResumeGrid({ resumes, onViewResume }) {
	return (
		<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
			{resumes.map((resume) => (
				<ResumeCard
					key={resume._id}
					resume={resume}
					onView={onViewResume}
				/>
			))}
		</div>
	)
}

// ============================================================================
// Resume Section
// ============================================================================

/**
 * Renders the complete generated resume collection section.
 *
 * This component handles only presentation and state-dependent rendering.
 * Data fetching and filtering remain in the page component.
 *
 * @param {Object} props - Component properties.
 * @param {Object[]} props.resumes - All resumes.
 * @param {Object[]} props.filteredResumes - Filtered/sorted resumes.
 * @param {boolean} props.loading - Resume loading state.
 * @param {Function} props.onCreateResume - Resume creation navigation handler.
 * @param {Function} props.onClearFilters - Filter reset handler.
 * @param {Function} props.onViewResume - Resume details navigation handler.
 * @returns {JSX.Element} Generated resumes section.
 */
function GeneratedResumesSection({
	resumes,
	filteredResumes,
	loading,
	onCreateResume,
	onClearFilters,
	onViewResume,
}) {
	return (
		<section className='mt-6'>
			{/* Section heading. */}
			<div className='mb-4 flex items-center justify-between'>
				<div>
					<h2 className='text-lg font-semibold text-white'>
						All Generated Resumes
					</h2>

					<p className='mt-1 text-sm text-gray-500'>
						Your AI-generated resumes organized by target role.
					</p>
				</div>
			</div>

			{/* Loading state. */}
			{loading && <ResumesLoadingState />}

			{/* No-resumes state. */}
			{!loading && resumes.length === 0 && (
				<ResumesEmptyState onCreateResume={onCreateResume} />
			)}

			{/* No-search-results state. */}
			{!loading && resumes.length > 0 && filteredResumes.length === 0 && (
				<ResumeSearchEmptyState onClearFilters={onClearFilters} />
			)}

			{/* Resume cards. */}
			{!loading && filteredResumes.length > 0 && (
				<ResumeGrid
					resumes={filteredResumes}
					onViewResume={onViewResume}
				/>
			)}
		</section>
	)
}

// ============================================================================
// Bottom Call To Action
// ============================================================================

/**
 * Renders the CTA for creating another tailored resume.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onCreateResume - Resume creation navigation handler.
 * @returns {JSX.Element} Resume creation CTA.
 */
function NewResumeCta({ onCreateResume }) {
	return (
		<section className='mt-8 overflow-hidden rounded-lg border border-cyan-400/10 bg-linear-to-r from-cyan-400/6 to-blue-500/4 p-6 sm:p-7'>
			<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
				{/* CTA information. */}
				<div className='max-w-xl'>
					{/* CTA label. */}
					<div className='flex items-center gap-2'>
						<Sparkles className='h-4 w-4 text-cyan-300' />

						<span className='text-xs font-semibold uppercase tracking-wider text-cyan-300'>
							Build your next version
						</span>
					</div>

					{/* CTA heading. */}
					<h2 className='mt-2 text-lg font-semibold text-white'>
						Create a resume for another role
					</h2>

					{/* CTA description. */}
					<p className='mt-1 text-sm leading-6 text-gray-500'>
						Generate another tailored resume optimized for a
						different job opportunity.
					</p>
				</div>

				{/* CTA action. */}
				<button
					type='button'
					onClick={onCreateResume}
					className='inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
				>
					Create New Resume
					<ArrowRight className='h-4 w-4' />
				</button>
			</div>
		</section>
	)
}

// ============================================================================
// Generated Resumes Page
// ============================================================================

/**
 * Provides the generated resumes management page.
 *
 * Responsibilities:
 * - Fetch generated resumes from the existing resume hook.
 * - Manage search and sorting state.
 * - Calculate filtered/sorted resume data.
 * - Calculate resume statistics.
 * - Handle page navigation.
 * - Render the generated resumes interface.
 *
 * Existing API contracts, routes, filtering behavior, and UI behavior are
 * intentionally preserved.
 *
 * @returns {JSX.Element} Generated resumes page.
 */
export default function ResumesPage() {
	// ------------------------------------------------------------------------
	// Router
	// ------------------------------------------------------------------------

	// Initialize the Next.js client-side router.
	const router = useRouter()

	// ------------------------------------------------------------------------
	// Resume API
	// ------------------------------------------------------------------------

	// Extract resume collection, loading state, and the existing API method
	// from the shared resume hook.
	const { resumes, loading, handleGetResumes } = useResume()

	// ------------------------------------------------------------------------
	// Local State
	// ------------------------------------------------------------------------

	// Store the current resume search query.
	const [searchQuery, setSearchQuery] = useState('')

	// Store the current resume sorting option.
	const [sortBy, setSortBy] = useState(DEFAULT_SORT_OPTION)

	// ------------------------------------------------------------------------
	// Fetch Resumes
	// ------------------------------------------------------------------------

	// Fetch the user's generated resumes when the page mounts.
	useEffect(() => {
		const fetchResumes = async () => {
			try {
				// Request all generated resumes through the existing hook.
				await handleGetResumes()
			} catch (error) {
				// Preserve the existing behavior of logging API failures.
				console.error('Failed to fetch resumes:', error)
			}
		}

		fetchResumes()
	}, [handleGetResumes])

	// ------------------------------------------------------------------------
	// Filter and Sort Resumes
	// ------------------------------------------------------------------------

	// Memoize filtered and sorted results to avoid unnecessary recalculation.
	const filteredResumes = useMemo(() => {
		// Create a copy so the original hook state is never mutated.
		let result = [...resumes]

		// ------------------------------------------------------------
		// Search Filter
		// ------------------------------------------------------------

		if (searchQuery.trim()) {
			// Normalize the search query once.
			const query = searchQuery.toLowerCase().trim()

			// Keep resumes whose title or ID contains the search query.
			result = result.filter((resume) => {
				const searchableText = [resume.jobTitle, resume._id]
					.filter(Boolean)
					.join(' ')
					.toLowerCase()

				return searchableText.includes(query)
			})
		}

		// ------------------------------------------------------------
		// Sorting
		// ------------------------------------------------------------

		result.sort((a, b) => {
			// Newest generated resume first.
			if (sortBy === 'newest') {
				return (
					parseResumeDate(b.createdAt)?.getTime() -
					parseResumeDate(a.createdAt)?.getTime()
				)
			}

			// Oldest generated resume first.
			if (sortBy === 'oldest') {
				return (
					parseResumeDate(a.createdAt)?.getTime() -
					parseResumeDate(b.createdAt)?.getTime()
				)
			}

			// Alphabetical target-role sorting.
			if (sortBy === 'title-az') {
				return (a.jobTitle || '').localeCompare(b.jobTitle || '')
			}

			// Reverse alphabetical target-role sorting.
			if (sortBy === 'title-za') {
				return (b.jobTitle || '').localeCompare(a.jobTitle || '')
			}

			// Keep the existing ordering for unknown sort values.
			return 0
		})

		return result
	}, [resumes, searchQuery, sortBy])

	// ------------------------------------------------------------------------
	// Resume Statistics
	// ------------------------------------------------------------------------

	// Calculate total resumes and the latest generated date.
	const resumeStats = useMemo(() => {
		// Return empty statistics when no resumes exist.
		if (!resumes.length) {
			return {
				total: 0,
				latestDate: null,
			}
		}

		// Find the most recently generated resume.
		const sortedResumes = [...resumes].sort(
			(a, b) =>
				parseResumeDate(b.createdAt)?.getTime() -
				parseResumeDate(a.createdAt)?.getTime(),
		)

		return {
			total: resumes.length,
			latestDate: sortedResumes[0]?.createdAt ?? null,
		}
	}, [resumes])

	// ------------------------------------------------------------------------
	// Filter State
	// ------------------------------------------------------------------------

	// Determine whether the current filter state differs from the default.
	const hasActiveFilters =
		searchQuery.trim() !== '' || sortBy !== DEFAULT_SORT_OPTION

	// ------------------------------------------------------------------------
	// Filter Actions
	// ------------------------------------------------------------------------

	/**
	 * Clears all search and sorting filters.
	 */
	const handleClearFilters = () => {
		// Reset the search query.
		setSearchQuery('')

		// Restore the default sorting option.
		setSortBy(DEFAULT_SORT_OPTION)
	}

	// ------------------------------------------------------------------------
	// Navigation Actions
	// ------------------------------------------------------------------------

	/**
	 * Navigates to the generated resume details page.
	 *
	 * @param {string} resumeId - Resume document ID.
	 */
	const handleViewResume = (resumeId) => {
		router.push(`/resumes/${resumeId}`)
	}

	/**
	 * Navigates to the resume generator page.
	 */
	const handleCreateResume = () => {
		router.push('/resume-generator')
	}

	/**
	 * Navigates to the application home page.
	 */
	const handleNavigateHome = () => {
		router.push('/')
	}

	/**
	 * Navigates to the dashboard page.
	 */
	const handleNavigateDashboard = () => {
		router.push('/dashboard')
	}

	// ------------------------------------------------------------------------
	// Page Rendering
	// ------------------------------------------------------------------------

	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			{/* ================================================================
                Background Effects
            ================================================================= */}

			<div className='pointer-events-none fixed inset-0 overflow-hidden'>
				{/* Top-left cyan ambient glow. */}
				<div className='absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl' />

				{/* Right-side blue ambient glow. */}
				<div className='absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />

				{/* Bottom-center cyan ambient glow. */}
				<div className='absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl' />
			</div>

			{/* ================================================================
                Header / Navigation
            ================================================================= */}

			<ResumesHeader
				onNavigateHome={handleNavigateHome}
				onNavigateDashboard={handleNavigateDashboard}
			/>

			{/* ================================================================
                Main Content
            ================================================================= */}

			<div className='relative mx-auto w-full max-w-375 px-4 py-6 sm:px-6 lg:px-8'>
				{/* ------------------------------------------------------------
                    Page Introduction
                ------------------------------------------------------------- */}

				<ResumesPageIntro />

				{/* ------------------------------------------------------------
                    Resume Statistics
                ------------------------------------------------------------- */}

				<ResumeStatistics stats={resumeStats} />

				{/* ------------------------------------------------------------
                    Search and Sorting
                ------------------------------------------------------------- */}

				<ResumeFilters
					searchQuery={searchQuery}
					onSearchChange={setSearchQuery}
					sortBy={sortBy}
					onSortChange={setSortBy}
					hasActiveFilters={hasActiveFilters}
					onClearFilters={handleClearFilters}
					filteredCount={filteredResumes.length}
					totalCount={resumes.length}
				/>

				{/* ------------------------------------------------------------
                    Generated Resume Collection
                ------------------------------------------------------------- */}

				<GeneratedResumesSection
					resumes={resumes}
					filteredResumes={filteredResumes}
					loading={loading}
					onCreateResume={handleCreateResume}
					onClearFilters={handleClearFilters}
					onViewResume={handleViewResume}
				/>

				{/* ------------------------------------------------------------
                    Create Another Resume CTA
                ------------------------------------------------------------- */}

				{!loading && resumes.length > 0 && (
					<NewResumeCta onCreateResume={handleCreateResume} />
				)}
			</div>
		</main>
	)
}