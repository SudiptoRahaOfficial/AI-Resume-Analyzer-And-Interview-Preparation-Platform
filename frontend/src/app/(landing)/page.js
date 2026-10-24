import Hero from '@/components/landing/hero'
import Features from '@/components/landing/features'
import HowItWorks from '@/components/landing/howItWorks'
import CTA from '@/components/landing/cta'
import Pricing from '@/components/landing/pricing'
import Testimonials from '@/components/landing/testimonials'
import FAQ from '@/components/landing/faq'

// metadata of this page
export const metadata = {
	title: {
		absolute:
			'ResumeAI | AI Resume Analysis, ATS Optimization & Interview Prep',
	},
	description:
		'Analyze your resume with AI, beat ATS filters, find skill gaps, and practice interview questions tailored to your target role. Get started with ResumeAI.',

	// main url of the site for search engines
	alternates: {
		canonical: '/',
	},
}

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