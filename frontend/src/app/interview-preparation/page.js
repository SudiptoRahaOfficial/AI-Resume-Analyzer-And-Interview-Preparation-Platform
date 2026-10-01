import InterviewPreparationPage from '@/components/interview/interviewPreparation'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<InterviewPreparationPage />
		</ProtectedRoute>
	)
}