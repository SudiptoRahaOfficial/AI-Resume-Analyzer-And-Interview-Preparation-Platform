'use client'

// importing dependencies
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
	ArrowDownToLine,
	ArrowLeft,
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	ChevronDown,
	ChevronRight,
	FileCheck2,
	FileText,
	Search,
	Sparkles,
	X,
} from 'lucide-react'

// importing custom hooks
import { useResume } from '@/hooks/useResume'

// generated resumes page
export default function ResumesPage() {
	const router = useRouter()

	// resume hook
	const { resumes, loading, handleGetResumes } = useResume()

	// local states
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('newest')

	// fetch all resumes
	useEffect(() => {
		const fetchResumes = async () => {
			try {
				await handleGetResumes()
			} catch (error) {
				console.error('Failed to fetch resumes:', error)
			}
		}

		fetchResumes()
	}, [handleGetResumes])

	// format resume date
	const formatResumeDate = (date) => {
		if (!date) {
			return 'Unknown date'
		}

		const value =
			typeof date === 'object' && date?.$date ? date.$date : date

		const parsedDate = new Date(value)

		if (Number.isNaN(parsedDate.getTime())) {
			return 'Unknown date'
		}

		return parsedDate.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		})
	}

	// format resume time
	const formatResumeTime = (date) => {
		if (!date) {
			return ''
		}

		const value =
			typeof date === 'object' && date?.$date ? date.$date : date

		const parsedDate = new Date(value)

		if (Number.isNaN(parsedDate.getTime())) {
			return ''
		}

		return parsedDate.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit',
		})
	}

	// filter and sort resumes
	const filteredResumes = useMemo(() => {
		let result = [...resumes]

		// search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim()

			result = result.filter((resume) => {
				const searchableText = [resume.jobTitle, resume._id]
					.filter(Boolean)
					.join(' ')
					.toLowerCase()

				return searchableText.includes(query)
			})
		}

		// sorting
		result.sort((a, b) => {
			if (sortBy === 'newest') {
				return (
					new Date(b.createdAt).getTime() -
					new Date(a.createdAt).getTime()
				)
			}

			if (sortBy === 'oldest') {
				return (
					new Date(a.createdAt).getTime() -
					new Date(b.createdAt).getTime()
				)
			}

			if (sortBy === 'title-az') {
				return (a.jobTitle || '').localeCompare(b.jobTitle || '')
			}

			if (sortBy === 'title-za') {
				return (b.jobTitle || '').localeCompare(a.jobTitle || '')
			}

			return 0
		})

		return result
	}, [resumes, searchQuery, sortBy])

	// resume statistics
	const resumeStats = useMemo(() => {
		if (!resumes.length) {
			return {
				total: 0,
				latestDate: null,
			}
		}

		const sortedResumes = [...resumes].sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		)

		return {
			total: resumes.length,
			latestDate: sortedResumes[0]?.createdAt ?? null,
		}
	}, [resumes])

	// clear filters
	const handleClearFilters = () => {
		setSearchQuery('')
		setSortBy('newest')
	}

	// check whether filters are active
	const hasActiveFilters = searchQuery.trim() !== '' || sortBy !== 'newest'

	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			{/* Background effects */}
			<div className='pointer-events-none fixed inset-0 overflow-hidden'>
				<div className='absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl' />

				<div className='absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />

				<div className='absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl' />
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

			{/* Main container */}
			<div className='relative mx-auto w-full max-w-375 px-4 py-6 sm:px-6 lg:px-8'>
				{/* Page heading */}
				<section className='flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between'>
					<div>
						<div className='flex items-center gap-3'>
							<div className='flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
								<FileText className='h-5 w-5 text-cyan-300' />
							</div>

							<div>
								<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
									Generated Resumes
								</h1>

								<p className='mt-1 text-sm text-gray-400'>
									Manage and access your AI-generated resumes.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Statistics */}
				<section className='mt-6 grid gap-3 sm:grid-cols-2'>
					{/* Total resumes */}
					<div className='rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Total Resumes
								</p>

								<p className='mt-2 text-2xl font-semibold text-white'>
									{resumeStats.total}
								</p>
							</div>

							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
								<FileText className='h-5 w-5 text-cyan-300' />
							</div>
						</div>
					</div>

					{/* Latest generated */}
					<div className='rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Latest Generated
								</p>

								<p className='mt-2 text-base font-semibold text-white'>
									{resumeStats.latestDate
										? formatResumeDate(
												resumeStats.latestDate,
											)
										: '—'}
								</p>
							</div>

							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10'>
								<CalendarDays className='h-5 w-5 text-blue-300' />
							</div>
						</div>
					</div>
				</section>

				{/* Filters */}
				<section className='mt-6 rounded-lg border border-white/10 bg-white/2.5 p-4 backdrop-blur-xl sm:p-5'>
					<div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
						{/* Search */}
						<div className='relative min-w-0 flex-1'>
							<Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />

							<input
								type='text'
								value={searchQuery}
								onChange={(event) =>
									setSearchQuery(event.target.value)
								}
								placeholder='Search resumes by target role...'
								className='h-10 w-full rounded-md border border-white/10 bg-black/20 pl-9 pr-9 text-sm text-white outline-none placeholder:text-gray-600 transition focus:border-cyan-400/40 focus:bg-white/[0.035]'
							/>

							{searchQuery && (
								<button
									type='button'
									onClick={() => setSearchQuery('')}
									className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 transition hover:text-white'
								>
									<X className='h-4 w-4' />
								</button>
							)}
						</div>

						{/* Sort */}
						<div className='relative'>
							<select
								value={sortBy}
								onChange={(event) =>
									setSortBy(event.target.value)
								}
								className='h-10 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-black/20 px-3 pr-9 text-sm text-gray-300 outline-none transition focus:border-cyan-400/40 sm:w-48'
							>
								<option value='newest'>Newest first</option>

								<option value='oldest'>Oldest first</option>

								<option value='title-az'>Role A–Z</option>

								<option value='title-za'>Role Z–A</option>
							</select>

							<ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
						</div>

						{/* Clear filters */}
						{hasActiveFilters && (
							<button
								type='button'
								onClick={handleClearFilters}
								className='h-10 cursor-pointer rounded-md border border-white/10 px-4 text-sm text-gray-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white'
							>
								Clear
							</button>
						)}
					</div>

					<div className='mt-3 flex items-center justify-between text-xs text-gray-500'>
						<span>
							Showing {filteredResumes.length} of {resumes.length}{' '}
							resumes
						</span>

						{hasActiveFilters && (
							<span className='text-cyan-400'>
								Filters active
							</span>
						)}
					</div>
				</section>

				{/* Resumes */}
				<section className='mt-6'>
					{/* Section heading */}
					<div className='mb-4 flex items-center justify-between'>
						<div>
							<h2 className='text-lg font-semibold text-white'>
								All Generated Resumes
							</h2>

							<p className='mt-1 text-sm text-gray-500'>
								Your AI-generated resumes organized by target
								role.
							</p>
						</div>
					</div>

					{/* Loading */}
					{loading && (
						<div className='rounded-lg border border-white/10 bg-white/2.5 p-10 text-center'>
							<div className='mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400' />

							<p className='mt-4 text-sm text-gray-400'>
								Loading your generated resumes...
							</p>
						</div>
					)}

					{/* Empty state */}
					{!loading && resumes.length === 0 && (
						<div className='rounded-lg border border-white/10 bg-white/2.5 px-6 py-14 text-center backdrop-blur-xl'>
							<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10'>
								<FileText className='h-6 w-6 text-cyan-300' />
							</div>

							<h3 className='mt-5 text-lg font-semibold text-white'>
								No resumes yet
							</h3>

							<p className='mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500'>
								Create your first AI-powered resume tailored to
								a specific target role and start building your
								application portfolio.
							</p>

							<button
								type='button'
								onClick={() => router.push('/resume-generator')}
								className='mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
							>
								<Sparkles className='h-4 w-4' />
								Create Resume
								<ArrowRight className='h-4 w-4' />
							</button>
						</div>
					)}

					{/* No search results */}
					{!loading &&
						resumes.length > 0 &&
						filteredResumes.length === 0 && (
							<div className='rounded-lg border border-white/10 bg-white/2.5 px-6 py-12 text-center'>
								<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/5'>
									<Search className='h-5 w-5 text-gray-500' />
								</div>

								<h3 className='mt-4 text-base font-semibold text-white'>
									No resumes found
								</h3>

								<p className='mt-1 text-sm text-gray-500'>
									Try changing your search or sorting options.
								</p>

								<button
									type='button'
									onClick={handleClearFilters}
									className='mt-4 cursor-pointer text-sm font-medium text-cyan-300 transition hover:text-cyan-200'
								>
									Clear all filters
								</button>
							</div>
						)}

					{/* Resume cards */}
					{!loading && filteredResumes.length > 0 && (
						<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
							{filteredResumes.map((resume) => {
								const createdDate = formatResumeDate(
									resume.createdAt,
								)

								const createdTime = formatResumeTime(
									resume.createdAt,
								)

								return (
									<div
										key={resume._id}
										className='group relative flex min-h-65 w-full flex-col rounded-lg border border-white/10 bg-white/2.5 p-5 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/4'
									>
										{/* Card top */}
										<div className='flex items-start justify-between gap-4'>
											<div className='flex min-w-0 items-center gap-3'>
												<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
													<BriefcaseBusiness className='h-4 w-4 text-cyan-300' />
												</div>

												<div className='min-w-0'>
													<h3 className='truncate text-sm font-semibold text-white'>
														{resume.jobTitle ||
															'Generated Resume'}
													</h3>

													<p className='mt-1 truncate text-xs text-gray-500'>
														AI-generated resume
													</p>
												</div>
											</div>

											{/* File status */}
											<div className='flex shrink-0 items-center gap-1.5 rounded-md border border-emerald-400/10 bg-emerald-400/5 px-2 py-1'>
												<FileCheck2 className='h-3 w-3 text-emerald-300' />

												<span className='text-[10px] font-medium text-emerald-300'>
													PDF
												</span>
											</div>
										</div>

										{/* Divider */}
										<div className='my-5 border-t border-white/5' />

										{/* Resume information */}
										<div className='grid grid-cols-2 gap-2'>
											<div className='rounded-md border border-white/5 bg-black/20 p-3'>
												<p className='text-[10px] uppercase tracking-wide text-gray-600'>
													Target role
												</p>

												<p className='mt-1.5 truncate text-xs font-medium text-gray-300'>
													{resume.jobTitle ||
														'Not specified'}
												</p>
											</div>

											<div className='rounded-md border border-white/5 bg-black/20 p-3'>
												<p className='text-[10px] uppercase tracking-wide text-gray-600'>
													Status
												</p>

												<p className='mt-1.5 text-xs font-medium text-emerald-300'>
													Ready
												</p>
											</div>
										</div>

										{/* Bottom */}
										<div className='mt-auto flex items-center justify-between gap-3 pt-5'>
											<div className='flex min-w-0 items-center gap-2 text-xs text-gray-500'>
												<CalendarDays className='h-3.5 w-3.5 shrink-0' />

												<span className='truncate'>
													{createdDate}
												</span>

												{createdTime && (
													<>
														<span className='text-gray-700'>
															•
														</span>

														<span>
															{createdTime}
														</span>
													</>
												)}
											</div>

											<div className='flex shrink-0 items-center gap-2'>
												<a
													href={resume.resumePdf}
													download
													onClick={(event) =>
														event.stopPropagation()
													}
													className='flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/10 text-gray-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/5 hover:text-cyan-300'
													title='Download resume'
												>
													<ArrowDownToLine className='h-3.5 w-3.5' />
												</a>

												<button
													type='button'
													onClick={() =>
														router.push(
															`/resumes/${resume._id}`,
														)
													}
													className='group/view flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 transition hover:text-cyan-300'
												>
													View
													<ChevronRight className='h-3.5 w-3.5 transition group-hover/view:translate-x-0.5' />
												</button>
											</div>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</section>

				{/* Bottom CTA */}
				{!loading && resumes.length > 0 && (
					<section className='mt-8 overflow-hidden rounded-lg border border-cyan-400/10 bg-linear-to-r from-cyan-400/6 to-blue-500/4 p-6 sm:p-7'>
						<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
							<div className='max-w-xl'>
								<div className='flex items-center gap-2'>
									<Sparkles className='h-4 w-4 text-cyan-300' />

									<span className='text-xs font-semibold uppercase tracking-wider text-cyan-300'>
										Build your next version
									</span>
								</div>

								<h2 className='mt-2 text-lg font-semibold text-white'>
									Create a resume for another role
								</h2>

								<p className='mt-1 text-sm leading-6 text-gray-500'>
									Generate another tailored resume optimized
									for a different job opportunity.
								</p>
							</div>

							<button
								type='button'
								onClick={() => router.push('/resume-generator')}
								className='inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
							>
								Create New Resume
								<ArrowRight className='h-4 w-4' />
							</button>
						</div>
					</section>
				)}
			</div>
		</main>
	)
}