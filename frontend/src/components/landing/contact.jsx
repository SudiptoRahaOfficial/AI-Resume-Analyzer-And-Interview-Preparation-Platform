'use client'

import { useState } from 'react'
import ArrowRightIcon from '@/components/common/ArrowRightIcon'

export default function Contact() {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})

	const [status, setStatus] = useState('')

	const handleChange = (event) => {
		const { name, value } = event.target

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}))

		setStatus('')
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		if (
			!formData.name.trim() ||
			!formData.email.trim() ||
			!formData.subject.trim() ||
			!formData.message.trim()
		) {
			setStatus('Please complete all fields.')
			return
		}

		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!emailPattern.test(formData.email.trim())) {
			setStatus('Please enter a valid email address.')
			return
		}

		// Connect this form to your backend contact API.
		setStatus(
			'Your message is ready, but the contact service is not connected yet.',
		)
	}

	const contactOptions = [
		{
			title: 'General inquiries',
			description:
				'Have a question about ResumeAI or need help getting started?',
			detail: 'Questions about the platform',
		},
		{
			title: 'Product feedback',
			description:
				'Share suggestions that could make your career preparation experience better.',
			detail: 'Ideas and suggestions',
		},
		{
			title: 'Partnerships',
			description:
				'Interested in collaborating with us on a career-focused initiative?',
			detail: 'Business and collaboration',
		},
	]

	return (
		<main className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-300'>
			{/* Main content */}
			<section className='relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24'>
				{/* Background glow effects */}
				<div
					aria-hidden='true'
					className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
				>
					<div className='absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[120px]' />

					<div className='absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/6 blur-[110px]' />
				</div>

				{/* Page heading */}
				<div className='mx-auto mb-12 max-w-3xl text-center sm:mb-16'>
					<h2
						id='faq-heading'
						className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'
					>
						We Love To Hear
						<span className='ml-2 bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
							From You
						</span>
					</h2>

					<p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base'>
						Have a question, an idea, or feedback about ResumeAI?
						Send us a message and tell us how we can help.
					</p>
				</div>

				{/* Contact layout */}
				<div className='mx-auto grid max-w-6xl items-stretch gap-8 lg:grid-cols-[2fr_3fr] lg:gap-10'>
					{/* Contact information */}
					<aside className='relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8'>
						{/* Background glow */}
						<div
							aria-hidden='true'
							className='pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl'
						/>

						<div className='relative'>
							<span className='inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-medium tracking-wide text-indigo-300'>
								<span className='h-1.5 w-1.5 rounded-full bg-indigo-400' />
								CONTACT OUR TEAM
							</span>

							<h2 className='mt-5 text-3xl font-semibold leading-tight tracking-tight text-white'>
								Let&apos;s start a
								<span className='block text-indigo-400'>
									conversation.
								</span>
							</h2>

							<p className='mt-4 text-sm leading-7 text-slate-400'>
								Have a question about ResumeAI, feedback to
								share, or an idea for collaboration? Send us a
								message and tell us how we can help.
							</p>

							{/* Contact options */}
							<div className='mt-8 divide-y divide-white/8'>
								{contactOptions.map((option, index) => (
									<div
										key={option.title}
										className='flex gap-4 py-5 first:pt-0 last:pb-0'
									>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-indigo-300'>
											{String(index + 1).padStart(2, '0')}
										</div>

										<div className='min-w-0'>
											<h3 className='text-sm font-semibold text-white'>
												{option.title}
											</h3>

											<p className='mt-1.5 text-sm leading-6 text-slate-400'>
												{option.description}
											</p>

											<p className='mt-2 text-xs leading-5 text-slate-500'>
												{option.detail}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Security reminder */}
						<div className='relative mt-auto pt-8'>
							<div className='rounded-xl border border-white/10 bg-slate-950/40 p-4'>
								<div className='flex items-start gap-3'>
									<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-400/10 text-indigo-300'>
										<svg
											viewBox='0 0 24 24'
											fill='none'
											stroke='currentColor'
											strokeWidth='1.7'
											strokeLinecap='round'
											strokeLinejoin='round'
											aria-hidden='true'
											className='h-4 w-4'
										>
											<path d='M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z' />
											<path d='m9 12 2 2 4-4' />
										</svg>
									</div>

									<div>
										<h3 className='text-sm font-medium text-white'>
											Keep your account secure
										</h3>

										<p className='mt-2 text-xs leading-6 text-slate-400'>
											Never share passwords, verification
											codes, access tokens, or other
											sensitive authentication details in
											your message.
										</p>
									</div>
								</div>
							</div>
						</div>
					</aside>

					{/* Contact form */}
					<section className='min-w-0 rounded-2xl border border-white/10 bg-slate-900/40 p-6 sm:p-8 lg:p-9'>
						{/* Form heading */}
						<div>
							<p className='text-xs font-semibold uppercase tracking-[0.16em] text-indigo-400'>
								Send an inquiry
							</p>

							<h2 className='mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl'>
								How can we help?
							</h2>

							<p className='mt-3 text-sm leading-7 text-slate-400'>
								Complete the form below with details about your
								inquiry.
							</p>
						</div>

						<form
							onSubmit={handleSubmit}
							className='mt-8 space-y-6'
						>
							{/* Name and email */}
							<div className='grid gap-5 sm:grid-cols-2'>
								<div>
									<label
										htmlFor='contact-name'
										className='mb-2.5 block text-sm font-medium text-slate-200'
									>
										Full name
										<span className='ml-1 text-indigo-400'>
											*
										</span>
									</label>

									<input
										id='contact-name'
										name='name'
										type='text'
										autoComplete='name'
										required
										maxLength={100}
										value={formData.name}
										onChange={handleChange}
										placeholder='Your full name'
										className='w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-400/10'
									/>
								</div>

								<div>
									<label
										htmlFor='contact-email'
										className='mb-2.5 block text-sm font-medium text-slate-200'
									>
										Email address
										<span className='ml-1 text-indigo-400'>
											*
										</span>
									</label>

									<input
										id='contact-email'
										name='email'
										type='email'
										autoComplete='email'
										required
										maxLength={254}
										value={formData.email}
										onChange={handleChange}
										placeholder='you@example.com'
										className='w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-400/10'
									/>
								</div>
							</div>

							{/* Subject */}
							<div>
								<label
									htmlFor='contact-subject'
									className='mb-2.5 block text-sm font-medium text-slate-200'
								>
									Subject
									<span className='ml-1 text-indigo-400'>
										*
									</span>
								</label>

								<input
									id='contact-subject'
									name='subject'
									type='text'
									required
									maxLength={150}
									value={formData.subject}
									onChange={handleChange}
									placeholder='What would you like to discuss?'
									className='w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm text-white outline-none transition duration-200 placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-400/10'
								/>
							</div>

							{/* Message */}
							<div>
								<div className='mb-2.5 flex items-center justify-between gap-3'>
									<label
										htmlFor='contact-message'
										className='text-sm font-medium text-slate-200'
									>
										Your message
										<span className='ml-1 text-indigo-400'>
											*
										</span>
									</label>

									<span className='text-xs text-slate-500'>
										Min. 10 characters
									</span>
								</div>

								<textarea
									id='contact-message'
									name='message'
									required
									minLength={10}
									maxLength={5000}
									rows={7}
									value={formData.message}
									onChange={handleChange}
									placeholder='Describe your question, feedback, or idea...'
									className='w-full resize-y rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3.5 text-sm leading-7 text-white outline-none transition duration-200 placeholder:text-slate-600 hover:border-white/20 focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-400/10'
								/>
							</div>

							{/* Submission status */}
							{status && (
								<p
									role='status'
									aria-live='polite'
									className='rounded-xl border border-indigo-400/20 bg-indigo-400/5 px-4 py-3 text-sm leading-6 text-indigo-200'
								>
									{status}
								</p>
							)}

							{/* Submit button */}
							<div className='border-t border-white/10 pt-6'>
								<button
									type='submit'
									className='group inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/10 transition duration-200 hover:bg-indigo-400 hover:shadow-indigo-500/20 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2 focus:ring-offset-slate-950 sm:w-auto cursor-pointer'
								>
									Send Message
									<ArrowRightIcon />
								</button>

								<p className='mt-4 text-xs leading-5 text-slate-500'>
									Your information should only be used to
									respond to your inquiry. Message delivery
									requires a configured contact service.
								</p>
							</div>
						</form>
					</section>
				</div>
			</section>
		</main>
	)
}