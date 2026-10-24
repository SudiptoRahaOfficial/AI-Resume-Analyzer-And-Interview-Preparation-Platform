import PrivacyPolicy from '@/components/landing/privacy-policy'

// metadata of this page
export const metadata = {
	title: 'Privacy Policy',
	description:
		'Learn how ResumeAI collects, uses, and protects your personal information and resume data, and what choices you have over your data.',

	// main url of this page for search engines
	alternates: {
		canonical: '/privacy-policy',
	},
}

export default function PrivacyPolicyPage() {
	return <PrivacyPolicy />
}