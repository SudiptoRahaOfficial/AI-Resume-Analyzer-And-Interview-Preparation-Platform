import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import ResumeOptimization from '@/components/Workspace/resume-optimization/resumeOptimization'

// metadata of this page
export const metadata = {
	title: 'Resume optimization',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function ResumeOptimizationPage() {
	return (
		<ProtectedRoute>
			<ResumeOptimization />
		</ProtectedRoute>
	)
}