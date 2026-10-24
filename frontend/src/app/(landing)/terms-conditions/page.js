import TermsAndConditions from '@/components/landing/terms-conditions'

// metadata of this page
export const metadata = {
	title: 'Terms and Conditions',
	description:
		'Read the terms and conditions for using ResumeAI, including account responsibilities, acceptable use, and how our AI-powered resume tools work.',

	// main url of this page for search engines
	alternates: {
		canonical: '/terms-conditions',
	},
}

export default function TermsAndConditionsPage() {
	return <TermsAndConditions />
}