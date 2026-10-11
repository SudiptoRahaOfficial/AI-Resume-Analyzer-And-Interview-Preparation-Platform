import LandingHeader from '@/components/landing/landingHeader'
import Footer from '@/components/shared/footer'

export default function LandingLayout({ children }) {
	return (
		<>
			<LandingHeader />
			<main>{children}</main>
			<Footer />
		</>
	)
}