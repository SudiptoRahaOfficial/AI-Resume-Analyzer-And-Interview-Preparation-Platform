import Link from 'next/link'

export default function Signup() {
	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-4 py-10 text-white sm:px-6'>
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-500/8 blur-[120px]'
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
							GET STARTED
						</p>

						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							Create your account
						</h1>

						<p className='mt-2 text-sm leading-6 text-slate-400'>
							Build a stronger resume and prepare for your next
							interview with personalized AI guidance.
						</p>
					</div>

					<form className='space-y-4'>
						<div>
							<label
								htmlFor='username'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Full name
							</label>
							<input
								id='username'
								name='username'
								type='text'
								autoComplete='name'
								placeholder='Enter your full name'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
						</div>

						<div>
							<label
								htmlFor='email'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Email address
							</label>
							<input
								id='email'
								name='email'
								type='email'
								autoComplete='email'
								placeholder='you@example.com'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
						</div>

						<div>
							<label
								htmlFor='password'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Password
							</label>
							<input
								id='password'
								name='password'
								type='password'
								autoComplete='new-password'
								placeholder='Create a strong password'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
							<p className='mt-2 text-xs leading-5 text-slate-500'>
								Use at least 8 characters, including uppercase
								and lowercase letters, a number, and a symbol.
							</p>
						</div>

						<div>
							<label
								htmlFor='confirmPassword'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Confirm password
							</label>
							<input
								id='confirmPassword'
								name='confirmPassword'
								type='password'
								autoComplete='new-password'
								placeholder='Enter your password again'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
						</div>

						<div className='flex items-start gap-2.5 pt-1'>
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='mt-0.5 h-4 w-4 shrink-0 text-indigo-300'
								aria-hidden='true'
							>
								<path
									d='M12 3 5 6v5c0 4.5 2.9 7.7 7 10 4.1-2.3 7-5.5 7-10V6l-7-3Z'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinejoin='round'
								/>
								<path
									d='m9 12 2 2 4-4'
									stroke='currentColor'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
							<p className='text-xs leading-5 text-slate-400'>
								We’ll send a verification code to your email
								before you can access your account.
							</p>
						</div>

						<button
							type='button'
							className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
						>
							Create account
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
						Already have an account?{' '}
						<Link
							href='/signin'
							className='font-medium text-indigo-300 transition-colors hover:text-indigo-200'
						>
							Sign in
						</Link>
					</p>
				</section>

				<p className='mt-6 text-center text-xs text-slate-600'>
					AI-powered preparation for your next opportunity.
				</p>
			</div>
		</main>
	)
}