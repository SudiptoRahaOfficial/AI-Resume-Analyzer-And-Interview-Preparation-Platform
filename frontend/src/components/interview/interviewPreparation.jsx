'use client'

import { useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import {
	ArrowLeft,
	ArrowRight,
	FileText,
	Sparkles,
	Upload,
	X,
} from 'lucide-react'

// interview preparation page
export default function InterviewPreparation() {
	// router for page navigation
	const router = useRouter()

	// resume input ref
	const resumeInputRef = useRef(null)

	// resume state
	const [resume, setResume] = useState(null)

	// self description state
	const [selfDescription, setSelfDescription] = useState('')

	// job description state
	const [jobDescription, setJobDescription] = useState('')

	// handle resume selection
	const handleResumeChange = (event) => {
		const file = event.target.files?.[0]

		if (!file) return

		setResume(file)
	}

	// remove selected resume
	const removeResume = () => {
		setResume(null)

		if (resumeInputRef.current) {
			resumeInputRef.current.value = ''
		}
	}

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}
			<div className='pointer-events-none fixed inset-0 overflow-hidden'>
				<div className='absolute left-[10%] top-48 h-128 w-lg rounded-full bg-cyan-500/[0.07] blur-[120px]' />

				<div className='absolute right-40 top-[20%] h-120 w-120 rounded-full bg-blue-500/6 blur-[120px]' />

				<div className='absolute bottom-48 left-[35%] h-112 w-md rounded-full bg-cyan-500/4 blur-[110px]' />
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

						<span>Interview Preparation</span>
					</div>

					<div className='mt-3 flex flex-col justify-between gap-3 lg:flex-row lg:items-end'>
						<div>
							<h1 className='text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
								Prepare for your next interview
							</h1>

							<p className='mt-2 max-w-2xl text-sm leading-6 text-gray-500'>
								Provide the information below and ResumeAI will
								create a preparation guide tailored to your
								target role.
							</p>
						</div>

						<p className='hidden text-xs text-gray-600 lg:block'>
							Your information stays private
						</p>
					</div>
				</section>

				{/* Input workspace */}
				<section className='mx-auto mt-6 max-w-375'>
					<div className='grid gap-4 lg:grid-cols-3'>
						{/* Resume Card */}
						<div className='rounded-xl border border-white/10 bg-white/2.5'>
							{/* Card header */}
							<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
								<div>
									<h2 className='text-[15px] font-semibold text-white'>
										Resume
									</h2>

									<p className='mt-0.5 text-xs text-gray-600'>
										PDF acceptable only
									</p>
								</div>

								<span className='text-[11px] font-medium text-cyan-400'>
									Required
								</span>
							</div>

							{/* Card content */}
							<div className='p-4'>
								{!resume ? (
									<button
										type='button'
										onClick={() =>
											resumeInputRef.current?.click()
										}
										className='group flex h-37.5 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/10 bg-black/20 transition hover:border-cyan-400/30 hover:bg-cyan-400/2'
									>
										<div className='flex h-9 w-9 items-center justify-center rounded-lg bg-white/4 text-gray-500 ring-1 ring-white/10 transition group-hover:bg-cyan-400/10 group-hover:text-cyan-300'>
											<Upload className='h-4 w-4' />
										</div>

										<p className='mt-2.5 text-sm font-medium text-gray-300'>
											Upload your resume
										</p>

										<p className='mt-1 text-xs text-gray-600'>
											Click to browse files
										</p>
									</button>
								) : (
									<div className='flex h-37.5 flex-col justify-between'>
										<div className='flex items-center gap-3 rounded-lg border border-cyan-400/10 bg-cyan-400/3 p-3'>
											<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-cyan-400/10'>
												<FileText className='h-4 w-4 text-cyan-300' />
											</div>

											<div className='min-w-0 flex-1'>
												<p className='truncate text-sm font-medium text-gray-200'>
													{resume.name}
												</p>

												<p className='mt-0.5 text-xs text-gray-600'>
													{(
														resume.size /
														1024 /
														1024
													).toFixed(2)}{' '}
													MB
												</p>
											</div>

											<button
												type='button'
												onClick={removeResume}
												aria-label='Remove resume'
												className='flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-gray-600 transition hover:bg-red-400/10 hover:text-red-300'
											>
												<X className='h-3.5 w-3.5' />
											</button>
										</div>

										<button
											type='button'
											onClick={() =>
												resumeInputRef.current?.click()
											}
											className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/2 py-2 text-xs font-medium text-gray-500 transition hover:border-white/15 hover:bg-white/4 hover:text-gray-300'
										>
											<Upload className='h-3.5 w-3.5' />
											Replace resume
										</button>
									</div>
								)}

								<input
									ref={resumeInputRef}
									type='file'
									accept='.pdf'
									onChange={handleResumeChange}
									className='hidden'
								/>
							</div>
						</div>

						{/* Self Description Card */}
						<div className='rounded-xl border border-white/10 bg-white/2.5'>
							{/* Card header */}
							<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
								<div>
									<h2 className='text-[15px] font-semibold text-white'>
										About you
									</h2>

									<p className='mt-0.5 text-xs text-gray-600'>
										Experience, skills and strengths
									</p>
								</div>

								<span className='text-[11px] font-medium text-gray-600'>
									Optional
								</span>
							</div>

							{/* Card content */}
							<div className='p-4'>
								<textarea
									value={selfDescription}
									onChange={(event) =>
										setSelfDescription(event.target.value)
									}
									placeholder='Describe your experience, strengths, technologies, projects, or anything else that may not be fully represented in your resume...'
									className='h-37.5 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3.5 py-3 text-xs leading-5 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-cyan-400/30 focus:bg-black/30 focus:ring-1 focus:ring-cyan-400/10'
								/>
							</div>
						</div>

						{/* Job Description Card */}
						<div className='rounded-xl border border-white/10 bg-white/2.5'>
							{/* Card header */}
							<div className='flex items-center justify-between border-b border-white/10 px-4 py-3.5'>
								<div>
									<h2 className='text-[15px] font-semibold text-white'>
										Target job description
									</h2>

									<p className='mt-0.5 text-xs text-gray-600'>
										Position you are applying for
									</p>
								</div>

								<span className='text-[11px] font-medium text-cyan-400'>
									Required
								</span>
							</div>

							{/* Card content */}
							<div className='p-4'>
								<textarea
									value={jobDescription}
									onChange={(event) =>
										setJobDescription(event.target.value)
									}
									placeholder='Paste the job description of the position you are preparing for...'
									className='h-37.5 w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3.5 py-3 text-xs leading-5 text-gray-300 outline-none transition placeholder:text-gray-700 focus:border-cyan-400/30 focus:bg-black/30 focus:ring-1 focus:ring-cyan-400/10'
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Generate section */}
				<section className='mx-auto mt-5 max-w-375'>
					<div className='flex flex-col items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/2.5 px-5 py-4 sm:flex-row'>
						<div className='flex items-center gap-3'>
							<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10'>
								<Sparkles className='h-4 w-4 text-cyan-300' />
							</div>

							<div>
								<p className='text-xs font-medium text-gray-300'>
									Ready to prepare?
								</p>

								<p className='mt-0.5 text-[11px] text-gray-600'>
									ResumeAI will create a personalized
									interview guide from your information.
								</p>
							</div>
						</div>

						<button
							type='button'
							className='group flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 active:scale-[0.99] sm:w-auto'
						>
							<Sparkles className='h-3.5 w-3.5' />
							Generate Interview Guide
							<ArrowRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
						</button>
					</div>
				</section>
			</div>
		</main>
	)
}