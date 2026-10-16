'use client'

import Link from 'next/link'
import Icon from '@/components/shared/icon'

const MOCK_RESUME = {
	_id: '6ac8992d5eb18612b4403242',
	jobTitle: 'Backend Software Engineer',
	resumePdf:
		'https://ik.imagekit.io/aexroid/resumeAi/resume-pdfs/resume-1791531307386_Tfj-Gnlo2.pdf',
	resumeFileId: '6ac8992cead997d09af67dca',
	resumeFilePath: '/resumeAi/resume-pdfs/resume-1791531307386_Tfj-Gnlo2.pdf',
	createdAt: '2026-10-09T07:35:09.264Z',
	updatedAt: '2026-10-09T07:35:09.264Z',
}

function formatDate(value) {
	const date = new Date(value)

	if (Number.isNaN(date.getTime())) {
		return 'Date unavailable'
	}

	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)
}

export default function ResumeDetails({ resumeId }) {
	// Temporary mock data. Replace with the API response later.
	const resume = MOCK_RESUME

	const hasPdf =
		typeof resume.resumePdf === 'string' &&
		resume.resumePdf.trim().length > 0

	const pdfFileName = resume.resumeFilePath?.split('/').pop() || 'Resume.pdf'

	function handleDownload() {
		if (!hasPdf) return

		const link = document.createElement('a')

		link.href = resume.resumePdf
		link.download = pdfFileName
		link.target = '_blank'
		link.rel = 'noopener noreferrer'

		document.body.appendChild(link)
		link.click()
		link.remove()
	}

	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-slate-100 sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-4xl space-y-6'>
				{/* Breadcrumb navigation */}
				<nav
					aria-label='Breadcrumb'
					className='flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm'
				>
					<Link
						href='/dashboard'
						className='transition-colors hover:text-slate-200'
					>
						Dashboard
					</Link>

					<span aria-hidden='true'>/</span>

					<Link
						href='/resume-optimization-reports'
						className='transition-colors hover:text-slate-200'
					>
						Resume reports
					</Link>

					<span aria-hidden='true'>/</span>

					<span
						aria-current='page'
						className='text-slate-300'
					>
						Resume details
					</span>
				</nav>

				{/* Resume details card */}
				<section className='overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/40 shadow-lg shadow-black/10'>
					{/* Resume heading */}
					<div className='border-b border-slate-800/80 px-5 py-6 sm:px-7 sm:py-7'>
						<div className='flex items-start justify-between gap-4'>
							<div className='flex min-w-0 items-start gap-4'>
								<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
									<Icon
										name='file-check'
										size={22}
									/>
								</div>

								<div className='min-w-0'>
									<div className='flex flex-wrap items-center gap-2'>
										<p className='text-xs font-medium uppercase tracking-wider text-indigo-300'>
											Generated resume
										</p>

										{hasPdf && (
											<span className='inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/6 px-2 py-0.5 text-[11px] font-medium text-emerald-300'>
												<span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
												Available
											</span>
										)}
									</div>

									<h1 className='mt-2 wrap-break-word text-xl font-semibold tracking-tight text-white sm:text-2xl'>
										{resume.jobTitle || 'Untitled resume'}
									</h1>

									<p className='mt-2 text-sm leading-6 text-slate-400'>
										View and download your saved resume
										document.
									</p>

									<div className='mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500'>
										<span className='inline-flex items-center gap-1.5'>
											<Icon
												name='calendar'
												size={14}
											/>
											Created{' '}
											{formatDate(resume.createdAt)}
										</span>

										{resumeId && (
											<span className='break-all'>
												ID: {resumeId}
											</span>
										)}
									</div>
								</div>
							</div>

							<Link
								href='/resume-optimization-reports'
								className='inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/50 px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 sm:text-sm'
							>
								<span className='hidden sm:inline'>
									All resumes
								</span>
								<span className='sm:hidden'>Back</span>
								<Icon
									name='arrow'
									size={14}
								/>
							</Link>
						</div>
					</div>

					{/* Document information and actions */}
					<div className='p-5 sm:p-7'>
						<div className='rounded-xl border border-slate-800/80 bg-[#080d19] p-4 sm:p-5'>
							<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
								<div className='flex min-w-0 items-start gap-3'>
									<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-700/80 bg-slate-800/60 text-slate-300'>
										<Icon
											name='file'
											size={20}
										/>
									</div>

									<div className='min-w-0 flex-1'>
										<h2 className='text-sm font-semibold text-slate-100'>
											Resume PDF
										</h2>

										<p className='mt-1 break-all text-sm leading-5 text-slate-400'>
											{hasPdf
												? pdfFileName
												: 'No document attached'}
										</p>

										<p className='mt-1.5 text-xs text-slate-500'>
											PDF document
										</p>
									</div>
								</div>

								{hasPdf && (
									<div className='flex shrink-0 flex-col gap-2 sm:flex-row'>
										<a
											href={resume.resumePdf}
											target='_blank'
											rel='noopener noreferrer'
											aria-label='Open resume PDF in a new tab'
											className='inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400'
										>
											<Icon
												name='arrow'
												size={15}
											/>
											Open PDF
										</a>

										<button
											type='button'
											onClick={handleDownload}
											className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d19]'
										>
											<Icon
												name='download'
												size={15}
											/>
											Download PDF
										</button>
									</div>
								)}
							</div>

							{!hasPdf && (
								<div className='mt-4 rounded-lg border border-dashed border-slate-800 px-4 py-5'>
									<div className='flex items-start gap-3'>
										<Icon
											name='file'
											size={18}
										/>

										<div>
											<p className='text-sm font-medium text-slate-300'>
												Resume PDF unavailable
											</p>

											<p className='mt-1 text-sm leading-6 text-slate-500'>
												There is no PDF document
												attached to this resume.
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</section>

				{/* Footer */}
				<footer className='border-t border-slate-800/70 py-5 text-center text-xs text-slate-500'>
					ResumeAI · Resume details
				</footer>
			</div>
		</main>
	)
}