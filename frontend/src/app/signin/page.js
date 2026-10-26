import Signin from '@/components/authentication/signin'

// metadata of this page
export const metadata = {
	title: 'Sign in',
	description:
		'Sign in to your ResumeAI account to access your resume analysis, ATS insights, skill-gap reports, and interview preparation.',

	// main url of this page for search engines
	alternates: {
		canonical: '/signin',
	},
}

export default function SigninPage() {
	return <Signin />
}