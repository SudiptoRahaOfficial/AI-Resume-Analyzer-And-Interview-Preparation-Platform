import UploadResume from '@/components/resumes/upload/upload'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<UploadResume />
		</ProtectedRoute>
	)
}