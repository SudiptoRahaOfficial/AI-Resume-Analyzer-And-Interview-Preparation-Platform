import ProtectedRoute from '@/components/authentication/ProtectedRoute'
import Dashboard from '@/components/Workspace/dashboard/dashboard'

// metadata of this page
export const metadata = {
	title: 'Dashboard',

	// private page, keep it out of search results
	robots: { index: false, follow: false },
}

export default function DashboardPage() {
	return (
		<ProtectedRoute>
			<Dashboard />
		</ProtectedRoute>
	)
}