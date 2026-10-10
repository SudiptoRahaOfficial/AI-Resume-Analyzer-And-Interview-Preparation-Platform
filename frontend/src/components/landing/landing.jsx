'use client'

import { useEffect, useState } from 'react'

import {
	ArrowDownRight,
	ArrowRight,
	ArrowUpRight,
	BarChart3,
	Check,
	CheckCircle2,
	ChevronDown,
	CircleHelp,
	FileCheck2,
	FileText,
	Github,
	GraduationCap,
	Layers3,
	LockKeyhole,
	Menu,
	Moon,
	Play,
	Quote,
	ShieldCheck,
	Sparkles,
	Sun,
	Target,
	WandSparkles,
	X,
	Zap,
	BrainCircuit,
	ClipboardCheck,
	MessageSquareText,
} from 'lucide-react'

const features = [
	{
		icon: BrainCircuit,
		title: 'AI Interview Preparation',
		description:
			'Get a personalized interview guide based on your resume, experience, and target job description.',
		color: 'violet',
	},
	{
		icon: FileCheck2,
		title: 'ATS-Friendly Resumes',
		description:
			'Create structured, job-focused resumes designed to highlight relevant skills and experience.',
		color: 'blue',
	},
	{
		icon: Target,
		title: 'Skill Gap Analysis',
		description:
			'Identify missing skills and understand exactly what to improve before your next interview.',
		color: 'emerald',
	},
	{
		icon: MessageSquareText,
		title: 'Interview Questions',
		description:
			'Prepare for role-specific technical and behavioral questions with AI-generated guidance.',
		color: 'orange',
	},
	{
		icon: GraduationCap,
		title: 'Daily Preparation Plans',
		description:
			'Follow a structured, day-by-day preparation roadmap tailored to your readiness and goals.',
		color: 'pink',
	},
	{
		icon: BarChart3,
		title: 'Progress Overview',
		description:
			'Keep your interview reports and resume improvements organized in one personal dashboard.',
		color: 'cyan',
	},
]

const steps = [
	{
		number: '01',
		title: 'Share your experience',
		description:
			'Upload your resume, describe your background, and provide the job description you are targeting.',
		icon: FileText,
	},
	{
		number: '02',
		title: 'Let AI analyze your profile',
		description:
			'Discover relevant skills, potential gaps, interview topics, and opportunities to improve your resume.',
		icon: Sparkles,
	},
	{
		number: '03',
		title: 'Prepare with a clear plan',
		description:
			'Get a personalized interview guide or generate a job-focused, ATS-friendly resume.',
		icon: ClipboardCheck,
	},
]

const faqs = [
	{
		question: 'What is ResumeAI?',
		answer: 'ResumeAI is an AI-powered career preparation platform that helps candidates prepare for interviews, identify skill gaps, and create ATS-friendly resumes.',
	},
	{
		question: 'How does the interview preparation guide work?',
		answer: 'Provide your resume, a short description of your experience, and your target job description. ResumeAI uses this information to generate a personalized report with a job designation, skill gaps, technical questions, behavioral questions, and a day-by-day preparation plan.',
	},
	{
		question: 'Can I generate an ATS-friendly resume?',
		answer: 'Yes. ResumeAI is designed to help you create a structured resume tailored to your target role, emphasizing relevant skills and experience.',
	},
	{
		question: 'Do I need a resume to get started?',
		answer: 'A resume is useful for a more personalized analysis. The interview preparation workflow can also use your self-description and target job description, depending on the available information.',
	},
	{
		question: 'Is my preparation plan the same as everyone else’s?',
		answer: 'No. The goal is to tailor your preparation guide to your background and target role. The preparation plan can also vary in length according to the generated recommendations.',
	},
]

const colorClasses = {
	violet: {
		icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
		glow: 'group-hover:shadow-violet-500/10',
	},
	blue: {
		icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
		glow: 'group-hover:shadow-blue-500/10',
	},
	emerald: {
		icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
		glow: 'group-hover:shadow-emerald-500/10',
	},
	orange: {
		icon: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
		glow: 'group-hover:shadow-orange-500/10',
	},
	pink: {
		icon: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
		glow: 'group-hover:shadow-pink-500/10',
	},
	cyan: {
		icon: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
		glow: 'group-hover:shadow-cyan-500/10',
	},
}

function Brand({ dark }) {
	return (
		<a
			href='/'
			aria-label='ResumeAI home'
			className='flex shrink-0 items-center gap-2.5'
		>
			<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20'>
				<WandSparkles size={21} />
			</span>

			<span
				className={`text-xl font-bold tracking-tight ${
					dark ? 'text-white' : 'text-slate-950'
				}`}
			>
				Resume<span className='text-indigo-500'>AI</span>
			</span>
		</a>
	)
}

function SectionBadge({ children }) {
	return (
		<span className='inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400'>
			<Sparkles size={13} />
			{children}
		</span>
	)
}

