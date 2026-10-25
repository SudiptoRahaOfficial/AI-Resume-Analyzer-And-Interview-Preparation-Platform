'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Icon from '@/components/shared/icon'
import { useAuth } from '@/context/AuthContext'
import { useResume } from '@/context/ResumeContext'

const RESUMES_LIST_PATH = '/resume-optimization-reports'

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function formatDate(value) {
	if (!value) return 'Date unavailable'

	const date = new Date(value)

	if (Number.isNaN(date.getTime())) return 'Date unavailable'

	return new Intl.DateTimeFormat('en', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(date)
}

// the pdf url comes from the server, so we only accept a well-formed https url
// (blocks javascript:, data: and malformed values from ever reaching an href)
function getSafePdfUrl(value) {
	if (typeof value !== 'string' || !value.trim()) return null

	try {
		const url = new URL(value.trim())
		return url.protocol === 'https:' ? url : null
	} catch {
		return null
	}
}

// ImageKit sends Content-Disposition: attachment when ik-attachment=true,
// which is what actually forces a download for a cross-origin file
function getDownloadUrl(url) {
	const downloadUrl = new URL(url.toString())
	downloadUrl.searchParams.set('ik-attachment', 'true')
	return downloadUrl.toString()
}

function getPdfFileName(path) {
	const name = typeof path === 'string' ? path.split('/').pop() : ''
	return name || 'Resume.pdf'
}

// translating ApiError (status + message) into something a user can act on
function getErrorContent(error) {
	switch (error?.status) {
		case 0:
			return {
				title: 'Connection problem',
				message:
					'We could not reach the server. Check your internet connection and try again.',
				canRetry: true,
			}
		case 400:
		case 403:
		case 404:
			return {
				title: 'Resume not found',
				message:
					'This resume does not exist, or you do not have access to it.',
				canRetry: false,
			}
		case 401:
			return {
				title: 'Session expired',
				message: 'Your session has expired. Please sign in again.',
				canRetry: false,
			}
		default:
			return {
				title: 'Could not load resume',
				message:
					error?.message ||
					'Something went wrong while loading this resume.',
				canRetry: true,
			}
	}
}

/* -------------------------------------------------------------------------- */
/*                                 Page states                                */
/* -------------------------------------------------------------------------- */

// shared layout + breadcrumb so every state looks like the same page
function PageShell({ children }) {
	return (
		<main className='min-h-screen bg-[#030712] px-4 py-6 text-slate-100 sm:px-6 sm:py-8 lg:px-8'>
			<div className='mx-auto max-w-4xl space-y-6'>
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
						href={RESUMES_LIST_PATH}
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

				{children}
			</div>
		</main>
	)
}

function SkeletonBlock({ className = '' }) {
	return (
		<div
			className={`animate-pulse rounded-2xl border border-slate-800/80 bg-slate-900/40 ${className}`}
		/>
	)
}

function LoadingState() {
	return (
		<PageShell>
			<div
				role='status'
				aria-busy='true'
				aria-live='polite'
				className='space-y-6'
			>
				<span className='sr-only'>Loading resume…</span>

				<SkeletonBlock className='h-44' />
				<SkeletonBlock className='h-36' />
			</div>
		</PageShell>
	)
}

function MessageState({ title, message, onRetry }) {
	return (
		<PageShell>
			<div
				role='alert'
				className='flex flex-col items-center rounded-2xl border border-slate-800/80 bg-slate-900/30 px-6 py-14 text-center'
			>
				<div className='flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300'>
					<Icon
						name='file'
						size={22}
					/>
				</div>

				<h1 className='mt-5 text-xl font-semibold text-white'>
					{title}
				</h1>

				<p className='mt-2 max-w-md text-sm leading-6 text-slate-400'>
					{message}
				</p>

				<div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
					{onRetry && (
						<button
							type='button'
							onClick={onRetry}
							className='cursor-pointer rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
						>
							Try again
						</button>
					)}

					<Link
						href={RESUMES_LIST_PATH}
						className='inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800'
					>
						<Icon
							name='arrow'
							size={16}
						/>
						All resumes
					</Link>
				</div>
			</div>
		</PageShell>
	)
}

/* -------------------------------------------------------------------------- */
/*                                 Main component                             */
/* -------------------------------------------------------------------------- */

export default function ResumeDetails({ resumeId }) {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	const { activeResume, isResumeLoading, resumeError, fetchResume } =
		useResume()

	// the id we have actually started fetching for.
	// context state can still hold the PREVIOUS resume on the first render,
	// so we never trust it until this matches the current resumeId.
	const [requestedId, setRequestedId] = useState(null)

	useEffect(() => {
		// waiting for auth so the first request doesn't go out without a token
		if (isAuthLoading || !isAuthenticated || !resumeId) return

		setRequestedId(resumeId)
		fetchResume(resumeId)
	}, [isAuthLoading, isAuthenticated, resumeId, fetchResume])

	const handleRetry = useCallback(() => {
		if (resumeId) fetchResume(resumeId)
	}, [fetchResume, resumeId])

	/* ------------------------------ guard states ----------------------------- */

	if (!resumeId) {
		return (
			<MessageState
				title='Resume not found'
				message='No resume was specified in the link.'
			/>
		)
	}

	if (isAuthLoading) return <LoadingState />

	if (!isAuthenticated) {
		return (
			<MessageState
				title='Sign in required'
				message='Please sign in to view this resume.'
			/>
		)
	}

	// request has not started yet, or is in flight
	if (requestedId !== resumeId || isResumeLoading) return <LoadingState />

	if (resumeError) {
		const { title, message, canRetry } = getErrorContent(resumeError)

		return (
			<MessageState
				title={title}
				message={message}
				onRetry={canRetry ? handleRetry : undefined}
			/>
		)
	}

	// request finished without error but there is no usable resume
	if (!activeResume) {
		return (
			<MessageState
				title='Resume unavailable'
				message='The resume could not be loaded. Please try again.'
				onRetry={handleRetry}
			/>
		)
	}

	/* ------------------------------ success state ---------------------------- */

	const resume = activeResume

	const pdfUrl = getSafePdfUrl(resume.resumePdf)
	const hasPdf = pdfUrl !== null
	const viewHref = hasPdf ? pdfUrl.toString() : null
	const downloadHref = hasPdf ? getDownloadUrl(pdfUrl) : null
	const pdfFileName = getPdfFileName(resume.resumeFilePath)

	return (
		<PageShell>
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
										Created {formatDate(resume.createdAt)}
									</span>

									<span className='break-all'>
										ID: {resumeId}
									</span>
								</div>
							</div>
						</div>

						<Link
							href={RESUMES_LIST_PATH}
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
										href={viewHref}
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

									{/* target=_blank is a safety net: if the host ignores the
									    attachment hint, the PDF opens in a new tab instead of
									    replacing this page */}
									<a
										href={downloadHref}
										download={pdfFileName}
										target='_blank'
										rel='noopener noreferrer'
										aria-label='Download resume PDF'
										className='inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d19]'
									>
										<Icon
											name='download'
											size={15}
										/>
										Download PDF
									</a>
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
											There is no PDF document attached to
											this resume.
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
		</PageShell>
	)
}