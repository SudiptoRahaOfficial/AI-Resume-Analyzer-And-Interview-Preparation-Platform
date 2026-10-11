'use client'

import { useState } from 'react'

const testimonials = [
	{
		id: 1,
		name: 'Alex Morgan',
		role: 'Software Engineer',
		category: 'Early-career professional',
		initials: 'AM',
		rating: 5,
		quote: 'The interview preparation helped me understand what hiring managers actually look for. The targeted questions and preparation plan made my practice sessions much more effective.',
		result: 'More confident interview preparation',
	},
	{
		id: 2,
		name: 'Sarah Chen',
		role: 'Frontend Developer',
		category: 'Job seeker',
		initials: 'SC',
		rating: 5,
		quote: 'I used the resume analysis to identify areas that needed improvement. The feedback gave me a clearer direction for making my experience more relevant to each role.',
		result: 'A clearer resume improvement strategy',
	},
	{
		id: 3,
		name: 'Daniel Brooks',
		role: 'Backend Developer',
		category: 'Software engineering candidate',
		initials: 'DB',
		rating: 5,
		quote: 'The role-specific technical questions helped me organize my preparation. Instead of studying randomly, I could focus on the skills and concepts most relevant to the job.',
		result: 'More focused technical practice',
	},
	{
		id: 4,
		name: 'Priya Sharma',
		role: 'Data Analyst',
		category: 'Career transitioner',
		initials: 'PS',
		rating: 5,
		quote: 'The skill gap analysis helped me see which areas of my background needed more attention. It made my next steps feel more structured and manageable.',
		result: 'A more structured learning plan',
	},
	{
		id: 5,
		name: 'Michael Rivera',
		role: 'Full Stack Developer',
		category: 'Job seeker',
		initials: 'MR',
		rating: 5,
		quote: 'Having interview questions and resume feedback in one place made my preparation easier to organize. I could review my weak areas and plan what to work on next.',
		result: 'A more organized preparation workflow',
	},
]

function StarRating({ rating }) {
	return (
		<div
			className='flex items-center gap-1'
			aria-label={`${rating} out of 5 stars`}
		>
			{Array.from({ length: 5 }, (_, index) => (
				<svg
					key={index}
					aria-hidden='true'
					viewBox='0 0 20 20'
					fill='currentColor'
					className={`h-4 w-4 ${
						index < rating ? 'text-amber-400' : 'text-slate-700'
					}`}
				>
					<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.63a1 1 0 00.95.69h3.817c.969 0 1.371 1.24.588 1.81l-3.088 2.244a1 1 0 00-.364 1.118l1.18 3.63c.3.921-.755 1.688-1.539 1.118l-3.088-2.244a1 1 0 00-1.176 0l-3.088 2.244c-.784.57-1.838-.197-1.539-1.118l1.18-3.63a1 1 0 00-.364-1.118L2.512 9.057c-.783-.57-.38-1.81.588-1.81h3.817a1 1 0 00.95-.69l1.182-3.63z' />
				</svg>
			))}
		</div>
	)
}

function QuoteIcon({ className = 'h-7 w-7' }) {
	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 24'
			fill='currentColor'
			className={className}
		>
			<path d='M7.17 6C4.87 7.57 3.5 10.03 3.5 13.1c0 2.95 1.65 4.9 4.1 4.9 2.08 0 3.55-1.55 3.55-3.55 0-1.93-1.32-3.3-3.12-3.3-.3 0-.57.04-.82.12.25-1.48 1.2-2.75 2.72-3.8L7.17 6zm9 0c-2.3 1.57-3.67 4.03-3.67 7.1 0 2.95 1.65 4.9 4.1 4.9 2.08 0 3.55-1.55 3.55-3.55 0-1.93-1.32-3.3-3.12-3.3-.3 0-.57.04-.82.12.25-1.48 1.2-2.75 2.72-3.8L16.17 6z' />
		</svg>
	)
}

function ArrowIcon({ direction = 'right' }) {
	return (
		<svg
			aria-hidden='true'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.8'
			strokeLinecap='round'
			strokeLinejoin='round'
			className='h-5 w-5'
		>
			{direction === 'left' ? (
				<path d='M19 12H5m7 7-7-7 7-7' />
			) : (
				<path d='M5 12h14m-7-7 7 7-7 7' />
			)}
		</svg>
	)
}

