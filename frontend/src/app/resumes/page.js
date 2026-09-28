import ResumesPage from '@/components/resumes/resumes'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<ResumesPage />
		</ProtectedRoute>
	)
}