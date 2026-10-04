// making client component

'use client'

// importing dependencies

import { useParams, useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import {
	AlertCircle,
	ArrowLeft,
	ArrowRight,
	Award,
	BookOpen,
	BriefcaseBusiness,
	Check,
	ChevronDown,
	CircleAlert,
	Clock3,
	FileText,
	GraduationCap,
	Lightbulb,
	ListChecks,
	MessageSquareText,
	ShieldCheck,
	Sparkles,
	Target,
	TrendingUp,
} from 'lucide-react'

import { useInterview } from '@/hooks/useInterview'

// routes

const ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	interviewPreparation: '/interview-preparation',
}

// page configuration

const REPORT_CONFIG = {
	preparationDays: 7,
	strongMatchThreshold: 70,
	moderateMatchThreshold: 50,
}

// shared styles

const CARD_CLASS_NAME = 'rounded-lg border border-white/10 bg-white/[0.025]'

const INNER_CARD_CLASS_NAME = 'rounded-md border border-white/10 bg-black/20'

const SECTION_HEADER_CLASS_NAME =
	'flex items-center justify-between border-b border-white/10 px-4 py-3.5'

// score configuration

const SCORE_CONFIG = {
	strong: {
		label: 'Strong Match',
		description: 'Your profile aligns well with the target role.',
	},
	moderate: {
		label: 'Moderate Match',
		description:
			'Your profile shows relevant alignment with some areas to strengthen.',
	},
	weak: {
		label: 'Needs Preparation',
		description:
			'Several areas should be strengthened before the interview.',
	},
}

// priority styles

const PRIORITY_STYLES = {
	high: 'border-red-400/10 bg-red-400/[0.05] text-red-300',
	medium: 'border-amber-400/10 bg-amber-400/[0.05] text-amber-300',
	low: 'border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-300',
}

// severity styles

const SEVERITY_STYLES = {
	high: 'bg-red-400/10 text-red-300',
	medium: 'bg-amber-400/10 text-amber-300',
	low: 'bg-emerald-400/10 text-emerald-300',
}

// preparation plan icons

const PREPARATION_PLAN_ICONS = {
	1: FileText,
	2: BookOpen,
	3: BriefcaseBusiness,
	4: MessageSquareText,
	5: Award,
	6: Target,
	7: GraduationCap,
}

/**
 * Safely extracts a readable error message.
 *
 * @param {unknown} error
 * @param {string} fallbackMessage
 * @returns {string}
 */

const getErrorMessage = (error, fallbackMessage = 'Something went wrong.') => {
	if (error instanceof Error && error.message) {
		return error.message
	}

	if (
		error &&
		typeof error === 'object' &&
		'message' in error &&
		typeof error.message === 'string'
	) {
		return error.message
	}

	return fallbackMessage
}

/**
 * Determines the match-score configuration.
 *
 * @param {number} matchScore
 * @returns {{label: string, description: string}}
 */

const getScoreConfiguration = (matchScore) => {
	if (matchScore >= REPORT_CONFIG.strongMatchThreshold) {
		return SCORE_CONFIG.strong
	}

	if (matchScore >= REPORT_CONFIG.moderateMatchThreshold) {
		return SCORE_CONFIG.moderate
	}

	return SCORE_CONFIG.weak
}

/**
 * Safely normalizes a report ID returned by Next.js route params.
 *
 * @param {string|string[]|undefined} reportId
 * @returns {string|null}
 */

const normalizeReportId = (reportId) => {
	if (Array.isArray(reportId)) {
		return reportId[0] ?? null
	}

	return reportId ?? null
}

/**
 * Page background.
 */

function PageBackground() {
	return (
		<div
			aria-hidden='true'
			className='pointer-events-none fixed inset-0 overflow-hidden'
		>
			<div className='absolute left-[8%] top-40 h-128 w-lg rounded-full bg-cyan-500/[0.07] blur-[120px]' />

			<div className='absolute right-[8%] top-[18%] h-120 w-120 rounded-full bg-blue-500/5 blur-[120px]' />

			<div className='absolute bottom-40 left-[38%] h-112 w-md rounded-full bg-cyan-500/[0.035] blur-[110px]' />
		</div>
	)
}

