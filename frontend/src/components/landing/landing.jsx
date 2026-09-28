// making client component
'use client'

// importing dependencis
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function LandingPage() {
	// states
	const [isOpen, setIsOpen] = useState(false)

	return (
		<main className='relative min-h-screen bg-[#030712] text-white'>
			{/* Background Glow */}
			<div className='pointer-events-none absolute inset-0 overflow-x-hidden'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			{/* ================= NAVBAR ================= */}
			<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
				<div className='relative mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
					{/* Brand */}
					<a
						href='/'
						className='text-lg font-semibold tracking-tight text-white'
					>
						ResumeAI
					</a>

					{/* Desktop Navigation */}
					<nav className='absolute left-1/2 -translate-x-1/2 hidden items-center gap-8 lg:flex'>
						<a
							href='#features'
							className='text-sm font-medium text-gray-400 transition hover:text-white'
						>
							Features
						</a>
						<a
							href='#about'
							className='text-sm font-medium text-gray-400 transition hover:text-white'
						>
							About
						</a>
						<a
							href='#workflow'
							className='text-sm font-medium text-gray-400 transition hover:text-white'
						>
							Workflow
						</a>
						<a
							href='#pricing'
							className='text-sm font-medium text-gray-400 transition hover:text-white'
						>
							Pricing
						</a>
						<a
							href='#testimonials'
							className='text-sm font-medium text-gray-400 transition hover:text-white'
						>
							Testimonials
						</a>
					</nav>

					{/* Desktop Actions */}
					<div className='hidden items-center gap-3 lg:flex'>
						<a
							href='/auth/signin'
							className='rounded-sm border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white'
						>
							Sign In
						</a>

						<a
							href='/auth/signup'
							className='rounded-sm bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
						>
							Get Started
						</a>
					</div>

					{/* Mobile / Tablet Toggle */}
					<button
						onClick={() => setIsOpen(!isOpen)}
						className='rounded-md border border-white/10 p-2 text-gray-300 transition hover:bg-white/5 hover:text-white lg:hidden'
					>
						{isOpen ? <X size={22} /> : <Menu size={22} />}
					</button>
				</div>

				{/* Mobile / Tablet Menu */}
				{isOpen && (
					<div className='border-t border-white/10 bg-[#030712]/95 backdrop-blur-xl lg:hidden'>
						<nav className='mx-auto flex max-w-6xl flex-col px-6 py-4'>
							<a
								href='#features'
								onClick={() => setIsOpen(false)}
								className='py-3 text-sm font-medium text-gray-300 transition hover:text-white'
							>
								Features
							</a>

							<a
								href='#about'
								onClick={() => setIsOpen(false)}
								className='py-3 text-sm font-medium text-gray-300 transition hover:text-white'
							>
								About
							</a>

							<a
								href='#workflow'
								onClick={() => setIsOpen(false)}
								className='py-3 text-sm font-medium text-gray-300 transition hover:text-white'
							>
								Workflow
							</a>

							<a
								href='#pricing'
								onClick={() => setIsOpen(false)}
								className='py-3 text-sm font-medium text-gray-300 transition hover:text-white'
							>
								Pricing
							</a>

							<a
								href='#testimonials'
								onClick={() => setIsOpen(false)}
								className='py-3 text-sm font-medium text-gray-300 transition hover:text-white'
							>
								Testimonials
							</a>

							<div className='mt-4 flex flex-col gap-3 border-t border-white/10 pt-4'>
								<a
									href='/auth/signin'
									className='rounded-sm border border-white/10 px-4 py-3 text-center text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white'
								>
									Sign In
								</a>

								<a
									href='/auth/signup'
									className='rounded-sm bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
								>
									Get Started
								</a>
							</div>
						</nav>
					</div>
				)}
			</header>

			{/* ================= HERO ================= */}
			<section className='relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center'>
				<div className='mb-6 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300'>
					AI-Powered Interview Preparation Platform
				</div>

				<h2 className='max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-6xl'>
					Land More Interviews with{' '}
					<span className='text-cyan-400'>AI</span>
				</h2>

				<p className='mt-6 max-w-2xl text-lg leading-8 text-gray-400'>
					Analyze resumes, identify skill gaps, generate ATS-optimized
					resumes, and prepare for interviews using Gemini AI.
				</p>

				<div className='mt-10 flex flex-col gap-4 sm:flex-row'>
					<a
						href='auth/signup'
						className='rounded-md bg-cyan-400 px-7 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300'
					>
						Create Free Account
					</a>

					<a
						href='auth/signin'
						className='rounded-md border border-white/10 bg-white/5 px-7 py-3 font-medium text-gray-300 backdrop-blur-md transition hover:bg-white/10 hover:text-white'
					>
						Sign In
					</a>
				</div>
			</section>

			{/* ================= FEATURES ================= */}
			<section
				id='features'
				className='relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-20'
			>
				<div className='mb-12 text-center'>
					<h3 className='text-3xl font-bold'>Everything You Need</h3>
					<p className='mt-3 text-gray-400'>
						A complete AI workflow for modern job seekers.
					</p>
				</div>

				<div className='grid gap-6 md:grid-cols-3'>
					{/* Resume Analysis */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/20'>
						<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
							<svg
								className='h-6 w-6 text-cyan-400'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.8'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M7 3h7l5 5v13a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1z'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M14 3v5h5M9 13h6M9 17h4'
								/>
							</svg>
						</div>

						<h4 className='mb-2 text-lg font-semibold'>
							Resume Analysis
						</h4>
						<p className='text-sm leading-6 text-gray-400'>
							Receive detailed AI feedback on formatting,
							readability, and ATS compatibility.
						</p>
					</div>

					{/* Skill Gap */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/20'>
						<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
							<svg
								className='h-6 w-6 text-cyan-400'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.8'
								viewBox='0 0 24 24'
							>
								<circle
									cx='11'
									cy='11'
									r='7'
								/>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M21 21l-4.35-4.35M8 11l2 2 4-4'
								/>
							</svg>
						</div>

						<h4 className='mb-2 text-lg font-semibold'>
							Skill Gap Detection
						</h4>
						<p className='text-sm leading-6 text-gray-400'>
							Compare your resume against job descriptions and
							identify missing skills instantly.
						</p>
					</div>

					{/* Interview */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition hover:border-cyan-400/20'>
						<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
							<svg
								className='h-6 w-6 text-cyan-400'
								fill='none'
								stroke='currentColor'
								strokeWidth='1.8'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M8 10h8M8 14h5M6 4h12a2 2 0 012 2v9a2 2 0 01-2 2H10l-4 3v-3H6a2 2 0 01-2-2V6a2 2 0 012-2z'
								/>
							</svg>
						</div>

						<h4 className='mb-2 text-lg font-semibold'>
							Interview Preparation
						</h4>
						<p className='text-sm leading-6 text-gray-400'>
							Generate personalized technical and behavioral
							interview questions with AI.
						</p>
					</div>
				</div>
			</section>

			{/* ================= STATS ================= */}
			<section
				id='about'
				className='relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-20'
			>
				<div className='rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-xl'>
					<div className='grid gap-8 text-center md:grid-cols-4'>
						<div>
							<h4 className='text-3xl font-bold text-cyan-400'>
								AI
							</h4>
							<p className='mt-2 text-sm text-gray-400'>
								Powered Analysis
							</p>
						</div>

						<div>
							<h4 className='text-3xl font-bold text-cyan-400'>
								ATS
							</h4>
							<p className='mt-2 text-sm text-gray-400'>
								Resume Optimization
							</p>
						</div>

						<div>
							<h4 className='text-3xl font-bold text-cyan-400'>
								PDF
							</h4>
							<p className='mt-2 text-sm text-gray-400'>
								Resume Generation
							</p>
						</div>

						<div>
							<h4 className='text-3xl font-bold text-cyan-400'>
								24/7
							</h4>
							<p className='mt-2 text-sm text-gray-400'>
								Interview Practice
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ================= HOW IT WORKS ================= */}
			<section
				id='workflow'
				className='relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-20'
			>
				<div className='mx-auto max-w-6xl px-6'>
					{/* Section Header */}
					<div className='mb-14 text-center'>
						<h3 className='text-3xl font-bold text-white md:text-4xl'>
							How It Works
						</h3>

						<p className='mx-auto mt-3 max-w-2xl text-gray-400'>
							From uploading your resume to preparing for your
							next interview, ResumeAI gives you a simple
							AI-powered workflow for your job search.
						</p>
					</div>

					{/* Workflow Cards */}
					<div className='grid gap-6 md:grid-cols-3'>
						{/* ================= STEP 01 ================= */}
						<div className='rounded-lg border border-white/10 bg-white/3 p-7'>
							{/* Step */}
							<div className='mb-6 flex items-center gap-3'>
								<span className='flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
									01
								</span>

								<span className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Step
								</span>
							</div>

							{/* Content */}
							<h4 className='text-xl font-semibold text-white'>
								Upload Your Resume
							</h4>

							<p className='mt-3 text-sm leading-7 text-gray-400'>
								Upload your resume in PDF format and provide the
								information needed to understand your target
								role.
							</p>

							{/* Feature */}
							<div className='mt-7 border-t border-white/10 pt-5'>
								<p className='text-xs font-medium text-gray-500'>
									Resume Upload
								</p>

								<p className='mt-1 text-sm text-gray-300'>
									PDF resume support
								</p>
							</div>
						</div>

						{/* ================= STEP 02 ================= */}
						<div className='rounded-lg border border-white/10 bg-white/3 p-7'>
							{/* Step */}
							<div className='mb-6 flex items-center gap-3'>
								<span className='flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
									02
								</span>

								<span className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Step
								</span>
							</div>

							{/* Content */}
							<h4 className='text-xl font-semibold text-white'>
								Analyze with AI
							</h4>

							<p className='mt-3 text-sm leading-7 text-gray-400'>
								Gemini AI analyzes your resume to evaluate ATS
								compatibility, identify skill gaps, and
								highlight areas for improvement.
							</p>

							{/* Feature */}
							<div className='mt-7 border-t border-white/10 pt-5'>
								<p className='text-xs font-medium text-gray-500'>
									Resume Analysis
								</p>

								<p className='mt-1 text-sm text-gray-300'>
									ATS & skill gap analysis
								</p>
							</div>
						</div>

						{/* ================= STEP 03 ================= */}
						<div className='rounded-lg border border-white/10 bg-white/3 p-7'>
							{/* Step */}
							<div className='mb-6 flex items-center gap-3'>
								<span className='flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
									03
								</span>

								<span className='text-xs font-medium uppercase tracking-wider text-gray-500'>
									Step
								</span>
							</div>

							{/* Content */}
							<h4 className='text-xl font-semibold text-white'>
								Prepare for Interviews
							</h4>

							<p className='mt-3 text-sm leading-7 text-gray-400'>
								Generate personalized technical and behavioral
								interview questions based on your resume,
								skills, and target role.
							</p>

							{/* Feature */}
							<div className='mt-7 border-t border-white/10 pt-5'>
								<p className='text-xs font-medium text-gray-500'>
									Interview Preparation
								</p>

								<p className='mt-1 text-sm text-gray-300'>
									Role-based questions and practice
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* ================= CTA ================= */}
			<section className='relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-20'>
				<div className='relative overflow-hidden rounded-lg border border-white/10 bg-white/3'>
					{/* Subtle Accent */}
					<div className='absolute left-0 top-0 h-full w-1 bg-cyan-400' />

					<div className='flex flex-col gap-10 px-8 py-12 md:flex-row md:items-center md:justify-between md:px-12'>
						{/* Content */}
						<div className='max-w-2xl'>
							<p className='mb-3 text-sm font-medium uppercase tracking-wider text-cyan-400'>
								Start Your Preparation
							</p>

							<h3 className='text-3xl font-bold tracking-tight text-white md:text-4xl'>
								Prepare smarter for your next opportunity.
							</h3>

							<p className='mt-4 max-w-xl leading-7 text-gray-400'>
								Analyze your resume, identify skill gaps, and
								prepare for interviews with AI-powered tools
								built for your job search.
							</p>
						</div>

						{/* Actions */}
						<div className='flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col lg:flex-row'>
							<a
								href='auth/signup'
								className='rounded-md bg-cyan-400 px-6 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
							>
								Get Started
							</a>

							<a
								href='auth/signin'
								className='rounded-md border border-white/10 px-6 py-3 text-center text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white'
							>
								Sign In
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* ================= PRICING ================= */}
			<section
				id='pricing'
				className='relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-20'
			>
				<div className='mb-14 text-center'>
					<h3 className='text-3xl font-bold text-white'>
						Choose the Right Plan for You
					</h3>

					<p className='mt-3 text-gray-400'>
						Flexible plans designed for students, professionals, and
						teams preparing for their next career opportunity.
					</p>
				</div>

				<div className='grid gap-6 lg:grid-cols-3'>
					{/* Free */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-8'>
						<div className='mb-6'>
							<h4 className='text-xl font-semibold text-white'>
								Free
							</h4>
							<p className='mt-1 text-sm text-gray-400'>
								For beginners
							</p>
						</div>

						<div className='mb-6'>
							<span className='text-4xl font-bold text-white'>
								$0
							</span>
							<span className='text-gray-400'> / month</span>
						</div>

						<ul className='space-y-3 text-sm text-gray-300'>
							<li>✓ 1 Resume Analysis</li>
							<li>✓ Basic ATS Score</li>
							<li>✓ 5 Interview Questions</li>
							<li>✕ Skill Gap Report</li>
							<li>✕ PDF Resume Export</li>
						</ul>

						<a
							href='auth/signup'
							className='mt-8 block rounded-md border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/5'
						>
							Get Started
						</a>
					</div>

					{/* Pro */}
					<div className='rounded-lg border border-cyan-400 bg-white/5 p-8'>
						<span className='inline-block rounded-md bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300'>
							Most Popular
						</span>

						<div className='mb-6 mt-4'>
							<h4 className='text-xl font-semibold text-white'>
								Pro
							</h4>
							<p className='mt-1 text-sm text-gray-400'>
								For active job seekers
							</p>
						</div>

						<div className='mb-6'>
							<span className='text-4xl font-bold text-white'>
								$12
							</span>
							<span className='text-gray-400'> / month</span>
						</div>

						<ul className='space-y-3 text-sm text-gray-300'>
							<li>✓ Unlimited Resume Analysis</li>
							<li>✓ Advanced ATS Optimization</li>
							<li>✓ Skill Gap Detection</li>
							<li>✓ Unlimited Interview Questions</li>
							<li>✓ PDF Resume Export</li>
						</ul>

						<a
							href='auth/signup'
							className='mt-8 block rounded-md bg-cyan-400 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
						>
							Start Pro
						</a>
					</div>

					{/* Team */}
					<div className='rounded-lg border border-white/10 bg-white/5 p-8'>
						<div className='mb-6'>
							<h4 className='text-xl font-semibold text-white'>
								Team
							</h4>
							<p className='mt-1 text-sm text-gray-400'>
								For organizations
							</p>
						</div>

						<div className='mb-6'>
							<span className='text-4xl font-bold text-white'>
								$39
							</span>
							<span className='text-gray-400'> / month</span>
						</div>

						<ul className='space-y-3 text-sm text-gray-300'>
							<li>✓ Everything in Pro</li>
							<li>✓ Up to 10 Members</li>
							<li>✓ Shared Resume Library</li>
							<li>✓ Analytics Dashboard</li>
							<li>✓ Priority Support</li>
						</ul>

						<a
							href='/contact'
							className='mt-8 block rounded-md border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/5'
						>
							Contact Sales
						</a>
					</div>
				</div>
			</section>

			{/* ================= TESTIMONIALS ================= */}
			<section
				id='testimonials'
				className='relative z-10 mx-auto max-w-6xl px-6 pb-24 scroll-mt-20'
			>
				{/* Section Header */}
				<div className='mb-14 text-center'>
					<h3 className='text-3xl font-bold text-white'>
						What Job Seekers Are Saying
					</h3>

					<p className='mx-auto mt-3 max-w-2xl text-gray-400'>
						Discover how ResumeAI helps job seekers improve their
						resumes, identify skill gaps, and prepare more
						effectively for interviews.
					</p>
				</div>

				{/* Testimonials */}
				<div className='grid gap-6 md:grid-cols-3'>
					{/* Testimonial 1 */}
					<article className='flex flex-col rounded-lg border border-white/10 bg-white/3 p-7 transition duration-300 hover:border-white/20 hover:bg-white/5'>
						<div className='flex items-center justify-between'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
								AM
							</div>

							<span className='text-sm tracking-widest text-cyan-400'>
								★★★★★
							</span>
						</div>

						<div className='mt-7'>
							<span className='text-4xl leading-none text-cyan-400/40'>
								“
							</span>

							<p className='-mt-2 text-[15px] leading-7 text-gray-300'>
								ResumeAI helped me identify several important
								skill gaps in my resume. The feedback was clear
								and gave me a much better idea of what I needed
								to improve.
							</p>
						</div>

						<div className='mt-auto pt-8'>
							<div className='border-t border-white/10 pt-5'>
								<p className='text-sm font-semibold text-white'>
									Alex Morgan
								</p>

								<p className='mt-1 text-xs text-gray-500'>
									Software Engineer
								</p>
							</div>
						</div>
					</article>

					{/* Testimonial 2 */}
					<article className='flex flex-col rounded-lg border border-white/10 bg-white/3 p-7 transition duration-300 hover:border-white/20 hover:bg-white/5'>
						<div className='flex items-center justify-between'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
								SW
							</div>

							<span className='text-sm tracking-widest text-cyan-400'>
								★★★★★
							</span>
						</div>

						<div className='mt-7'>
							<span className='text-4xl leading-none text-cyan-400/40'>
								“
							</span>

							<p className='-mt-2 text-[15px] leading-7 text-gray-300'>
								The interview preparation feature made my
								preparation much more structured. I could
								practice questions based on the role I was
								actually applying for.
							</p>
						</div>

						<div className='mt-auto pt-8'>
							<div className='border-t border-white/10 pt-5'>
								<p className='text-sm font-semibold text-white'>
									Sarah Wilson
								</p>

								<p className='mt-1 text-xs text-gray-500'>
									Product Designer
								</p>
							</div>
						</div>
					</article>

					{/* Testimonial 3 */}
					<article className='flex flex-col rounded-lg border border-white/10 bg-white/3 p-7 transition duration-300 hover:border-white/20 hover:bg-white/5'>
						<div className='flex items-center justify-between'>
							<div className='flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-sm font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
								DC
							</div>

							<span className='text-sm tracking-widest text-cyan-400'>
								★★★★★
							</span>
						</div>

						<div className='mt-7'>
							<span className='text-4xl leading-none text-cyan-400/40'>
								“
							</span>

							<p className='-mt-2 text-[15px] leading-7 text-gray-300'>
								I used ResumeAI to review my resume before
								applying for new roles. The ATS-focused
								suggestions helped me make my resume clearer and
								more targeted.
							</p>
						</div>

						<div className='mt-auto pt-8'>
							<div className='border-t border-white/10 pt-5'>
								<p className='text-sm font-semibold text-white'>
									Daniel Carter
								</p>

								<p className='mt-1 text-xs text-gray-500'>
									Backend Developer
								</p>
							</div>
						</div>
					</article>
				</div>
			</section>

			{/* ================= FOOTER ================= */}
			<footer className='relative z-10 border-t border-white/10 bg-black/20'>
				<div className='mx-auto max-w-6xl px-6 py-14'>
					<div className='grid gap-10 md:grid-cols-4'>
						<div>
							<h4 className='text-xl font-semibold'>ResumeAI</h4>
							<p className='mt-3 text-sm leading-6 text-gray-400'>
								AI-powered resume analysis and interview
								preparation platform for modern job seekers.
							</p>
						</div>

						<div>
							<h5 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300'>
								Product
							</h5>
							<ul className='space-y-3 text-sm text-gray-400'>
								<li>
									<a
										href='#features'
										className='hover:text-white'
									>
										Resume Analysis
									</a>
								</li>
								<li>
									<a
										href='#features'
										className='hover:text-white'
									>
										ATS Optimization
									</a>
								</li>
								<li>
									<a
										href='#workflow'
										className='hover:text-white'
									>
										Interview Prep
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h5 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300'>
								Company
							</h5>
							<ul className='space-y-3 text-sm text-gray-400'>
								<li>
									<a
										href='#'
										className='hover:text-white'
									>
										About
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white'
									>
										Privacy
									</a>
								</li>
								<li>
									<a
										href='#'
										className='hover:text-white'
									>
										Terms
									</a>
								</li>
							</ul>
						</div>

						<div>
							<h5 className='mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300'>
								Account
							</h5>

							<div className='flex flex-col gap-3'>
								<a
									href='auth/signin'
									className='rounded-md border border-white/10 px-4 py-2 text-center text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
								>
									Sign In
								</a>

								<a
									href='auth/signup'
									className='rounded-md bg-cyan-400 px-4 py-2 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300'
								>
									Create Account
								</a>
							</div>
						</div>
					</div>

					<div className='mt-12 border-t border-white/10 pt-6 text-center text-sm text-gray-500'>
						© 2026 ResumeAI. All rights reserved.
					</div>
				</div>
			</footer>
		</main>
	)
}