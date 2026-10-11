'use client'

import { useState } from 'react'

const faqs = [
	{
		id: 1,
		question: 'What is ResumeAI?',
		answer: 'ResumeAI is an AI-powered interview preparation platform designed to help you analyze your resume, identify skill gaps, optimize your resume for applicant tracking systems (ATS), and prepare for job interviews with role-specific questions and actionable guidance.',
	},
	{
		id: 2,
		question: 'What is ATS optimization?',
		answer: 'Applicant tracking systems help employers organize and filter job applications. ResumeAI provides suggestions to improve your resume’s relevance, structure, and use of job-related terminology. These improvements may help make your resume clearer and more relevant, but they cannot guarantee that an ATS will rank or select it.',
	},
	{
		id: 3,
		question: 'How does AI interview preparation work?',
		answer: 'Provide a target job description and, optionally, your resume or a description of your background. ResumeAI generates relevant technical and behavioral interview questions, identifies areas to improve, and creates a structured preparation plan to guide your practice.',
	},
	{
		id: 4,
		question: 'Can I use ResumeAI for different job roles?',
		answer: 'Yes. You can prepare for different positions by providing the relevant job description for each role. Your interview questions, resume feedback, and preparation priorities can then be tailored to the requirements of the target position.',
	},
	{
		id: 5,
		question: 'Is my resume and personal information secure?',
		answer: "ResumeAI is designed to handle your account and uploaded information through its authentication and data-management systems. Avoid uploading information you do not want processed. Review the platform's privacy policy for details about data storage, retention, processing, and deletion.",
	},
	{
		id: 6,
		question: 'Does ResumeAI guarantee a job or interview?',
		answer: 'No. ResumeAI helps you prepare by providing analysis, recommendations, and practice materials. Hiring decisions depend on many factors, including your qualifications, experience, application quality, interview performance, and employer requirements. Results are not guaranteed.',
	},
]

function ChevronIcon({ isOpen }) {
	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
			className={`h-5 w-5 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
				isOpen ? 'rotate-180 text-indigo-400' : 'text-slate-400'
			}`}
		>
			<path d='m6 9 6 6 6-6' />
		</svg>
	)
}

function FAQItem({ faq, isOpen, onToggle }) {
	const answerId = `faq-answer-${faq.id}`
	const questionId = `faq-question-${faq.id}`

	return (
		<div
			className={`overflow-hidden rounded-xl border transition-colors duration-300 motion-reduce:transition-none ${
				isOpen
					? 'border-indigo-400/30 bg-slate-900/90'
					: 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
			}`}
		>
			<h3>
				<button
					id={questionId}
					type='button'
					onClick={onToggle}
					aria-expanded={isOpen}
					aria-controls={answerId}
					className='flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6'
				>
					<span
						className={`text-sm font-semibold leading-6 transition-colors duration-200 sm:text-base ${
							isOpen ? 'text-white' : 'text-slate-200'
						}`}
					>
						{faq.question}
					</span>

					<span
						className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
							isOpen
								? 'border-indigo-400/20 bg-indigo-500/10'
								: 'border-slate-700 bg-slate-800/70'
						}`}
					>
						<ChevronIcon isOpen={isOpen} />
					</span>
				</button>
			</h3>

			<div
				id={answerId}
				role='region'
				aria-labelledby={questionId}
				aria-hidden={!isOpen}
				className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out motion-reduce:transition-none ${
					isOpen
						? 'grid-rows-[1fr] opacity-100'
						: 'grid-rows-[0fr] opacity-0'
				}`}
			>
				<div className='overflow-hidden'>
					<div className='px-5 pb-5 sm:px-6 sm:pb-6'>
						<div className='mb-4 h-px bg-linear-to-r from-indigo-500/30 via-slate-700/60 to-transparent' />

						<p className='text-sm leading-7 text-slate-400'>
							{faq.answer}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function FAQ() {
	const [openId, setOpenId] = useState(1)

	const toggleFAQ = (id) => {
		setOpenId((currentId) => (currentId === id ? null : id))
	}

	return (
		<section
			id='faq'
			aria-labelledby='faq-heading'
			className='relative isolate overflow-hidden bg-slate-950 text-white py-16 sm:py-20 lg:py-24'
		>
			{/* Background glow effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[120px]' />

				<div className='absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/6 blur-[110px]' />
			</div>

			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Section heading */}
				<div className='mx-auto mb-12 max-w-3xl text-center sm:mb-16'>
					<h2
						id='faq-heading'
						className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'
					>
						Still Have Questions?
						<span className='ml-2 bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
							Answered!
						</span>
					</h2>

					<p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base'>
						Everything you need to know about resume analysis,
						interview preparation, and getting started with
						ResumeAI.
					</p>
				</div>

				{/* FAQ accordion */}
				<div className='mx-auto max-w-4xl space-y-3'>
					{faqs.map((faq) => (
						<FAQItem
							key={faq.id}
							faq={faq}
							isOpen={openId === faq.id}
							onToggle={() => toggleFAQ(faq.id)}
						/>
					))}
				</div>
			</div>
		</section>
	)
}