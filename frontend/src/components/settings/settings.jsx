// making client component
'use client'

// importing dependencis
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
	// router for page navigation
	const router = useRouter()

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			{/* Header */}
			<header className='relative z-20 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
				<div className='mx-auto flex h-16 max-w-5xl items-center justify-between px-6'>
					<button
						onClick={() => router.push('/')}
						className='text-lg font-semibold tracking-tight transition hover:text-cyan-300 cursor-pointer'
					>
						ResumeAI
					</button>

					<button
						onClick={() => router.back()}
						className='rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white cursor-pointer'
					>
						Back
					</button>
				</div>
			</header>

			{/* Content */}
			<section className='relative z-10 mx-auto max-w-5xl px-6 py-12'>
				{/* Page Title */}
				<div className='mb-10'>
					<p className='text-sm font-medium uppercase tracking-wider text-cyan-400'>
						Account
					</p>

					<h1 className='mt-2 text-4xl font-bold tracking-tight'>
						Settings
					</h1>

					<p className='mt-3 max-w-2xl text-gray-400'>
						Manage your account security and active sessions.
					</p>
				</div>

				{/* Security Section */}
				<div className='space-y-6'>
					<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
						<div className='mb-5 flex items-center gap-3'>
							<div className='flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20'>
								<svg
									className='h-5 w-5 text-cyan-300'
									fill='none'
									stroke='currentColor'
									strokeWidth='1.8'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M12 15v2m-6-6V8a6 6 0 1112 0v3m-13 0h14a1 1 0 011 1v8a1 1 0 01-1 1H5a1 1 0 01-1-1v-8a1 1 0 011-1z'
									/>
								</svg>
							</div>

							<div>
								<h2 className='text-lg font-semibold'>
									Security
								</h2>
								<p className='text-sm text-gray-400'>
									Session management and account protection.
								</p>
							</div>
						</div>

						{/* Current Session */}
						<div className='mb-6 rounded-md border border-white/10 bg-black/20 p-4'>
							<div className='flex items-center justify-between'>
								<div>
									<p className='font-medium text-white'>
										Current Session
									</p>
									<p className='mt-1 text-sm text-gray-400'>
										Windows • Chrome • Active now
									</p>
								</div>

								<span className='rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300'>
									Active
								</span>
							</div>
						</div>

						{/* Signout All */}
						<div className='rounded-lg border border-red-500/20 bg-red-500/5 p-6'>
							<h3 className='text-lg font-semibold text-white'>
								Sign out from all devices
							</h3>

							<p className='mt-2 text-sm leading-6 text-gray-400'>
								This will revoke every active session associated
								with your account. You'll need to sign in again
								on all devices.
							</p>

							<button className='mt-5 rounded-md bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400 cursor-pointer'>
								Sign Out All Devices
							</button>
						</div>
					</div>
				</div>
			</section>
		</main>
	)
}