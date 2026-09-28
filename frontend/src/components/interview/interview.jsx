// making client component
'use client'

// dummy questions
const questions = [
	'Explain the Node.js event loop.',
	'Difference between JWT and Sessions?',
	'How would you optimize MongoDB queries?',
]

export default function InterviewPage() {
	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			<div className='mx-auto max-w-6xl px-6 py-12'>
				<div className='mb-10'>
					<h1 className='text-4xl font-bold'>
						Interview Preparation
					</h1>

					<p className='mt-3 text-gray-400'>
						Practice AI-generated technical and behavioral interview
						questions.
					</p>
				</div>

				<div className='grid gap-6 lg:grid-cols-3'>
					<div className='rounded-xl border border-white/10 bg-white/5 p-6'>
						<h3 className='font-semibold'>Target Role</h3>

						<select className='mt-4 w-full rounded-md border border-white/10 bg-black/20 px-4 py-3'>
							<option>Backend Developer</option>
						</select>

						<button className='mt-6 w-full rounded-md bg-cyan-400 py-3 font-semibold text-slate-950 cursor-pointer'>
							Generate Questions
						</button>
					</div>

					<div className='space-y-4 lg:col-span-2'>
						{questions.map((question, index) => (
							<div
								key={index}
								className='rounded-xl border border-white/10 bg-white/5 p-5'
							>
								<div className='mb-3 text-sm text-cyan-300'>
									Question {index + 1}
								</div>

								<h3 className='font-medium'>{question}</h3>

								<button className='mt-4 rounded-md border border-white/10 px-4 py-2 text-sm hover:bg-white/5 cursor-pointer'>
									Start Answering
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	)
}