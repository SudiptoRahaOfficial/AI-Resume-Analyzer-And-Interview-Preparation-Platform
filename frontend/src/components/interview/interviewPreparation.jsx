// making client component
'use client'

// importing dependencies
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	ArrowLeft,
	ArrowRight,
	FileText,
	Sparkles,
	Upload,
	X,
} from 'lucide-react'

import { useInterview } from '@/hooks/useInterview'

/**
 * Application routes used by the interview preparation page.
 *
 * Keeping routes centralized prevents hardcoded paths from being
 * repeated throughout the component.
 */
const ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	report: '/interview-preparation-reports',
}

/**
 * Interview preparation configuration.
 *
 * These values define the client-side constraints for resume uploads.
 *
 * Note:
 * Client-side validation improves user experience, but the backend
 * must remain responsible for enforcing the actual upload limits.
 */
const INTERVIEW_CONFIG = {
	maxResumeSize: 3 * 1024 * 1024,
	maxResumeSizeInMb: 3,
	acceptedResumeType: 'application/pdf',
}

/**
 * Shared card styles.
 *
 * Keeping repeated card classes centralized makes the page easier
 * to maintain and keeps the visual language consistent.
 */
const CARD_CLASS_NAME = 'rounded-xl border border-white/10 bg-white/2.5'

/**
 * Shared textarea styles.
 */
const TEXTAREA_CLASS_NAME =
	'h-37.5 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3.5 py-3 text-xs leading-5 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-cyan-400/30 focus:bg-black/30 focus:ring-1 focus:ring-cyan-400/10'

/**
 * Decorative page background.
 *
 * Responsible only for the ambient background effects.
 */
function PageBackground() {
	return (
		<div
			aria-hidden='true'
			className='pointer-events-none fixed inset-0 overflow-hidden'
		>
			<div className='absolute left-[10%] top-48 h-128 w-lg rounded-full bg-cyan-500/[0.07] blur-[120px]' />

			<div className='absolute right-40 top-[20%] h-120 w-120 rounded-full bg-blue-500/6 blur-[120px]' />

			<div className='absolute bottom-48 left-[35%] h-112 w-md rounded-full bg-cyan-500/4 blur-[110px]' />
		</div>
	)
}

/**
 * Page header.
 *
 * Provides navigation back to the landing page and dashboard.
 */
