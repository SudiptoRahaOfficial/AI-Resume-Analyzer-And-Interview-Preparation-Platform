import Link from 'next/link'

import DashboardIcon from '../../shared/icon'
import ActivityRow from './ActivityRow'

const interviewActivities = [
	{
		id: 'interview-1',
		title: 'Backend Developer Interview',
		subtitle: 'Interview Preparation',
		date: 'Recently generated',
		status: 'Completed',
		score: '78%',
		scoreLabel: 'Readiness',
		icon: 'message',
		href: '/interview-preparation-reports/123',
	},
	{
		id: 'interview-2',
		title: 'Node.js Developer Preparation',
		subtitle: 'Interview Preparation',
		date: 'Recently generated',
		status: 'Completed',
		score: '72%',
		scoreLabel: 'Readiness',
		icon: 'message',
		href: '/interview-preparation-reports/124',
	},
	{
		id: 'interview-3',
		title: 'Software Engineer Preparation',
		subtitle: 'Interview Preparation',
		date: 'Recently generated',
		status: 'Completed',
		score: '84%',
		scoreLabel: 'Readiness',
		icon: 'message',
		href: '/interview-preparation-reports/125',
	},
]

const resumeActivities = [
	{
		id: 'resume-1',
		title: 'Software Engineer Resume',
		subtitle: 'Resume Optimization',
		date: 'Recently optimized',
		status: 'Completed',
		score: '85%',
		scoreLabel: 'ATS Match',
		icon: 'file-check',
		href: '/resume-optimization-reports/123',
	},
	{
		id: 'resume-2',
		title: 'Data Analyst Resume',
		subtitle: 'Resume Optimization',
		date: 'Recently optimized',
		status: 'Completed',
		score: '78%',
		scoreLabel: 'ATS Match',
		icon: 'file-check',
		href: '/resume-optimization-reports/124',
	},
	{
		id: 'resume-3',
		title: 'Frontend Developer Resume',
		subtitle: 'Resume Optimization',
		date: 'Recently optimized',
		status: 'Completed',
		score: '62%',
		scoreLabel: 'ATS Match',
		icon: 'file-check',
		href: '/resume-optimization-reports/125',
	},
]

function ActivitySection({
	title,
	description,
	activities,
	viewAllHref,
	emptyMessage,
	emptyDescription,
}) {
	return (
		<section className='min-w-0 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/40'>
			<div className='flex items-center justify-between gap-3 border-b border-slate-800/70 px-4 py-4 sm:px-5'>
				<div className='min-w-0'>
					<h3 className='text-sm font-semibold text-white'>
						{title}
					</h3>

					<p className='mt-1 text-xs text-slate-500'>{description}</p>
				</div>

				<Link
					href={viewAllHref}
					className='inline-flex shrink-0 items-center gap-1 text-xs font-medium text-indigo-300 transition-colors hover:text-indigo-200'
				>
					View all
					<DashboardIcon
						name='arrow'
						size={14}
					/>
				</Link>
			</div>

			{activities.length > 0 ? (
				<div className='divide-y divide-slate-800/70'>
					{activities.map((activity) => (
						<ActivityRow
							key={activity.id}
							activity={activity}
						/>
					))}
				</div>
			) : (
				<div className='px-4 py-10 text-center sm:px-5'>
					<div className='mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700/70 bg-slate-800/60 text-slate-400'>
						<DashboardIcon
							name='file'
							size={20}
						/>
					</div>

					<p className='mt-4 text-sm font-medium text-slate-300'>
						{emptyMessage}
					</p>

					<p className='mt-1 text-xs leading-5 text-slate-500'>
						{emptyDescription}
					</p>
				</div>
			)}
		</section>
	)
}

export default function RecentActivitySection() {
	return (
		<section aria-labelledby='activity-heading'>
			{/* Main section heading */}
			<div className='mb-4 flex items-end justify-between gap-4'>
				<div>
					<h2
						id='activity-heading'
						className='text-base font-semibold text-white'
					>
						Recent activity
					</h2>

					<p className='mt-1 text-xs text-slate-500'>
						Pick up where you left off
					</p>
				</div>
			</div>

			{/* Two report sections side by side */}
			<div className='grid grid-cols-1 items-start lg:grid-cols-2 gap-3 sm:gap-4'>
				<ActivitySection
					title='Recent Interview Preparation'
					description='Your latest interview reports'
					activities={interviewActivities}
					viewAllHref='/interview-preparation-reports'
					emptyMessage='No interview reports yet'
					emptyDescription='Your generated interview preparation reports will appear here.'
				/>

				<ActivitySection
					title='Recent Resume Optimization'
					description='Your latest optimized resumes'
					activities={resumeActivities}
					viewAllHref='/resume-optimization-reports'
					emptyMessage='No optimized resumes yet'
					emptyDescription='Your optimized resumes will appear here.'
				/>
			</div>
		</section>
	)
}