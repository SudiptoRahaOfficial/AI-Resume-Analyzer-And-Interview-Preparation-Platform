import InterviewPage from '@/components/interview/interview'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<InterviewPage />
		</ProtectedRoute>
	)
}