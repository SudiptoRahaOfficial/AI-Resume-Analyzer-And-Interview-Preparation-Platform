import ResumesPage from '@/components/resume/resumes'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<ResumesPage />
		</ProtectedRoute>
	)
}