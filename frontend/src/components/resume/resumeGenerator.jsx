'use client'

// ============================================================================
// Dependencies
// ============================================================================

// Import React hooks used for local form state, file input access, and
// component state management.
import { useRef, useState } from 'react'

// Import Next.js router for client-side navigation.
import { useRouter } from 'next/navigation'

// Import icons used throughout the resume generator interface.
import {
	ArrowLeft,
	ArrowRight,
	FileText,
	Sparkles,
	Upload,
	X,
} from 'lucide-react'

// Import the custom resume hook responsible for resume generation and loading
// state management.
import { useResume } from '@/hooks/useResume'

// ============================================================================
// Constants
// ============================================================================

// Define the maximum resume file size accepted by the frontend.
//
// 3 MB is kept consistent with the existing implementation and should also
// match the backend upload validation.
const MAX_RESUME_SIZE = 3 * 1024 * 1024

// Define the accepted resume MIME type.
//
// Keeping this in one place avoids repeating the same validation value.
const ACCEPTED_RESUME_TYPE = 'application/pdf'

// ============================================================================
// Reusable Page Header
// ============================================================================

/**
 * Renders the ResumeAI page header.
 *
 * Navigation behavior is passed into the component so this presentation
 * component does not own routing logic.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onNavigateHome - Handler for home navigation.
 * @param {Function} props.onNavigateDashboard - Handler for dashboard navigation.
 * @returns {JSX.Element} Resume generator header.
 */
