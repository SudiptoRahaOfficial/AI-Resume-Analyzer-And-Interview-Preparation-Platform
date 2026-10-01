import InterviewPreparationReport from '@/components/interview/interviewPreparationReport'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<InterviewPreparationReport />
		</ProtectedRoute>
	)
}