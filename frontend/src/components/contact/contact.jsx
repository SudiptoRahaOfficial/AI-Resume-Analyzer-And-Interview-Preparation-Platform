'use client'

import { useRouter } from 'next/navigation'

export default function ContactPage() {
	const router = useRouter()

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			{/* Header */}
			<header className='relative z-20 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
				<div className='mx-auto flex h-16 max-w-6xl items-center justify-between px-6'>
					<button
						onClick={() => router.push('/')}
						className='text-lg font-semibold tracking-tight transition hover:text-cyan-300 cursor-pointer'
					>
						ResumeAI
					</button>

					<button
						onClick={() => router.back()}
						className='rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white cursor-pointer'
					>
						Back
					</button>
				</div>
			</header>

			<section className='relative z-10 mx-auto max-w-6xl px-6 py-12'>
				{/* Hero */}
				<div className='mb-14 text-center'>
					<div className='mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300'>
						Contact Us
					</div>

					<h1 className='text-4xl font-bold tracking-tight md:text-5xl'>
						We'd love to hear from you
					</h1>

					<p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-400'>
						Have questions about ResumeAI, feedback, or partnership
						inquiries? Send us a message and we'll get back to you.
					</p>
				</div>

				<div className='grid gap-8 lg:grid-cols-5'>
					{/* Contact Information */}
					<div className='space-y-6 lg:col-span-2'>
						<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
							<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M3 8l9 6 9-6M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z'
									/>
								</svg>
							</div>

							<h2 className='text-lg font-semibold'>Email</h2>

							<p className='mt-2 text-sm leading-6 text-gray-400'>
								Reach out for support, business inquiries, or
								general questions.
							</p>

							<p className='mt-4 text-cyan-300'>
								support@resumeai.com
							</p>
						</div>

						<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
							<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M17 8h2a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2h2m10 0V6a5 5 0 00-10 0v2m10 0H7'
									/>
								</svg>
							</div>

							<h2 className='text-lg font-semibold'>
								Support Hours
							</h2>

							<p className='mt-2 text-sm leading-6 text-gray-400'>
								Monday – Friday
								<br />
								9:00 AM – 6:00 PM (UTC)
							</p>
						</div>

						<div className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
							<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
								<svg
									className='h-6 w-6 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
									/>
								</svg>
							</div>

							<h2 className='text-lg font-semibold'>
								Response Time
							</h2>

							<p className='mt-2 text-sm leading-6 text-gray-400'>
								We typically respond within 24 hours during
								business days.
							</p>
						</div>
					</div>

					{/* Contact Form */}
					<div className='lg:col-span-3'>
						<div className='rounded-xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl'>
							<div className='mb-8'>
								<h2 className='text-2xl font-semibold'>
									Send us a message
								</h2>

								<p className='mt-2 text-sm leading-6 text-gray-400'>
									Fill out the form below to reachout us
								</p>
							</div>

							<form className='space-y-5'>
								{/* Name */}
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-300'>
										Full Name
									</label>

									<input
										type='text'
										placeholder='Enter your full name'
										className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
									/>
								</div>

								{/* Email */}
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-300'>
										Email Address
									</label>

									<input
										type='email'
										placeholder='Enter your email'
										className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
									/>
								</div>

								{/* Subject */}
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-300'>
										Subject
									</label>

									<input
										type='text'
										placeholder='What is this about?'
										className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
									/>
								</div>

								{/* Message */}
								<div>
									<label className='mb-2 block text-sm font-medium text-gray-300'>
										Message
									</label>

									<textarea
										rows={7}
										placeholder='Write your message...'
										className='w-full resize-none rounded-md border border-white/10 bg-black/20 px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400/60 focus:bg-white/3 focus:ring-1 focus:ring-cyan-400/30'
									/>
								</div>

								{/* Submit */}
								<button
									type='submit'
									className='w-full rounded-md bg-cyan-400 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/10 cursor-pointer'
								>
									Send Message
								</button>
							</form>
						</div>
					</div>
				</div>

				{/* Bottom CTA */}
				<div className='mt-14 rounded-xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl'>
					<h3 className='text-2xl font-semibold'>
						Building the future of AI career preparation
					</h3>

					<p className='mx-auto mt-3 max-w-2xl text-gray-400'>
						ResumeAI helps job seekers analyze resumes, identify
						skill gaps, and prepare for interviews with AI-powered
						tools.
					</p>
				</div>
			</section>
		</main>
	)
}