// making client component
'use client'

// importing dependencis
import { useRouter } from 'next/navigation'

export default function UploadResume() {
	// router for page navigation
	const router = useRouter()

	return (
		<main className='flex min-h-screen items-center justify-center bg-[#030712] px-6 text-white'>
			<div className='w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'>
				<button
					onClick={() => router.push('/resumes')}
					className='mb-6 text-sm text-gray-400 hover:text-white'
				>
					← Back
				</button>

				<h1 className='text-3xl font-bold'>Upload Resume</h1>

				<p className='mt-2 text-gray-400'>
					Upload your PDF resume to begin AI analysis.
				</p>

				<div className='mt-8 rounded-xl border-2 border-dashed border-cyan-400/30 bg-black/20 p-10 text-center'>
					<div className='text-5xl'>📄</div>

					<h3 className='mt-4 text-lg font-semibold'>
						Drag & Drop your resume
					</h3>

					<p className='mt-2 text-sm text-gray-500'>
						PDF only • Maximum 5MB
					</p>

					<button className='mt-6 rounded-md bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950'>
						Browse Files
					</button>
				</div>

				<button className='mt-8 w-full rounded-md bg-cyan-400 py-3 font-semibold text-slate-950'>
					Upload Resume
				</button>
			</div>
		</main>
	)
}