function ResumeGeneratorHeader({ onNavigateHome, onNavigateDashboard }) {
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
 * Renders the introductory content for the resume generator page.
 *
 * @returns {JSX.Element} Resume generator page introduction.
 */
function ResumeGeneratorIntro() {
	return (
		<section className='mx-auto max-w-375'>
			{/* Page category indicator. */}
			<div className='flex items-center gap-2 text-md font-medium text-cyan-400'>
				<Sparkles className='h-3.5 w-3.5' />
				<span>Resume Generator</span>
			</div>

			{/* Page heading and supporting information. */}
			<div className='mt-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-end'>
				{/* Main page heading. */}
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
						Create your ATS-optimized resume
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-gray-500'>
						Provide the information below and ResumeAI will create a
						resume tailored to your target role.
					</p>
				</div>

				{/* Privacy indicator shown on larger screens. */}
				<p className='hidden text-xs text-gray-600 lg:block'>
					Your information stays private
				</p>
			</div>
		</section>
	)
}

// ============================================================================
// Reusable Input Card
// ============================================================================

/**
 * Renders the shared visual structure used by the generator input cards.
 *
 * This component centralizes the repeated card container, header, description,
 * and required/optional indicator used by the Resume, About You, and Job
 * Description sections.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - Card title.
 * @param {string} props.description - Card description.
 * @param {string} props.status - Required or Optional indicator.
 * @param {boolean} props.required - Determines status styling.
 * @param {React.ReactNode} props.children - Card body content.
 * @returns {JSX.Element} Reusable input card.
 */
function GeneratorInputCard({
	title,
	description,
	status,
	required = false,
	children,
}) {
	return (
		<div className='rounded-xl border border-white/10 bg-white/2.5'>
			{/* Card header. */}
			<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
				{/* Card heading and description. */}
				<div>
					<h2 className='text-[15px] font-semibold text-white'>
						{title}
					</h2>

					<p className='mt-0.5 text-xs text-gray-600'>
						{description}
					</p>
				</div>

				{/* Required/optional status indicator. */}
				<span
					className={`text-[11px] font-medium ${
						required ? 'text-cyan-400' : 'text-gray-600'
					}`}
				>
					{status}
				</span>
			</div>

			{/* Card content. */}
			<div className='p-4'>{children}</div>
		</div>
	)
}

// ============================================================================
// Resume Upload Empty State
// ============================================================================

/**
 * Renders the resume upload area when no resume has been selected.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onSelectResume - Opens the native file picker.
 * @returns {JSX.Element} Resume upload empty state.
 */
function ResumeUploadEmptyState({ onSelectResume }) {
	return (
		<button
			type='button'
			onClick={onSelectResume}
			className='group flex h-37.5 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/20 transition hover:border-cyan-400/30 hover:bg-cyan-400/2'
		>
			{/* Upload icon. */}
			<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/4 text-gray-500 ring-1 ring-white/10 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-300'>
				<Upload className='h-4 w-4' />
			</div>

			{/* Upload heading. */}
			<p className='mt-2.5 text-sm font-medium text-gray-300'>
				Upload your resume
			</p>

			{/* Upload instruction. */}
			<p className='mt-1 text-xs text-gray-600'>Click to browse files</p>
		</button>
	)
}

// ============================================================================
// Selected Resume Information
// ============================================================================

/**
 * Formats a file size from bytes into megabytes.
 *
 * @param {number} bytes - File size in bytes.
 * @returns {string} Formatted file size in MB.
 */
function formatFileSize(bytes) {
	return (bytes / 1024 / 1024).toFixed(2)
}

/**
 * Renders the selected resume information and resume replacement controls.
 *
 * @param {Object} props - Component properties.
 * @param {File} props.resume - Selected resume file.
 * @param {Function} props.onRemove - Handler for removing the selected file.
 * @param {Function} props.onReplace - Handler for selecting another file.
 * @returns {JSX.Element} Selected resume state.
 */
function SelectedResumeState({ resume, onRemove, onReplace }) {
	return (
		<div className='flex h-37.5 flex-col justify-between'>
			{/* Selected resume information. */}
			<div className='flex items-center gap-3 rounded-lg border border-cyan-400/10 bg-cyan-400/3 p-3'>
				{/* File icon. */}
				<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-400/10'>
					<FileText className='h-4 w-4 text-cyan-300' />
				</div>

				{/* File metadata. */}
				<div className='min-w-0 flex-1'>
					<p className='truncate text-sm font-medium text-gray-200'>
						{resume.name}
					</p>

					<p className='mt-0.5 text-xs text-gray-600'>
						{formatFileSize(resume.size)} MB
					</p>
				</div>

				{/* Remove selected resume. */}
				<button
					type='button'
					onClick={onRemove}
					aria-label='Remove resume'
					className='flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-600 transition hover:bg-red-400/10 hover:text-red-300'
				>
					<X className='h-3.5 w-3.5' />
				</button>
			</div>

			{/* Resume replacement action. */}
			<button
				type='button'
				onClick={onReplace}
				className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/2 py-2 text-xs font-medium text-gray-500 transition hover:border-white/15 hover:bg-white/4 hover:text-gray-300'
			>
				<Upload className='h-3.5 w-3.5' />
				Replace resume
			</button>
		</div>
	)
}

// ============================================================================
// Resume Upload Card
// ============================================================================

/**
 * Renders the complete resume upload input.
 *
 * This component owns only the presentation of the upload area. File
 * validation and state management remain in the page component.
 *
 * @param {Object} props - Component properties.
 * @param {File|null} props.resume - Currently selected resume.
 * @param {React.RefObject} props.inputRef - Hidden file input reference.
 * @param {Function} props.onResumeChange - File selection handler.
 * @param {Function} props.onRemoveResume - File removal handler.
 * @returns {JSX.Element} Resume upload card.
 */
function ResumeUploadCard({
	resume,
	inputRef,
	onResumeChange,
	onRemoveResume,
}) {
	// Open the native file picker through the hidden file input.
	const handleSelectResume = () => {
		inputRef.current?.click()
	}

	return (
		<GeneratorInputCard
			title='Resume'
			description='PDF acceptable only'
			status='Required'
			required
		>
			{/* Render the appropriate state based on whether a resume exists. */}
			{!resume ? (
				<ResumeUploadEmptyState onSelectResume={handleSelectResume} />
			) : (
				<SelectedResumeState
					resume={resume}
					onRemove={onRemoveResume}
					onReplace={handleSelectResume}
				/>
			)}

			{/* Hidden native file input used by the custom upload controls. */}
			<input
				ref={inputRef}
				type='file'
				accept='.pdf'
				onChange={onResumeChange}
				className='hidden'
			/>
		</GeneratorInputCard>
	)
}

// ============================================================================
// Textarea Input Card
// ============================================================================

/**
 * Renders a reusable textarea-based generator input.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.title - Input title.
 * @param {string} props.description - Input description.
 * @param {string} props.status - Required or Optional status.
 * @param {boolean} props.required - Determines status styling.
 * @param {string} props.value - Current textarea value.
 * @param {string} props.placeholder - Textarea placeholder.
 * @param {Function} props.onChange - Textarea change handler.
 * @returns {JSX.Element} Textarea input card.
 */
function GeneratorTextareaCard({
	title,
	description,
	status,
	required = false,
	value,
	placeholder,
	onChange,
}) {
	return (
		<GeneratorInputCard
			title={title}
			description={description}
			status={status}
			required={required}
		>
			{/* Generator textarea. */}
			<textarea
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className='h-37.5 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3.5 py-3 text-xs leading-5 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-cyan-400/30 focus:bg-black/30 focus:ring-1 focus:ring-cyan-400/10'
			/>
		</GeneratorInputCard>
	)
}

// ============================================================================
// Form Error
// ============================================================================

/**
 * Displays the current generator validation or API error.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.error - Error message.
 * @returns {JSX.Element|null} Error message or null.
 */
function GeneratorError({ error }) {
	// Do not render anything when there is no error.
	if (!error) return null

	return (
		<div className='mx-auto mt-5 max-w-375'>
			<div className='rounded-lg border border-red-400/10 bg-red-400/5 px-4 py-3'>
				<p className='text-xs text-red-300'>{error}</p>
			</div>
		</div>
	)
}

// ============================================================================
// Generate Resume Action
// ============================================================================

/**
 * Renders the final resume generation action.
 *
 * @param {Object} props - Component properties.
 * @param {boolean} props.loading - Whether resume generation is in progress.
 * @param {Function} props.onGenerate - Resume generation handler.
 * @returns {JSX.Element} Generate resume action section.
 */
function GenerateResumeAction({ loading, onGenerate }) {
	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className='flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/2.5 px-5 py-4 sm:flex-row'>
				{/* Generation explanation. */}
				<div className='flex items-center gap-3'>
					{/* Generation icon. */}
					<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10'>
						<Sparkles className='h-4 w-4 text-cyan-300' />
					</div>

					{/* Generation information. */}
					<div>
						<p className='text-xs font-medium text-gray-300'>
							Ready to optimize?
						</p>

						<p className='mt-0.5 text-[11px] text-gray-600'>
							ResumeAI will create a personalized ATS-optimized
							resume from your information.
						</p>
					</div>
				</div>

				{/* Resume generation button. */}
				<button
					type='button'
					onClick={onGenerate}
					disabled={loading}
					className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto'
				>
					<Sparkles className='h-3.5 w-3.5' />

					{loading ? 'Generating...' : 'Generate Resume'}

					{!loading && (
						<ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
					)}
				</button>
			</div>
		</section>
	)
}