/**
 * Loading state.
 */

function LoadingState() {
	return (
		<main className='flex min-h-screen items-center justify-center bg-[#030712] text-white'>
			<div
				className='flex flex-col items-center gap-3'
				role='status'
				aria-live='polite'
			>
				<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
					<Sparkles className='h-5 w-5 animate-pulse text-cyan-300' />
				</div>

				<p className='text-sm font-medium text-gray-300'>
					Loading your interview report...
				</p>

				<p className='text-xs text-gray-600'>Please wait a moment.</p>
			</div>
		</main>
	)
}

/**
 * Report error state.
 *
 * @param {Object} props
 * @param {string} props.error
 * @param {Function} props.onBack
 */

function ReportErrorState({ error, onBack }) {
	return (
		<main className='flex min-h-screen items-center justify-center bg-[#030712] px-5 text-white'>
			<div className='w-full max-w-md rounded-xl border border-white/10 bg-white/2.5 p-6 text-center'>
				<div className='mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/10'>
					<AlertCircle className='h-5 w-5 text-red-300' />
				</div>

				<h1 className='mt-4 text-lg font-semibold text-white'>
					Unable to load report
				</h1>

				<p className='mt-2 text-sm leading-6 text-gray-500'>
					{error ||
						'The requested interview report could not be found.'}
				</p>

				<button
					type='button'
					onClick={onBack}
					className='mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white'
				>
					<ArrowLeft className='h-3.5 w-3.5' />
					Back to Interview Preparation
				</button>
			</div>
		</main>
	)
}

/**
 * Page header.
 *
 * @param {Object} props
 * @param {Function} props.onBrandClick
 * @param {Function} props.onDashboardClick
 */

