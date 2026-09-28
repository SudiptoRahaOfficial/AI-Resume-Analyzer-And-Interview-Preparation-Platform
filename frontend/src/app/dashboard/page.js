import Dashboard from '@/components/dashboard/dashboard'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<Dashboard />
		</ProtectedRoute>
	)
}