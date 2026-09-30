// making client component
'use client'

// importing dependencies
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	Clock3,
	Download,
	FileText,
	LayoutDashboard,
	Lightbulb,
	MessageSquareText,
	Plus,
	Settings,
	Sparkles,
	Target,
	TrendingUp,
	UserRound,
	LogOut,
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

// dashboard page
export default function Dashboard() {
	// router for page navigation
	const router = useRouter()

	// dropdown state & ref
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
	const profileMenuRef = useRef(null)

	// effect for dropdown functionalities
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target)
			) {
				setIsProfileMenuOpen(false)
			}
		}

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				setIsProfileMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	// extracting from custom useAuth hook
	const { handleSignout } = useAuth()

	// function for signout
	const signout = async () => {
		try {
			await handleSignout()
			router.replace('/auth/signin')
		} catch (err) {
			console.log(err.message)
		}
	}

	// temporary dashboard data
	// replace these values with API data when the dashboard API is implemented
	const dashboardStats = {
		interviewGuides: 4,
		averageMatchScore: 78,
		skillGaps: 12,
		optimizedResumes: 3,
	}

	// temporary recent interview guides
	const recentInterviewGuides = [
		{
			id: 1,
			role: 'Backend Engineer',
			matchScore: 82,
			technicalQuestions: 25,
			behavioralQuestions: 10,
			skillGaps: 6,
			createdAt: '2 days ago',
		},
		{
			id: 2,
			role: 'Node.js Developer',
			matchScore: 74,
			technicalQuestions: 20,
			behavioralQuestions: 8,
			skillGaps: 4,
			createdAt: '5 days ago',
		},
		{
			id: 3,
			role: 'Full Stack Developer',
			matchScore: 68,
			technicalQuestions: 24,
			behavioralQuestions: 10,
			skillGaps: 7,
			createdAt: '1 week ago',
		},
	]

	// temporary recent resumes
	const recentResumes = [
		{
			id: 1,
			name: 'Backend Developer Resume',
			targetRole: 'Node.js • Express.js • MongoDB',
			status: 'ATS Optimized',
			createdAt: 'Yesterday',
		},
		{
			id: 2,
			name: 'Software Engineer Resume',
			targetRole: 'JavaScript • Node.js • REST APIs',
			status: 'ATS Optimized',
			createdAt: '4 days ago',
		},
		{
			id: 3,
			name: 'Full Stack Developer Resume',
			targetRole: 'React • Node.js • MongoDB',
			status: 'ATS Optimized',
			createdAt: '1 week ago',
		},
	]

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />

				<div className='absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />

				<div className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl' />
			</div>

			{/* Header */}
			<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
				<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
					{/* Brand */}
					<button
						type='button'
						onClick={() => router.push('/')}
						className='flex cursor-pointer items-center gap-2.5 transition ml-14'
					>
						<span className='text-lg font-semibold tracking-tight text-white'>
							ResumeAI
						</span>
					</button>

					{/* Header actions */}
					<div className='flex items-center gap-2'>
						{/* Settings */}
						<button
							type='button'
							onClick={() => router.push('/settings')}
							aria-label='Open settings'
							className='flex h-9 w-9 items-center justify-center rounded-sm text-gray-400 transition hover:bg-white/5 hover:text-white cursor-pointer'
						>
							<Settings className='h-4 w-4' />
						</button>
						{/* Divider */}
						<div className='mx-1 hidden h-6 w-px bg-white/10 sm:block' />
						{/* Profile menu */}
						<div
							ref={profileMenuRef}
							className='relative'
						>
							{/* Profile trigger */}
							<button
								type='button'
								onClick={() =>
									setIsProfileMenuOpen((prev) => !prev)
								}
								aria-label='Open account menu'
								aria-haspopup='menu'
								aria-expanded={isProfileMenuOpen}
								className='flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 transition hover:bg-white/5'
							>
								{/* Avatar */}
								<div className='flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
									SR
								</div>

								{/* User information */}
								<div className='hidden text-left md:block'>
									<p className='text-xs font-medium text-gray-200'>
										Sudipto Raha
									</p>

									<p className='text-[11px] text-gray-500'>
										Backend Developer
									</p>
								</div>

								{/* Chevron */}
								<ChevronRight
									className={`hidden h-3.5 w-3.5 text-gray-600 transition-transform duration-200 md:block ${
										isProfileMenuOpen
											? '-rotate-90'
											: 'rotate-90'
									}`}
								/>
							</button>

							{/* Dropdown */}
							<div
								className={`absolute right-0 top-[calc(100%+10px)] z-50 w-64 origin-top-right transition-all duration-200 ease-out ${
									isProfileMenuOpen
										? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
										: 'pointer-events-none -translate-y-1 scale-95 opacity-0'
								}`}
								role='menu'
								aria-hidden={!isProfileMenuOpen}
							>
								<div className='overflow-hidden rounded-lg border border-white/10 bg-[#0b1120]/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-2xl'>
									{/* Account header */}
									<div className='px-3 py-3'>
										<div className='flex items-center gap-3'>
											<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
												SR
											</div>

											<div className='min-w-0'>
												<p className='truncate text-sm font-medium text-white'>
													Sudipto Raha
												</p>

												<p className='truncate text-xs text-gray-500'>
													sudipto@example.com
												</p>
											</div>
										</div>
									</div>

									<div className='my-1 h-px bg-white/10' />

									{/* Profile */}
									<button
										type='button'
										role='menuitem'
										onClick={() => {
											setIsProfileMenuOpen(false)
											router.push('/profile')
										}}
										className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
									>
										<UserRound className='h-4 w-4 text-gray-500 transition group-hover:text-gray-300' />

										<span className='flex-1'>Profile</span>

										<ChevronRight className='h-3.5 w-3.5 text-gray-600 transition-transform group-hover:translate-x-0.5' />
									</button>

									{/* Settings */}
									<button
										type='button'
										role='menuitem'
										onClick={() => {
											setIsProfileMenuOpen(false)
											router.push('/settings')
										}}
										className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
									>
										<Settings className='h-4 w-4 text-gray-500 transition group-hover:text-gray-300' />

										<span className='flex-1'>Settings</span>

										<ChevronRight className='h-3.5 w-3.5 text-gray-600 transition-transform group-hover:translate-x-0.5' />
									</button>

									{/* Resume Generator */}
									<button
										type='button'
										role='menuitem'
										onClick={() => {
											setIsProfileMenuOpen(false)
											router.push('/resume-generator')
										}}
										className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
									>
										<FileText className='h-4 w-4 text-gray-500 transition group-hover:text-gray-300' />

										<span className='flex-1'>
											Resume Generator
										</span>

										<ChevronRight className='h-3.5 w-3.5 text-gray-600 transition-transform group-hover:translate-x-0.5' />
									</button>

									{/* Interview Preparation */}
									<button
										type='button'
										role='menuitem'
										onClick={() => {
											setIsProfileMenuOpen(false)
											router.push(
												'/interview-preparation',
											)
										}}
										className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
									>
										<Sparkles className='h-4 w-4 text-gray-500 transition group-hover:text-gray-300' />

										<span className='flex-1'>
											Interview Preparation
										</span>

										<ChevronRight className='h-3.5 w-3.5 text-gray-600 transition-transform group-hover:translate-x-0.5' />
									</button>

									<div className='my-1 h-px bg-white/10' />

									{/* Sign out */}
									<button
										type='button'
										role='menuitem'
										onClick={() => {
											setIsProfileMenuOpen(false)
											signout()
										}}
										className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300'
									>
										<LogOut className='h-4 w-4 text-red-400/70 transition group-hover:text-red-300' />

										<span className='flex-1'>Sign Out</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>

			{/* Main content */}
			<div className='relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12'>
				{/* Welcome + Profile Summary */}
				<section className='mb-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]'>
					{/* Welcome */}
					<div className='relative overflow-hidden rounded-lg border border-white/10 bg-white/4 p-6 backdrop-blur-xl sm:p-8'>
						{/* Decorative glow */}
						<div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl' />

						<div className='relative flex h-full flex-col justify-between'>
							{/* Content */}
							<div>
								{/* Section label */}
								<div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400'>
									<LayoutDashboard className='h-4 w-4' />
									Dashboard
								</div>

								{/* Heading */}
								<h1 className='mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-tight'>
									Welcome back, Sudipto
								</h1>

								{/* Description */}
								<p className='mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base'>
									Build a stronger resume and prepare for your
									next interview with AI-powered guidance
									tailored to your target role.
								</p>
							</div>

							{/* Quick workspace hint */}
							<div className='mt-8 flex flex-wrap items-center gap-3'>
								<div className='flex items-center gap-2 rounded-sm border border-white/10 bg-white/3 px-3 py-2'>
									<Sparkles className='h-4 w-4 text-cyan-400' />

									<span className='text-xs font-medium text-gray-400'>
										AI-powered workspace
									</span>
								</div>

								<div className='flex items-center gap-2 rounded-sm border border-white/10 bg-white/3 px-3 py-2'>
									<Target className='h-4 w-4 text-gray-500' />

									<span className='text-xs font-medium text-gray-400'>
										Career focused
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Profile Summary */}
					<div className='rounded-lg border border-white/10 bg-white/4 p-6 backdrop-blur-xl sm:p-7'>
						<div className='flex h-full flex-col'>
							{/* Profile identity */}
							<div className='flex items-start justify-between gap-4'>
								<div className='flex items-center gap-4 m-auto'>
									{/* Avatar */}
									<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm font-bold text-cyan-300 ring-1 ring-cyan-400/20'>
										SR
									</div>

									{/* Name + role */}
									<div className='min-w-0'>
										<div className='flex items-center gap-2'>
											<h3 className='truncate font-semibold text-white'>
												Sudipto Raha
											</h3>

											<CheckCircle2 className='h-4 w-4 shrink-0 text-emerald-400' />
										</div>

										<p className='mt-1 text-sm text-gray-500'>
											Backend Developer
										</p>
									</div>
								</div>
							</div>

							{/* Divider */}
							<div className='my-6 h-px bg-white/10' />

							{/* Account details */}
							<div className='space-y-4'>
								{/* Account status */}
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-500'>
										Account status
									</span>

									<div className='flex items-center gap-1.5 text-sm font-medium text-emerald-300'>
										<span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
										Verified
									</div>
								</div>

								{/* Plan */}
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-500'>
										Current plan
									</span>

									<span className='text-sm font-medium text-gray-200'>
										Free
									</span>
								</div>

								{/* Member since */}
								<div className='flex items-center justify-between'>
									<span className='text-sm text-gray-500'>
										Member since
									</span>

									<span className='text-sm font-medium text-gray-200'>
										2026
									</span>
								</div>
							</div>

							{/* Bottom action */}
							<div className='mt-auto pt-6'>
								<button
									type='button'
									onClick={() => router.push('/profile')}
									className='flex w-full items-center justify-between rounded-sm border border-white/10 bg-white/2 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-white/15 hover:bg-white/5 hover:text-white cursor-pointer'
								>
									{/* Profile icon */}
									<div className='hidden h-7 w-7 items-center justify-center rounded-sm bg-white/3 text-gray-500 sm:flex'>
										<UserRound className='h-4 w-4' />
									</div>
									<span>View profile</span>

									<ChevronRight className='h-4 w-4 text-gray-500 transition group-hover:translate-x-0.5' />
								</button>
							</div>
						</div>
					</div>
				</section>

				{/* Primary AI workspace */}
				<section className='mb-12'>
					<div className='mb-5 flex items-end justify-between gap-4'>
						<div>
							<h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
								Your AI Workspace
							</h2>

							<p className='mt-1 text-sm text-gray-400'>
								Choose what you want to work on today.
							</p>
						</div>
					</div>

					<div className='grid gap-6 lg:grid-cols-2'>
						{/* Interview Preparation */}
						<div className='group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-cyan-400/30 hover:bg-white/[0.07] sm:p-8'>
							<div className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-400/10 blur-3xl transition duration-300 group-hover:bg-cyan-400/15' />

							<div className='relative'>
								<div className='flex items-start justify-between gap-4'>
									<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-400/10 ring-1 ring-cyan-400/10'>
										<Target className='h-6 w-6 text-cyan-300' />
									</div>

									<span className='rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1 text-xs font-medium text-cyan-300'>
										AI Guided
									</span>
								</div>

								<h3 className='mt-6 text-xl font-semibold'>
									Interview Preparation
								</h3>

								<p className='mt-2 max-w-xl text-sm leading-6 text-gray-400'>
									Analyze your current capabilities against a
									target job and receive a personalized
									interview preparation guide.
								</p>

								<div className='mt-6 grid gap-3 sm:grid-cols-2'>
									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<Target className='h-4 w-4 shrink-0 text-cyan-300' />
										<span className='text-sm text-gray-300'>
											Job Match Score
										</span>
									</div>

									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<MessageSquareText className='h-4 w-4 shrink-0 text-cyan-300' />
										<span className='text-sm text-gray-300'>
											Interview Questions
										</span>
									</div>

									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<Lightbulb className='h-4 w-4 shrink-0 text-cyan-300' />
										<span className='text-sm text-gray-300'>
											Skill Gap Analysis
										</span>
									</div>

									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<CalendarDays className='h-4 w-4 shrink-0 text-cyan-300' />
										<span className='text-sm text-gray-300'>
											Daily Preparation Plan
										</span>
									</div>
								</div>

								<button
									type='button'
									onClick={() =>
										router.push('/interview-preparation')
									}
									className='mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
								>
									Start Interview Preparation
									<ArrowRight className='h-4 w-4' />
								</button>
							</div>
						</div>

						{/* ATS Resume */}
						<div className='group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:border-blue-400/30 hover:bg-white/[0.07] sm:p-8'>
							<div className='pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl transition duration-300 group-hover:bg-blue-500/15' />

							<div className='relative'>
								<div className='flex items-start justify-between gap-4'>
									<div className='flex h-12 w-12 items-center justify-center rounded-lg bg-blue-400/10 ring-1 ring-blue-400/10'>
										<FileText className='h-6 w-6 text-blue-300' />
									</div>

									<span className='rounded-full border border-blue-400/20 bg-blue-400/5 px-3 py-1 text-xs font-medium text-blue-300'>
										AI Powered
									</span>
								</div>

								<h3 className='mt-6 text-xl font-semibold'>
									ATS Resume
								</h3>

								<p className='mt-2 max-w-xl text-sm leading-6 text-gray-400'>
									Generate or optimize an ATS-friendly resume
									using your existing resume,
									self-description, or both.
								</p>

								<div className='mt-6 grid gap-3 sm:grid-cols-2'>
									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<FileText className='h-4 w-4 shrink-0 text-blue-300' />
										<span className='text-sm text-gray-300'>
											Resume Analysis
										</span>
									</div>

									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<Sparkles className='h-4 w-4 shrink-0 text-blue-300' />
										<span className='text-sm text-gray-300'>
											AI Optimization
										</span>
									</div>

									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<CheckCircle2 className='h-4 w-4 shrink-0 text-blue-300' />
										<span className='text-sm text-gray-300'>
											ATS-Friendly Format
										</span>
									</div>

									<div className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'>
										<Download className='h-4 w-4 shrink-0 text-blue-300' />
										<span className='text-sm text-gray-300'>
											PDF Generation
										</span>
									</div>
								</div>

								<button
									type='button'
									onClick={() =>
										router.push('/resume-generator')
									}
									className='mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10'
								>
									Create ATS Resume
									<ArrowRight className='h-4 w-4' />
								</button>
							</div>
						</div>
					</div>
				</section>
				{/* Activity */}
				<section className='mb-12'>
					<div className='mb-5'>
						<h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
							Snapshot of Your Recent Activity
						</h2>

						<p className='mt-1 text-sm text-gray-400'>
							Stay informed about your latest interview guides,
							resume improvements, and overview throughout your
							ResumeAI journey.
						</p>
					</div>

					<div className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
						{/* Interview guides */}
						<div className='rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
							<div className='flex items-center justify-between'>
								<div className='flex h-10 w-10 items-center justify-center rounded-md bg-cyan-400/10'>
									<Target className='h-5 w-5 text-cyan-300' />
								</div>

								<span className='text-xs text-gray-500'>
									All time
								</span>
							</div>

							<p className='mt-5 text-sm text-gray-400'>
								Interview Guides
							</p>

							<p className='mt-1 text-3xl font-bold'>
								{dashboardStats.interviewGuides}
							</p>
						</div>

						{/* Match score */}
						<div className='rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
							<div className='flex items-center justify-between'>
								<div className='flex h-10 w-10 items-center justify-center rounded-md bg-blue-400/10'>
									<TrendingUp className='h-5 w-5 text-blue-300' />
								</div>

								<span className='text-xs text-gray-500'>
									Average
								</span>
							</div>

							<p className='mt-5 text-sm text-gray-400'>
								Match Score
							</p>

							<p className='mt-1 text-3xl font-bold'>
								{dashboardStats.averageMatchScore}%
							</p>
						</div>

						{/* Skill gaps */}
						<div className='rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
							<div className='flex items-center justify-between'>
								<div className='flex h-10 w-10 items-center justify-center rounded-md bg-amber-400/10'>
									<Lightbulb className='h-5 w-5 text-amber-300' />
								</div>

								<span className='text-xs text-gray-500'>
									Identified
								</span>
							</div>

							<p className='mt-5 text-sm text-gray-400'>
								Skill Gaps
							</p>

							<p className='mt-1 text-3xl font-bold'>
								{dashboardStats.skillGaps}
							</p>
						</div>

						{/* Optimized resumes */}
						<div className='rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
							<div className='flex items-center justify-between'>
								<div className='flex h-10 w-10 items-center justify-center rounded-md bg-emerald-400/10'>
									<FileText className='h-5 w-5 text-emerald-300' />
								</div>

								<span className='text-xs text-gray-500'>
									Generated
								</span>
							</div>

							<p className='mt-5 text-sm text-gray-400'>
								Optimized Resumes
							</p>

							<p className='mt-1 text-3xl font-bold'>
								{dashboardStats.optimizedResumes}
							</p>
						</div>
					</div>
				</section>
				{/* Recent work */}
				<section className='grid gap-6 lg:grid-cols-2'>
					{/* Recent interview guides */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<div className='flex items-start justify-between gap-4'>
							<div>
								<h2 className='text-xl font-semibold'>
									Recent Interview Guides
								</h2>

								<p className='mt-1 text-sm text-gray-400'>
									Continue preparing for your target roles.
								</p>
							</div>

							<button
								type='button'
								onClick={() => router.push('/interview-prep')}
								className='hidden items-center gap-1 text-sm font-medium text-cyan-300 transition hover:text-cyan-200 sm:flex cursor-pointer'
							>
								View all
								<ChevronRight className='h-4 w-4' />
							</button>
						</div>

						<div className='mt-6 space-y-3'>
							{recentInterviewGuides.map((guide) => (
								<button
									type='button'
									key={guide.id}
									onClick={() =>
										router.push(
											`/interview-prep/${guide.id}`,
										)
									}
									className='group flex w-full cursor-pointer items-center justify-between gap-4 rounded-md border border-white/5 bg-black/20 p-4 text-left transition hover:border-cyan-400/20 hover:bg-white/5'
								>
									<div className='min-w-0'>
										<div className='flex items-center gap-2'>
											<BriefcaseBusiness className='h-4 w-4 shrink-0 text-cyan-300' />

											<h3 className='truncate text-sm font-medium text-white'>
												{guide.role}
											</h3>
										</div>

										<div className='mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500'>
											<span>
												{guide.technicalQuestions}{' '}
												technical
											</span>

											<span>
												{guide.behavioralQuestions}{' '}
												behavioral
											</span>

											<span>
												{guide.skillGaps} skill gaps
											</span>
										</div>

										<div className='mt-2 flex items-center gap-1 text-xs text-gray-500'>
											<Clock3 className='h-3 w-3' />
											{guide.createdAt}
										</div>
									</div>

									<div className='flex shrink-0 flex-col items-end gap-2'>
										<span className='text-lg font-semibold text-cyan-300'>
											{guide.matchScore}%
										</span>

										<ChevronRight className='h-4 w-4 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-cyan-300' />
									</div>
								</button>
							))}
						</div>

						<button
							type='button'
							onClick={() => router.push('/interview-prep')}
							className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white sm:hidden'
						>
							View all guides
							<ArrowRight className='h-4 w-4' />
						</button>
					</div>

					{/* Recent resumes */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<div className='flex items-start justify-between gap-4'>
							<div>
								<h2 className='text-xl font-semibold'>
									Recent Resumes
								</h2>

								<p className='mt-1 text-sm text-gray-400'>
									Your latest ATS-optimized resumes.
								</p>
							</div>

							<button
								type='button'
								onClick={() => router.push('/resume')}
								className='hidden items-center gap-1 text-sm font-medium text-blue-300 transition hover:text-blue-200 sm:flex cursor-pointer'
							>
								View all
								<ChevronRight className='h-4 w-4' />
							</button>
						</div>

						<div className='mt-6 space-y-3'>
							{recentResumes.map((resume) => (
								<div
									key={resume.id}
									className='group flex items-center justify-between gap-4 rounded-md border border-white/5 bg-black/20 p-4 transition hover:border-blue-400/20 hover:bg-white/5'
								>
									<div className='flex min-w-0 items-center gap-3'>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-400/10'>
											<FileText className='h-5 w-5 text-blue-300' />
										</div>

										<div className='min-w-0'>
											<h3 className='truncate text-sm font-medium text-white'>
												{resume.name}
											</h3>

											<p className='mt-1 truncate text-xs text-gray-500'>
												{resume.targetRole}
											</p>

											<div className='mt-2 flex items-center gap-2'>
												<span className='rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300'>
													{resume.status}
												</span>

												<span className='text-[10px] text-gray-600'>
													{resume.createdAt}
												</span>
											</div>
										</div>
									</div>

									<button
										type='button'
										aria-label={`Download ${resume.name}`}
										className='flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white'
									>
										<Download className='h-4 w-4' />
									</button>
								</div>
							))}
						</div>

						<button
							type='button'
							onClick={() => router.push('/resume')}
							className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white sm:hidden'
						>
							View all resumes
							<ArrowRight className='h-4 w-4' />
						</button>
					</div>
				</section>
				{/* Mobile settings */}
				<div className='mt-6 sm:hidden'>
					<button
						type='button'
						onClick={() => router.push('/settings')}
						className='flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white'
					>
						<Settings className='h-4 w-4' />
						Settings
					</button>
				</div>
			</div>
		</main>
	)
}