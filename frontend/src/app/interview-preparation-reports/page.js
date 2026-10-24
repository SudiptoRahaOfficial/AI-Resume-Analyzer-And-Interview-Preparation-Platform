import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import InterviewPreparationReports from '@/components/Workspace/interview-preparation-reports/interviewPreparationReports'

// metadata of this page
export const metadata = {
	title: 'Interview preparation reports',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function InterviewPreparationReportsPage() {
	return (
		<ProtectedRoute>
			<InterviewPreparationReports />
		</ProtectedRoute>
	)
}