import FeatureCard from './FeatureCard'

const aiTools = [
	{
		id: 'interview-preparation',
		eyebrow: 'Interview preparation',
		title: 'Prepare with a clear strategy',
		description:
			'Generate a role-specific interview report based on your resume, your background, and the job you want.',
		href: '/interview-preparation',
		icon: 'message',
		accent: 'indigo',
		points: [
			'Technical and behavioral questions',
			'Personalized skill gap analysis',
			'Day-by-day preparation plan',
		],
	},
	{
		id: 'resume-optimization',
		eyebrow: 'Resume optimization',
		title: 'Create a stronger application',
		description:
			'Transform your existing experience into a job-targeted resume designed for clarity, relevance, and ATS readability.',
		href: '/resume-optimization',
		icon: 'file-check',
		accent: 'blue',
		points: [
			'Job description alignment',
			'Relevant skills and experience',
			'Downloadable PDF resume',
		],
	},
]

export default function AIToolsSection() {
	return (
		<section
			aria-labelledby='tools-heading'
			className='mb-9'
		>
			<div className='mb-4'>
				<h2
					id='tools-heading'
					className='text-base font-semibold text-white'
				>
					Your AI tools
				</h2>

				<p className='mt-1 text-xs text-slate-500'>
					Everything you need to move closer to your next role
				</p>
			</div>

			<div className='grid grid-cols-1 gap-4 xl:grid-cols-2'>
				{aiTools.map((tool) => (
					<FeatureCard
						key={tool.id}
						{...tool}
					/>
				))}
			</div>
		</section>
	)
}