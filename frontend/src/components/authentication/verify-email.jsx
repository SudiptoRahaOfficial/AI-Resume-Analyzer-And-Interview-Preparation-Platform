import Link from 'next/link'

export default function VerifyEmail({ email = 'your registered email' }) {
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
					<div className='mb-7 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-6 w-6'
							aria-hidden='true'
						>
							<rect
								x='3'
								y='5'
								width='18'
								height='14'
								rx='2.5'
								stroke='currentColor'
								strokeWidth='1.5'
							/>
							<path
								d='m4 7 8 6 8-6'
								stroke='currentColor'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
							<circle
								cx='18'
								cy='17'
								r='4'
								fill='#0f172a'
								stroke='currentColor'
								strokeWidth='1.5'
							/>
							<path
								d='m16.5 17 1 1 2-2'
								stroke='currentColor'
								strokeWidth='1.2'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</div>

					<div className='mb-7'>
						<p className='mb-3 text-xs font-medium text-indigo-300'>
							EMAIL VERIFICATION
						</p>

						<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
							Check your inbox
						</h1>

						<p className='mt-2 text-sm leading-6 text-slate-400'>
							We’ve sent a verification code to confirm your email
							address and secure your account.
						</p>
					</div>

					<div className='mb-6 rounded-xl border border-slate-800/80 bg-slate-950/50 p-4'>
						<p className='mb-1 text-xs text-slate-500'>
							Verification code sent to
						</p>
						<p className='break-all text-sm font-medium text-slate-200'>
							{email}
						</p>
					</div>

					<form className='space-y-5'>
						<div>
							<label
								htmlFor='otp'
								className='mb-3 block text-xs font-medium text-slate-300'
							>
								Enter your 6-digit code
							</label>

							<input
								id='otp'
								name='otp'
								type='text'
								inputMode='numeric'
								autoComplete='one-time-code'
								maxLength={6}
								placeholder='000000'
								className='h-14 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-4 text-center font-mono text-2xl font-semibold tracking-[0.65em] text-white outline-none transition placeholder:text-slate-700 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>

							<div className='mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500'>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									className='mt-0.5 h-4 w-4 shrink-0'
									aria-hidden='true'
								>
									<circle
										cx='12'
										cy='12'
										r='9'
										stroke='currentColor'
										strokeWidth='1.5'
									/>
									<path
										d='M12 7v5l3 2'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
								<p>
									This code expires in 3 minutes. For your
									security, never share it with anyone.
								</p>
							</div>
						</div>

						<button
							type='button'
							className='inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
						>
							Verify email
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='h-4 w-4'
								aria-hidden='true'
							>
								<path
									d='m5 12 4 4L19 6'
									stroke='currentColor'
									strokeWidth='1.7'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</form>

					<div className='my-6 border-t border-slate-800/80' />

					<div className='space-y-3 text-center'>
						<p className='text-xs text-slate-400'>
							Didn’t receive the email?
						</p>

						<button
							type='button'
							className='text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200'
						>
							Resend verification code
						</button>

						<p className='text-xs leading-5 text-slate-600'>
							Check your spam folder if the email isn’t in your
							inbox.
						</p>
					</div>
				</section>

				<div className='mt-6 text-center'>
					<Link
						href='/signin'
						className='inline-flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white'
					>
						<svg
							viewBox='0 0 24 24'
							fill='none'
							className='h-4 w-4'
							aria-hidden='true'
						>
							<path
								d='M19 12H5m7 7-7-7 7-7'
								stroke='currentColor'
								strokeWidth='1.6'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
						Back to sign in
					</Link>
				</div>
			</div>
		</main>
	)
}