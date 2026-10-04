import ResumeDetails from '@/components/resume/resumeDetails'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<ResumeDetails />
		</ProtectedRoute>
	)
}