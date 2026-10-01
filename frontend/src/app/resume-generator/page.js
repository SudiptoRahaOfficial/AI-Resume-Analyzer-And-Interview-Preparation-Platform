import ResumeGenerator from '@/components/resumeGenerator/resumeGenerator'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<ResumeGenerator />
		</ProtectedRoute>
	)
}