// ============================================================================
// Resume Generator Page
// ============================================================================

/**
 * Provides the resume generation workflow.
 *
 * Responsibilities:
 * - Manage resume file selection.
 * - Validate the uploaded resume.
 * - Manage self-description input.
 * - Manage target job description input.
 * - Validate required generation inputs.
 * - Trigger resume generation through the existing resume hook.
 * - Navigate to the generated resume details page.
 *
 * Business logic and API contracts are intentionally preserved from the
 * existing implementation.
 *
 * @returns {JSX.Element} Resume generator page.
 */
export default function ResumeGenerator() {
	// ------------------------------------------------------------------------
	// Resume API
	// ------------------------------------------------------------------------

	// Extract generation state and the existing resume generation operation.
	const { loading, handleGenerateResume } = useResume()

	// ------------------------------------------------------------------------
	// Navigation
	// ------------------------------------------------------------------------

	// Initialize Next.js router for page navigation.
	const router = useRouter()

	// ------------------------------------------------------------------------
	// File Input Reference
	// ------------------------------------------------------------------------

	// Store a reference to the hidden native file input.
	const resumeInputRef = useRef(null)

	// ------------------------------------------------------------------------
	// Form State
	// ------------------------------------------------------------------------

	// Store the currently selected resume file.
	const [resume, setResume] = useState(null)

	// Store the user's optional self-description.
	const [selfDescription, setSelfDescription] = useState('')

	// Store the required target job description.
	const [jobDescription, setJobDescription] = useState('')

	// Store frontend validation and API error messages.
	const [error, setError] = useState('')

	// ------------------------------------------------------------------------
	// Resume File Selection
	// ------------------------------------------------------------------------

	/**
	 * Handles selecting a resume file from the native file picker.
	 *
	 * Validation rules are intentionally identical to the existing page:
	 * - PDF files only.
	 * - Maximum file size of 3 MB.
	 */
	const handleResumeChange = (event) => {
		// Retrieve the first selected file.
		const file = event.target.files?.[0]

		// Stop if the user cancelled the file picker.
		if (!file) return

		// Validate the selected file type.
		if (file.type !== ACCEPTED_RESUME_TYPE) {
			setError('Please select a PDF file.')
			event.target.value = ''
			return
		}

		// Validate the selected file size.
		if (file.size > MAX_RESUME_SIZE) {
			setError('Resume must be smaller than 3 MB.')
			event.target.value = ''
			return
		}

		// Clear any previous validation error after successful validation.
		setError('')

		// Store the validated file.
		setResume(file)
	}

	// ------------------------------------------------------------------------
	// Resume File Removal
	// ------------------------------------------------------------------------

	/**
	 * Removes the currently selected resume and resets the native file input.
	 */
	const removeResume = () => {
		// Clear the selected resume from React state.
		setResume(null)

		// Reset the native file input so the same file can be selected again.
		if (resumeInputRef.current) {
			resumeInputRef.current.value = ''
		}
	}

	// ------------------------------------------------------------------------
	// Text Input Changes
	// ------------------------------------------------------------------------

	/**
	 * Handles changes to the self-description field.
	 *
	 * Any existing error is cleared as soon as the user starts correcting
	 * the input.
	 *
	 * @param {React.ChangeEvent<HTMLTextAreaElement>} event - Input event.
	 */
	const handleSelfDescriptionChange = (event) => {
		// Clear the previous validation/API error.
		setError('')

		// Store the updated self-description.
		setSelfDescription(event.target.value)
	}

	/**
	 * Handles changes to the target job description field.
	 *
	 * @param {React.ChangeEvent<HTMLTextAreaElement>} event - Input event.
	 */
	const handleJobDescriptionChange = (event) => {
		// Clear the previous validation/API error.
		setError('')

		// Store the updated job description.
		setJobDescription(event.target.value)
	}

	// ------------------------------------------------------------------------
	// Resume Generation
	// ------------------------------------------------------------------------

	/**
	 * Validates the generator form, calls the existing resume generation API,
	 * and navigates to the generated resume details page.
	 */
	const handleGenerate = async () => {
		// Clear any previous validation or API error.
		setError('')

		// Require either an uploaded resume or self-description.
		if (!resume && !selfDescription.trim()) {
			setError(
				'Please upload your resume or provide information about yourself.',
			)
			return
		}

		// Require a target job description.
		if (!jobDescription.trim()) {
			setError('Please provide the job description.')
			return
		}

		try {
			// Generate the resume using the existing hook/API contract.
			const data = await handleGenerateResume({
				resumeFile: resume,
				selfDescription,
				jobDescription,
			})

			// Navigate to the generated resume details page using the
			// existing response structure.
			router.push(`/resumes/${data.resume.id}`)
		} catch (error) {
			// Display the API error while preserving the existing fallback.
			setError(error?.message ?? 'Failed to generate resume.')
		}
	}

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
				<div className='absolute left-[10%] top-48 h-128 w-lg rounded-full bg-cyan-500/[0.07] blur-[120px]' />

				{/* Right-side blue ambient glow. */}
				<div className='absolute right-40 top-[20%] h-120 w-120 rounded-full bg-blue-500/6 blur-[120px]' />

				{/* Bottom-center cyan ambient glow. */}
				<div className='absolute bottom-48 left-[35%] h-112 w-md rounded-full bg-cyan-500/4 blur-[110px]' />
			</div>

			{/* ================================================================
                Header / Navigation
            ================================================================= */}

			<ResumeGeneratorHeader
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

				<ResumeGeneratorIntro />

				{/* ------------------------------------------------------------
                    Input Workspace
                ------------------------------------------------------------- */}

				<section className='mx-auto mt-6 max-w-375'>
					<div className='grid gap-4 lg:grid-cols-3'>
						{/* Resume upload input. */}
						<ResumeUploadCard
							resume={resume}
							inputRef={resumeInputRef}
							onResumeChange={handleResumeChange}
							onRemoveResume={removeResume}
						/>

						{/* Optional user information input. */}
						<GeneratorTextareaCard
							title='About you'
							description='Experience, skills and strengths'
							status='Optional'
							value={selfDescription}
							onChange={handleSelfDescriptionChange}
							placeholder='Describe your experience, strengths, technologies, projects, or anything else that may not be fully represented in your resume...'
						/>

						{/* Required target job description input. */}
						<GeneratorTextareaCard
							title='Target job description'
							description='Position you are applying for'
							status='Required'
							required
							value={jobDescription}
							onChange={handleJobDescriptionChange}
							placeholder='Paste the job description of the position you are applying for...'
						/>
					</div>
				</section>

				{/* ------------------------------------------------------------
                    Validation / API Error
                ------------------------------------------------------------- */}

				<GeneratorError error={error} />

				{/* ------------------------------------------------------------
                    Resume Generation Action
                ------------------------------------------------------------- */}

				<GenerateResumeAction
					loading={loading}
					onGenerate={handleGenerate}
				/>
			</div>
		</main>
	)
}