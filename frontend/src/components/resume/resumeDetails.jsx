'use client'

// ============================================================================
// Dependencies
// ============================================================================

// Import Next.js navigation hooks for route navigation and dynamic parameters.
import { useParams, useRouter } from 'next/navigation'

// Import React hooks required for component state and API lifecycle handling.
import { useEffect, useState } from 'react'

// Import icons used throughout the resume details interface.
import {
	AlertCircle,
	ArrowDownToLine,
	ArrowLeft,
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	CheckCircle2,
	FileCheck2,
	FileText,
	ShieldCheck,
	Sparkles,
} from 'lucide-react'

// Import the custom resume hook responsible for resume state and API operations.
import { useResume } from '@/hooks/useResume'

// ============================================================================
// Reusable Loading State
// ============================================================================

/**
 * Displays the loading state while the requested resume is being fetched.
 *
 * This component is intentionally isolated from the main page so the loading
 * UI remains independent from the actual resume rendering logic.
 *
 * @returns {JSX.Element} Resume loading state.
 */
function ResumeLoadingState() {
	return (
		<main className='flex min-h-screen items-center justify-center bg-[#030712] text-white'>
			<div className='flex flex-col items-center gap-3'>
				{/* Loading indicator icon. */}
				<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
					<Sparkles className='h-5 w-5 animate-pulse text-cyan-300' />
				</div>

				{/* Loading state message. */}
				<p className='text-sm font-medium text-gray-300'>
					Loading your generated resume...
				</p>

				{/* Additional loading context. */}
				<p className='text-xs text-gray-600'>Please wait a moment.</p>
			</div>
		</main>
	)
}

// ============================================================================
// Reusable Error State
// ============================================================================

/**
 * Displays an error state when the requested resume cannot be loaded.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.error - Error message to display to the user.
 * @param {Function} props.onBackToDashboard - Dashboard navigation handler.
 * @returns {JSX.Element} Resume error state.
 */
function ResumeErrorState({ error, onBackToDashboard }) {
	return (
		<main className='flex min-h-screen items-center justify-center bg-[#030712] px-5 text-white'>
			<div className='w-full max-w-md rounded-xl border border-white/10 bg-white/2.5 p-6 text-center'>
				{/* Error indicator. */}
				<div className='mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/10'>
					<AlertCircle className='h-5 w-5 text-red-300' />
				</div>

				{/* Error heading. */}
				<h1 className='mt-4 text-lg font-semibold text-white'>
					Unable to load resume
				</h1>

				{/* API or fallback error message. */}
				<p className='mt-2 text-sm leading-6 text-gray-500'>
					{error || 'The requested resume could not be found.'}
				</p>

				{/* Return to dashboard action. */}
				<button
					type='button'
					onClick={onBackToDashboard}
					className='mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white'
				>
					<ArrowLeft className='h-3.5 w-3.5' />
					Back to Dashboard
				</button>
			</div>
		</main>
	)
}

// ============================================================================
// Page Header
// ============================================================================

/**
 * Renders the global header for the resume details page.
 *
 * The header keeps navigation concerns isolated from the page content and
 * preserves the existing ResumeAI navigation behavior.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onNavigateHome - Home navigation handler.
 * @param {Function} props.onNavigateDashboard - Dashboard navigation handler.
 * @returns {JSX.Element} Resume details page header.
 */