function PageHeader({ onNavigateHome, onNavigateDashboard }) {
	return (
		<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
				{/* Product brand */}
				<button
					type='button'
					onClick={onNavigateHome}
					className='ml-14 flex cursor-pointer items-center gap-2.5 transition'
				>
					<span className='text-lg font-semibold tracking-tight text-white'>
						ResumeAI
					</span>
				</button>

				{/* Dashboard navigation */}
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

/**
 * Page introduction.
 *
 * Explains the purpose of the interview preparation workflow.
 */
function PageIntro() {
	return (
		<section className='mx-auto max-w-375'>
			{/* Section label */}
			<div className='flex items-center gap-2 text-md font-medium text-cyan-400'>
				<Sparkles
					aria-hidden='true'
					className='h-3.5 w-3.5'
				/>

				<span>Interview Preparation</span>
			</div>

			{/* Heading and supporting information */}
			<div className='mt-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-end'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
						Prepare for your next interview
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-gray-500'>
						Provide the information below and ResumeAI will create a
						preparation guide tailored to your target role.
					</p>
				</div>

				<p className='hidden text-xs text-gray-600 lg:block'>
					Your information stays private
				</p>
			</div>
		</section>
	)
}

/**
 * Reusable card header.
 *
 * Used by the resume, self-description, and job-description cards.
 */
function InputCardHeader({ title, description, required = false }) {
	return (
		<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
			<div>
				<h2 className='text-[15px] font-semibold text-white'>
					{title}
				</h2>

				<p className='mt-0.5 text-xs text-gray-600'>{description}</p>
			</div>

			<span
				className={
					required
						? 'text-[11px] font-medium text-cyan-400'
						: 'text-[11px] font-medium text-gray-600'
				}
			>
				{required ? 'Required' : 'Optional'}
			</span>
		</div>
	)
}

/**
 * Resume upload empty state.
 *
 * Displays the upload action when no resume has been selected.
 */
function ResumeUploadPrompt({ onSelectResume }) {
	return (
		<button
			type='button'
			onClick={onSelectResume}
			className='group flex h-37.5 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/20 transition hover:border-cyan-400/30 hover:bg-cyan-400/2'
		>
			{/* Upload icon */}
			<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/4 text-gray-500 ring-1 ring-white/10 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-300'>
				<Upload
					aria-hidden='true'
					className='h-4 w-4'
				/>
			</div>

			{/* Primary text */}
			<p className='mt-2.5 text-sm font-medium text-gray-300'>
				Upload your resume
			</p>

			{/* Supporting text */}
			<p className='mt-1 text-xs text-gray-600'>Click to browse files</p>
		</button>
	)
}

/**
 * Selected resume display.
 *
 * Shows the selected file and provides actions to remove or replace it.
 */
function SelectedResume({ resume, onRemove, onReplace }) {
	/**
	 * Convert bytes to megabytes for display.
	 */
	const fileSizeInMb = (resume.size / 1024 / 1024).toFixed(2)

	return (
		<div className='flex h-37.5 flex-col justify-between'>
			{/* Selected file */}
			<div className='flex items-center gap-3 rounded-lg border border-cyan-400/10 bg-cyan-400/3 p-3'>
				{/* File icon */}
				<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-400/10'>
					<FileText
						aria-hidden='true'
						className='h-4 w-4 text-cyan-300'
					/>
				</div>

				{/* File information */}
				<div className='min-w-0 flex-1'>
					<p className='truncate text-sm font-medium text-gray-200'>
						{resume.name}
					</p>

					<p className='mt-0.5 text-xs text-gray-600'>
						{fileSizeInMb} MB
					</p>
				</div>

				{/* Remove file */}
				<button
					type='button'
					onClick={onRemove}
					aria-label='Remove resume'
					className='flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-600 transition hover:bg-red-400/10 hover:text-red-300'
				>
					<X
						aria-hidden='true'
						className='h-3.5 w-3.5'
					/>
				</button>
			</div>

			{/* Replace file */}
			<button
				type='button'
				onClick={onReplace}
				className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/2 py-2 text-xs font-medium text-gray-500 transition hover:border-white/15 hover:bg-white/4 hover:text-gray-300'
			>
				<Upload
					aria-hidden='true'
					className='h-3.5 w-3.5'
				/>

				<span>Replace resume</span>
			</button>
		</div>
	)
}

/**
 * Resume input card.
 *
 * Responsible only for the resume upload UI.
 */
function ResumeCard({
	resume,
	resumeInputRef,
	onResumeChange,
	onRemoveResume,
}) {
	/**
	 * Opens the hidden file input.
	 */
	const handleSelectResume = () => {
		resumeInputRef.current?.click()
	}

	return (
		<div className={CARD_CLASS_NAME}>
			{/* Card header */}
			<InputCardHeader
				title='Resume'
				description='PDF acceptable only'
				required
			/>

			{/* Card content */}
			<div className='p-4'>
				{!resume ? (
					<ResumeUploadPrompt onSelectResume={handleSelectResume} />
				) : (
					<SelectedResume
						resume={resume}
						onRemove={onRemoveResume}
						onReplace={handleSelectResume}
					/>
				)}

				{/* Hidden native file input */}
				<input
					ref={resumeInputRef}
					type='file'
					accept='.pdf,application/pdf'
					onChange={onResumeChange}
					className='hidden'
				/>
			</div>
		</div>
	)
}

/**
 * Self-description input card.
 *
 * This field is optional and provides additional context that
 * may not be fully represented in the resume.
 */
function SelfDescriptionCard({ value, onChange }) {
	return (
		<div className={CARD_CLASS_NAME}>
			{/* Card header */}
			<InputCardHeader
				title='About you'
				description='Experience, skills and strengths'
			/>

			{/* Card content */}
			<div className='p-4'>
				<textarea
					id='self-description'
					name='selfDescription'
					value={value}
					onChange={onChange}
					placeholder='Describe your experience, strengths, technologies, projects, or anything else that may not be fully represented in your resume...'
					aria-label='About you'
					className={TEXTAREA_CLASS_NAME}
				/>
			</div>
		</div>
	)
}

/**
 * Job description input card.
 *
 * The target job description is required for report generation.
 */
function JobDescriptionCard({ value, onChange }) {
	return (
		<div className={CARD_CLASS_NAME}>
			{/* Card header */}
			<InputCardHeader
				title='Target job description'
				description='Position you are applying for'
				required
			/>

			{/* Card content */}
			<div className='p-4'>
				<textarea
					id='job-description'
					name='jobDescription'
					value={value}
					onChange={onChange}
					placeholder='Paste the job description of the position you are preparing for...'
					aria-label='Target job description'
					required
					className={TEXTAREA_CLASS_NAME}
				/>
			</div>
		</div>
	)
}

/**
 * Input workspace.
 *
 * Groups all interview preparation inputs into the main
 * three-column workspace.
 */
function InputWorkspace({
	resume,
	resumeInputRef,
	selfDescription,
	jobDescription,
	onResumeChange,
	onRemoveResume,
	onSelfDescriptionChange,
	onJobDescriptionChange,
}) {
	return (
		<section className='mx-auto mt-6 max-w-375'>
			<div className='grid gap-4 lg:grid-cols-3'>
				{/* Resume */}
				<ResumeCard
					resume={resume}
					resumeInputRef={resumeInputRef}
					onResumeChange={onResumeChange}
					onRemoveResume={onRemoveResume}
				/>

				{/* Additional user context */}
				<SelfDescriptionCard
					value={selfDescription}
					onChange={onSelfDescriptionChange}
				/>

				{/* Target position */}
				<JobDescriptionCard
					value={jobDescription}
					onChange={onJobDescriptionChange}
				/>
			</div>
		</section>
	)
}

/**
 * Page-level error message.
 *
 * Displays client-side validation and API errors.
 */
function GenerationError({ error }) {
	if (!error) {
		return null
	}

	return (
		<div
			role='alert'
			aria-live='assertive'
			className='mx-auto mt-5 max-w-375'
		>
			<div className='rounded-lg border border-red-400/10 bg-red-400/5 px-4 py-3'>
				<p className='text-xs text-red-300'>{error}</p>
			</div>
		</div>
	)
}

/**
 * Generate action section.
 *
 * Provides the final action for creating the AI interview guide.
 */
function GenerateSection({ loading, onGenerate }) {
	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className='flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/2.5 px-5 py-4 sm:flex-row'>
				{/* Action information */}
				<div className='flex items-center gap-3'>
					<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10'>
						<Sparkles
							aria-hidden='true'
							className='h-4 w-4 text-cyan-300'
						/>
					</div>

					<div>
						<p className='text-xs font-medium text-gray-300'>
							Ready to prepare?
						</p>

						<p className='mt-0.5 text-[11px] text-gray-600'>
							ResumeAI will create a personalized interview guide
							from your information.
						</p>
					</div>
				</div>

				{/* Generate action */}
				<button
					type='button'
					onClick={onGenerate}
					disabled={loading}
					aria-busy={loading}
					className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto'
				>
					<Sparkles
						aria-hidden='true'
						className='h-3.5 w-3.5'
					/>

					<span>
						{loading ? 'Generating...' : 'Generate Interview Guide'}
					</span>

					{!loading && (
						<ArrowRight
							aria-hidden='true'
							className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5'
						/>
					)}
				</button>
			</div>
		</section>
	)
}

/**
 * Interview preparation page.
 *
 * Responsibilities:
 * - Manage interview preparation form state.
 * - Validate the uploaded resume.
 * - Manage resume replacement/removal.
 * - Validate required generation inputs.
 * - Call the existing interview generation functionality.
 * - Navigate to the generated report.
 *
 * Presentation responsibilities are delegated to smaller
 * page-specific components above.
 */
export default function InterviewPreparation() {
	// router for page navigation
	const router = useRouter()

	// interview generation functionality and loading state
	const { loading, handleGenerateReport } = useInterview()

	// reference to the hidden resume file input
	const resumeInputRef = useRef(null)

	// selected resume file
	const [resume, setResume] = useState(null)

	// optional user-provided background information
	const [selfDescription, setSelfDescription] = useState('')

	// required target job description
	const [jobDescription, setJobDescription] = useState('')

	// client-side validation and API error
	const [error, setError] = useState('')

	/**
	 * Handles resume file selection.
	 *
	 * Client-side validation checks:
	 * - A file exists.
	 * - The file is a PDF.
	 * - The file is no larger than 3 MB.
	 */
	const handleResumeChange = (event) => {
		const file = event.target.files?.[0]

		// No file was selected.
		if (!file) {
			return
		}

		// Validate file type.
		if (file.type !== INTERVIEW_CONFIG.acceptedResumeType) {
			setError('Please select a PDF file.')

			// Reset native file input so the same invalid
			// file can be selected again if necessary.
			event.target.value = ''

			return
		}

		// Validate file size.
		if (file.size > INTERVIEW_CONFIG.maxResumeSize) {
			setError(
				`Resume must be smaller than ${INTERVIEW_CONFIG.maxResumeSizeInMb} MB.`,
			)

			// Reset native file input.
			event.target.value = ''

			return
		}

		// Clear previous error after successful validation.
		setError('')

		// Store the selected resume.
		setResume(file)
	}

	/**
	 * Removes the currently selected resume.
	 *
	 * The native file input must also be reset because setting
	 * the React state alone does not clear its selected file.
	 */
	const handleRemoveResume = () => {
		setResume(null)

		if (resumeInputRef.current) {
			resumeInputRef.current.value = ''
		}
	}

	/**
	 * Handles self-description changes.
	 *
	 * Any previous validation/API error is cleared when the user
	 * starts modifying the input again.
	 */
	const handleSelfDescriptionChange = (event) => {
		setError('')
		setSelfDescription(event.target.value)
	}

	/**
	 * Handles job description changes.
	 */
	const handleJobDescriptionChange = (event) => {
		setError('')
		setJobDescription(event.target.value)
	}

	/**
	 * Handles interview guide generation.
	 *
	 * Validation occurs before calling the API.
	 *
	 * Existing generation behavior is preserved:
	 * 1. Validate resume.
	 * 2. Validate job description.
	 * 3. Call handleGenerateReport().
	 * 4. Navigate to the generated report.
	 * 5. Display API errors if generation fails.
	 */
	const handleGenerate = async () => {
		// Clear previous error.
		setError('')

		// Resume is required.
		if (!resume) {
			setError('Please upload your resume before generating the report.')
			return
		}

		// Job description is required.
		if (!jobDescription.trim()) {
			setError('Please provide the job description.')
			return
		}

		try {
			// Generate the interview report through the
			// existing interview hook.
			const data = await handleGenerateReport({
				resumeFile: resume,
				selfDescription,
				jobDescription,
			})

			// Navigate to the generated report.
			router.push(`${ROUTES.report}/${data.interviewReport.id}`)
		} catch (err) {
			// Safely extract the API error message.
			const message =
				err instanceof Error
					? err.message
					: 'Failed to generate interview report.'

			setError(message)
		}
	}

	/**
	 * Navigates to the landing page.
	 */
	const handleNavigateHome = () => {
		router.push(ROUTES.home)
	}

	/**
	 * Navigates to the dashboard.
	 */
	const handleNavigateDashboard = () => {
		router.push(ROUTES.dashboard)
	}

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Decorative background */}
			<PageBackground />

			{/* Navigation */}
			<PageHeader
				onNavigateHome={handleNavigateHome}
				onNavigateDashboard={handleNavigateDashboard}
			/>

			{/* Main content */}
			<div className='relative z-10 w-full px-5 py-8 sm:px-8 lg:px-10 xl:px-12'>
				{/* Page introduction */}
				<PageIntro />

				{/* Input workspace */}
				<InputWorkspace
					resume={resume}
					resumeInputRef={resumeInputRef}
					selfDescription={selfDescription}
					jobDescription={jobDescription}
					onResumeChange={handleResumeChange}
					onRemoveResume={handleRemoveResume}
					onSelfDescriptionChange={handleSelfDescriptionChange}
					onJobDescriptionChange={handleJobDescriptionChange}
				/>

				{/* Validation/API error */}
				<GenerationError error={error} />

				{/* Generate action */}
				<GenerateSection
					loading={loading}
					onGenerate={handleGenerate}
				/>
			</div>
		</main>
	)
}