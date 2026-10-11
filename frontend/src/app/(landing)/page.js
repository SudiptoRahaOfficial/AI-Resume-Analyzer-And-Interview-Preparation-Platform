import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/howItWorks'
import CTA from '@/components/landing/cta'
import Pricing from '@/components/landing/pricing'
import Testimonials from '@/components/landing/testimonials'
import FAQ from '@/components/landing/faq'

export default function LandingPage() {
	return (
		<>
			<Hero />
			<Features />
			<HowItWorks />
			<CTA />
			<Pricing />
			<Testimonials />
			<FAQ />
		</>
	)
}