function PrimaryButton({ children, href = '/signup', className = '' }) {
	return (
		<a
			href={href}
			className={`group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-xl hover:shadow-indigo-600/25 ${className}`}
		>
			{children}
			<ArrowRight
				size={16}
				className='transition-transform group-hover:translate-x-1'
			/>
		</a>
	)
}

function SecondaryButton({ children, href = '#how-it-works' }) {
	return (
		<a
			href={href}
			className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-indigo-400/40 dark:hover:text-indigo-400'
		>
			{children}
		</a>
	)
}

function Navbar({ dark, setDark }) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

	const links = [
		{ label: 'Features', href: '#features' },
		{ label: 'How it works', href: '#how-it-works' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'FAQ', href: '#faq' },
	]

	return (
		<header className='sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#080b16]/85'>
			<nav className='mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10'>
				<Brand dark={dark} />

				<div className='hidden items-center gap-8 lg:flex'>
					{links.map((link) => (
						<a
							key={link.label}
							href={link.href}
							className='text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white'
						>
							{link.label}
						</a>
					))}
				</div>

				<div className='hidden items-center gap-3 lg:flex'>
					<button
						type='button'
						onClick={() => setDark(!dark)}
						aria-label={
							dark
								? 'Switch to light mode'
								: 'Switch to dark mode'
						}
						className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10'
					>
						{dark ? <Sun size={18} /> : <Moon size={18} />}
					</button>

					<a
						href='/signin'
						className='rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:text-indigo-600 dark:text-slate-300 dark:hover:text-white'
					>
						Sign in
					</a>

					<PrimaryButton>Get Started</PrimaryButton>
				</div>

				<div className='flex items-center gap-2 lg:hidden'>
					<button
						type='button'
						onClick={() => setDark(!dark)}
						aria-label={
							dark
								? 'Switch to light mode'
								: 'Switch to dark mode'
						}
						className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300'
					>
						{dark ? <Sun size={18} /> : <Moon size={18} />}
					</button>

					<button
						type='button'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={mobileMenuOpen}
						className='flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 dark:border-white/10 dark:text-white'
					>
						{mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</button>
				</div>
			</nav>

			{mobileMenuOpen && (
				<div className='border-t border-slate-200 bg-white px-5 py-5 dark:border-white/10 dark:bg-[#080b16] lg:hidden'>
					<div className='mx-auto flex max-w-7xl flex-col gap-1'>
						{links.map((link) => (
							<a
								key={link.label}
								href={link.href}
								onClick={() => setMobileMenuOpen(false)}
								className='rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5'
							>
								{link.label}
							</a>
						))}

						<div className='mt-3 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4 dark:border-white/10'>
							<a
								href='/signin'
								className='flex items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold dark:border-white/10'
							>
								Sign in
							</a>

							<a
								href='/signup'
								className='flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white'
							>
								Get Started
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	)
}

function HeroPreview({ dark }) {
	return (
		<div className='relative mx-auto w-full max-w-[540px]'>
			<div className='absolute -inset-6 rounded-[40px] bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-blue-500/15 blur-3xl' />

			<div className='relative rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-2xl shadow-indigo-950/[0.08] sm:p-5 dark:border-white/10 dark:bg-[#101526] dark:shadow-black/30'>
				<div className='flex items-center justify-between border-b border-slate-100 pb-4 dark:border-white/[0.07]'>
					<div className='flex items-center gap-3'>
						<div className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'>
							<BrainCircuit size={21} />
						</div>

						<div>
							<p className='text-sm font-bold'>
								Interview Analysis
							</p>
							<p className='mt-0.5 text-xs text-slate-500 dark:text-slate-400'>
								Backend Developer
							</p>
						</div>
					</div>

					<span className='flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400'>
						<CheckCircle2 size={12} />
						Report preview
					</span>
				</div>

				<div className='grid grid-cols-[125px_1fr] gap-4 py-5 sm:grid-cols-[150px_1fr] sm:gap-5'>
					<div className='flex flex-col items-center justify-center rounded-2xl border border-slate-100 bg-slate-50/80 p-3 dark:border-white/[0.07] dark:bg-white/[0.025]'>
						<div className='relative flex h-[100px] w-[100px] items-center justify-center rounded-full sm:h-[116px] sm:w-[116px]'>
							<svg
								viewBox='0 0 120 120'
								className='absolute inset-0 h-full w-full -rotate-90'
								aria-hidden='true'
							>
								<circle
									cx='60'
									cy='60'
									r='51'
									fill='none'
									stroke='currentColor'
									strokeWidth='8'
									className='text-slate-200 dark:text-white/10'
								/>
								<circle
									cx='60'
									cy='60'
									r='51'
									fill='none'
									stroke='currentColor'
									strokeWidth='8'
									strokeDasharray='320.44'
									strokeDashoffset='176.24'
									strokeLinecap='round'
									className='text-indigo-500'
								/>
							</svg>

							<div className='text-center'>
								<p className='text-3xl font-bold tracking-tight'>
									45%
								</p>
								<p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>
									Match score
								</p>
							</div>
						</div>

						<span className='mt-3 rounded-full bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400'>
							Room to improve
						</span>
					</div>

					<div className='space-y-4'>
						<div>
							<div className='mb-2 flex items-center justify-between'>
								<span className='text-xs font-medium text-slate-600 dark:text-slate-300'>
									Technical skills
								</span>
								<span className='text-xs font-semibold'>
									65%
								</span>
							</div>
							<div className='h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10'>
								<div className='h-full w-[65%] rounded-full bg-indigo-500' />
							</div>
						</div>

						<div>
							<div className='mb-2 flex items-center justify-between'>
								<span className='text-xs font-medium text-slate-600 dark:text-slate-300'>
									Role alignment
								</span>
								<span className='text-xs font-semibold'>
									48%
								</span>
							</div>
							<div className='h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10'>
								<div className='h-full w-[48%] rounded-full bg-violet-500' />
							</div>
						</div>

						<div>
							<div className='mb-2 flex items-center justify-between'>
								<span className='text-xs font-medium text-slate-600 dark:text-slate-300'>
									Experience match
								</span>
								<span className='text-xs font-semibold'>
									35%
								</span>
							</div>
							<div className='h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10'>
								<div className='h-full w-[35%] rounded-full bg-cyan-500' />
							</div>
						</div>

						<div className='flex items-center gap-2 rounded-xl bg-indigo-500/[0.07] p-2.5'>
							<Sparkles
								size={16}
								className='shrink-0 text-indigo-500'
							/>
							<p className='text-[10px] leading-relaxed text-slate-600 dark:text-slate-300 sm:text-xs'>
								Focus on practical projects and core backend
								concepts.
							</p>
						</div>
					</div>
				</div>

				<div className='border-t border-slate-100 pt-4 dark:border-white/[0.07]'>
					<div className='mb-3 flex items-center justify-between'>
						<p className='text-xs font-bold'>
							Your preparation roadmap
						</p>
						<span className='text-[10px] font-medium text-indigo-500'>
							Sample plan
						</span>
					</div>

					{[
						{
							day: '01',
							title: 'JavaScript fundamentals',
							status: 'Review',
							color: 'bg-indigo-500',
						},
						{
							day: '02',
							title: 'Node.js & Express',
							status: 'Practice',
							color: 'bg-violet-500',
						},
						{
							day: '03',
							title: 'Database & API design',
							status: 'Prepare',
							color: 'bg-cyan-500',
						},
					].map((item) => (
						<div
							key={item.day}
							className='flex items-center gap-3 border-b border-slate-100 py-2.5 last:border-0 dark:border-white/[0.05]'
						>
							<span
								className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.color} text-[10px] font-bold text-white`}
							>
								{item.day}
							</span>

							<p className='min-w-0 flex-1 truncate text-xs font-medium'>
								{item.title}
							</p>

							<span className='text-[10px] text-slate-500 dark:text-slate-400'>
								{item.status}
							</span>
						</div>
					))}
				</div>
			</div>

			<div className='absolute -right-2 top-12 hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:flex dark:border-white/10 dark:bg-[#151a2c]'>
				<div className='flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500'>
					<ShieldCheck size={19} />
				</div>
				<div>
					<p className='text-xs font-bold'>Job-focused</p>
					<p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>
						Personalized guidance
					</p>
				</div>
			</div>

			<div className='absolute -bottom-5 -left-2 hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:flex dark:border-white/10 dark:bg-[#151a2c]'>
				<div className='flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500'>
					<Zap size={19} />
				</div>
				<div>
					<p className='text-xs font-bold'>One clear roadmap</p>
					<p className='mt-1 text-[10px] text-slate-500 dark:text-slate-400'>
						Know what to prepare
					</p>
				</div>
			</div>
		</div>
	)
}

function Hero({ dark }) {
	return (
		<section className='relative overflow-hidden'>
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className='absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/[0.07] blur-[100px]' />
				<div className='absolute right-0 top-0 h-96 w-96 rounded-full bg-violet-500/[0.08] blur-[110px]' />
			</div>

			<div className='relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.95fr] lg:gap-12 lg:px-10 lg:py-28'>
				<div className='max-w-2xl'>
					<SectionBadge>
						YOUR NEXT OPPORTUNITY STARTS HERE
					</SectionBadge>

					<h1 className='mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[62px]'>
						Your skills deserve
						<br />
						<span className='bg-gradient-to-r from-indigo-500 via-violet-500 to-blue-500 bg-clip-text text-transparent'>
							the right opportunity.
						</span>
					</h1>

					<p className='mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg dark:text-slate-400'>
						Turn your experience into an interview-ready profile.
						Get personalized preparation guides, discover skill
						gaps, and build ATS-friendly resumes with AI.
					</p>

					<div className='mt-9 flex flex-col gap-3 sm:flex-row'>
						<PrimaryButton className='min-h-12'>
							Build My Career Profile
						</PrimaryButton>

						<SecondaryButton>
							<Play
								size={15}
								className='fill-current'
							/>
							Explore How It Works
						</SecondaryButton>
					</div>

					<div className='mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-slate-500 dark:text-slate-400'>
						<span className='flex items-center gap-2'>
							<CheckCircle2
								size={15}
								className='text-emerald-500'
							/>
							Personalized guidance
						</span>
						<span className='flex items-center gap-2'>
							<CheckCircle2
								size={15}
								className='text-emerald-500'
							/>
							Job-focused insights
						</span>
						<span className='flex items-center gap-2'>
							<CheckCircle2
								size={15}
								className='text-emerald-500'
							/>
							One career workspace
						</span>
					</div>
				</div>

				<HeroPreview dark={dark} />
			</div>
		</section>
	)
}

function CapabilityStrip() {
	const items = [
		{ icon: BrainCircuit, label: 'AI Interview Guides' },
		{ icon: Target, label: 'Skill Gap Analysis' },
		{ icon: FileCheck2, label: 'ATS-Friendly Resumes' },
		{ icon: Layers3, label: 'Personalized Roadmaps' },
	]

	return (
		<section className='border-y border-slate-200/80 bg-white/60 dark:border-white/[0.07] dark:bg-white/[0.015]'>
			<div className='mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-7 sm:px-8 md:grid-cols-4 lg:px-10'>
				{items.map((item) => {
					const Icon = item.icon

					return (
						<div
							key={item.label}
							className='flex items-center justify-center gap-2.5 text-center sm:justify-start'
						>
							<Icon
								size={18}
								className='shrink-0 text-indigo-500'
							/>
							<span className='text-xs font-semibold text-slate-600 sm:text-sm dark:text-slate-300'>
								{item.label}
							</span>
						</div>
					)
				})}
			</div>
		</section>
	)
}

function SectionHeading({ badge, title, description, centered = true }) {
	return (
		<div className={`${centered ? 'mx-auto text-center' : ''} max-w-2xl`}>
			{badge && <SectionBadge>{badge}</SectionBadge>}

			<h2 className='mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[44px]'>
				{title}
			</h2>

			{description && (
				<p className='mt-5 text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-400'>
					{description}
				</p>
			)}
		</div>
	)
}

function Features() {
	return (
		<section
			id='features'
			className='scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 lg:py-28'
		>
			<div className='mx-auto max-w-7xl'>
				<SectionHeading
					badge='EVERYTHING IN ONE PLACE'
					title={
						<>
							Prepare smarter.
							<br className='hidden sm:block' />
							<span className='text-indigo-500'>
								Present yourself better.
							</span>
						</>
					}
					description='From understanding a job description to preparing for the interview, get the tools you need to approach your next opportunity with clarity.'
				/>

				<div className='mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					{features.map((feature) => {
						const Icon = feature.icon
						const styles = colorClasses[feature.color]

						return (
							<article
								key={feature.title}
								className={`group rounded-2xl border border-slate-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${styles.glow} dark:border-white/[0.08] dark:bg-white/[0.025] dark:hover:bg-white/[0.04] sm:p-7`}
							>
								<div
									className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.icon}`}
								>
									<Icon size={23} />
								</div>

								<h3 className='mt-6 text-lg font-bold'>
									{feature.title}
								</h3>

								<p className='mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400'>
									{feature.description}
								</p>

								<a
									href='/signup'
									className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-colors hover:text-indigo-500 dark:text-indigo-400'
								>
									Explore feature
									<ArrowUpRight
										size={15}
										className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
									/>
								</a>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function HowItWorks() {
	return (
		<section
			id='how-it-works'
			className='scroll-mt-24 border-y border-slate-200/70 bg-slate-50/70 px-5 py-24 sm:px-8 lg:px-10 lg:py-28 dark:border-white/[0.06] dark:bg-white/[0.015]'
		>
			<div className='mx-auto max-w-7xl'>
				<SectionHeading
					badge='A SIMPLE WORKFLOW'
					title={
						<>
							From application to
							<span className='text-indigo-500'>
								{' '}
								preparation.
							</span>
						</>
					}
					description='A straightforward process that helps you understand the role, identify what matters, and prepare with purpose.'
				/>

				<div className='relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8'>
					<div className='absolute left-[16%] right-[16%] top-7 hidden border-t border-dashed border-indigo-500/30 md:block' />

					{steps.map((step) => {
						const Icon = step.icon

						return (
							<article
								key={step.number}
								className='relative flex flex-col items-center text-center'
							>
								<div className='relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-500/20 bg-white text-indigo-600 shadow-lg shadow-indigo-500/5 dark:bg-[#111628] dark:text-indigo-400'>
									<Icon size={26} />
								</div>

								<span className='mt-6 text-xs font-bold tracking-[0.2em] text-indigo-500'>
									STEP {step.number}
								</span>

								<h3 className='mt-3 text-xl font-bold'>
									{step.title}
								</h3>

								<p className='mt-3 max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400'>
									{step.description}
								</p>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function InterviewFeature() {
	const topics = [
		'Role-specific technical questions',
		'Behavioral interview preparation',
		'Evidence-based skill gap analysis',
		'Flexible day-by-day preparation plan',
	]

	return (
		<section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-28'>
			<div className='mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20'>
				<div>
					<SectionBadge>INTERVIEW PREPARATION</SectionBadge>

					<h2 className='mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[44px]'>
						Know what to prepare
						<span className='text-indigo-500'>
							{' '}
							before you walk in.
						</span>
					</h2>

					<p className='mt-5 text-base leading-8 text-slate-600 dark:text-slate-400'>
						Every role demands something different. ResumeAI helps
						you connect your current experience with the
						requirements of your target position and build a
						preparation strategy around the gaps.
					</p>

					<ul className='mt-8 space-y-4'>
						{topics.map((topic) => (
							<li
								key={topic}
								className='flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300'
							>
								<span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'>
									<Check size={13} />
								</span>
								{topic}
							</li>
						))}
					</ul>

					<div className='mt-9'>
						<PrimaryButton href='/signup'>
							Generate My Interview Guide
						</PrimaryButton>
					</div>
				</div>

				<div className='relative'>
					<div className='absolute inset-10 rounded-full bg-indigo-500/10 blur-3xl' />

					<div className='relative rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-900/[0.04] sm:p-7 dark:border-white/[0.08] dark:bg-[#101526] dark:shadow-black/20'>
						<div className='flex items-center justify-between gap-4'>
							<div>
								<p className='text-xs font-semibold uppercase tracking-wider text-indigo-500'>
									Personalized report
								</p>
								<h3 className='mt-2 text-xl font-bold'>
									Backend Developer
								</h3>
								<p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
									Example interview preparation report
								</p>
							</div>

							<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500'>
								<BrainCircuit size={25} />
							</div>
						</div>

						<div className='mt-7 grid grid-cols-2 gap-3'>
							<div className='rounded-2xl border border-slate-200/80 p-4 dark:border-white/[0.07]'>
								<p className='text-xs text-slate-500 dark:text-slate-400'>
									Technical questions
								</p>
								<p className='mt-2 text-2xl font-bold'>08</p>
								<p className='mt-1 text-[10px] text-indigo-500'>
									Role-specific topics
								</p>
							</div>

							<div className='rounded-2xl border border-slate-200/80 p-4 dark:border-white/[0.07]'>
								<p className='text-xs text-slate-500 dark:text-slate-400'>
									Behavioral questions
								</p>
								<p className='mt-2 text-2xl font-bold'>05</p>
								<p className='mt-1 text-[10px] text-violet-500'>
									Experience-based practice
								</p>
							</div>
						</div>

						<div className='mt-5 rounded-2xl border border-slate-200/80 p-4 dark:border-white/[0.07]'>
							<div className='flex items-center justify-between gap-3'>
								<p className='text-sm font-bold'>
									Priority skill gaps
								</p>
								<span className='rounded-lg bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400'>
									Focus areas
								</span>
							</div>

							<div className='mt-4 space-y-3'>
								{[
									{
										label: 'System design fundamentals',
										width: '85%',
									},
									{
										label: 'Database optimization',
										width: '65%',
									},
									{ label: 'API security', width: '45%' },
								].map((skill) => (
									<div key={skill.label}>
										<p className='mb-2 text-xs text-slate-600 dark:text-slate-300'>
											{skill.label}
										</p>

										<div className='h-1.5 rounded-full bg-slate-100 dark:bg-white/10'>
											<div
												className='h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500'
												style={{ width: skill.width }}
											/>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className='mt-5 flex items-start gap-3 rounded-2xl bg-indigo-500/[0.07] p-4'>
							<Sparkles
								size={19}
								className='mt-0.5 shrink-0 text-indigo-500'
							/>

							<div>
								<p className='text-sm font-semibold'>
									Your next step
								</p>
								<p className='mt-1 text-xs leading-6 text-slate-600 dark:text-slate-400'>
									Work through the identified topics, practice
									answering relevant questions, and follow
									your personalized roadmap.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

function ResumeFeature() {
	const resumeSections = [
		'Professional summary',
		'Technical skills',
		'Work experience',
		'Projects and achievements',
		'Education',
	]

	return (
		<section className='border-y border-slate-200/70 bg-slate-50/70 px-5 py-24 sm:px-8 lg:px-10 lg:py-28 dark:border-white/[0.06] dark:bg-white/[0.015]'>
			<div className='mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20'>
				<div className='order-2 lg:order-1'>
					<div className='mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.05] sm:p-7 dark:border-white/10 dark:bg-[#101526]'>
						<div className='flex items-center gap-4 border-b border-slate-200 pb-5 dark:border-white/10'>
							<div className='flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500'>
								<FileText size={25} />
							</div>

							<div>
								<p className='font-bold'>Professional Resume</p>
								<p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
									Structured for your target role
								</p>
							</div>
						</div>

						<div className='py-5'>
							<div className='h-2.5 w-2/3 rounded-full bg-slate-800 dark:bg-slate-200' />
							<div className='mt-3 h-1.5 w-1/2 rounded-full bg-indigo-500/60' />

							<div className='mt-7'>
								<p className='text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500'>
									Professional summary
								</p>
								<div className='mt-3 space-y-2'>
									<div className='h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10' />
									<div className='h-1.5 w-[94%] rounded-full bg-slate-200 dark:bg-white/10' />
									<div className='h-1.5 w-[76%] rounded-full bg-slate-200 dark:bg-white/10' />
								</div>
							</div>

							<div className='mt-6'>
								<p className='text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500'>
									Core competencies
								</p>
								<div className='mt-3 flex flex-wrap gap-2'>
									{[
										'JavaScript',
										'Node.js',
										'REST APIs',
										'MongoDB',
									].map((skill) => (
										<span
											key={skill}
											className='rounded-md border border-indigo-500/15 bg-indigo-500/5 px-2.5 py-1.5 text-[10px] font-medium text-slate-600 dark:text-slate-300'
										>
											{skill}
										</span>
									))}
								</div>
							</div>

							{resumeSections.slice(2).map((section) => (
								<div
									key={section}
									className='mt-6'
								>
									<p className='text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-500'>
										{section}
									</p>
									<div className='mt-3 space-y-2'>
										<div className='h-1.5 w-full rounded-full bg-slate-200 dark:bg-white/10' />
										<div className='h-1.5 w-[82%] rounded-full bg-slate-200 dark:bg-white/10' />
									</div>
								</div>
							))}
						</div>

						<div className='flex items-center gap-2 border-t border-slate-200 pt-4 text-xs font-medium text-emerald-600 dark:border-white/10 dark:text-emerald-400'>
							<CheckCircle2 size={16} />
							Clear, structured resume preview
						</div>
					</div>
				</div>

				<div className='order-1 lg:order-2'>
					<SectionBadge>RESUME OPTIMIZATION</SectionBadge>

					<h2 className='mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[44px]'>
						Make your experience
						<span className='text-indigo-500'>
							{' '}
							easier to recognize.
						</span>
					</h2>

					<p className='mt-5 text-base leading-8 text-slate-600 dark:text-slate-400'>
						A good resume connects your experience to the position
						you want. Create a clear, structured resume that
						emphasizes relevant qualifications and communicates your
						professional value.
					</p>

					<ul className='mt-8 space-y-4'>
						{[
							'Structure your resume around relevant experience.',
							'Highlight skills aligned with the target position.',
							'Organize projects, education, and achievements.',
							'Generate a polished resume for further review.',
						].map((item) => (
							<li
								key={item}
								className='flex items-start gap-3 text-sm font-medium text-slate-700 dark:text-slate-300'
							>
								<CheckCircle2
									size={19}
									className='mt-0.5 shrink-0 text-emerald-500'
								/>
								{item}
							</li>
						))}
					</ul>

					<p className='mt-5 text-xs leading-6 text-slate-500 dark:text-slate-400'>
						ATS compatibility depends on the employer&apos;s
						screening system and the requirements of the specific
						job. No resume format can guarantee an interview.
					</p>

					<div className='mt-8'>
						<PrimaryButton href='/signup'>
							Create My Resume
						</PrimaryButton>
					</div>
				</div>
			</div>
		</section>
	)
}

function Benefits() {
	const benefits = [
		{
			icon: Target,
			title: 'Focus on what matters',
			description:
				'Understand the expectations of your target role instead of preparing without direction.',
		},
		{
			icon: Layers3,
			title: 'Keep everything organized',
			description:
				'Manage your profile, interview reports, and generated resumes from one workspace.',
		},
		{
			icon: GraduationCap,
			title: 'Build a preparation habit',
			description:
				'Use a structured roadmap to break larger learning goals into manageable daily tasks.',
		},
	]

	return (
		<section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-28'>
			<div className='mx-auto max-w-7xl'>
				<SectionHeading
					badge='BUILT AROUND YOUR GOALS'
					title={
						<>
							Less guesswork.
							<span className='text-indigo-500'>
								{' '}
								More preparation.
							</span>
						</>
					}
					description='A practical workspace for candidates who want to understand their gaps, prepare deliberately, and present their experience clearly.'
				/>

				<div className='mt-14 grid gap-6 md:grid-cols-3'>
					{benefits.map((benefit) => {
						const Icon = benefit.icon

						return (
							<article
								key={benefit.title}
								className='rounded-2xl border border-slate-200/80 p-6 sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.02]'
							>
								<Icon
									size={26}
									className='text-indigo-500'
								/>

								<h3 className='mt-5 text-lg font-bold'>
									{benefit.title}
								</h3>

								<p className='mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400'>
									{benefit.description}
								</p>
							</article>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function Testimonials() {
	return (
		<section className='border-y border-slate-200/70 bg-slate-50/70 px-5 py-20 sm:px-8 lg:px-10 dark:border-white/[0.06] dark:bg-white/[0.015]'>
			<div className='mx-auto max-w-7xl'>
				<SectionHeading
					badge='DESIGNED FOR JOB SEEKERS'
					title={
						<>
							Your next chapter
							<span className='text-indigo-500'>
								{' '}
								starts with preparation.
							</span>
						</>
					}
					description='A better preparation process starts with understanding your goals, organizing your experience, and knowing what to work on next.'
				/>

				<div className='mt-12 rounded-3xl border border-indigo-500/15 bg-gradient-to-br from-indigo-500/[0.07] via-violet-500/[0.04] to-transparent p-7 sm:p-10 lg:p-14'>
					<Quote
						size={32}
						className='text-indigo-500'
					/>

					<p className='mt-5 max-w-3xl text-xl font-semibold leading-relaxed tracking-tight sm:text-2xl lg:text-3xl'>
						You don&apos;t need to know everything before an
						interview. You need to understand the role, recognize
						your gaps, and prepare for the right things.
					</p>

					<p className='mt-5 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400'>
						ResumeAI is designed to make that preparation process
						more structured, personalized, and manageable.
					</p>

					<div className='mt-8'>
						<PrimaryButton>Start Preparing</PrimaryButton>
					</div>
				</div>
			</div>
		</section>
	)
}

function Pricing() {
	const featuresList = [
		'Personalized interview preparation reports',
		'Technical and behavioral question guidance',
		'Skill gap analysis',
		'Flexible preparation roadmaps',
		'ATS-friendly resume generation',
		'Organized reports and resumes',
	]

	return (
		<section
			id='pricing'
			className='scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 lg:py-28'
		>
			<div className='mx-auto max-w-7xl'>
				<SectionHeading
					badge='PRICING'
					title={
						<>
							Invest in your
							<span className='text-indigo-500'>
								{' '}
								next opportunity.
							</span>
						</>
					}
					description='Explore the tools available to help you prepare for interviews and present your experience more effectively.'
				/>

				<div className='mx-auto mt-12 max-w-xl'>
					<div className='relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-white p-7 shadow-xl shadow-indigo-950/[0.05] sm:p-9 dark:bg-[#101526] dark:shadow-black/20'>
						<div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl' />

						<div className='relative'>
							<div className='flex items-center gap-2'>
								<span className='flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500'>
									<Sparkles size={21} />
								</span>
								<div>
									<h3 className='font-bold'>
										ResumeAI Workspace
									</h3>
									<p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>
										Interview preparation and resumes
									</p>
								</div>
							</div>

							<p className='mt-7 text-sm leading-7 text-slate-600 dark:text-slate-400'>
								Your personal workspace for organizing career
								information, generating preparation guides, and
								creating job-focused resumes.
							</p>

							<div className='mt-7 space-y-4'>
								{featuresList.map((item) => (
									<div
										key={item}
										className='flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300'
									>
										<CheckCircle2
											size={17}
											className='mt-0.5 shrink-0 text-emerald-500'
										/>
										{item}
									</div>
								))}
							</div>

							<PrimaryButton className='mt-9 w-full'>
								Get Started with ResumeAI
							</PrimaryButton>

							<p className='mt-4 text-center text-xs text-slate-500 dark:text-slate-400'>
								Create an account to explore the platform.
							</p>
						</div>
					</div>

					<p className='mt-5 text-center text-xs leading-6 text-slate-500 dark:text-slate-400'>
						Subscription plans and paid features can be introduced
						when billing is implemented. No price or plan limits are
						implied by this preview.
					</p>
				</div>
			</div>
		</section>
	)
}

function FAQ() {
	const [openIndex, setOpenIndex] = useState(0)

	return (
		<section
			id='faq'
			className='scroll-mt-24 border-y border-slate-200/70 bg-slate-50/70 px-5 py-24 sm:px-8 lg:px-10 lg:py-28 dark:border-white/[0.06] dark:bg-white/[0.015]'
		>
			<div className='mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20'>
				<div>
					<SectionBadge>GOT QUESTIONS?</SectionBadge>

					<h2 className='mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl'>
						Frequently asked
						<span className='text-indigo-500'> questions.</span>
					</h2>

					<p className='mt-5 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400'>
						Learn more about ResumeAI, interview preparation
						reports, and resume generation.
					</p>

					<div className='mt-7 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400'>
						<CircleHelp
							size={18}
							className='text-indigo-500'
						/>
						Still have questions? Contact our team.
					</div>

					<a
						href='/contact'
						className='mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400'
					>
						Contact us
						<ArrowRight size={15} />
					</a>
				</div>

				<div className='space-y-3'>
					{faqs.map((faq, index) => {
						const isOpen = openIndex === index

						return (
							<div
								key={faq.question}
								className='rounded-2xl border border-slate-200/80 bg-white px-5 dark:border-white/[0.08] dark:bg-white/[0.02] sm:px-6'
							>
								<button
									type='button'
									onClick={() =>
										setOpenIndex(isOpen ? -1 : index)
									}
									aria-expanded={isOpen}
									className='flex w-full items-center justify-between gap-4 py-5 text-left'
								>
									<span className='text-sm font-semibold leading-6'>
										{faq.question}
									</span>

									<ChevronDown
										size={18}
										className={`shrink-0 text-slate-500 transition-transform duration-200 ${
											isOpen
												? 'rotate-180 text-indigo-500'
												: ''
										}`}
									/>
								</button>

								{isOpen && (
									<p className='pb-5 text-sm leading-7 text-slate-600 dark:text-slate-400'>
										{faq.answer}
									</p>
								)}
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}

function FinalCTA() {
	return (
		<section className='px-5 py-24 sm:px-8 lg:px-10 lg:py-28'>
			<div className='relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 px-6 py-14 text-center text-white sm:px-12 sm:py-20'>
				<div className='pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl' />
				<div className='pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl' />

				<div className='relative mx-auto max-w-2xl'>
					<span className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold'>
						<Sparkles size={14} />
						YOUR CAREER, YOUR NEXT MOVE
					</span>

					<h2 className='mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl'>
						Prepare with purpose.
						<br />
						Show up with confidence.
					</h2>

					<p className='mx-auto mt-5 max-w-xl text-sm leading-7 text-indigo-100 sm:text-base'>
						Start building a clearer picture of your skills, your
						target role, and the steps you can take to get ready.
					</p>

					<div className='mt-8 flex flex-col justify-center gap-3 sm:flex-row'>
						<a
							href='/signup'
							className='group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-indigo-700 transition-all hover:-translate-y-0.5 hover:bg-indigo-50'
						>
							Get Started with ResumeAI
							<ArrowRight
								size={16}
								className='transition-transform group-hover:translate-x-1'
							/>
						</a>

						<a
							href='/signin'
							className='inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10'
						>
							I already have an account
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

function Footer({ dark }) {
	const productLinks = [
		{ label: 'Interview Preparation', href: '#features' },
		{ label: 'Resume Optimization', href: '#features' },
		{ label: 'How It Works', href: '#how-it-works' },
		{ label: 'Pricing', href: '#pricing' },
	]

	const accountLinks = [
		{ label: 'Create Account', href: '/signup' },
		{ label: 'Sign In', href: '/signin' },
		{ label: 'Contact', href: '/contact' },
	]

	return (
		<footer className='border-t border-slate-200/80 px-5 pb-8 pt-14 sm:px-8 lg:px-10 dark:border-white/[0.07]'>
			<div className='mx-auto max-w-7xl'>
				<div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]'>
					<div className='max-w-sm'>
						<Brand dark={dark} />

						<p className='mt-5 text-sm leading-7 text-slate-600 dark:text-slate-400'>
							AI-powered interview preparation and resume
							optimization designed to help you take the next step
							in your career.
						</p>
					</div>

					<div>
						<h3 className='text-sm font-bold'>Product</h3>

						<ul className='mt-5 space-y-3'>
							{productLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className='text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h3 className='text-sm font-bold'>Account</h3>

						<ul className='mt-5 space-y-3'>
							{accountLinks.map((link) => (
								<li key={link.label}>
									<a
										href={link.href}
										className='text-sm text-slate-600 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-white'
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='mt-12 flex flex-col gap-4 border-t border-slate-200/80 pt-7 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.07]'>
					<p className='text-xs text-slate-500 dark:text-slate-400'>
						© 2026 ResumeAI. All rights reserved.
					</p>

					<p className='text-xs text-slate-500 dark:text-slate-400'>
						Built to help you prepare for what&apos;s next.
					</p>
				</div>
			</div>
		</footer>
	)
}

export default function Landing() {
	const [dark, setDark] = useState(true)
	const [themeReady, setThemeReady] = useState(false)

	useEffect(() => {
		try {
			const savedTheme = localStorage.getItem('resumeai-theme')

			if (savedTheme === 'light') {
				setDark(false)
			} else if (savedTheme === 'dark') {
				setDark(true)
			} else {
				setDark(
					window.matchMedia('(prefers-color-scheme: dark)').matches,
				)
			}
		} catch {
			// Use the default theme when localStorage is unavailable.
		}

		setThemeReady(true)
	}, [])

	useEffect(() => {
		if (!themeReady) return

		try {
			localStorage.setItem('resumeai-theme', dark ? 'dark' : 'light')
		} catch {
			// Theme switching still works for the current page.
		}
	}, [dark, themeReady])

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${
				dark
					? 'dark bg-[#080b16] text-white'
					: 'bg-white text-slate-950'
			}`}
		>
			<div className='min-h-screen bg-white text-slate-950 dark:bg-[#080b16] dark:text-white'>
				<Navbar
					dark={dark}
					setDark={setDark}
				/>

				<main>
					<Hero dark={dark} />
					<CapabilityStrip />
					<Features />
					<HowItWorks />
					<InterviewFeature />
					<ResumeFeature />
					<Benefits />
					<Testimonials />
					<Pricing />
					<FAQ />
					<FinalCTA />
				</main>

				<Footer dark={dark} />
			</div>
		</div>
	)
}