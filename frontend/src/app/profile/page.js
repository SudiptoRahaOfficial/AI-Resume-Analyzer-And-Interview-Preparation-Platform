import ProfilePage from '@/components/profile/profile'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<ProfilePage />
		</ProtectedRoute>
	)
}