'use client'

import Link from 'next/link'
import Icon from '@/components/shared/icon'

const MOCK_REPORT = {
	jobTitle: 'Senior Full Stack Developer',
	createdAt: '2026-10-13T10:30:00.000Z',
	matchScore: 86,
	jobDescription:
		'We are looking for a Senior Full Stack Developer with experience building scalable web applications using React, Next.js, Node.js, and modern database technologies. The ideal candidate can design robust APIs, collaborate across teams, and deliver maintainable software.',
	selfDescription:
		'Full Stack Developer with hands-on experience building responsive web applications, developing REST APIs, working with databases, and implementing modern frontend architectures.',
	technicalQuestions: [
		{
			question:
				'How does server-side rendering differ from client-side rendering in Next.js?',
			intention:
				'Evaluate your understanding of rendering strategies, performance, SEO, and the trade-offs involved in application architecture.',
			answer: 'Server-side rendering generates HTML on the server for each request, while client-side rendering relies on JavaScript in the browser to render the interface. The appropriate approach depends on data freshness, SEO requirements, caching, and user experience.',
		},
		{
			question:
				'How would you design a secure REST API for a production application?',
			intention:
				'Assess API design, authentication, authorization, input validation, and error handling.',
			answer: 'I would define clear resource-oriented endpoints, validate all input, enforce authentication and resource-level authorization, use HTTPS, centralize error handling, apply rate limits where appropriate, and add structured logging and automated tests.',
		},
		{
			question:
				'When would you choose MongoDB over a relational database?',
			intention:
				'Understand your database modeling decisions and your ability to explain technical trade-offs.',
			answer: 'I would consider MongoDB when the data model benefits from flexible documents and access patterns fit document-oriented queries. For strongly relational data and complex transactional relationships, a relational database may be more suitable.',
		},
	],
	behavioralQuestions: [
		{
			question:
				'Tell me about a challenging technical problem you solved.',
			intention:
				'Evaluate structured communication, ownership, problem-solving, and measurable impact.',
			answer: 'Use the STAR framework: explain the situation, describe your responsibility, outline the actions you took, and finish with the result. Emphasize your individual contribution and what you learned.',
		},
		{
			question:
				'How do you handle disagreements about a technical implementation?',
			intention:
				'Assess collaboration, communication, and decision-making under differing opinions.',
			answer: 'I clarify the shared goal, compare the options against agreed requirements, discuss evidence and trade-offs, and document the decision. If uncertainty remains, I suggest a small experiment or prototype.',
		},
	],
	skillGaps: [
		{
			skill: 'System design',
			priority: 'High',
			severity: 'High',
		},
		{
			skill: 'Database optimization',
			priority: 'Medium',
			severity: 'Medium',
		},
		{
			skill: 'Scalable API architecture',
			priority: 'High',
			severity: 'High',
		},
		{
			skill: 'Testing strategy',
			priority: 'Low',
			severity: 'Low',
		},
	],
	preparationPlan: [
		{
			day: 1,
			focus: 'Review core technical concepts',
			tasks: [
				'Revise React rendering and state management.',
				'Review Next.js rendering strategies and caching.',
				'Practice explaining your recent projects.',
			],
		},
		{
			day: 2,
			focus: 'Practice backend and database design',
			tasks: [
				'Design a REST API for a real-world application.',
				'Review authentication and authorization.',
				'Practice database indexing and query optimization.',
			],
		},
		{
			day: 3,
			focus: 'Mock interview and review',
			tasks: [
				'Answer behavioral questions using the STAR method.',
				'Complete a timed technical practice session.',
				'Review weak areas and prepare questions for the interviewer.',
			],
		},
	],
}

function formatDate(value) {
	const date = new Date(value)

	if (Number.isNaN(date.getTime())) return 'Date unavailable'

	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date)
}

function getScoreColor(score) {
	if (score >= 80) return 'text-emerald-300'
	if (score >= 60) return 'text-amber-300'
	return 'text-rose-300'
}

function getPriorityColor(priority) {
	const value = priority.toLowerCase()

	if (value === 'high') {
		return 'border-rose-400/20 bg-rose-400/10 text-rose-300'
	}

	if (value === 'medium') {
		return 'border-amber-400/20 bg-amber-400/10 text-amber-300'
	}

	return 'border-emerald-400/20 bg-emerald-400/10 text-emerald-300'
}

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
									<h3 className='text-sm font-semibold leading-6 text-slate-100 sm:text-base'>
										{item.question}
									</h3>

									{item.intention && (
										<div className='mt-4'>
											<p className='text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500'>
												What this evaluates
											</p>
											<p className='mt-1 text-sm leading-6 text-slate-400'>
												{item.intention}
											</p>
										</div>
									)}

									{item.answer && (
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
							key={`${gap.skill}-${index}`}
							className='rounded-xl border border-slate-800/80 bg-[#080d19] p-4'
						>
							<div className='flex flex-wrap items-start justify-between gap-3'>
								<h3 className='text-sm font-semibold text-slate-100'>
									{gap.skill}
								</h3>

								<div className='flex flex-wrap items-center gap-2'>
									{/* Priority badge */}
									<span
										className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getPriorityColor(
											gap.priority,
										)}`}
									>
										Priority: {gap.priority}
									</span>

									{/* Severity badge */}
									<span
										className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getPriorityColor(
											gap.severity,
										)}`}
									>
										Severity: {gap.severity}
									</span>
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
					{preparationPlan.map((day, index) => (
						<article
							key={`${day.day}-${index}`}
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
										Day {day.day}
									</p>
									<h3 className='mt-1 text-sm font-semibold text-white sm:text-base'>
										{day.focus}
									</h3>

									<ul className='mt-4 space-y-3'>
										{day.tasks.map((task, taskIndex) => (
											<li
												key={`${index}-task-${taskIndex}`}
												className='flex items-start gap-2.5 text-sm leading-6 text-slate-300'
											>
												<span className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400' />
												<span>{task}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	)
}

export default function InterviewDetails({ reportId }) {
	const report = MOCK_REPORT
	const technicalQuestions = report.technicalQuestions
	const behavioralQuestions = report.behavioralQuestions
	const totalQuestions =
		technicalQuestions.length + behavioralQuestions.length

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-slate-100 sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-5xl space-y-6'>
				<nav className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'>
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
									{report.jobTitle}
								</h1>
								<p className='mt-2 text-sm leading-6 text-slate-400'>
									Review your interview questions, skill gaps,
									and recommended preparation plan.
								</p>
								<p className='mt-4 text-xs text-slate-500'>
									Created {formatDate(report.createdAt)}
								</p>
								{reportId && (
									<p className='mt-1 text-[10px] text-slate-600'>
										Preview ID: {reportId}
									</p>
								)}
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
						value={`${report.matchScore}%`}
						icon='target'
						detail='Demo job match score'
						valueClass={getScoreColor(report.matchScore)}
					/>
					<ReportStat
						label='Total questions'
						value={totalQuestions}
						icon='message'
						detail='Technical and behavioral'
					/>
					<ReportStat
						label='Skill gaps'
						value={report.skillGaps.length}
						icon='layers'
						detail='Areas to improve'
					/>
					<ReportStat
						label='Plan steps'
						value={report.preparationPlan.length}
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

				<SkillGapsSection skillGaps={report.skillGaps} />
				<PreparationPlanSection
					preparationPlan={report.preparationPlan}
				/>

				<footer className='border-t border-slate-800/70 py-5 text-center text-xs text-slate-500'>
					ResumeAI · Interview preparation report
				</footer>
			</div>
		</main>
	)
}