function TestimonialCard({ testimonial, isActive }) {
	return (
		<article
			className={`flex h-full flex-col rounded-2xl border p-6 transition-colors duration-300 sm:p-7 ${
				isActive
					? 'border-slate-800 bg-slate-900/70'
					: 'border-slate-800/70 bg-slate-900/50'
			}`}
		>
			{/* Rating */}
			<div className='mb-5 flex items-center justify-between'>
				<StarRating rating={testimonial.rating} />

				<QuoteIcon
					className={`h-7 w-7 ${
						isActive ? 'text-indigo-400/70' : 'text-slate-600'
					}`}
				/>
			</div>

			{/* Testimonial text */}
			<blockquote className='flex-1 text-sm leading-7 text-slate-300 sm:text-base'>
				“{testimonial.quote}”
			</blockquote>

			{/* Divider */}
			<div className='my-6 h-px bg-slate-800' />

			{/* User information */}
			<div className='flex items-center gap-3'>
				<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-sm font-semibold text-indigo-300'>
					{testimonial.initials}
				</div>

				<div className='min-w-0'>
					<p className='truncate text-sm font-semibold text-white'>
						{testimonial.name}
					</p>

					<p className='mt-1 truncate text-xs text-slate-400'>
						{testimonial.role}
					</p>
				</div>
			</div>
		</article>
	)
}

export default function Testimonials() {
	const [activeIndex, setActiveIndex] = useState(0)

	const totalTestimonials = testimonials.length

	const goToPrevious = () => {
		setActiveIndex(
			(current) => (current - 1 + totalTestimonials) % totalTestimonials,
		)
	}

	const goToNext = () => {
		setActiveIndex((current) => (current + 1) % totalTestimonials)
	}

	const goToSlide = (index) => {
		setActiveIndex(index)
	}

	return (
		<section
			id='testimonials'
			aria-labelledby='testimonials-heading'
			className='relative isolate overflow-hidden bg-slate-950 text-white pt-16 sm:pt-20 lg:pt-24'
		>
			{/* Background effects */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'
			>
				<div className='absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]' />
				<div className='absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/[0.07] blur-[120px]' />
			</div>

			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Section heading */}
				<div className='mx-auto mb-14 max-w-3xl text-center sm:mb-16'>
					<h2
						id='testimonials-heading'
						className='text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'
					>
						What People Are{' '}
						<span className='bg-linear-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent'>
							Saying
						</span>
					</h2>

					<p className='mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base'>
						Discover how structured interview practice and
						actionable resume feedback can help you prepare for your
						next career opportunity.
					</p>
				</div>

				{/* Center-focused carousel */}
				<div
					className='relative mx-auto max-w-6xl'
					aria-roledescription='carousel'
					aria-label='Testimonials'
				>
					<div className='relative h-115 overflow-hidden sm:h-105 lg:h-97.5'>
						{testimonials.map((testimonial, index) => {
							let offset =
								(index - activeIndex + totalTestimonials) %
								totalTestimonials

							if (offset > totalTestimonials / 2) {
								offset -= totalTestimonials
							}

							const distance = Math.abs(offset)
							const isActive = offset === 0

							// Keep the nearest three cards visible.
							// The center card receives full emphasis.
							const isVisible = distance <= 1

							const scale = isActive ? 1 : 0.91
							const opacity = isActive ? 1 : 0.42

							return (
								<div
									key={testimonial.id}
									aria-hidden={!isActive}
									className={`absolute inset-y-0 left-1/2 w-[82%] sm:w-[62%] lg:w-[48%] ${
										isVisible
											? 'pointer-events-auto'
											: 'pointer-events-none'
									} transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none`}
									style={{
										transform: `translateX(calc(-50% + ${offset * 100}%)) scale(${scale})`,
										opacity: isVisible ? opacity : 0,
										filter: isActive
											? 'blur(0px)'
											: 'blur(1.5px)',
										zIndex: isActive ? 20 : 10,
										visibility: isVisible
											? 'visible'
											: 'hidden',
									}}
								>
									<TestimonialCard
										testimonial={testimonial}
										isActive={isActive}
									/>
								</div>
							)
						})}
					</div>

					{/* Navigation controls positioned beside the cards */}
					<button
						type='button'
						onClick={goToPrevious}
						aria-label='Show previous testimonial'
						className='absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-300 shadow-lg transition-colors duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:left-2 sm:h-11 sm:w-11 lg:left-4'
					>
						<ArrowIcon direction='left' />
					</button>

					<button
						type='button'
						onClick={goToNext}
						aria-label='Show next testimonial'
						className='absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-slate-300 shadow-lg transition-colors duration-200 hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none sm:right-2 sm:h-11 sm:w-11 lg:right-4'
					>
						<ArrowIcon direction='right' />
					</button>

					{/* Pagination indicators */}
					<div className='mt-8 flex items-center justify-center sm:mt-10'>
						<div
							className='flex items-center gap-2'
							role='group'
							aria-label='Choose a testimonial'
						>
							{testimonials.map((testimonial, index) => (
								<button
									key={testimonial.id}
									type='button'
									onClick={() => goToSlide(index)}
									aria-label={`Show testimonial ${index + 1} of ${totalTestimonials}`}
									aria-current={
										index === activeIndex
											? 'true'
											: undefined
									}
									className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-reduce:transition-none ${
										index === activeIndex
											? 'w-7 bg-indigo-400'
											: 'w-2 bg-slate-700 hover:bg-slate-500'
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}