'use client'

import { useRouter } from 'next/navigation'

export default function ApplicationHeader() {
	const router = useRouter()

	return (
		<header className='relative border-b border-white/10'>
			<div className='mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10'>
				{/* Logo */}
				<h2
					onClick={() => router.push('/')}
					className='inline-flex shrink-0 items-center gap-2.5 text-white cursor-pointer'
				>
					<span className='text-xl font-bold tracking-tight'>
						Resume<span className='text-indigo-400'>AI</span>
					</span>
				</h2>

				<button
					onClick={() => router.back()}
					className='group flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-slate-900 hover:text-white cursor-pointer'
				>
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
						className='transition-transform duration-200 ease-out group-hover:-translate-x-0.5'
						aria-hidden='true'
					>
						<path d='M19 12H5' />
						<path d='m12 19-7-7 7-7' />
					</svg>
					Back
				</button>
			</div>
		</header>
	)
}