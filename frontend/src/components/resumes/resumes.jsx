// making client component
'use client'

// importing dependencis
import { useRouter } from 'next/navigation'

export default function ResumesPage() {
	// router for page navigation
	const router = useRouter()

	// dummy resumes object
	const resumes = [
		{ title: 'Backend Developer Resume', score: 92, updated: '2 days ago' },
		{
			title: 'Frontend Developer Resume',
			score: 88,
			updated: '1 week ago',
		},
		{ title: 'Full Stack Resume', score: 90, updated: '3 weeks ago' },
	]

	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			<header className='border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
				<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
					<button
						onClick={() => router.push('/')}
						className='text-lg font-semibold cursor-pointer'
					>
						ResumeAI
					</button>

					<button
						onClick={() => router.push('/resumes/upload')}
						className='rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 cursor-pointer'
					>
						Upload Resume
					</button>
				</div>
			</header>

			<section className='mx-auto max-w-7xl px-6 py-10'>
				<div className='mb-8'>
					<h1 className='text-4xl font-bold'>My Resumes</h1>
					<p className='mt-2 text-gray-400'>
						Manage every resume you've uploaded.
					</p>
				</div>

				<div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
					{resumes.map((resume, index) => (
						<div
							key={index}
							className='rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl'
						>
							<div className='mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300'>
								📄
							</div>

							<h2 className='text-lg font-semibold'>
								{resume.title}
							</h2>

							<p className='mt-2 text-sm text-gray-400'>
								Updated {resume.updated}
							</p>

							<div className='mt-6 flex items-center justify-between'>
								<span className='text-sm text-gray-400'>
									ATS Score
								</span>
								<span className='font-bold text-cyan-400'>
									{resume.score}%
								</span>
							</div>

							<button className='mt-6 w-full rounded-md border border-white/10 py-2.5 text-sm hover:bg-white/5'>
								View Resume
							</button>
						</div>
					))}
				</div>
			</section>
		</main>
	)
}