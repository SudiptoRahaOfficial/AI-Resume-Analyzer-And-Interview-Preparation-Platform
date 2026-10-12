import Link from 'next/link'

export default function UpdateProfile() {
	return (
		<main className='min-h-screen bg-[#030712] px-4 py-8 text-white sm:px-6 lg:px-8 lg:py-10'>
			<div className='mx-auto max-w-4xl'>
				<div className='mb-8'>
					<Link
						href='/profile'
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
						Back to profile
					</Link>

					<p className='mb-2 text-xs font-medium uppercase tracking-wider text-indigo-300'>
						ACCOUNT SETTINGS
					</p>

					<h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
						Update your profile
					</h1>

					<p className='mt-2 max-w-2xl text-sm leading-6 text-slate-400'>
						Keep your professional information current. Your
						experience, skills, and profile details can be updated
						whenever your career evolves.
					</p>
				</div>

				<form className='space-y-6'>
					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Profile information
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Update your name, professional title, and bio.
							</p>
						</div>

						<div className='mb-6 flex flex-col gap-4 rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 sm:flex-row sm:items-center'>
							<div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10 text-lg font-semibold text-indigo-300'>
								SR
							</div>

							<div className='min-w-0 flex-1'>
								<p className='text-sm font-medium text-slate-200'>
									Profile photo
								</p>
								<p className='mt-1 text-xs leading-5 text-slate-500'>
									Upload a new image to replace your current
									profile photo. Maximum file size: 3 MB.
								</p>
							</div>

							<label className='inline-flex h-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-slate-700 px-3 text-xs font-medium text-slate-300 transition-colors hover:border-slate-600 hover:bg-slate-800/60'>
								Change photo
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
									defaultValue='Sudipto'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
									defaultValue='Raha'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
									defaultValue='Backend Developer'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
									defaultValue='Backend developer building production-ready applications'
									className='w-full resize-y rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 py-3 text-sm leading-6 text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
								/>
							</div>
						</div>
					</section>

					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Contact and experience
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Keep your contact details and experience
								accurate.
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
									defaultValue='+8801712345678'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
									defaultValue={2}
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
									defaultValue='Dhaka'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
									defaultValue='Bangladesh'
									className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
								Review the technologies and skills on your
								profile.
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
								defaultValue='JavaScript, Node.js, Express.js, MongoDB'
								className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
							/>
							<p className='mt-2 text-xs text-slate-500'>
								Use commas to separate skills. Maximum 20
								skills.
							</p>
						</div>

						<div className='mt-4 flex flex-wrap gap-2'>
							{[
								'JavaScript',
								'Node.js',
								'Express.js',
								'MongoDB',
							].map((skill) => (
								<span
									key={skill}
									className='rounded-lg border border-slate-700/80 bg-slate-950/50 px-3 py-2 text-xs text-slate-300'
								>
									{skill}
								</span>
							))}
						</div>
					</section>

					<section className='rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 sm:p-7'>
						<div className='mb-6'>
							<h2 className='text-base font-semibold text-white'>
								Social links
							</h2>
							<p className='mt-1 text-xs text-slate-500'>
								Update the links to your professional profiles.
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
										defaultValue='https://github.com/example'
										className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
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
										defaultValue='https://linkedin.com/in/example'
										className='h-11 w-full rounded-lg border border-slate-700/80 bg-slate-950/60 px-3.5 text-sm text-white outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/10'
									/>
								</div>
							</div>
						</div>

						<p className='mt-4 text-xs text-slate-500'>
							You can maintain up to 10 social links.
						</p>
					</section>

					<div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
						<Link
							href='/profile'
							className='inline-flex h-11 items-center justify-center rounded-lg border border-slate-700 px-5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800/60 hover:text-white'
						>
							Cancel
						</Link>

						<button
							type='button'
							className='inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-500 px-5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400'
						>
							Save changes
							<svg
								viewBox='0 0 24 24'
								fill='none'
								className='h-4 w-4'
								aria-hidden='true'
							>
								<path
									d='m5 12 4 4L19 6'
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