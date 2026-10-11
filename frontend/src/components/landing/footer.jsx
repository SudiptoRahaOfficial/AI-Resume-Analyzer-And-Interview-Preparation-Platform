'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ArrowRightIcon from '@/components/common/ArrowRightIcon'
import ArrowUpIcon from '@/components/common/ArrowUpIcon'

const footerGroups = [
	{
		title: 'Useful Links',
		links: [
			{ label: 'Get In Touch', href: '/contact' },
			{ label: 'Careers', href: '/careers' },
			{ label: 'Privacy Policy', href: '/privacy-policy' },
			{ label: 'Terms & Conditions', href: '/terms-conditions' },
		],
	},
	{
		title: 'Product',
		links: [
			{ label: 'Features', href: '/#features' },
			{ label: 'How It Works', href: '/#how-it-works' },
			{ label: 'Pricing', href: '/#pricing' },
			{ label: 'Testimonials', href: '/#testimonials' },
		],
	},
	{
		title: 'Resources',
		links: [
			{ label: 'Resume Analysis', href: '/#features' },
			{ label: 'Interview Preparation', href: '/#features' },
			{ label: 'ATS Optimization', href: '/#features' },
			{ label: 'Career Preparation', href: '/#how-it-works' },
		],
	},
]

const socialLinks = [
	{
		name: 'GitHub',
		href: 'https://github.com',
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='currentColor'
				className='h-4.5 w-4.5'
				aria-hidden='true'
			>
				<path d='M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.07c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.77 1.92 3.48 1.3.1-.71.39-1.2.71-1.47-2.47-.28-5.07-1.24-5.07-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.66.12 2.94.71.78 1.14 1.77 1.14 2.98 0 4.27-2.6 5.21-5.08 5.49.4.35.76 1.02.76 2.06V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z' />
			</svg>
		),
	},
	{
		name: 'LinkedIn',
		href: 'https://www.linkedin.com',
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='currentColor'
				className='h-4.5 w-4.5'
				aria-hidden='true'
			>
				<path d='M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.44H4.98V9h2.95v9.44ZM6.45 7.71a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12 10.73H15.5v-4.59c0-1.09-.02-2.5-1.52-2.5-1.52 0-1.75 1.18-1.75 2.42v4.67H9.28V9h2.83v1.29h.04a3.1 3.1 0 0 1 2.79-1.53c2.98 0 3.53 1.96 3.53 4.5v5.18Z' />
			</svg>
		),
	},
	{
		name: 'X',
		href: 'https://x.com',
		icon: (
			<svg
				viewBox='0 0 24 24'
				fill='currentColor'
				className='h-4.5 w-4.5'
				aria-hidden='true'
			>
				<path d='M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.36L5.6 22H2.47l7.25-8.29L1.8 2h6.4l4.43 6.96L18.9 2Zm-1.1 18h1.73L7.28 3.89H5.43L17.8 20Z' />
			</svg>
		),
	},
]

