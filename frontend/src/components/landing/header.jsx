'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LandingHeader() {
	const [menuOpen, setMenuOpen] = useState(false)
	const closeMenu = () => setMenuOpen(false)

	const navLinks = [
		{ label: 'Features', href: '/#features' },
		{ label: 'How It Works', href: '/#how-it-works' },
		{ label: 'Pricing', href: '/#pricing' },
		{ label: 'Testimonials', href: '/#testimonials' },
		{ label: 'FAQ', href: '/#faq' },
	]

	return (
		<header className='sticky top-0 z-50 border-b border-slate-800 bg-slate-950'>
			<div className='mx-auto max-w-7xl px-5 sm:px-8'>
				<div className='relative flex min-h-19 items-center justify-between'>
					{/* Logo */}
					<Link
						href='/'
						onClick={closeMenu}
						aria-label='ResumeAI home'
						className='inline-flex shrink-0 items-center gap-2.5 text-white'
					>
						<span className='text-xl font-bold tracking-tight'>
							Resume<span className='text-indigo-400'>AI</span>
						</span>
					</Link>

					{/* Centered desktop navigation */}
					<nav
						aria-label='Main navigation'
						className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex'
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className='whitespace-nowrap text-sm font-medium text-slate-400 transition-colors hover:text-indigo-400'
							>
								{link.label}
							</a>
						))}
					</nav>

					{/* Desktop actions */}
					<div className='ml-auto hidden shrink-0 items-center gap-2 md:flex'>
						<Link
							href='/signin'
							className='rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-white'
						>
							Sign In
						</Link>

						<Link
							href='/signup'
							className='inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950'
						>
							Get Started
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='16'
								height='16'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								aria-hidden='true'
							>
								<path d='M5 12h14' />
								<path d='m12 5 7 7-7 7' />
							</svg>
						</Link>
					</div>

					{/* Mobile menu button */}
					<button
						type='button'
						onClick={() => {
							console.log('Mobile menu clicked')
							setMenuOpen((previous) => !previous)
						}}
						aria-label={menuOpen ? 'Close menu' : 'Open menu'}
						aria-expanded={menuOpen}
						aria-controls='mobile-navigation'
						className='flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-xl text-slate-300 hover:bg-slate-800 md:hidden'
					>
						{menuOpen ? '×' : '☰'}
					</button>
				</div>
			</div>

			{/* Mobile navigation */}
			<div
				id='mobile-navigation'
				aria-hidden={!menuOpen}
				inert={!menuOpen}
				className={`
                    grid grid-cols-1
                    transition-[grid-template-rows,opacity,transform]
                    duration-200 ease-in-out
                    motion-reduce:transition-none
                    md:hidden
                    ${
						menuOpen
							? 'grid-rows-[1fr] translate-y-0 opacity-100'
							: 'grid-rows-[0fr] -translate-y-2 opacity-0'
					}
                `}
			>
				<div className='min-h-0 overflow-hidden'>
					<nav
						aria-label='Mobile navigation'
						className='flex flex-col gap-1 border-t border-slate-800 bg-slate-950 px-5 py-4 sm:px-8'
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								tabIndex={menuOpen ? 0 : -1}
								onClick={closeMenu}
								className='rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-900 hover:text-indigo-400'
							>
								{link.label}
							</a>
						))}

						<div className='mt-3 grid grid-cols-2 gap-3 border-t border-slate-800 pt-4'>
							<Link
								href='/signin'
								tabIndex={menuOpen ? 0 : -1}
								onClick={closeMenu}
								className='rounded-lg border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-300 transition-colors hover:bg-slate-900 hover:text-white'
							>
								Sign In
							</Link>

							<Link
								href='/signup'
								tabIndex={menuOpen ? 0 : -1}
								onClick={closeMenu}
								className='rounded-lg bg-indigo-500 px-4 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
							>
								Get Started
							</Link>
						</div>
					</nav>
				</div>
			</div>
		</header>
	)
}