function ResumeHeader({ onNavigateHome, onNavigateDashboard }) {
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
 * Renders the introductory heading and supporting information for the page.
 *
 * @returns {JSX.Element} Resume details page introduction.
 */
function ResumePageIntro() {
	return (
		<section className='mx-auto max-w-375'>
			{/* Page category indicator. */}
			<div className='flex items-center gap-2 text-md font-medium text-cyan-400'>
				<Sparkles className='h-3.5 w-3.5' />
				<span>Generated Resume</span>
			</div>

			{/* Page heading and supporting metadata. */}
			<div className='mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
				{/* Main page heading. */}
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
						Your resume is ready
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-gray-500'>
						Your AI-optimized resume has been successfully generated
						and is ready to download.
					</p>
				</div>

				{/* AI-generated indicator shown on larger screens. */}
				<div className='hidden items-center gap-2 text-xs text-gray-600 lg:flex'>
					<ShieldCheck className='h-3.5 w-3.5' />
					AI-generated resume
				</div>
			</div>
		</section>
	)
}

// ============================================================================
// Resume Generation Summary
// ============================================================================

/**
 * Renders the generation-success summary and primary PDF download action.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.resume - Generated resume data.
 * @returns {JSX.Element} Resume generation summary.
 */
function ResumeGenerationSummary({ resume }) {
	return (
		<section className='mx-auto mt-6 max-w-375'>
			<div className='relative overflow-hidden rounded-lg border border-cyan-400/10 bg-cyan-400/2.5'>
				{/* Decorative accent glow. */}
				<div className='pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/6 blur-3xl' />

				<div className='relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between'>
					{/* Generation status and target role information. */}
					<div className='flex items-start gap-4'>
						{/* Success indicator. */}
						<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10'>
							<CheckCircle2 className='h-5 w-5 text-cyan-300' />
						</div>

						{/* Generation information. */}
						<div>
							<p className='text-xs font-medium text-cyan-400'>
								Generation complete
							</p>

							<h2 className='mt-1 text-lg font-semibold text-white'>
								{resume.jobTitle}
							</h2>

							<p className='mt-1 text-xs leading-5 text-gray-500'>
								Your resume has been tailored for the target
								role and is ready for use.
							</p>
						</div>
					</div>

					{/* PDF download action. */}
					<a
						href={resume.resumePdf}
						download
						target='_blank'
						className='flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#030712] transition hover:bg-cyan-300'
					>
						<ArrowDownToLine className='h-3.5 w-3.5' />
						Download Resume
					</a>
				</div>
			</div>
		</section>
	)
}

// ============================================================================
// Resume Detail Configuration
// ============================================================================

/**
 * Builds the configuration used by the resume details grid.
 *
 * Keeping the repeated detail-card data in one structure prevents duplicated
 * JSX while preserving the existing visual presentation of every field.
 *
 * @param {Object} props - Resume detail values.
 * @param {string} props.jobTitle - Target job title.
 * @param {string} props.formattedDate - Formatted generation date.
 * @param {string} props.formattedTime - Formatted generation time.
 * @returns {Array<Object>} Resume detail configuration.
 */
function getResumeDetailItems({ jobTitle, formattedDate, formattedTime }) {
	return [
		{
			id: 'target-role',
			icon: BriefcaseBusiness,
			iconWrapperClass: 'bg-blue-400/10',
			iconClass: 'text-blue-300',
			label: 'Target role',
			value: jobTitle,
			valueClass: 'leading-5',
		},
		{
			id: 'generated',
			icon: CalendarDays,
			iconWrapperClass: 'bg-cyan-400/10',
			iconClass: 'text-cyan-300',
			label: 'Generated',
			value: formattedDate,
			secondaryValue: formattedTime,
		},
		{
			id: 'file-format',
			icon: FileCheck2,
			iconWrapperClass: 'bg-emerald-400/10',
			iconClass: 'text-emerald-300',
			label: 'File format',
			value: 'PDF Document',
			secondaryValue: 'Ready for download',
			containerClass: 'sm:col-span-2 lg:col-span-1',
		},
	]
}

// ============================================================================
// Resume Detail Item
// ============================================================================

/**
 * Renders one item inside the resume information grid.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.item - Detail item configuration.
 * @returns {JSX.Element} Resume detail item.
 */
function ResumeDetailItem({ item }) {
	// Extract the configured icon component so it can be rendered dynamically.
	const Icon = item.icon

	return (
		<div className={`bg-[#030712]/70 p-5 ${item.containerClass ?? ''}`}>
			{/* Detail icon. */}
			<div
				className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.iconWrapperClass}`}
			>
				<Icon className={`h-3.5 w-3.5 ${item.iconClass}`} />
			</div>

			{/* Detail label. */}
			<p className='mt-3 text-[10px] font-medium uppercase tracking-wide text-gray-600'>
				{item.label}
			</p>

			{/* Primary detail value. */}
			<p
				className={`mt-1.5 text-sm font-medium text-gray-300 ${item.valueClass ?? ''}`}
			>
				{item.value}
			</p>

			{/* Optional secondary detail value. */}
			{item.secondaryValue && (
				<p className='mt-0.5 text-xs text-gray-600'>
					{item.secondaryValue}
				</p>
			)}
		</div>
	)
}

// ============================================================================
// Resume Information
// ============================================================================

/**
 * Renders the generated resume metadata section.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.resume - Generated resume data.
 * @param {string} props.formattedDate - Formatted generation date.
 * @param {string} props.formattedTime - Formatted generation time.
 * @returns {JSX.Element} Resume information section.
 */
function ResumeInformation({ resume, formattedDate, formattedTime }) {
	// Build the metadata configuration once before rendering the detail grid.
	const detailItems = getResumeDetailItems({
		jobTitle: resume.jobTitle,
		formattedDate,
		formattedTime,
	})

	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className='rounded-lg border border-white/10 bg-white/2.5'>
				{/* Section heading. */}
				<div className='border-b border-white/10 px-4 py-3.5'>
					<div className='flex items-center gap-2'>
						<FileText className='h-4 w-4 text-cyan-300' />

						<h2 className='text-[15px] font-semibold text-white'>
							Resume details
						</h2>
					</div>

					<p className='mt-0.5 text-xs text-gray-600'>
						Information about your generated resume.
					</p>
				</div>

				{/* Resume metadata grid. */}
				<div className='grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3'>
					{detailItems.map((item) => (
						<ResumeDetailItem
							key={item.id}
							item={item}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

// ============================================================================
// Resume Actions
// ============================================================================

/**
 * Renders the actions available after a resume has been generated.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onCreateAnother - Handler for creating another resume.
 * @returns {JSX.Element} Resume actions section.
 */
function ResumeActions({ onCreateAnother }) {
	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className='rounded-lg border border-white/10 bg-white/2.5'>
				<div className='flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center'>
					{/* Action section explanation. */}
					<div className='flex items-start gap-3'>
						<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/4'>
							<FileText className='h-4 w-4 text-gray-400' />
						</div>

						<div>
							<p className='text-xs font-medium text-gray-300'>
								What would you like to do next?
							</p>

							<p className='mt-0.5 text-[11px] leading-5 text-gray-600'>
								Download this version or create a new resume for
								another target role.
							</p>
						</div>
					</div>

					{/* Secondary resume action. */}
					<div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
						<button
							type='button'
							onClick={onCreateAnother}
							className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white sm:w-auto'
						>
							Create Another
							<ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}

// ============================================================================
// Security Note
// ============================================================================

/**
 * Renders the security/storage message displayed below the resume actions.
 *
 * @returns {JSX.Element} Resume security note.
 */
function ResumeSecurityNote() {
	return (
		<section className='mx-auto mt-4 max-w-375'>
			<div className='flex items-center justify-center gap-2 py-2 text-center text-[11px] text-gray-700'>
				<ShieldCheck className='h-3.5 w-3.5' />

				<span>
					Your generated resume is securely stored with your account.
				</span>
			</div>
		</section>
	)
}

// ============================================================================
// Resume Details Page
// ============================================================================

/**
 * Displays a single generated resume and provides actions for downloading
 * the generated PDF or creating another resume.
 *
 * Responsibilities:
 * - Retrieve the requested resume using the resume ID.
 * - Handle loading and API error states.
 * - Format resume metadata for presentation.
 * - Render the generated resume summary and details.
 * - Provide navigation to related ResumeAI pages.
 *
 * Existing functionality and API contracts are intentionally preserved.
 *
 * @returns {JSX.Element} Resume details page.
 */
export default function ResumeDetails() {
	// ------------------------------------------------------------------------
	// Resume State and API
	// ------------------------------------------------------------------------

	// Retrieve resume state and resume-specific API operations from the hook.
	const { resume, loading, handleGetResumeById } = useResume()

	// ------------------------------------------------------------------------
	// Navigation
	// ------------------------------------------------------------------------

	// Initialize Next.js router for client-side navigation.
	const router = useRouter()

	// Retrieve the dynamic resume ID from the current route.
	const params = useParams()

	// ------------------------------------------------------------------------
	// Page Error State
	// ------------------------------------------------------------------------

	// Store a user-facing error message when resume retrieval fails.
	const [error, setError] = useState('')

	// ------------------------------------------------------------------------
	// Resume Retrieval
	// ------------------------------------------------------------------------

	/**
	 * Fetch the requested resume whenever the route's resume ID changes.
	 *
	 * The existing API method and error propagation behavior are preserved.
	 */
	useEffect(() => {
		// Do not make an API request until the dynamic route parameter exists.
		if (!params.resumeId) return

		// Fetch the resume asynchronously so the effect itself remains
		// synchronous and React-compatible.
		const fetchResume = async () => {
			try {
				// Clear any previous request error before starting a new one.
				setError('')

				// Retrieve the requested resume through the existing hook.
				await handleGetResumeById(params.resumeId)
			} catch (error) {
				// Preserve the existing error message and fallback behavior.
				setError(error?.message ?? 'Failed to load generated resume.')
			}
		}

		// Execute the resume retrieval operation.
		fetchResume()
	}, [params.resumeId, handleGetResumeById])

	// ------------------------------------------------------------------------
	// Loading State
	// ------------------------------------------------------------------------

	// Render the dedicated loading state while the API request is pending.
	if (loading) {
		return <ResumeLoadingState />
	}

	// ------------------------------------------------------------------------
	// Error State
	// ------------------------------------------------------------------------

	// Render the dedicated error state when retrieval failed or no resume
	// was returned by the resume context.
	if (error || !resume) {
		return (
			<ResumeErrorState
				error={error}
				onBackToDashboard={() => router.push('/dashboard')}
			/>
		)
	}

	// ------------------------------------------------------------------------
	// Resume Metadata Formatting
	// ------------------------------------------------------------------------

	// Convert the API timestamp into a JavaScript Date instance.
	const createdDate = new Date(resume.createdAt)

	// Format the creation date for human-readable display.
	const formattedDate = createdDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})

	// Format the creation time for human-readable display.
	const formattedTime = createdDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	})

	// ------------------------------------------------------------------------
	// Page Rendering
	// ------------------------------------------------------------------------

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* ================================================================
                Background Effects
            ================================================================= */}

			<div className='pointer-events-none fixed inset-0 overflow-hidden'>
				{/* Left-side cyan ambient glow. */}
				<div className='absolute left-[8%] top-40 h-128 w-lg rounded-full bg-cyan-500/[0.07] blur-[120px]' />

				{/* Right-side blue ambient glow. */}
				<div className='absolute right-[8%] top-[18%] h-120 w-120 rounded-full bg-blue-500/5 blur-[120px]' />

				{/* Bottom-center cyan ambient glow. */}
				<div className='absolute bottom-40 left-[38%] h-112 w-md rounded-full bg-cyan-500/[0.035] blur-[110px]' />
			</div>

			{/* ================================================================
                Header / Navigation
            ================================================================= */}

			<ResumeHeader
				onNavigateHome={() => router.push('/')}
				onNavigateDashboard={() => router.push('/dashboard')}
			/>

			{/* ================================================================
                Main Content
            ================================================================= */}

			<div className='relative z-10 w-full px-5 py-8 sm:px-8 lg:px-10 xl:px-12'>
				{/* ------------------------------------------------------------
                    Page Introduction
                ------------------------------------------------------------- */}

				<ResumePageIntro />

				{/* ------------------------------------------------------------
                    Generation Summary
                ------------------------------------------------------------- */}

				<ResumeGenerationSummary resume={resume} />

				{/* ------------------------------------------------------------
                    Resume Information
                ------------------------------------------------------------- */}

				<ResumeInformation
					resume={resume}
					formattedDate={formattedDate}
					formattedTime={formattedTime}
				/>

				{/* ------------------------------------------------------------
                    Resume Actions
                ------------------------------------------------------------- */}

				<ResumeActions
					onCreateAnother={() => router.push('/resume-generator')}
				/>

				{/* ------------------------------------------------------------
                    Security Note
                ------------------------------------------------------------- */}

				<ResumeSecurityNote />
			</div>
		</main>
	)
}