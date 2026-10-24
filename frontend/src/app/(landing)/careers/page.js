import Careers from '@/components/landing/careers'

// metadata of this page
export const metadata = {
	title: 'Careers',
	description:
		'Join the ResumeAI team and help build AI tools that make job searching smarter. Explore open roles and learn what it is like to work with us.',

	// main url of this page for search engines
	alternates: {
		canonical: '/careers',
	},
}

export default function CareersPage() {
	return <Careers />
}