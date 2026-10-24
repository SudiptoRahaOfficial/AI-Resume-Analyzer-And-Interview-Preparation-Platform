import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import Profile from '@/components/profile/profile'

// metadata of this page
export const metadata = {
	title: 'Profile',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function ProfilePage() {
	return (
		<ProtectedRoute>
			<Profile />
		</ProtectedRoute>
	)
}