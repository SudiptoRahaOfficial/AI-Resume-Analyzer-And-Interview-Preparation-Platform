'use client'

export default function LoadingScreen() {
	return (
		<main
			className='relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 text-slate-300'
			role='status'
			aria-label='Loading ResumeAI'
		>
			{/* Subtle background accents */}
			<div
				aria-hidden='true'
				className='pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-500/6 blur-3xl'
			/>

			<div
				aria-hidden='true'
				className='pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-indigo-600/5 blur-3xl'
			/>

			{/* Main content */}
			<div className='relative flex w-full max-w-sm flex-col items-center text-center'>
				{/* ResumeAI branding */}
				<div className='mb-10'>
					<span className='text-2xl font-bold tracking-tight text-white'>
						Resume
						<span className='text-indigo-400'>AI</span>
					</span>
				</div>

				{/* Loading indicator */}
				<div
					aria-hidden='true'
					className='relative mb-7 flex h-14 w-14 items-center justify-center'
				>
					<div className='absolute inset-0 rounded-full border border-slate-800' />

					<div className='absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-indigo-400 motion-reduce:animate-none' />

					<div className='h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.45)]' />
				</div>

				{/* Loading message */}
				<div className='space-y-2'>
					<h1 className='text-base font-semibold tracking-tight text-slate-100'>
						Preparing your workspace
					</h1>

					<p className='text-sm leading-6 text-slate-400'>
						Please wait while we get everything ready.
					</p>
				</div>

				{/* Loading progress animation */}
				<div
					aria-hidden='true'
					className='mt-8 h-1 w-36 overflow-hidden rounded-full bg-slate-800'
				>
					<div className='h-full w-1/2 animate-[resumeai-loading_1.8s_ease-in-out_infinite] rounded-full bg-indigo-400 motion-reduce:animate-none' />
				</div>
			</div>

			{/* Footer branding */}
			<div className='absolute inset-x-0 bottom-7 px-6 text-center'>
				<p className='text-xs font-medium tracking-wide text-slate-600'>
					Your next career move starts here.
				</p>
			</div>
		</main>
	)
}