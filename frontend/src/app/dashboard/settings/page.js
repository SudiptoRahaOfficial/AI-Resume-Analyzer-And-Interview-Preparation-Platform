import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import Settings from '@/components/settings/settings'

// metadata of this page
export const metadata = {
	title: 'Settings',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function SettingsPage() {
	return (
		<ProtectedRoute>
			<Settings />
		</ProtectedRoute>
	)
}