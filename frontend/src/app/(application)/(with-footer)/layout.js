import Footer from '@/components/shared/footer'

export default function FooterLayout({ children }) {
	return (
		<>
			<main>{children}</main>
			<Footer />
		</>
	)
}