'use client'

import { useRef, useState } from 'react'
import Icon from '@/components/shared/icon'

const MAX_RESUME_SIZE = 3 * 1024 * 1024
const MAX_SELF_DESCRIPTION_LENGTH = 5000
const MAX_JOB_DESCRIPTION_LENGTH = 20000

const initialFormState = {
	selfDescription: '',
	jobDescription: '',
}

export default function Form({ onGenerateReport }) {
	const fileInputRef = useRef(null)

	const [resumeFile, setResumeFile] = useState(null)
	const [formData, setFormData] = useState(initialFormState)
	const [error, setError] = useState('')

	const { selfDescription, jobDescription } = formData

	const updateField = (event) => {
		const { name, value } = event.target

		setFormData((previous) => ({
			...previous,
			[name]: value,
		}))

		if (error) setError('')
	}

	const handleResumeChange = (event) => {
		const file = event.target.files?.[0]

		if (!file) return

		const isPdf =
			file.type === 'application/pdf' ||
			file.name.toLowerCase().endsWith('.pdf')

		if (!isPdf) {
			setError('Please select a valid PDF resume.')
			event.target.value = ''
			return
		}

		if (file.size > MAX_RESUME_SIZE) {
			setError('Your resume must not exceed 3 MB.')
			event.target.value = ''
			return
		}

		if (file.size === 0) {
			setError('The selected file is empty. Please choose another PDF.')
			event.target.value = ''
			return
		}

		setResumeFile(file)
		setError('')
	}

	const removeResume = () => {
		setResumeFile(null)

		if (fileInputRef.current) {
			fileInputRef.current.value = ''
		}

		setError('')
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setError('')

		if (!jobDescription.trim()) {
			setError('Please provide the target job description.')
			return
		}

		if (!resumeFile && !selfDescription.trim()) {
			setError(
				'Upload your resume or describe your professional background before continuing.',
			)
			return
		}

		if (typeof onGenerateReport === 'function') {
			onGenerateReport({
				resume: resumeFile,
				selfDescription: selfDescription.trim(),
				jobDescription: jobDescription.trim(),
			})
		}
	}

	const inputClass =
		'h-[200px] min-h-[200px] max-h-[200px] w-full resize-none overflow-y-auto rounded-xl border border-slate-800/90 bg-[#080d19] px-4 py-3.5 text-xs leading-6 text-slate-200 outline-none transition placeholder:text-slate-600 hover:border-slate-700 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/10'

	const uploadCardClass =
		'flex h-[200px] min-h-[200px] max-h-[200px] min-w-0 flex-col overflow-hidden rounded-xl border border-slate-800/90 bg-[#080d19] p-4 transition-colors'

	const labelClass = 'text-sm font-semibold text-slate-200'

	return (
		<section className='mx-auto w-full max-w-375 space-y-6'>
			{/* Main form card */}
			<form
				onSubmit={handleSubmit}
				noValidate
				className='overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/30 shadow-xl shadow-black/8'
			>
				{/* Form heading */}
				<div className='flex flex-col gap-3 border-b border-slate-800/80 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6'>
					<div>
						<h2 className='text-base font-semibold text-white'>
							Prepare for next interview
						</h2>

						<p className='mt-1.5 text-sm leading-6 text-slate-400'>
							Provide your background and the job description to
							get started.
						</p>
					</div>

					<span className='inline-flex self-start items-center rounded-full border border-indigo-400/20 bg-indigo-500/[0.07] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-indigo-300'>
						AI powered
					</span>
				</div>

				{/* Form fields */}
				<div className='p-5 sm:p-7'>
					<div className='grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4 lg:gap-6'>
						{/* Resume upload */}
						<section className='flex min-w-0 flex-col'>
							<div className='mb-3 flex min-h-5 items-center justify-between gap-2'>
								<label
									htmlFor='resume'
									className={labelClass}
								>
									Resume
								</label>

								<span className='text-[11px] text-slate-500'>
									Optional
								</span>
							</div>

							<input
								ref={fileInputRef}
								id='resume'
								name='resume'
								type='file'
								accept='.pdf,application/pdf'
								onChange={handleResumeChange}
								className='sr-only'
								tabIndex={-1}
								aria-label='Upload your PDF resume'
							/>

							<div className={uploadCardClass}>
								{resumeFile ? (
									<>
										{/* Selected resume details */}
										<div className='flex min-h-0 min-w-0 items-start gap-3'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-indigo-300'>
												<Icon
													name='file'
													size={19}
												/>
											</div>

											<div className='min-w-0 flex-1'>
												<p
													title={resumeFile.name}
													className='break-all text-sm font-medium leading-5 text-slate-200'
												>
													{resumeFile.name}
												</p>

												<p className='mt-1.5 text-xs text-slate-500'>
													{(
														resumeFile.size / 1024
													).toFixed(0)}{' '}
													KB
													{' · '}PDF
												</p>

												<p className='mt-2 text-xs font-medium text-emerald-400'>
													Resume selected
												</p>
											</div>
										</div>

										{/* Resume actions */}
										<div className='mt-auto flex shrink-0 gap-2 pt-3'>
											<button
												type='button'
												onClick={() =>
													fileInputRef.current?.click()
												}
												className='flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-300 transition hover:border-indigo-400/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60'
											>
												Replace
											</button>

											<button
												type='button'
												onClick={removeResume}
												aria-label='Remove selected resume'
												className='flex h-9 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:border-rose-400/30 hover:bg-rose-500/5 hover:text-rose-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/50'
											>
												<Icon
													name='x'
													size={16}
												/>
											</button>
										</div>
									</>
								) : (
									<>
										{/* Upload card heading */}
										<div className='flex min-w-0 shrink-0 items-center gap-3'>
											<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-indigo-300'>
												<Icon
													name='upload'
													size={19}
												/>
											</div>

											<div className='min-w-0'>
												<p className='text-sm font-semibold text-slate-200'>
													Upload your resume
												</p>

												<p className='mt-1 text-xs text-slate-500'>
													PDF format · Max 3 MB
												</p>
											</div>
										</div>

										{/* Description uses remaining space */}
										<div className='flex min-h-0 flex-1 items-center overflow-hidden py-2'>
											<p className='text-xs leading-5 text-slate-400 w-full text-center'>
												Share your existing resume
											</p>
										</div>

										{/* Upload action stays at the bottom */}
										<button
											type='button'
											onClick={() =>
												fileInputRef.current?.click()
											}
											className='flex w-full shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-indigo-400/40 hover:bg-indigo-500/5 hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 cursor-pointer'
										>
											<Icon
												name='upload'
												size={15}
											/>
											Choose PDF
										</button>
									</>
								)}
							</div>

							<p className='mt-2.5 text-xs leading-5 text-slate-500'>
								No resume? Describe your background instead.
							</p>
						</section>

						{/* Professional background */}
						<section className='flex min-w-0 flex-col'>
							<div className='mb-3 flex min-h-5 items-center justify-between gap-2'>
								<label
									htmlFor='selfDescription'
									className={labelClass}
								>
									About you
								</label>

								<span className='text-[11px] text-slate-500'>
									Optional
								</span>
							</div>

							<textarea
								id='selfDescription'
								name='selfDescription'
								value={selfDescription}
								onChange={updateField}
								maxLength={MAX_SELF_DESCRIPTION_LENGTH}
								placeholder='Describe your experience, technical skills, projects, achievements, and career goals...'
								className={inputClass}
							/>

							<div className='mt-2.5 flex items-start justify-between gap-3'>
								<p className='text-xs leading-5 text-slate-500'>
									{resumeFile
										? 'Add any additional professional context.'
										: 'Required if you do not upload a resume.'}
								</p>

								<span className='shrink-0 text-[11px] tabular-nums text-slate-600'>
									{selfDescription.length.toLocaleString()}/
									{MAX_SELF_DESCRIPTION_LENGTH.toLocaleString()}
								</span>
							</div>
						</section>

						{/* Target job description */}
						<section className='flex min-w-0 flex-col'>
							<div className='mb-3 flex min-h-5 items-center justify-between gap-2'>
								<label
									htmlFor='jobDescription'
									className={labelClass}
								>
									Target job description
									<span className='ml-1 text-rose-400'>
										*
									</span>
								</label>

								<span className='text-[11px] text-slate-500'>
									Required
								</span>
							</div>

							<textarea
								id='jobDescription'
								name='jobDescription'
								value={jobDescription}
								onChange={updateField}
								maxLength={MAX_JOB_DESCRIPTION_LENGTH}
								placeholder='Paste the target job posting, including responsibilities, required skills, qualifications, and experience requirements...'
								className={inputClass}
							/>

							<div className='mt-2.5 flex items-start justify-between gap-3'>
								<p className='text-xs leading-5 text-slate-500'>
									Use the original job description
								</p>

								<span className='shrink-0 text-[11px] tabular-nums text-slate-600'>
									{jobDescription.length.toLocaleString()}/
									{MAX_JOB_DESCRIPTION_LENGTH.toLocaleString()}
								</span>
							</div>
						</section>
					</div>

					{/* Validation error */}
					{error && (
						<div
							role='alert'
							aria-live='polite'
							className='mt-6 flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-500/6 px-4 py-3.5'
						>
							<div className='mt-0.5 shrink-0 text-rose-300'>
								<Icon
									name='x'
									size={16}
								/>
							</div>

							<p className='text-sm leading-6 text-rose-200'>
								{error}
							</p>
						</div>
					)}

					{/* Submit section */}
					<div className='mt-7 border-t border-slate-800/80 pt-6'>
						<button
							type='submit'
							className='flex w-full items-center justify-center gap-2.5 rounded-xl bg-indigo-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/20 transition hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080d19] active:scale-[0.99] sm:mx-auto sm:w-auto sm:min-w-72 cursor-pointer'
						>
							<Icon
								name='sparkles'
								size={17}
							/>

							<span>Generate Interview Report</span>

							<Icon
								name='arrow'
								size={16}
							/>
						</button>

						<p className='mt-3 text-center text-xs leading-5 text-slate-500'>
							Technical questions · Behavioral questions ·
							Skill-gap analysis · Preparation plan
						</p>
					</div>
				</div>
			</form>
		</section>
	)
}