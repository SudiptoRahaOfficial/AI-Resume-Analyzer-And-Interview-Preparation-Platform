import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import CreateProfile from '@/components/profile/create-profile'

// metadata of this page
export const metadata = {
	title: 'Create profile',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function CreateProfilePage() {
	return (
		<ProtectedRoute>
			<CreateProfile />
		</ProtectedRoute>
	)
}