import AnalyzePage from '@/components/analyze/analyze'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<AnalyzePage />
		</ProtectedRoute>
	)
}