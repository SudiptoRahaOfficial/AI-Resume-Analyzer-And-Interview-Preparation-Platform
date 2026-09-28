// making client component
'use client'

export default function AnalyzePage() {
	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			<div className='mx-auto max-w-5xl px-6 py-12'>
				<div className='mb-10'>
					<h1 className='text-4xl font-bold'>
						Analyze Job Description
					</h1>

					<p className='mt-3 text-gray-400'>
						Compare your resume against a job description and
						discover missing skills.
					</p>
				</div>

				<div className='space-y-6 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'>
					<div>
						<label className='mb-2 block text-sm text-gray-300'>
							Select Resume
						</label>

						<select className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 outline-none'>
							<option>Backend Developer Resume</option>
						</select>
					</div>

					<div>
						<label className='mb-2 block text-sm text-gray-300'>
							Job Description
						</label>

						<textarea
							rows={10}
							placeholder='Paste the complete job description...'
							className='w-full rounded-md border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-gray-600'
						/>
					</div>

					<button className='w-full rounded-md bg-cyan-400 py-3 font-semibold text-slate-950 cursor-pointer'>
						Analyze with AI
					</button>
				</div>
			</div>
		</main>
	)
}