// making client component
'use client'

// importing dependencis
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
	// router for page navigation
	const router = useRouter()

	return (
		<main className='min-h-screen bg-[#030712] text-white'>
			<div className='mx-auto max-w-5xl px-6 py-12'>
				<button
					onClick={() => router.push('/dashboard')}
					className='mb-8 text-sm text-gray-400 hover:text-white cursor-pointer'
				>
					← Back to Dashboard
				</button>

				<div className='rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'>
					<div className='flex flex-col items-center text-center'>
						<div className='flex h-24 w-24 items-center justify-center rounded-full bg-cyan-400/10 text-3xl font-bold text-cyan-300'>
							SR
						</div>

						<h1 className='mt-5 text-3xl font-bold'>
							Sudipto Raha
						</h1>

						<p className='mt-2 text-gray-400'>Backend Developer</p>

						<span className='mt-4 rounded-full bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300'>
							Verified Account
						</span>
					</div>

					<div className='mt-10 grid gap-6 md:grid-cols-2'>
						<div>
							<label className='text-sm text-gray-400'>
								Username
							</label>
							<input
								disabled
								value='sudipto'
								className='mt-2 w-full rounded-md border border-white/10 bg-black/20 px-4 py-3'
							/>
						</div>

						<div>
							<label className='text-sm text-gray-400'>
								Email
							</label>
							<input
								disabled
								value='sudipto@email.com'
								className='mt-2 w-full rounded-md border border-white/10 bg-black/20 px-4 py-3'
							/>
						</div>
					</div>

					<button
						onClick={() => router.push('/settings')}
						className='mt-8 rounded-md border border-white/10 px-5 py-2.5 hover:bg-white/5 cursor-pointer'
					>
						Account Settings
					</button>
				</div>
			</div>
		</main>
	)
}