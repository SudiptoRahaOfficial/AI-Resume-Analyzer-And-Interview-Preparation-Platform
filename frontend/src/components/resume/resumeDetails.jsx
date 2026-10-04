// making client component
'use client'

// importing dependencies
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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

import { useResume } from '@/hooks/useResume'

// resume details page
export default function ResumeDetails() {
	const { resume, loading, handleGetResumeById } = useResume()

	// router for page navigation
	const router = useRouter()

	// params for getting resume id
	const params = useParams()

	// page error
	const [error, setError] = useState('')

	// calling api
	useEffect(() => {
		if (!params.resumeId) return

		const fetchResume = async () => {
			try {
				setError('')

				await handleGetResumeById(params.resumeId)
			} catch (error) {
				setError(error?.message ?? 'Failed to load generated resume.')
			}
		}

		fetchResume()
	}, [params.resumeId, handleGetResumeById])

	// initial loading
	if (loading) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-[#030712] text-white'>
				<div className='flex flex-col items-center gap-3'>
					<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
						<Sparkles className='h-5 w-5 animate-pulse text-cyan-300' />
					</div>

					<p className='text-sm font-medium text-gray-300'>
						Loading your generated resume...
					</p>

					<p className='text-xs text-gray-600'>
						Please wait a moment.
					</p>
				</div>
			</main>
		)
	}

	// handle api errors
	if (error || !resume) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-[#030712] px-5 text-white'>
				<div className='w-full max-w-md rounded-xl border border-white/10 bg-white/2.5 p-6 text-center'>
					<div className='mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/10'>
						<AlertCircle className='h-5 w-5 text-red-300' />
					</div>

					<h1 className='mt-4 text-lg font-semibold text-white'>
						Unable to load resume
					</h1>

					<p className='mt-2 text-sm leading-6 text-gray-500'>
						{error || 'The requested resume could not be found.'}
					</p>

					<button
						type='button'
						onClick={() => router.push('/dashboard')}
						className='mt-5 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white'
					>
						<ArrowLeft className='h-3.5 w-3.5' />
						Back to Dashboard
					</button>
				</div>
			</main>
		)
	}

	// formatting created date
	const createdDate = new Date(resume.createdAt)

	const formattedDate = createdDate.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	})

	// formatting created time
	const formattedTime = createdDate.toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
	})

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

						<span>Generated Resume</span>
					</div>

					<div className='mt-3 flex flex-col justify-between gap-4 lg:flex-row lg:items-end'>
						<div>
							<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
								Your resume is ready
							</h1>

							<p className='mt-2 max-w-2xl text-sm leading-6 text-gray-500'>
								Your AI-optimized resume has been successfully
								generated and is ready to download.
							</p>
						</div>

						<div className='hidden items-center gap-2 text-xs text-gray-600 lg:flex'>
							<ShieldCheck className='h-3.5 w-3.5' />
							AI-generated resume
						</div>
					</div>
				</section>

				{/* Success summary */}
				<section className='mx-auto mt-6 max-w-375'>
					<div className='relative overflow-hidden rounded-lg border border-cyan-400/10 bg-cyan-400/2.5'>
						{/* Accent glow */}
						<div className='pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/6 blur-3xl' />

						<div className='relative flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between'>
							<div className='flex items-start gap-4'>
								<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10'>
									<CheckCircle2 className='h-5 w-5 text-cyan-300' />
								</div>

								<div>
									<p className='text-xs font-medium text-cyan-400'>
										Generation complete
									</p>

									<h2 className='mt-1 text-lg font-semibold text-white'>
										{resume.jobTitle}
									</h2>

									<p className='mt-1 text-xs leading-5 text-gray-500'>
										Your resume has been tailored for the
										target role and is ready for use.
									</p>
								</div>
							</div>

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

				{/* Resume information */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='rounded-lg border border-white/10 bg-white/2.5'>
						{/* Section header */}
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

						{/* Details */}
						<div className='grid gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-3'>
							{/* Target role */}
							<div className='bg-[#030712]/70 p-5'>
								<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-blue-400/10'>
									<BriefcaseBusiness className='h-3.5 w-3.5 text-blue-300' />
								</div>

								<p className='mt-3 text-[10px] font-medium uppercase tracking-wide text-gray-600'>
									Target role
								</p>

								<p className='mt-1.5 text-sm font-medium leading-5 text-gray-300'>
									{resume.jobTitle}
								</p>
							</div>

							{/* Created */}
							<div className='bg-[#030712]/70 p-5'>
								<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10'>
									<CalendarDays className='h-3.5 w-3.5 text-cyan-300' />
								</div>

								<p className='mt-3 text-[10px] font-medium uppercase tracking-wide text-gray-600'>
									Generated
								</p>

								<p className='mt-1.5 text-sm font-medium text-gray-300'>
									{formattedDate}
								</p>

								<p className='mt-0.5 text-xs text-gray-600'>
									{formattedTime}
								</p>
							</div>

							{/* File type */}
							<div className='bg-[#030712]/70 p-5 sm:col-span-2 lg:col-span-1'>
								<div className='flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10'>
									<FileCheck2 className='h-3.5 w-3.5 text-emerald-300' />
								</div>

								<p className='mt-3 text-[10px] font-medium uppercase tracking-wide text-gray-600'>
									File format
								</p>

								<p className='mt-1.5 text-sm font-medium text-gray-300'>
									PDF Document
								</p>

								<p className='mt-0.5 text-xs text-gray-600'>
									Ready for download
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Resume actions */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='rounded-lg border border-white/10 bg-white/2.5'>
						<div className='flex flex-col justify-between gap-5 p-5 sm:flex-row sm:items-center'>
							<div className='flex items-start gap-3'>
								<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/4'>
									<FileText className='h-4 w-4 text-gray-400' />
								</div>

								<div>
									<p className='text-xs font-medium text-gray-300'>
										What would you like to do next?
									</p>

									<p className='mt-0.5 text-[11px] leading-5 text-gray-600'>
										Download this version or create a new
										resume for another target role.
									</p>
								</div>
							</div>

							<div className='flex w-full flex-col gap-2 sm:w-auto sm:flex-row'>
								<button
									type='button'
									onClick={() =>
										router.push('/resume-generator')
									}
									className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-white/10 bg-white/3 px-5 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-white sm:w-auto'
								>
									Create Another
									<ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Bottom note */}
				<section className='mx-auto mt-4 max-w-375'>
					<div className='flex items-center justify-center gap-2 py-2 text-center text-[11px] text-gray-700'>
						<ShieldCheck className='h-3.5 w-3.5' />

						<span>
							Your generated resume is securely stored with your
							account.
						</span>
					</div>
				</section>
			</div>
		</main>
	)
}