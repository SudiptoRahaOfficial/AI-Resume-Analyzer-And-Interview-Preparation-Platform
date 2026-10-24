import Contact from '@/components/landing/contact'

// metadata of this page
export const metadata = {
	title: 'Contact Us',
	description:
		'Get in touch with the ResumeAI team for support, feedback, or questions about resume analysis, ATS optimization, and interview preparation.',

	// main url of this page for search engines
	alternates: {
		canonical: '/contact',
	},
}

export default function ContactPage() {
	return <Contact />
}