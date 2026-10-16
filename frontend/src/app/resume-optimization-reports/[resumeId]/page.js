import { Suspense } from 'react'
import ResumeDetails from '@/components/Workspace/resume-optimization-reports/resumeDetails'

async function ResumeDetailsContent({ params }) {
	const { resumeId } = await params

	return <ResumeDetails resumeId={resumeId} />
}

export default function ResumeDetailsPage({ params }) {
	return (
		<Suspense
			fallback={
				<main className='flex min-h-screen items-center justify-center bg-[#030712] px-4 text-slate-300'>
					<div className='text-center'>
						<div className='mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-400/20 border-t-indigo-400' />
						<p className='mt-4 text-sm'>
							Loading resume details...
						</p>
					</div>
				</main>
			}
		>
			<ResumeDetailsContent params={params} />
		</Suspense>
	)
}