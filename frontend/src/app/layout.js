import '@/styles/globals.css'
import Providers from '@/components/providers'

// metadata infos
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
const SITE_NAME = 'ResumeAI'
const SITE_DESCRIPTION =
	'A GenAI platform for resume analysis, ATS optimization, skill-gap detection, and AI-powered interview preparation'

// default metadata for every page
export const metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'ResumeAI | AI Resume Analysis & Interview Prep',
		template: '%s | ResumeAI',
	},
	description: SITE_DESCRIPTION,
	applicationName: SITE_NAME,
	openGraph: {
		type: 'website',
		siteName: SITE_NAME,
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
		locale: 'en_US',
	},
	twitter: {
		card: 'summary_large_image',
		title: SITE_NAME,
		description: SITE_DESCRIPTION,
	},
}

export const viewport = {
	themeColor: '#020617',
	colorScheme: 'dark',
}

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			className={`h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}