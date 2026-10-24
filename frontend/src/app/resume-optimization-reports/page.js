import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import ResumeOptimizationReports from '@/components/Workspace/resume-optimization-reports/resumeOptimizationReports'

// metadata of this page
export const metadata = {
	title: 'Resume optimization reports',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function ResumeOptimizationReportsPage() {
	return (
		<ProtectedRoute>
			<ResumeOptimizationReports />
		</ProtectedRoute>
	)
}