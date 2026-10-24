import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import InterviewPreparation from '@/components/Workspace/interview-preparation/interviewPreparation'

// metadata of this page
export const metadata = {
	title: 'Interview preparation',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function InterviewPreparationPage() {
	return (
		<ProtectedRoute>
			<InterviewPreparation />
		</ProtectedRoute>
	)
}