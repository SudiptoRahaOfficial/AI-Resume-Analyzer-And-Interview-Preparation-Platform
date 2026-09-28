import Providers from '../providers'
import '../styles/globals.css'

export const metadata = {
	title: 'AI Resume Analyzer',
	description:
		'A Production-ready full stack GenAI platform for resume analysis, ATS optimization, skill-gap detection, and AI-powered interview preparation.',
}

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			className={`h-full antialiased`}
		>
			<body className='min-h-full flex flex-col bg-gray-950 text-mist-200'>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}