'use client'

// importing dependencies
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import {
	ArrowLeft,
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	ChevronDown,
	ChevronRight,
	Clock3,
	FileText,
	Search,
	Sparkles,
	Target,
	X,
} from 'lucide-react'

// importing custom hooks
import { useInterview } from '@/hooks/useInterview'

// interview preparation page
export default function InterviewPreparationReports() {
	const router = useRouter()

	// interview hook
	const { reports, loading, handleGetReports } = useInterview()

	// local states
	const [searchQuery, setSearchQuery] = useState('')
	const [sortBy, setSortBy] = useState('newest')
	const [scoreFilter, setScoreFilter] = useState('all')

	// fetch all interview reports
	useEffect(() => {
		const fetchReports = async () => {
			try {
				await handleGetReports()
			} catch (error) {
				console.error('Failed to fetch interview reports:', error)
			}
		}

		fetchReports()
	}, [handleGetReports])

	// format report date
	const formatReportDate = (date) => {
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

	// format report time
	const formatReportTime = (date) => {
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

	// get filtered and sorted reports
	const filteredReports = useMemo(() => {
		let result = [...reports]

		// search filter
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim()

			result = result.filter((report) => {
				const searchableText = [
					report.title,
					report.role,
					report.position,
					report.jobTitle,
					report._id,
				]
					.filter(Boolean)
					.join(' ')
					.toLowerCase()

				return searchableText.includes(query)
			})
		}

		// score filter
		if (scoreFilter !== 'all') {
			result = result.filter((report) => {
				const score = Number(report.matchScore ?? 0)

				if (scoreFilter === 'excellent') {
					return score >= 80
				}

				if (scoreFilter === 'good') {
					return score >= 60 && score < 80
				}

				if (scoreFilter === 'needs-work') {
					return score < 60
				}

				return true
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

			if (sortBy === 'highest-score') {
				return Number(b.matchScore ?? 0) - Number(a.matchScore ?? 0)
			}

			if (sortBy === 'lowest-score') {
				return Number(a.matchScore ?? 0) - Number(b.matchScore ?? 0)
			}

			return 0
		})

		return result
	}, [reports, searchQuery, scoreFilter, sortBy])

	// calculate summary statistics
	const reportStats = useMemo(() => {
		if (!reports.length) {
			return {
				total: 0,
				averageScore: 0,
				highestScore: 0,
			}
		}

		const scores = reports.map((report) => Number(report.matchScore ?? 0))

		const totalScore = scores.reduce((sum, score) => sum + score, 0)

		return {
			total: reports.length,
			averageScore: Math.round(totalScore / reports.length),
			highestScore: Math.max(...scores),
		}
	}, [reports])

	// clear filters
	const handleClearFilters = () => {
		setSearchQuery('')
		setScoreFilter('all')
		setSortBy('newest')
	}

	// check whether filters are active
	const hasActiveFilters =
		searchQuery.trim() !== '' ||
		scoreFilter !== 'all' ||
		sortBy !== 'newest'

	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			{/* Background effects */}
			<div className='pointer-events-none fixed inset-0 overflow-hidden'>
				<div className='absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl' />

				<div className='absolute right-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />

				<div className='absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl' />
			</div>

			{/* Main container */}
			<div className='relative mx-auto w-full max-w-375 px-4 py-6 sm:px-6 lg:px-8'>
				{/* Header */}
				<header className='flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between'>
					{/* Left side */}
					<div>
						<button
							type='button'
							onClick={() => router.push('/dashboard')}
							className='mb-4 inline-flex cursor-pointer items-center gap-2 text-sm text-gray-400 transition hover:text-white'
						>
							<ArrowLeft className='h-4 w-4' />
							Back to Dashboard
						</button>

						<div className='flex items-center gap-3'>
							<div className='flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
								<FileText className='h-5 w-5 text-cyan-300' />
							</div>

							<div>
								<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
									Interview Reports
								</h1>

								<p className='mt-1 text-sm text-gray-400'>
									Review and continue your AI-powered
									interview preparation.
								</p>
							</div>
						</div>
					</div>

					{/* Generate button */}
					<button
						type='button'
						onClick={() => router.push('/interview-preparation')}
						className='inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
					>
						<Sparkles className='h-4 w-4' />
						Generate New Guide
					</button>
				</header>

				{/* Statistics */}
				<section className='mt-6 grid gap-3 sm:grid-cols-3'>
					{/* Total reports */}
					<div className='rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Total Reports
								</p>

								<p className='mt-2 text-2xl font-semibold text-white'>
									{reportStats.total}
								</p>
							</div>

							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
								<FileText className='h-5 w-5 text-cyan-300' />
							</div>
						</div>
					</div>

					{/* Average score */}
					<div className='rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Average Match
								</p>

								<p className='mt-2 text-2xl font-semibold text-white'>
									{reportStats.averageScore}%
								</p>
							</div>

							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-400/10'>
								<Target className='h-5 w-5 text-blue-300' />
							</div>
						</div>
					</div>

					{/* Highest score */}
					<div className='rounded-lg border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Highest Match
								</p>

								<p className='mt-2 text-2xl font-semibold text-white'>
									{reportStats.highestScore}%
								</p>
							</div>

							<div className='flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10'>
								<Sparkles className='h-5 w-5 text-cyan-300' />
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
								placeholder='Search interview reports...'
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

						{/* Score filter */}
						<div className='relative'>
							<select
								value={scoreFilter}
								onChange={(event) =>
									setScoreFilter(event.target.value)
								}
								className='h-10 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-black/20 px-3 pr-9 text-sm text-gray-300 outline-none transition focus:border-cyan-400/40 sm:w-45'
							>
								<option value='all'>All scores</option>
								<option value='excellent'>80%+ Match</option>
								<option value='good'>60–79% Match</option>
								<option value='needs-work'>Below 60%</option>
							</select>

							<ChevronDown className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500' />
						</div>

						{/* Sort */}
						<div className='relative'>
							<select
								value={sortBy}
								onChange={(event) =>
									setSortBy(event.target.value)
								}
								className='h-10 w-full cursor-pointer appearance-none rounded-md border border-white/10 bg-black/20 px-3 pr-9 text-sm text-gray-300 outline-none transition focus:border-cyan-400/40 sm:w-45'
							>
								<option value='newest'>Newest first</option>
								<option value='oldest'>Oldest first</option>
								<option value='highest-score'>
									Highest match
								</option>
								<option value='lowest-score'>
									Lowest match
								</option>
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
							Showing {filteredReports.length} of {reports.length}{' '}
							reports
						</span>

						{hasActiveFilters && (
							<span className='text-cyan-400'>
								Filters active
							</span>
						)}
					</div>
				</section>

				{/* Reports */}
				<section className='mt-6'>
					{/* Section heading */}
					<div className='mb-4 flex items-center justify-between'>
						<div>
							<h2 className='text-lg font-semibold text-white'>
								All Interview Reports
							</h2>

							<p className='mt-1 text-sm text-gray-500'>
								Your generated interview preparation guides.
							</p>
						</div>
					</div>

					{/* Loading */}
					{loading && (
						<div className='rounded-lg border border-white/10 bg-white/2.5 p-10 text-center'>
							<div className='mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-cyan-400' />

							<p className='mt-4 text-sm text-gray-400'>
								Loading your interview reports...
							</p>
						</div>
					)}

					{/* Empty state */}
					{!loading && reports.length === 0 && (
						<div className='rounded-lg border border-white/10 bg-white/2.5 px-6 py-14 text-center backdrop-blur-xl'>
							<div className='mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10'>
								<Target className='h-6 w-6 text-cyan-300' />
							</div>

							<h3 className='mt-5 text-lg font-semibold text-white'>
								No interview reports yet
							</h3>

							<p className='mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500'>
								Generate your first AI-powered interview
								preparation guide to analyze your resume,
								identify skill gaps, and prepare for technical
								and behavioral questions.
							</p>

							<button
								type='button'
								onClick={() =>
									router.push(
										'/interview-preparation/generate',
									)
								}
								className='mt-6 inline-flex cursor-pointer items-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
							>
								<Sparkles className='h-4 w-4' />
								Create Interview Guide
								<ArrowRight className='h-4 w-4' />
							</button>
						</div>
					)}

					{/* No search results */}
					{!loading &&
						reports.length > 0 &&
						filteredReports.length === 0 && (
							<div className='rounded-lg border border-white/10 bg-white/2.5 px-6 py-12 text-center'>
								<div className='mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white/5'>
									<Search className='h-5 w-5 text-gray-500' />
								</div>

								<h3 className='mt-4 text-base font-semibold text-white'>
									No reports found
								</h3>

								<p className='mt-1 text-sm text-gray-500'>
									Try changing your search or filters.
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

					{/* Report cards */}
					{!loading && filteredReports.length > 0 && (
						<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-3'>
							{filteredReports.map((report) => {
								const technicalCount =
									report.technicalQuestions?.length ?? 0

								const behavioralCount =
									report.behavioralQuestions?.length ?? 0

								const skillGapCount =
									report.skillGaps?.length ?? 0

								const score = Number(report.matchScore ?? 0)

								return (
									<button
										type='button'
										key={report._id}
										onClick={() =>
											router.push(
												`/interview-preparation-reports/${report._id}`,
											)
										}
										className='group relative flex min-h-65 w-full cursor-pointer flex-col rounded-lg border border-white/10 bg-white/2.5 p-5 text-left backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/20 hover:bg-white/4'
									>
										{/* Card top */}
										<div className='flex items-start justify-between gap-4'>
											<div className='flex min-w-0 items-center gap-3'>
												<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10'>
													<BriefcaseBusiness className='h-4 w-4 text-cyan-300' />
												</div>

												<div className='min-w-0'>
													<h3 className='truncate text-sm font-semibold text-white'>
														{report.jobTitle ||
															'Interview Preparation Report'}
													</h3>

													<p className='mt-1 truncate text-xs text-gray-500'>
														Interview preparation
														guide
													</p>
												</div>
											</div>

											{/* Score */}
											<div className='shrink-0 text-right'>
												<p className='text-2xl font-semibold text-cyan-300'>
													{score}%
												</p>

												<p className='text-[10px] uppercase tracking-wider text-gray-600'>
													Match
												</p>
											</div>
										</div>

										{/* Divider */}
										<div className='my-5 border-t border-white/5' />

										{/* Stats */}
										<div className='grid grid-cols-3 gap-2'>
											<div className='rounded-md border border-white/5 bg-black/20 p-3'>
												<p className='text-lg font-semibold text-gray-200'>
													{technicalCount}
												</p>

												<p className='mt-1 text-[10px] uppercase tracking-wide text-gray-600'>
													Technical
												</p>
											</div>

											<div className='rounded-md border border-white/5 bg-black/20 p-3'>
												<p className='text-lg font-semibold text-gray-200'>
													{behavioralCount}
												</p>

												<p className='mt-1 text-[10px] uppercase tracking-wide text-gray-600'>
													Behavioral
												</p>
											</div>

											<div className='rounded-md border border-white/5 bg-black/20 p-3'>
												<p className='text-lg font-semibold text-gray-200'>
													{skillGapCount}
												</p>

												<p className='mt-1 text-[10px] uppercase tracking-wide text-gray-600'>
													Skill Gaps
												</p>
											</div>
										</div>

										{/* Bottom */}
										<div className='mt-auto flex items-center justify-between pt-5'>
											<div className='flex items-center gap-2 text-xs text-gray-500'>
												<CalendarDays className='h-3.5 w-3.5' />

												<span>
													{formatReportDate(
														report.updatedAt,
													)}
												</span>

												{formatReportTime(
													report.updatedAt,
												) && (
													<>
														<span className='text-gray-700'>
															•
														</span>

														<Clock3 className='h-3.5 w-3.5' />

														<span>
															{formatReportTime(
																report.updatedAt,
															)}
														</span>
													</>
												)}
											</div>

											<div className='flex items-center gap-1 text-xs font-medium text-gray-500 transition group-hover:text-cyan-300'>
												View report
												<ChevronRight className='h-3.5 w-3.5 transition group-hover:translate-x-0.5' />
											</div>
										</div>
									</button>
								)
							})}
						</div>
					)}
				</section>

				{/* Bottom CTA */}
				{!loading && reports.length > 0 && (
					<section className='mt-8 overflow-hidden rounded-lg border border-cyan-400/10 bg-linear-to-r from-cyan-400/6 to-blue-500/4 p-6 sm:p-7'>
						<div className='flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between'>
							<div className='max-w-xl'>
								<div className='flex items-center gap-2'>
									<Sparkles className='h-4 w-4 text-cyan-300' />

									<span className='text-xs font-semibold uppercase tracking-wider text-cyan-300'>
										Keep improving
									</span>
								</div>

								<h2 className='mt-2 text-lg font-semibold text-white'>
									Prepare for your next interview
								</h2>

								<p className='mt-1 text-sm leading-6 text-gray-500'>
									Generate another personalized guide and
									continue improving your interview readiness.
								</p>
							</div>

							<button
								type='button'
								onClick={() =>
									router.push('/interview-preparation')
								}
								className='inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
							>
								Generate New Guide
								<ArrowRight className='h-4 w-4' />
							</button>
						</div>
					</section>
				)}
			</div>
		</main>
	)
}