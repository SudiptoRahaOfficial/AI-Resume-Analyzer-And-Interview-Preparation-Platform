import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import UpdateProfile from '@/components/profile/update-profile'

// metadata of this page
export const metadata = {
	title: 'Update profile',

	// private page, keep it out of search results
	robots: { index: false, form: false },
}

export default function UpdateProfilePage() {
	return (
		<ProtectedRoute>
			<UpdateProfile />
		</ProtectedRoute>
	)
}