function PageHeader({ onBrandClick, onDashboardClick }) {
	return (
		<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
				{/* Brand */}

				<button
					type='button'
					onClick={onBrandClick}
					aria-label='Go to ResumeAI home page'
					className='ml-14 flex cursor-pointer items-center gap-2.5 transition'
				>
					<span className='text-lg font-semibold tracking-tight text-white'>
						ResumeAI
					</span>
				</button>

				{/* Dashboard navigation */}

				<button
					type='button'
					onClick={onDashboardClick}
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
 */

function PageIntro() {
	return (
		<section className='mx-auto max-w-375'>
			<div className='flex items-center gap-2 text-md font-medium text-cyan-400'>
				<Sparkles className='h-3.5 w-3.5' />

				<span>Interview Preparation Report</span>
			</div>

			<div className='mt-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-end'>
				<div>
					<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
						Your interview preparation guide
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-gray-500'>
						Review your role alignment, potential skill gaps,
						interview questions, and a focused 7-day preparation
						plan.
					</p>
				</div>

				<div className='hidden items-center gap-2 text-xs text-gray-600 lg:flex'>
					<ShieldCheck className='h-3.5 w-3.5' />

					<span>AI-generated preparation report</span>
				</div>
			</div>
		</section>
	)
}

/**
 * Match score card.
 *
 * @param {Object} props
 * @param {number} props.matchScore
 */

function MatchScoreCard({ matchScore }) {
	const safeScore = Number.isFinite(Number(matchScore))
		? Number(matchScore)
		: 0

	const progressScore = Math.min(100, Math.max(0, safeScore))

	const scoreConfiguration = getScoreConfiguration(safeScore)

	return (
		<div className='relative overflow-hidden rounded-lg border border-white/10 bg-white/2.5'>
			<div
				aria-hidden='true'
				className='absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/5 blur-3xl'
			/>

			<div className='relative flex h-full flex-col justify-between p-5'>
				<div>
					<div className='flex items-center gap-2 text-xs font-medium text-gray-500'>
						<Target className='h-3.5 w-3.5 text-cyan-400' />

						<span>Role Match</span>
					</div>

					<div className='mt-5 flex items-end gap-2'>
						<span className='text-5xl font-semibold tracking-tight text-white'>
							{safeScore}
						</span>

						<span className='mb-1.5 text-sm text-gray-600'>
							/ 100
						</span>
					</div>
				</div>

				<div className='mt-5'>
					<div
						className='h-1.5 overflow-hidden rounded-full bg-white/5'
						aria-label={`Role match score: ${progressScore} out of 100`}
						role='progressbar'
						aria-valuemin={0}
						aria-valuemax={100}
						aria-valuenow={progressScore}
					>
						<div
							className='h-full rounded-full bg-cyan-400 transition-all'
							style={{
								width: `${progressScore}%`,
							}}
						/>
					</div>

					<p className='mt-3 text-sm font-medium text-gray-300'>
						{scoreConfiguration.label}
					</p>

					<p className='mt-1 text-xs leading-5 text-gray-600'>
						{scoreConfiguration.description}
					</p>
				</div>
			</div>
		</div>
	)
}

/**
 * Report overview statistics.
 *
 * @param {Object} props
 * @param {number} props.technicalQuestionCount
 * @param {number} props.behavioralQuestionCount
 * @param {number} props.skillGapCount
 */

function ReportOverview({
	technicalQuestionCount,
	behavioralQuestionCount,
	skillGapCount,
}) {
	const totalQuestionCount = technicalQuestionCount + behavioralQuestionCount

	return (
		<div className='grid gap-4 sm:grid-cols-3'>
			{/* Interview questions */}

			<div className={CARD_CLASS_NAME + ' p-5'}>
				<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10'>
					<MessageSquareText className='h-4 w-4 text-cyan-300' />
				</div>

				<p className='mt-4 text-2xl font-semibold text-white'>
					{totalQuestionCount}
				</p>

				<p className='mt-1 text-xs text-gray-600'>
					Probable interview questions
				</p>
			</div>

			{/* Skill gaps */}

			<div className={CARD_CLASS_NAME + ' p-5'}>
				<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10'>
					<AlertCircle className='h-4 w-4 text-amber-300' />
				</div>

				<p className='mt-4 text-2xl font-semibold text-white'>
					{skillGapCount}
				</p>

				<p className='mt-1 text-xs text-gray-600'>
					Skill gaps identified
				</p>
			</div>

			{/* Preparation plan */}

			<div className={CARD_CLASS_NAME + ' p-5'}>
				<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-400/10'>
					<Clock3 className='h-4 w-4 text-blue-300' />
				</div>

				<p className='mt-4 text-2xl font-semibold text-white'>
					{REPORT_CONFIG.preparationDays}
				</p>

				<p className='mt-1 text-xs text-gray-600'>
					Day preparation plan
				</p>
			</div>
		</div>
	)
}

/**
 * Overview section.
 *
 * @param {Object} props
 * @param {Object} props.report
 */

function OverviewSection({ report }) {
	const technicalQuestions = Array.isArray(report.technicalQuestions)
		? report.technicalQuestions
		: []

	const behavioralQuestions = Array.isArray(report.behavioralQuestions)
		? report.behavioralQuestions
		: []

	const skillGaps = Array.isArray(report.skillGaps) ? report.skillGaps : []

	return (
		<section className='mx-auto mt-6 max-w-375'>
			<div className='grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]'>
				<MatchScoreCard matchScore={report.matchScore} />

				<ReportOverview
					technicalQuestionCount={technicalQuestions.length}
					behavioralQuestionCount={behavioralQuestions.length}
					skillGapCount={skillGaps.length}
				/>
			</div>
		</section>
	)
}

/**
 * Section header.
 *
 * @param {Object} props
 * @param {React.ComponentType} props.icon
 * @param {string} props.iconClassName
 * @param {string} props.title
 * @param {string} props.description
 * @param {string} props.countLabel
 */

function SectionHeader({
	icon: Icon,
	iconClassName,
	title,
	description,
	countLabel,
}) {
	return (
		<div className={SECTION_HEADER_CLASS_NAME}>
			<div>
				<div className='flex items-center gap-2'>
					<Icon className={`h-4 w-4 ${iconClassName}`} />

					<h2 className='text-[15px] font-semibold text-white'>
						{title}
					</h2>
				</div>

				<p className='mt-0.5 text-xs text-gray-600'>{description}</p>
			</div>

			<span className='text-[11px] text-gray-600'>{countLabel}</span>
		</div>
	)
}

/**
 * Skill gaps section.
 *
 * @param {Object} props
 * @param {Array} props.skillGaps
 */

function SkillGapsSection({ skillGaps }) {
	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className={CARD_CLASS_NAME}>
				<SectionHeader
					icon={CircleAlert}
					iconClassName='text-amber-300'
					title='Skill areas to strengthen'
					description='Skills and areas that could improve your role alignment'
					countLabel={`${skillGaps.length} identified`}
				/>

				<div className='grid gap-3 p-4 md:grid-cols-3'>
					{skillGaps.map((gap, index) => {
						const priorityClassName =
							PRIORITY_STYLES[gap.priority] ??
							PRIORITY_STYLES.medium

						const severityClassName =
							SEVERITY_STYLES[gap.severity] ??
							SEVERITY_STYLES.medium

						return (
							<div
								key={`${gap.skill}-${index}`}
								className={INNER_CARD_CLASS_NAME + ' p-4'}
							>
								<div className='flex items-start justify-between gap-3'>
									<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/10'>
										<TrendingUp className='h-3.5 w-3.5 text-amber-300' />
									</div>

									<span
										className={`rounded-md border px-2 py-1 text-[10px] font-medium capitalize ${priorityClassName}`}
									>
										{gap.priority} priority
									</span>
								</div>

								<p className='mt-4 text-sm font-medium leading-5 text-gray-300'>
									{gap.skill}
								</p>

								<div className='mt-4 flex items-center justify-between border-t border-white/5 pt-3'>
									<span className='text-[11px] text-gray-600'>
										Gap severity
									</span>

									<span
										className={`rounded-md px-2 py-1 text-[10px] font-medium capitalize ${severityClassName}`}
									>
										{gap.severity}
									</span>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

/**
 * Question accordion item.
 *
 * @param {Object} props
 * @param {Object} props.item
 * @param {number} props.index
 * @param {boolean} props.isOpen
 * @param {Function} props.onToggle
 * @param {'technical'|'behavioral'} props.type
 */

function QuestionAccordionItem({ item, index, isOpen, onToggle, type }) {
	const questionId = `${type}-question-${index}`
	const contentId = `${type}-answer-${index}`

	const isTechnical = type === 'technical'

	const numberClassName = isTechnical
		? 'bg-cyan-400/10 text-cyan-300'
		: 'bg-blue-400/10 text-blue-300'

	const answerCardClassName = isTechnical
		? 'border-cyan-400/10 bg-cyan-400/[0.025]'
		: 'border-blue-400/10 bg-blue-400/[0.025]'

	const answerIconClassName = isTechnical ? 'text-cyan-300' : 'text-blue-300'

	const answerLabelClassName = isTechnical ? 'text-cyan-400' : 'text-blue-400'

	return (
		<div className={INNER_CARD_CLASS_NAME + ' overflow-hidden'}>
			<button
				id={questionId}
				type='button'
				onClick={onToggle}
				aria-expanded={isOpen}
				aria-controls={contentId}
				className='flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left transition hover:bg-white/1.5'
			>
				<span
					className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm text-[11px] font-semibold ${numberClassName}`}
				>
					{String(index + 1).padStart(2, '0')}
				</span>

				<span className='flex-1 text-sm font-medium leading-5 text-gray-300'>
					{item.question}
				</span>

				<ChevronDown
					aria-hidden='true'
					className={`h-4 w-4 shrink-0 text-gray-600 transition-transform ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{isOpen && (
				<div
					id={contentId}
					role='region'
					aria-labelledby={questionId}
					className='border-t border-white/5 px-4 pb-4 pt-3'
				>
					<div className='grid gap-3 lg:grid-cols-2'>
						{/* Intention */}

						<div className='rounded-md border border-white/5 bg-white/2 p-3.5'>
							<div className='flex items-center gap-2'>
								<Target className='h-3.5 w-3.5 text-gray-500' />

								<span className='text-[11px] font-medium uppercase tracking-wide text-gray-500'>
									What this tests
								</span>
							</div>

							<p className='mt-2 text-xs leading-5 text-gray-500'>
								{item.intention}
							</p>
						</div>

						{/* Answer guidance */}

						<div
							className={`rounded-md border p-3.5 ${answerCardClassName}`}
						>
							<div className='flex items-center gap-2'>
								<Lightbulb
									className={`h-3.5 w-3.5 ${answerIconClassName}`}
								/>

								<span
									className={`text-[11px] font-medium uppercase tracking-wide ${answerLabelClassName}`}
								>
									How to approach
								</span>
							</div>

							<p className='mt-2 text-xs leading-5 text-gray-400'>
								{item.answer}
							</p>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

/**
 * Interview question section.
 *
 * @param {Object} props
 * @param {string} props.type
 * @param {Array} props.questions
 * @param {number|null} props.openQuestion
 * @param {Function} props.onToggle
 */

function QuestionSection({ type, questions, openQuestion, onToggle }) {
	const isTechnical = type === 'technical'

	const title = isTechnical
		? 'Technical interview questions'
		: 'Behavioral interview questions'

	const description = isTechnical
		? 'Technical questions based on the target role'
		: 'Situational questions and response guidance'

	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className={CARD_CLASS_NAME}>
				<SectionHeader
					icon={isTechnical ? BriefcaseBusiness : MessageSquareText}
					iconClassName={
						isTechnical ? 'text-cyan-300' : 'text-blue-300'
					}
					title={title}
					description={description}
					countLabel={`${questions.length} questions`}
				/>

				<div className='space-y-2 p-4'>
					{questions.map((item, index) => (
						<QuestionAccordionItem
							key={`${item.question}-${index}`}
							item={item}
							index={index}
							isOpen={openQuestion === index}
							onToggle={() => onToggle(index)}
							type={type}
						/>
					))}
				</div>
			</div>
		</section>
	)
}

/**
 * Preparation plan item.
 *
 * @param {Object} props
 * @param {Object} props.plan
 */

function PreparationPlanItem({ plan }) {
	const PlanIcon = PREPARATION_PLAN_ICONS[plan.day] ?? GraduationCap

	return (
		<div className='relative flex gap-4'>
			{/* Day indicator */}

			<div className='relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-[#030712] text-[10px] font-semibold text-cyan-300'>
				{plan.day}
			</div>

			{/* Plan content */}

			<div className='min-w-0 flex-1 rounded-md border border-white/10 bg-black/20 p-4'>
				<div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
					<div>
						<p className='text-[10px] font-medium uppercase tracking-wider text-cyan-400'>
							Day {plan.day}
						</p>

						<h3 className='mt-1 text-sm font-semibold text-gray-200'>
							{plan.focus}
						</h3>
					</div>

					<span className='hidden h-7 w-7 items-center justify-center rounded-md bg-white/3 sm:flex'>
						<PlanIcon className='h-3.5 w-3.5 text-gray-500' />
					</span>
				</div>

				<div className='mt-3 space-y-2'>
					{plan.tasks.map((task, index) => (
						<div
							key={`${task}-${index}`}
							className='flex items-start gap-2.5'
						>
							<Check className='mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-400' />

							<p className='text-xs leading-5 text-gray-500'>
								{task}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

/**
 * Preparation plan section.
 *
 * @param {Object} props
 * @param {Array} props.preparationPlan
 */

function PreparationPlanSection({ preparationPlan }) {
	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className={CARD_CLASS_NAME}>
				<SectionHeader
					icon={ListChecks}
					iconClassName='text-cyan-300'
					title='Your 7-day preparation plan'
					description='A focused path from preparation to interview readiness'
					countLabel={`${REPORT_CONFIG.preparationDays} days`}
				/>

				<div className='p-4'>
					<div className='relative'>
						{/* Timeline line */}

						<div
							aria-hidden='true'
							className='absolute bottom-6 left-3.75 top-6 w-px bg-white/10'
						/>

						<div className='space-y-3'>
							{preparationPlan.map((plan, index) => (
								<PreparationPlanItem
									key={`${plan.day}-${index}`}
									plan={plan}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

/**
 * Bottom action section.
 *
 * @param {Function} props.onPrepareAgain
 */

function BottomAction({ onPrepareAgain }) {
	return (
		<section className='mx-auto mt-5 max-w-375'>
			<div className='flex flex-col items-center justify-between gap-4 rounded-lg border border-white/10 bg-white/2.5 px-5 py-4 sm:flex-row'>
				<div className='flex items-center gap-3'>
					<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10'>
						<Sparkles className='h-4 w-4 text-cyan-300' />
					</div>

					<div>
						<p className='text-xs font-medium text-gray-300'>
							Keep building your interview readiness
						</p>

						<p className='mt-0.5 text-[11px] text-gray-600'>
							Use this report as your preparation roadmap.
						</p>
					</div>
				</div>

				<button
					type='button'
					onClick={onPrepareAgain}
					className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white sm:w-auto'
				>
					Prepare Again
					<ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
				</button>
			</div>
		</section>
	)
}

/**
 * Interview preparation report page.
 */

export default function InterviewPreparationReport() {
	const { report, loading, handleGetReportById } = useInterview()

	// router for page navigation

	const router = useRouter()

	// route params

	const params = useParams()

	// accordion state

	const [openTechnicalQuestion, setOpenTechnicalQuestion] = useState(0)

	const [openBehavioralQuestion, setOpenBehavioralQuestion] = useState(null)

	// page error

	const [error, setError] = useState('')

	// normalized report ID

	const reportId = normalizeReportId(params?.reportId)

	/**
	 * Fetches the requested interview report.
	 */

	useEffect(() => {
		if (!reportId) {
			return
		}

		const fetchReport = async () => {
			try {
				setError('')

				await handleGetReportById(reportId)
			} catch (error) {
				setError(
					getErrorMessage(error, 'Failed to load interview report.'),
				)
			}
		}

		fetchReport()
	}, [reportId, handleGetReportById])

	// initial loading state

	if (loading) {
		return <LoadingState />
	}

	// API error or missing report state

	if (error || !report) {
		return (
			<ReportErrorState
				error={error}
				onBack={() => router.push(ROUTES.interviewPreparation)}
			/>
		)
	}

	// normalize report collections

	const skillGaps = Array.isArray(report.skillGaps) ? report.skillGaps : []

	const technicalQuestions = Array.isArray(report.technicalQuestions)
		? report.technicalQuestions
		: []

	const behavioralQuestions = Array.isArray(report.behavioralQuestions)
		? report.behavioralQuestions
		: []

	const preparationPlan = Array.isArray(report.preparationPlan)
		? report.preparationPlan
		: []

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}

			<PageBackground />

			{/* Header */}

			<PageHeader
				onBrandClick={() => router.push(ROUTES.home)}
				onDashboardClick={() => router.push(ROUTES.dashboard)}
			/>

			{/* Main content */}

			<div className='relative z-10 w-full px-5 py-8 sm:px-8 lg:px-10 xl:px-12'>
				{/* Page introduction */}

				<PageIntro />

				{/* Report overview */}

				<OverviewSection report={report} />

				{/* Skill gaps */}

				<SkillGapsSection skillGaps={skillGaps} />

				{/* Technical questions */}

				<QuestionSection
					type='technical'
					questions={technicalQuestions}
					openQuestion={openTechnicalQuestion}
					onToggle={(index) =>
						setOpenTechnicalQuestion(
							openTechnicalQuestion === index ? null : index,
						)
					}
				/>

				{/* Behavioral questions */}

				<QuestionSection
					type='behavioral'
					questions={behavioralQuestions}
					openQuestion={openBehavioralQuestion}
					onToggle={(index) =>
						setOpenBehavioralQuestion(
							openBehavioralQuestion === index ? null : index,
						)
					}
				/>

				{/* Preparation plan */}

				<PreparationPlanSection preparationPlan={preparationPlan} />

				{/* Bottom action */}

				<BottomAction
					onPrepareAgain={() =>
						router.push(ROUTES.interviewPreparation)
					}
				/>
			</div>
		</main>
	)
}