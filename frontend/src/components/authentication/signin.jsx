import Link from 'next/link'

export default function Signin() {
	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 py-10 text-white sm:px-6'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -top-40 right-32 h-96 w-96 rounded-full bg-blue-500/[0.07] blur-[120px]'
			/>

			<div
				aria-hidden='true'
				className='pointer-events-none absolute -bottom-48 left-32 h-96 w-96 rounded-full bg-indigo-500/6 blur-[120px]'
			/>

			<div className='relative w-full max-w-md'>
				<Link
					href='/'
					className='mb-8 flex items-center justify-center gap-2.5'
				>
					<span className='flex h-9 w-9 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10'>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-5 w-5 text-indigo-300'
							aria-hidden='true'
						>
							<path
								d='M5 18V6h4.5l5 8V6H19v12h-4.5l-5-8v8H5Z'
								stroke='currentColor'
								strokeWidth='1.7'
								strokeLinejoin='round'
							/>
						</svg>
					</span>
					<span className='text-lg font-semibold tracking-tight'>
						Resume<span className='text-indigo-300'>AI</span>
					</span>
				</Link>

				<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8'>
					<div className='mb-7'>
						<p className='mb-3 text-xs font-medium text-indigo-300'>
							WELCOME BACK
						</p>

						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							Sign in to ResumeAI
						</h1>

						<p className='mt-2 text-sm leading-6 text-slate-400'>
							Pick up where you left off and keep moving toward
							your next career opportunity.
						</p>
					</div>

					<form className='space-y-5'>
						<div>
							<label
								htmlFor='identifier'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Username or email
							</label>
							<input
								id='identifier'
								name='identifier'
								type='text'
								autoComplete='username'
								placeholder='Enter your username or email'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
						</div>

						<div>
							<div className='mb-2 flex items-center justify-between gap-3'>
								<label
									htmlFor='password'
									className='text-xs font-medium text-slate-300'
								>
									Password
								</label>
							</div>

							<input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								placeholder='Enter your password'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
						</div>

						<button
							type='button'
							className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
						>
							Sign in
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='h-4 w-4'
								aria-hidden='true'
							>
								<path
									d='M5 12h14m-6-6 6 6-6 6'
									stroke='currentColor'
									strokeWidth='1.7'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</form>

					<div className='my-6 border-t border-slate-800/80' />

					<p className='text-center text-xs text-slate-400'>
						New to ResumeAI?{' '}
						<Link
							href='/signup'
							className='font-medium text-indigo-300 transition-colors hover:text-indigo-200'
						>
							Create an account
						</Link>
					</p>
				</section>

				<p className='mt-6 text-center text-xs text-slate-600'>
					Your next opportunity starts with better preparation.
				</p>
			</div>
		</main>
	)
}