export default function Footer() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')
	const [messageType, setMessageType] = useState('info')

	// current year calculation
	const [year, setYear] = useState(null)
	useEffect(() => {
		setYear(new Date().getFullYear())
	}, [])

	const handleSubscribe = (event) => {
		event.preventDefault()

		const normalizedEmail = email.trim()
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

		if (!normalizedEmail || !emailPattern.test(normalizedEmail)) {
			setMessage('Please enter a valid email address.')
			setMessageType('error')
			return
		}

		setMessage(
			'Email validated. Newsletter subscriptions are not connected yet.',
		)
		setMessageType('info')
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)')
				.matches
				? 'auto'
				: 'smooth',
		})
	}

	const linkClass =
		'text-[13px] leading-6 text-slate-400 transition-colors duration-200 hover:text-indigo-300 focus-visible:text-indigo-300 focus-visible:outline-none motion-reduce:transition-none'

	return (
		<footer className='relative isolate overflow-hidden border-t border-white/[0.07] bg-[#030712] text-slate-400'>
			{/* Background decoration */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute -top-40 left-[12%] h-80 w-80 rounded-full bg-indigo-600/[0.07] blur-[130px]' />
				<div className='absolute -bottom-40 right-[5%] h-80 w-80 rounded-full bg-blue-600/5 blur-[130px]' />
				<div className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-indigo-400/20 to-transparent' />
			</div>

			{/* Main footer content */}
			<div className='mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-14 lg:px-10 lg:py-16'>
				<div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[2.4fr_0.75fr_0.85fr_0.65fr] lg:gap-x-3 xl:grid-cols-[2.5fr_0.75fr_0.85fr_0.65fr] xl:gap-x-4'>
					{/* Branding and social links */}
					<div className='w-full max-w-xl'>
						<Link
							href='/'
							aria-label='ResumeAI home'
							className='inline-flex items-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#030712]'
						>
							<span className='text-[25px] font-bold tracking-tight'>
								Resume
								<span className='text-indigo-400'>AI</span>
							</span>
						</Link>

						<p className='mt-4 max-w-md text-[13px] leading-7 text-slate-400'>
							Prepare smarter for your next career opportunity.
							Analyze your resume, identify skill gaps, and
							practice job-specific interviews with AI-powered
							guidance.
						</p>

						{/* Follow Us and Get Started in one row */}
						<div className='mt-6 flex flex-wrap items-center gap-x-15 gap-y-4'>
							<div className='flex items-center gap-2.5'>
								<span className='text-xs font-medium text-white'>
									Follow Us
								</span>

								{socialLinks.map((social) => (
									<a
										key={social.name}
										href={social.href}
										target='_blank'
										rel='noopener noreferrer'
										aria-label={`Visit ${social.name}`}
										className='flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/2.5 text-slate-400 transition-all duration-200 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 motion-reduce:transition-none'
									>
										{social.icon}
									</a>
								))}
							</div>

							<Link
								href='/signup'
								className='group inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 transition-colors duration-200 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] motion-reduce:transition-none'
							>
								Get Started
								<ArrowRightIcon />
							</Link>
						</div>
					</div>

					{/* Product, Resources and Account */}
					{footerGroups.map((group) => (
						<div key={group.title}>
							<h2 className='mb-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white'>
								{group.title}
							</h2>

							<nav
								aria-label={`${group.title} links`}
								className='flex flex-col items-start gap-2.5'
							>
								{group.links.map((link) =>
									link.href.startsWith('/') ? (
										<Link
											key={link.label}
											href={link.href}
											className={linkClass}
										>
											{link.label}
										</Link>
									) : (
										<a
											key={link.label}
											href={link.href}
											className={linkClass}
										>
											{link.label}
										</a>
									),
								)}
							</nav>
						</div>
					))}
				</div>

				{/* Newsletter section */}
				<div className='mt-12 border-t border-white/8 pt-9 sm:mt-14 sm:pt-10'>
					<div className='grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12'>
						<div className='max-w-lg'>
							<span className='text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-300'>
								Newsletter
							</span>

							<h2 className='mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl'>
								Stay ahead of the curve.
							</h2>

							<p className='mt-2 max-w-md text-[13px] leading-6 text-slate-400'>
								Get resume tips, interview advice, and product
								updates in your inbox.
							</p>
						</div>

						<div className='w-full lg:justify-self-end lg:max-w-xl'>
							<form
								onSubmit={handleSubscribe}
								className='w-full'
							>
								<label
									htmlFor='footer-email'
									className='sr-only'
								>
									Email address
								</label>

								<div className='flex flex-col gap-3 sm:flex-row sm:rounded-xl sm:border sm:border-white/10 sm:bg-white/2.5 sm:p-1.5 sm:focus-within:border-indigo-400/50 sm:focus-within:ring-2 sm:focus-within:ring-indigo-400/10'>
									<input
										id='footer-email'
										name='email'
										type='email'
										autoComplete='email'
										required
										value={email}
										onChange={(event) => {
											setEmail(event.target.value)
											setMessage('')
											setMessageType('info')
										}}
										placeholder='Enter your email address'
										className='min-w-0 flex-1 rounded-lg border border-white/10 bg-white/2.5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-500 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10 sm:border-0 sm:bg-transparent sm:focus:border-transparent sm:focus:ring-0'
									/>

									<button
										type='submit'
										className='group inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] motion-reduce:transition-none cursor-pointer'
									>
										Subscribe
										<ArrowRightIcon />
									</button>
								</div>

								<p
									aria-live='polite'
									className={`mt-3 min-h-5 text-xs leading-5 ${
										messageType === 'error'
											? 'text-rose-300'
											: message
												? 'text-amber-300'
												: 'text-slate-500'
									}`}
								>
									{message ||
										'No spam. Unsubscribe whenever you want.'}
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom bar */}
			<div className='border-t border-white/[0.07] bg-black/10'>
				<div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 sm:px-8 md:flex-row lg:px-10'>
					<p className='text-center text-xs leading-6 text-slate-500 sm:text-[13px]'>
						&copy; {year ?? ''} ResumeAI. All rights reserved.
					</p>

					<button
						type='button'
						onClick={scrollToTop}
						className='group inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/2.5 px-3.5 py-2.5 text-xs font-medium text-slate-400 transition-all duration-200 hover:border-indigo-400/30 hover:bg-indigo-500/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 motion-reduce:transition-none cursor-pointer'
					>
						Back to top
						<ArrowUpIcon />
					</button>
				</div>
			</div>
		</footer>
	)
}