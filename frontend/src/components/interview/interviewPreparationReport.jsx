// making client component
'use client'

// importing dependencis
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

// interview preparation report page
export default function InterviewPreparationReport() {
	const { report, loading, handleGetReportById } = useInterview()

	// router for page navigation
	const router = useRouter()

	// params for getting report id
	const params = useParams()

	// active technical question
	const [openTechnicalQuestion, setOpenTechnicalQuestion] = useState(0)

	// active behavioral question
	const [openBehavioralQuestion, setOpenBehavioralQuestion] = useState(null)

	// page error
	const [error, setError] = useState('')

	// calling api
	useEffect(() => {
		if (!params.reportId) return

		const fetchReport = async () => {
			try {
				setError('')

				await handleGetReportById(params.reportId)
			} catch (error) {
				setError(error?.message ?? 'Failed to load interview report.')
			}
		}

		fetchReport()
	}, [params.reportId, handleGetReportById])

	// initial loading
	if (loading) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-[#030712] text-white'>
				<div className='flex flex-col items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
						<Sparkles className='h-5 w-5 animate-pulse text-cyan-300' />
					</div>

					<p className='text-sm font-medium text-gray-300'>
						Loading your interview report...
					</p>

					<p className='text-xs text-gray-600'>
						Please wait a moment.
					</p>
				</div>
			</main>
		)
	}

	// Handle API errors
	if (error || !report) {
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
						onClick={() => router.push('/interview-preparation')}
						className='mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white'
					>
						<ArrowLeft className='h-3.5 w-3.5' />
						Back to Interview Preparation
					</button>
				</div>
			</main>
		)
	}

	// score configuration
	const score =
		report.matchScore >= 70
			? {
					label: 'Strong Match',
					description:
						'Your profile aligns well with the target role.',
				}
			: report.matchScore >= 50
				? {
						label: 'Moderate Match',
						description:
							'Your profile shows relevant alignment with some areas to strengthen.',
					}
				: {
						label: 'Needs Preparation',
						description:
							'Several areas should be strengthened before the interview.',
					}

	// priority styles
	const priorityStyles = {
		high: 'border-red-400/10 bg-red-400/[0.05] text-red-300',
		medium: 'border-amber-400/10 bg-amber-400/[0.05] text-amber-300',
		low: 'border-emerald-400/10 bg-emerald-400/[0.05] text-emerald-300',
	}

	// severity styles
	const severityStyles = {
		high: 'bg-red-400/10 text-red-300',
		medium: 'bg-amber-400/10 text-amber-300',
		low: 'bg-emerald-400/10 text-emerald-300',
	}

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}
			<div className='pointer-events-none fixed inset-0 overflow-hidden'>
				<div className='absolute left-[8%] top-40 h-128 w-lg rounded-full bg-cyan-500/[0.07] blur-[120px]' />

				<div className='absolute right-[8%] top-[18%] h-120 w-120 rounded-full bg-blue-500/5 blur-[120px]' />

				<div className='absolute bottom-40 left-[38%] h-112 w-md rounded-full bg-cyan-500/[0.035] blur-[110px]' />
			</div>

			{/* Header */}
			<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/85 backdrop-blur-xl'>
				<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
					{/* Brand */}
					<button
						type='button'
						onClick={() => router.push('/')}
						className='ml-14 flex cursor-pointer items-center gap-2.5 transition'
					>
						<span className='text-lg font-semibold tracking-tight text-white'>
							ResumeAI
						</span>
					</button>

					{/* Back */}
					<button
						type='button'
						onClick={() => router.push('/dashboard')}
						className='group mr-14 flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-white'
					>
						<ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-0.5' />

						<span>Dashboard</span>
					</button>
				</div>
			</header>

			{/* Main */}
			<div className='relative z-10 w-full px-5 py-8 sm:px-8 lg:px-10 xl:px-12'>
				{/* Page intro */}
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
								Review your role alignment, potential skill
								gaps, interview questions, and a focused 7-day
								preparation plan.
							</p>
						</div>

						<div className='hidden items-center gap-2 text-xs text-gray-600 lg:flex'>
							<ShieldCheck className='h-3.5 w-3.5' />
							AI-generated preparation report
						</div>
					</div>
				</section>

				{/* Overview */}
				<section className='mx-auto mt-6 max-w-375'>
					<div className='grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]'>
						{/* Match score */}
						<div className='relative overflow-hidden rounded-lg border border-white/10 bg-white/2.5'>
							<div className='absolute right-0 top-0 h-32 w-32 rounded-full bg-cyan-400/5 blur-3xl' />

							<div className='relative flex h-full flex-col justify-between p-5'>
								<div>
									<div className='flex items-center gap-2 text-xs font-medium text-gray-500'>
										<Target className='h-3.5 w-3.5 text-cyan-400' />
										Role Match
									</div>

									<div className='mt-5 flex items-end gap-2'>
										<span className='text-5xl font-semibold tracking-tight text-white'>
											{report.matchScore}
										</span>

										<span className='mb-1.5 text-sm text-gray-600'>
											/ 100
										</span>
									</div>
								</div>

								<div className='mt-5'>
									<div className='h-1.5 overflow-hidden rounded-full bg-white/5'>
										<div
											className='h-full rounded-full bg-cyan-400'
											style={{
												width: `${report.matchScore}%`,
											}}
										/>
									</div>

									<p className='mt-3 text-sm font-medium text-gray-300'>
										{score.label}
									</p>

									<p className='mt-1 text-xs leading-5 text-gray-600'>
										{score.description}
									</p>
								</div>
							</div>
						</div>

						{/* Report overview */}
						<div className='grid gap-4 sm:grid-cols-3'>
							<div className='rounded-lg border border-white/10 bg-white/2.5 p-5'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10'>
									<MessageSquareText className='h-4 w-4 text-cyan-300' />
								</div>

								<p className='mt-4 text-2xl font-semibold text-white'>
									{report.technicalQuestions.length +
										report.behavioralQuestions.length}
								</p>

								<p className='mt-1 text-xs text-gray-600'>
									Probable interview questions
								</p>
							</div>

							<div className='rounded-lg border border-white/10 bg-white/2.5 p-5'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400/10'>
									<AlertCircle className='h-4 w-4 text-amber-300' />
								</div>

								<p className='mt-4 text-2xl font-semibold text-white'>
									{report.skillGaps.length}
								</p>

								<p className='mt-1 text-xs text-gray-600'>
									Skill gaps identified
								</p>
							</div>

							<div className='rounded-lg border border-white/10 bg-white/2.5 p-5'>
								<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-blue-400/10'>
									<Clock3 className='h-4 w-4 text-blue-300' />
								</div>

								<p className='mt-4 text-2xl font-semibold text-white'>
									7
								</p>

								<p className='mt-1 text-xs text-gray-600'>
									Day preparation plan
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Skill gaps */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='rounded-lg border border-white/10 bg-white/2.5'>
						{/* Section header */}
						<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
							<div>
								<div className='flex items-center gap-2'>
									<CircleAlert className='h-4 w-4 text-amber-300' />

									<h2 className='text-[15px] font-semibold text-white'>
										Skill areas to strengthen
									</h2>
								</div>

								<p className='mt-0.5 text-xs text-gray-600'>
									Skills and areas that could improve your
									role alignment
								</p>
							</div>

							<span className='text-[11px] text-gray-600'>
								{report.skillGaps.length} identified
							</span>
						</div>

						{/* Skill gap cards */}
						<div className='grid gap-3 p-4 md:grid-cols-3'>
							{report.skillGaps.map((gap) => (
								<div
									key={gap.skill}
									className='rounded-md border border-white/10 bg-black/20 p-4'
								>
									<div className='flex items-start justify-between gap-3'>
										<div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400/10'>
											<TrendingUp className='h-3.5 w-3.5 text-amber-300' />
										</div>

										<span
											className={`rounded-md border px-2 py-1 text-[10px] font-medium capitalize ${
												priorityStyles[gap.priority]
											}`}
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
											className={`rounded-md px-2 py-1 text-[10px] font-medium capitalize ${
												severityStyles[gap.severity]
											}`}
										>
											{gap.severity}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>

				{/* Technical questions */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='rounded-lg border border-white/10 bg-white/2.5'>
						{/* Section header */}
						<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
							<div>
								<div className='flex items-center gap-2'>
									<BriefcaseBusiness className='h-4 w-4 text-cyan-300' />

									<h2 className='text-[15px] font-semibold text-white'>
										Technical interview questions
									</h2>
								</div>

								<p className='mt-0.5 text-xs text-gray-600'>
									Technical questions based on the target role
								</p>
							</div>

							<span className='text-[11px] text-gray-600'>
								{report.technicalQuestions.length} questions
							</span>
						</div>

						<div className='space-y-2 p-4'>
							{report.technicalQuestions.map((item, index) => {
								const isOpen = openTechnicalQuestion === index

								return (
									<div
										key={item.question}
										className='overflow-hidden rounded-md border border-white/10 bg-black/20'
									>
										<button
											type='button'
											onClick={() =>
												setOpenTechnicalQuestion(
													isOpen ? null : index,
												)
											}
											className='flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left'
										>
											<span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-cyan-400/10 text-[11px] font-semibold text-cyan-300'>
												{String(index + 1).padStart(
													2,
													'0',
												)}
											</span>

											<span className='flex-1 text-sm font-medium leading-5 text-gray-300'>
												{item.question}
											</span>

											<ChevronDown
												className={`h-4 w-4 shrink-0 text-gray-600 transition-transform ${
													isOpen ? 'rotate-180' : ''
												}`}
											/>
										</button>

										{isOpen && (
											<div className='border-t border-white/5 px-4 pb-4 pt-3'>
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
													<div className='rounded-md border border-cyan-400/10 bg-cyan-400/2.5 p-3.5'>
														<div className='flex items-center gap-2'>
															<Lightbulb className='h-3.5 w-3.5 text-cyan-300' />

															<span className='text-[11px] font-medium uppercase tracking-wide text-cyan-400'>
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
							})}
						</div>
					</div>
				</section>

				{/* Behavioral questions */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='rounded-lg border border-white/10 bg-white/2.5'>
						{/* Section header */}
						<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
							<div>
								<div className='flex items-center gap-2'>
									<MessageSquareText className='h-4 w-4 text-blue-300' />

									<h2 className='text-[15px] font-semibold text-white'>
										Behavioral interview questions
									</h2>
								</div>

								<p className='mt-0.5 text-xs text-gray-600'>
									Situational questions and response guidance
								</p>
							</div>

							<span className='text-[11px] text-gray-600'>
								{report.behavioralQuestions.length} questions
							</span>
						</div>

						<div className='space-y-2 p-4'>
							{report.behavioralQuestions.map((item, index) => {
								const isOpen = openBehavioralQuestion === index

								return (
									<div
										key={item.question}
										className='overflow-hidden rounded-md border border-white/10 bg-black/20'
									>
										<button
											type='button'
											onClick={() =>
												setOpenBehavioralQuestion(
													isOpen ? null : index,
												)
											}
											className='flex w-full cursor-pointer items-center gap-3 px-4 py-3.5 text-left'
										>
											<span className='flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-blue-400/10 text-[11px] font-semibold text-blue-300'>
												{String(index + 1).padStart(
													2,
													'0',
												)}
											</span>

											<span className='flex-1 text-sm font-medium leading-5 text-gray-300'>
												{item.question}
											</span>

											<ChevronDown
												className={`h-4 w-4 shrink-0 text-gray-600 transition-transform ${
													isOpen ? 'rotate-180' : ''
												}`}
											/>
										</button>

										{isOpen && (
											<div className='border-t border-white/5 px-4 pb-4 pt-3'>
												<div className='grid gap-3 lg:grid-cols-2'>
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

													<div className='rounded-md border border-blue-400/10 bg-blue-400/2.5 p-3.5'>
														<div className='flex items-center gap-2'>
															<Lightbulb className='h-3.5 w-3.5 text-blue-300' />

															<span className='text-[11px] font-medium uppercase tracking-wide text-blue-400'>
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
							})}
						</div>
					</div>
				</section>

				{/* Preparation plan */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='rounded-lg border border-white/10 bg-white/2.5'>
						{/* Section header */}
						<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
							<div>
								<div className='flex items-center gap-2'>
									<ListChecks className='h-4 w-4 text-cyan-300' />

									<h2 className='text-[15px] font-semibold text-white'>
										Your 7-day preparation plan
									</h2>
								</div>

								<p className='mt-0.5 text-xs text-gray-600'>
									A focused path from preparation to interview
									readiness
								</p>
							</div>

							<span className='text-[11px] text-gray-600'>
								7 days
							</span>
						</div>

						{/* Timeline */}
						<div className='p-4'>
							<div className='relative'>
								{/* Timeline line */}
								<div className='absolute bottom-6 left-3.75 top-6 w-px bg-white/10' />

								<div className='space-y-3'>
									{report.preparationPlan.map((plan) => (
										<div
											key={plan.day}
											className='relative flex gap-4'
										>
											{/* Day */}
											<div className='relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-[#030712] text-[10px] font-semibold text-cyan-300'>
												{plan.day}
											</div>

											{/* Content */}
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
														{plan.day === 1 ? (
															<FileText className='h-3.5 w-3.5 text-gray-500' />
														) : plan.day === 2 ? (
															<BookOpen className='h-3.5 w-3.5 text-gray-500' />
														) : plan.day === 3 ? (
															<BriefcaseBusiness className='h-3.5 w-3.5 text-gray-500' />
														) : plan.day === 4 ? (
															<MessageSquareText className='h-3.5 w-3.5 text-gray-500' />
														) : plan.day === 5 ? (
															<Award className='h-3.5 w-3.5 text-gray-500' />
														) : plan.day === 6 ? (
															<Target className='h-3.5 w-3.5 text-gray-500' />
														) : (
															<GraduationCap className='h-3.5 w-3.5 text-gray-500' />
														)}
													</span>
												</div>

												<div className='mt-3 space-y-2'>
													{plan.tasks.map((task) => (
														<div
															key={task}
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
									))}
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Bottom action */}
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
							onClick={() =>
								router.push('/interview-preparation')
							}
							className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white sm:w-auto'
						>
							Prepare Again
							<ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
						</button>
					</div>
				</section>
			</div>
		</main>
	)
}