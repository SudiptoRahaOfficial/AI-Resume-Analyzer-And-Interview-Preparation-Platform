import Link from 'next/link'

export default function PrivacyPolicy() {
	const sections = [
		{
			id: 'information-we-collect',
			title: '1. Information We Collect',
			content: [
				{
					heading: 'Account information',
					text: 'When you create an account, we may collect information such as your name, username, email address, and authentication-related data necessary to operate and secure your account.',
				},
				{
					heading: 'Resume and career information',
					text: 'When you use our services, you may provide resumes, employment history, education, skills, career goals, self-descriptions, and target job descriptions. This information is used to provide the features you request.',
				},
				{
					heading: 'Technical and usage information',
					text: 'We may process technical information such as browser details, device information, IP address, session information, and service activity where necessary for security, troubleshooting, and product operation.',
				},
				{
					heading: 'Communications',
					text: 'If you contact us, we may retain the information you submit so that we can review and respond to your inquiry.',
				},
			],
		},
		{
			id: 'how-we-use-information',
			title: '2. How We Use Your Information',
			content: [
				{
					text: 'We use information to create and maintain accounts, authenticate users, generate resume analyses, identify potential skill gaps, prepare interview questions, provide career-related recommendations, maintain reports, improve service reliability, prevent abuse, and respond to support requests.',
				},
				{
					text: 'We may also use information to meet applicable legal obligations and enforce our service terms. We do not claim to use your information for any purpose beyond the purposes described in our actual service practices and applicable notices.',
				},
			],
		},
		{
			id: 'ai-processing',
			title: '3. AI Processing',
			content: [
				{
					text: 'Some ResumeAI features use third-party AI services to analyze information and generate career-related content. When you request an AI feature, relevant information you submit may be transmitted to the AI provider required to perform that feature.',
				},
				{
					text: 'AI-generated results may be incomplete, inaccurate, or unsuitable for your circumstances. You should review generated content before relying on it. ResumeAI does not guarantee employment, interview invitations, ATS results, or hiring outcomes.',
				},
				{
					text: 'Review the applicable AI provider terms and privacy documentation to understand how that provider handles submitted information. Our final policy should identify the actual providers and their applicable data-handling arrangements.',
				},
			],
		},
		{
			id: 'file-storage',
			title: '4. Resume Uploads and File Storage',
			content: [
				{
					text: 'If you upload a resume or profile image, the file may be processed or stored using the service providers configured for the relevant feature. We use this information to provide requested functionality, such as extracting resume text or displaying your profile.',
				},
				{
					text: 'Do not upload information you are not authorized to share. Before launch, this policy should identify the actual file-storage providers, retention practices, and deletion procedures used by ResumeAI.',
				},
			],
		},
		{
			id: 'cookies-sessions',
			title: '5. Cookies and Authentication',
			content: [
				{
					text: 'ResumeAI may use cookies or similar technologies to support authentication, maintain sessions, protect accounts, and operate essential application features. Authentication cookies may contain or reference security-sensitive credentials.',
				},
				{
					text: 'You can manage cookies through your browser settings, but disabling essential cookies may prevent some features from working correctly.',
				},
			],
		},
		{
			id: 'sharing-information',
			title: '6. How Information May Be Shared',
			content: [
				{
					text: 'We may share relevant information with service providers that help us operate ResumeAI, such as hosting, database, file-storage, email-delivery, security, and AI-processing providers. These providers should receive only the information reasonably necessary for their assigned services.',
				},
				{
					text: 'Information may also be disclosed when required by applicable law, to protect the rights and security of users or the service, or in connection with a business transfer where legally permitted.',
				},
				{
					text: 'This policy should be updated to reflect the actual providers, integrations, and disclosures used by the deployed application.',
				},
			],
		},
		{
			id: 'data-retention',
			title: '7. Data Retention and Deletion',
			content: [
				{
					text: 'We retain information for as long as reasonably necessary to provide the service, maintain requested reports, protect security, resolve disputes, and meet applicable legal obligations.',
				},
				{
					text: 'Retention periods may differ by information type. Deleting an account or report may not immediately remove copies retained in backups or records that must be kept for legitimate legal or security purposes. Where applicable, retained copies are handled according to our retention procedures.',
				},
			],
		},
		{
			id: 'security',
			title: '8. Data Security',
			content: [
				{
					text: 'We use appropriate technical and organizational measures intended to protect information against unauthorized access, alteration, disclosure, and loss. No method of transmission or electronic storage can be guaranteed to be completely secure.',
				},
				{
					text: 'You are responsible for maintaining the confidentiality of your credentials and notifying us if you suspect unauthorized access to your account.',
				},
			],
		},
		{
			id: 'your-rights',
			title: '9. Your Privacy Rights',
			content: [
				{
					text: 'Depending on your location and applicable law, you may have rights to request access to, correction of, deletion of, or a copy of your personal information, or to object to or restrict certain processing.',
				},
				{
					text: 'To make a privacy-related request, contact us through our contact page. We may need to verify your identity before fulfilling a request. We will handle eligible requests according to applicable law.',
				},
			],
		},
		{
			id: 'children',
			title: '10. Children’s Privacy',
			content: [
				{
					text: 'ResumeAI is intended for users who are legally permitted to use the service under applicable law. We do not knowingly collect personal information from children where such collection is prohibited. If you believe a child has provided personal information improperly, contact us so that we can review the situation.',
				},
			],
		},
		{
			id: 'policy-changes',
			title: '11. Changes to This Policy',
			content: [
				{
					text: 'We may update this Privacy Policy as ResumeAI evolves or as legal requirements change. When changes are made, we will update the date shown on this page and provide any additional notice required by applicable law.',
				},
			],
		},
	]

	return (
		<main className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-300'>
			{/* Page title */}
			<section className='relative px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10'>
				<div className='mx-auto max-w-4xl'>
					<h1 className='mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
						Privacy Policy
					</h1>

					<p className='mt-6 max-w-3xl text-base leading-8 text-slate-400'>
						Your privacy matters. This policy explains how ResumeAI
						may collect, use, store, and share information when you
						use our platform.
					</p>

					<div className='mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500'>
						<p>Effective date: [Insert effective date]</p>
						<p>Last updated: [Insert last updated date]</p>
					</div>
				</div>
			</section>

			{/* Policy content */}
			<section className='relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-10'>
				{/* Table of contents */}
				<aside className='h-fit rounded-2xl border border-white/10 bg-white/3 p-6 lg:sticky lg:top-8'>
					<h2 className='text-sm font-semibold text-white'>
						On this page
					</h2>

					<nav
						aria-label='Privacy policy sections'
						className='mt-5'
					>
						<ul className='space-y-3'>
							{sections.map((section) => (
								<li key={section.id}>
									<a
										href={`#${section.id}`}
										className='text-sm leading-6 text-slate-400 transition-colors hover:text-indigo-300'
									>
										{section.title}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				{/* Policy sections */}
				<div className='min-w-0 space-y-10'>
					{sections.map((section) => (
						<article
							key={section.id}
							id={section.id}
							className='scroll-mt-8 border-b border-white/10 pb-9 last:border-b-0'
						>
							<h2 className='text-lg font-semibold tracking-tight text-white sm:text-xl'>
								{section.title}
							</h2>

							<div className='mt-5 space-y-5'>
								{section.content.map((item, index) => (
									<div key={`${section.id}-${index}`}>
										{item.heading && (
											<h3 className='mb-2 text-base font-medium text-slate-200'>
												{item.heading}
											</h3>
										)}

										<p className='text-sm leading-8 text-slate-400 sm:text-base'>
											{item.text}
										</p>
									</div>
								))}
							</div>
						</article>
					))}

					<div className='rounded-2xl border border-white/10 bg-white/3 p-6 sm:p-7'>
						<h2 className='text-lg font-semibold text-white'>
							Privacy questions?
						</h2>

						<p className='mt-3 text-sm leading-7 text-slate-400'>
							If you have questions about this policy or wish to
							make a privacy-related request, please contact us.
						</p>

						<Link
							href='/contact'
							className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200'
						>
							Get in Touch
							<span aria-hidden='true'>→</span>
						</Link>
					</div>
				</div>
			</section>
		</main>
	)
}