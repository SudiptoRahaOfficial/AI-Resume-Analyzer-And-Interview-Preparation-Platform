import Link from 'next/link'

export default function CreateProfile() {
	return (
		<main className='min-h-screen bg-[#030712] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-8'>
					<Link
						href='/dashboard'
						className='mb-5 inline-flex items-center gap-2 text-xs text-slate-400 transition-colors hover:text-white'
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
						Back to dashboard
					</Link>

					<p className='mb-2 text-xs font-medium uppercase tracking-wider text-indigo-300'>
						YOUR PROFESSIONAL IDENTITY
					</p>

					<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
						Create your profile
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
						Tell us about your experience, skills, and career goals.
						Build a professional profile that represents your
						strengths.
					</p>
				</div>

				<form className='space-y-6'>
					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Profile information
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Start with your name and professional identity.
							</p>
						</div>

						<div className='mb-6 flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 sm:flex-row sm:items-center'>
							<div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-lg font-semibold text-indigo-300'>
								<svg
									viewBox='0 0 24 24'
									fill='none'
									className='h-7 w-7'
									aria-hidden='true'
								>
									<circle
										cx='12'
										cy='8'
										r='4'
										stroke='currentColor'
										strokeWidth='1.5'
									/>
									<path
										d='M4.5 20a7.5 7.5 0 0 1 15 0'
										stroke='currentColor'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
							</div>

							<div className='min-w-0 flex-1'>
								<p className='text-sm font-medium text-slate-200'>
									Profile photo
								</p>
								<p className='mt-1 text-xs leading-5 text-slate-500'>
									Choose a clear image for your professional
									profile. Maximum file size: 3 MB.
								</p>
							</div>

							<label className='inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800/60'>
								Upload image
								<input
									type='file'
									name='profileImage'
									accept='image/*'
									className='sr-only'
								/>
							</label>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='firstName'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									First name
								</label>
								<input
									id='firstName'
									name='firstName'
									type='text'
									placeholder='Enter your first name'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='lastName'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Last name
								</label>
								<input
									id='lastName'
									name='lastName'
									type='text'
									placeholder='Enter your last name'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='profession'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Professional title
								</label>
								<input
									id='profession'
									name='profession'
									type='text'
									placeholder='e.g. Backend Developer'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div className='sm:col-span-2'>
								<label
									htmlFor='bio'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Professional bio
								</label>
								<textarea
									id='bio'
									name='bio'
									rows={4}
									placeholder='Briefly describe your experience, strengths, and what you build.'
									className='w-full resize-y rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
								<p className='mt-2 text-xs text-slate-500'>
									Keep it concise, specific, and professional.
								</p>
							</div>
						</div>
					</section>

					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Contact and experience
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Add your contact details and current experience.
							</p>
						</div>

						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
							<div>
								<label
									htmlFor='phone'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Phone number
								</label>
								<input
									id='phone'
									name='phone'
									type='tel'
									autoComplete='tel'
									placeholder='+880 1XXX XXXXXX'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='experience'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Years of experience
								</label>
								<input
									id='experience'
									name='experience'
									type='number'
									min='0'
									step='1'
									placeholder='e.g. 2'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='city'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									City
								</label>
								<input
									id='city'
									name='city'
									type='text'
									placeholder='e.g. Dhaka'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>

							<div>
								<label
									htmlFor='country'
									className='mb-2 block text-xs font-medium text-slate-300'
								>
									Country
								</label>
								<input
									id='country'
									name='country'
									type='text'
									placeholder='e.g. Bangladesh'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>
						</div>
					</section>

					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Skills and expertise
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Highlight the technologies and skills you work
								with.
							</p>
						</div>

						<div>
							<label
								htmlFor='skills'
								className='mb-2 block text-xs font-medium text-slate-300'
							>
								Skills
							</label>
							<input
								id='skills'
								name='skills'
								type='text'
								placeholder='e.g. JavaScript, Node.js, MongoDB'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
							<p className='mt-2 text-xs text-slate-500'>
								Enter up to 20 skills, separated by commas.
							</p>
						</div>
					</section>

					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Social links
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Help others discover your work and professional
								presence.
							</p>
						</div>

						<div className='space-y-4'>
							<div className='grid grid-cols-1 gap-3 sm:grid-cols-[150px_minmax(0,1fr)]'>
								<div>
									<label
										htmlFor='socialPlatform1'
										className='mb-2 block text-xs font-medium text-slate-300'
									>
										Platform
									</label>
									<select
										id='socialPlatform1'
										name='socialPlatform1'
										defaultValue='GitHub'
										className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-indigo-400/60'
									>
										<option>GitHub</option>
										<option>LinkedIn</option>
										<option>Portfolio</option>
										<option>Other</option>
									</select>
								</div>

								<div>
									<label
										htmlFor='socialUrl1'
										className='mb-2 block text-xs font-medium text-slate-300'
									>
										URL
									</label>
									<input
										id='socialUrl1'
										name='socialUrl1'
										type='url'
										placeholder='https://github.com/yourusername'
										className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
									/>
								</div>
							</div>

							<div className='grid grid-cols-1 gap-3 sm:grid-cols-[150px_minmax(0,1fr)]'>
								<div>
									<label
										htmlFor='socialPlatform2'
										className='mb-2 block text-xs font-medium text-slate-300'
									>
										Platform
									</label>
									<select
										id='socialPlatform2'
										name='socialPlatform2'
										defaultValue='LinkedIn'
										className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3 text-sm text-white outline-none transition focus:border-indigo-400/60'
									>
										<option>GitHub</option>
										<option>LinkedIn</option>
										<option>Portfolio</option>
										<option>Other</option>
									</select>
								</div>

								<div>
									<label
										htmlFor='socialUrl2'
										className='mb-2 block text-xs font-medium text-slate-300'
									>
										URL
									</label>
									<input
										id='socialUrl2'
										name='socialUrl2'
										type='url'
										placeholder='https://linkedin.com/in/yourusername'
										className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
									/>
								</div>
							</div>
						</div>

						<p className='mt-4 text-xs text-slate-500'>
							You can add more social links later, up to 10 in
							total.
						</p>
					</section>

					<div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
						<Link
							href='/dashboard'
							className='inline-flex h-11 items-center justify-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							Cancel
						</Link>

						<button
							type='button'
							className='inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
						>
							Create profile
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='h-4 w-4'
								aria-hidden='true'
							>
								<path
									d='M5 12h14m-6-6 6 6-6 6'
									stroke='currentColor'
									strokeWidth='1.6'
									strokeLinecap='round'
									strokeLinejoin='round'
								/>
							</svg>
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}