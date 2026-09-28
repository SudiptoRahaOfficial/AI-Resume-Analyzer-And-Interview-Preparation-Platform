export default function Loading() {
	return (
		<main className='relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-6 text-white'>
			{/* Background */}
			<div className='pointer-events-none absolute inset-0'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />
				<div className='absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl' />
			</div>

			{/* Loading Card */}
			<div className='relative z-10 w-full max-w-md rounded-xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl'>
				<h1 className='text-3xl font-semibold tracking-tight'>
					ResumeAI
				</h1>

				<p className='mt-2 text-sm text-gray-500'>
					AI-Powered Interview Preparation Platform
				</p>

				{/* Spinner */}
				<div className='mt-8 flex justify-center'>
					<div className='h-12 w-12 animate-spin rounded-full border-2 border-cyan-400/20 border-t-cyan-400' />
				</div>

				<h2 className='mt-6 text-lg font-semibold'>
					Loading your workspace
				</h2>

				<p className='mt-2 text-sm leading-6 text-gray-400'>
					Please wait while we prepare your AI-powered dashboard.
				</p>
			</div>
		</main>
	)
}