import SettingsPage from '@/components/settings/settings'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
	return (
		<ProtectedRoute>
			<SettingsPage />
		</ProtectedRoute>
	)
}