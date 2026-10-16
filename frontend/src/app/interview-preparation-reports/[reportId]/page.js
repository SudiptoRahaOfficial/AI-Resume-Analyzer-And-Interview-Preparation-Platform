import { Suspense } from 'react'
import InterviewDetails from '@/components/Workspace/interview-preparation-reports/interviewDetails'

async function InterviewDetailsContent({ params }) {
	const { reportId } = await params

	return <InterviewDetails reportId={reportId} />
}

export default function InterviewDetailsPage({ params }) {
	return (
		<Suspense
			fallback={
				<main className='flex min-h-screen items-center justify-center bg-[#030712] px-4 text-slate-300'>
					<div className='text-center'>
						<div className='mx-auto h-8 w-8 animate-spin rounded-full border-2 border-indigo-400/20 border-t-indigo-400' />
						<p className='mt-4 text-sm'>
							Loading interview report...
						</p>
					</div>
				</main>
			}
		>
			<InterviewDetailsContent params={params} />
		</Suspense>
	)
}