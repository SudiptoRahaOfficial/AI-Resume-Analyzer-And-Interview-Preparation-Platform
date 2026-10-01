import InterviewPreparationPage from '@/components/interviewPreparation/interviewPreparation'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<InterviewPreparationPage />
		</ProtectedRoute>
	)
}