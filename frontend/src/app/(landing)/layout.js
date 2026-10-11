import Header from '@/components/landing/header'
import Footer from '@/components/landing/footer'

export default function LandingLayout({ children }) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	)
}