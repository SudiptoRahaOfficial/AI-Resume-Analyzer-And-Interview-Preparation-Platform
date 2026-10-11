import Link from 'next/link'

export default function TermsAndConditions() {
	const sections = [
		{
			id: 'acceptance',
			title: '1. Acceptance of These Terms',
			paragraphs: [
				'These Terms & Conditions govern your access to and use of ResumeAI and its associated features. By accessing or using the service, you agree to these terms and applicable laws.',
				'If you do not agree to these terms, do not use the service. If you use ResumeAI on behalf of an organization, you represent that you are authorized to accept applicable terms on its behalf.',
			],
		},
		{
			id: 'eligibility',
			title: '2. Eligibility',
			paragraphs: [
				'You must be legally permitted to use ResumeAI under the laws applicable to you. If you are not legally able to enter into a binding agreement, you may use the service only with appropriate authorization where permitted by law.',
				'You are responsible for ensuring that your use of ResumeAI complies with applicable laws and regulations.',
			],
		},
		{
			id: 'accounts',
			title: '3. Accounts and Account Security',
			paragraphs: [
				'Some features require you to create an account and provide accurate information. You are responsible for keeping your account information current and protecting your authentication credentials.',
				'You must not impersonate another person, create accounts through unauthorized means, or attempt to bypass account verification or security controls.',
				'Notify us if you suspect unauthorized access to your account. We may take reasonable steps to protect users and the service, including restricting access where justified.',
			],
		},
		{
			id: 'services',
			title: '4. ResumeAI Services',
			paragraphs: [
				'ResumeAI provides tools that may assist with resume analysis, ATS-oriented feedback, skill-gap identification, interview preparation, and other career-related tasks.',
				'Features may change over time. We may add, modify, suspend, or discontinue features where reasonably necessary, subject to applicable law and any additional commitments that apply to your use of the service.',
			],
		},
		{
			id: 'ai-disclaimer',
			title: '5. AI-Generated Content and Limitations',
			paragraphs: [
				'ResumeAI may use artificial intelligence to generate analyses, recommendations, questions, summaries, and other career-related content. AI-generated content may be inaccurate, incomplete, outdated, biased, or unsuitable for your circumstances.',
				'You are responsible for reviewing and evaluating generated content before using it in a resume, application, interview, or other professional context. Do not treat AI-generated content as a guarantee of accuracy or as professional, legal, or employment advice.',
				'ResumeAI does not guarantee that you will obtain an interview, pass an applicant tracking system, receive a job offer, or achieve any specific career outcome.',
			],
		},
		{
			id: 'user-content',
			title: '6. Your Content and Uploaded Files',
			paragraphs: [
				'You retain whatever rights you have in the content you submit, subject to applicable law and any rights held by others. You are responsible for ensuring that you have permission to upload and process your resume, documents, job descriptions, and other submitted material.',
				'You grant ResumeAI the limited rights reasonably necessary to host, process, transmit, and use your submitted content to provide the features you request, maintain the service, protect security, and meet applicable legal obligations.',
				'Do not upload content that infringes another person’s rights, violates applicable law, or contains information you are not authorized to share.',
			],
		},
		{
			id: 'acceptable-use',
			title: '7. Acceptable Use',
			paragraphs: [
				'You may not use ResumeAI to engage in unlawful activity, distribute malicious software, interfere with service operation, access accounts or data without authorization, or circumvent security and usage restrictions.',
				'You may not attempt to reverse engineer, disrupt, overload, or exploit the service except where such restrictions are prohibited by applicable law.',
				'We may investigate suspected misuse and take proportionate action, including restricting or terminating access where permitted by law.',
			],
		},
		{
			id: 'intellectual-property',
			title: '8. Intellectual Property',
			paragraphs: [
				'The ResumeAI name, branding, website design, software, and other service materials may be protected by intellectual property laws. Except as permitted by law or expressly authorized by us, you may not copy, distribute, modify, or commercially exploit protected materials.',
				'These terms do not transfer ownership of your submitted content to ResumeAI. Rights in third-party content and tools remain with their respective owners.',
			],
		},
		{
			id: 'third-party-services',
			title: '9. Third-Party Services',
			paragraphs: [
				'ResumeAI may depend on third-party services for AI processing, hosting, storage, authentication-related functionality, email delivery, and other capabilities.',
				'Third-party services may be subject to separate terms and privacy policies. To the extent permitted by law, we are not responsible for independent third-party services that we do not control.',
			],
		},
		{
			id: 'availability',
			title: '10. Availability and Changes',
			paragraphs: [
				'We aim to keep ResumeAI useful and available, but we do not guarantee uninterrupted, error-free, or continuous access. Maintenance, technical problems, third-party outages, or other circumstances may affect availability.',
				'We may update these terms as the service evolves or as legal requirements change. We will provide any notice required by applicable law. Continued use after updated terms take effect constitutes acceptance where legally valid.',
			],
		},
		{
			id: 'disclaimers',
			title: '11. Disclaimers',
			paragraphs: [
				'To the extent permitted by applicable law, ResumeAI is provided on an “as is” and “as available” basis. We do not make guarantees regarding the accuracy, completeness, reliability, or suitability of all content generated or displayed by the service.',
				'Nothing in these terms excludes or limits any warranty, right, or remedy that cannot lawfully be excluded or limited under applicable law.',
			],
		},
		{
			id: 'liability',
			title: '12. Limitation of Liability',
			paragraphs: [
				'To the extent permitted by applicable law, ResumeAI and its operators will not be liable for indirect, incidental, special, consequential, or punitive losses arising from use of the service, including losses resulting from reliance on AI-generated content.',
				'Nothing in these terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law. Any limitation of liability should be reviewed and adapted to the laws governing the service.',
			],
		},
		{
			id: 'termination',
			title: '13. Suspension and Termination',
			paragraphs: [
				'You may stop using ResumeAI at any time. We may suspend or terminate access where reasonably necessary to address security risks, unlawful conduct, material violations of these terms, or other circumstances permitted by applicable law.',
				'Following termination, your ability to access stored content or account features may end. Information may be retained or deleted according to the Privacy Policy, applicable retention practices, and legal requirements.',
			],
		},
		{
			id: 'governing-law',
			title: '14. Governing Law',
			paragraphs: [
				'These terms are subject to the laws and dispute-resolution requirements that apply to the legal entity operating ResumeAI, taking into account any mandatory consumer protections that apply to you.',
				'Before publication, specify the appropriate governing law, jurisdiction, and operator details after obtaining advice relevant to the actual business and its users.',
			],
		},
		{
			id: 'contact',
			title: '15. Contact Us',
			paragraphs: [
				'If you have questions about these terms, please contact us through the ResumeAI contact page.',
			],
		},
	]

	return (
		<main className='relative min-h-screen overflow-hidden bg-slate-950 text-slate-300'>
			{/* Page title */}
			<section className='relative px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10'>
				<div className='mx-auto max-w-4xl'>
					<h1 className='mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
						Terms &amp; Conditions
					</h1>

					<p className='mt-6 max-w-3xl text-base leading-8 text-slate-400'>
						These terms explain the rules and responsibilities
						associated with using ResumeAI and its AI-powered career
						preparation features.
					</p>

					<div className='mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500'>
						<p>Effective date: [Insert effective date]</p>
						<p>Last updated: [Insert last updated date]</p>
					</div>
				</div>
			</section>

			{/* Terms content */}
			<section className='relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16 lg:px-10'>
				{/* Table of contents */}
				<aside className='h-fit rounded-2xl border border-white/10 bg-white/3 p-6 lg:sticky lg:top-8'>
					<h2 className='text-sm font-semibold text-white'>
						On this page
					</h2>

					<nav
						aria-label='Terms and conditions sections'
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

				{/* Terms */}
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
								{section.paragraphs.map((paragraph, index) => (
									<p
										key={`${section.id}-${index}`}
										className='text-sm leading-8 text-slate-400 sm:text-base'
									>
										{paragraph}
									</p>
								))}
							</div>

							{section.id === 'contact' && (
								<Link
									href='/contact'
									className='mt-5 inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 transition-colors hover:text-indigo-200'
								>
									Get in Touch
									<span aria-hidden='true'>→</span>
								</Link>
							)}
						</article>
					))}
				</div>
			</section>
		</main>
	)
}