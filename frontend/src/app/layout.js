import '../styles/globals.css'

export const metadata = {
	title: 'ResumeAI',
	description:
		'A GenAI platform for resume analysis, ATS optimization, skill-gap detection, and AI-powered interview preparation',
}

export default function RootLayout({ children }) {
	return (
		<html
			lang='en'
			className={`h-full antialiased`}
		>
			<body className='min-h-full flex flex-col'>{children}</body>
		</html>
	)
}