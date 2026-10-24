import GuestRoute from '@/components/authentication/GuestRoute'
import Signup from '@/components/authentication/signup'

// metadata of this page
export const metadata = {
	title: 'Create your account',
	description:
		'Sign up for ResumeAI to analyze your resume, optimize it for ATS, find skill gaps, and prepare for interviews with AI.',

	// tells search engines this is the main url of this page
	alternates: {
		canonical: '/signup',
	},
}

export default function SignupPage() {
	return (
		<GuestRoute>
			<Signup />
		</GuestRoute>
	)
}