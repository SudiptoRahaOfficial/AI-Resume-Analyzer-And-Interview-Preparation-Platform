// Making this page a client component because it uses
// client-side hooks, navigation, state, and browser events.
'use client'

// ============================================================================
// Dependencies
// ============================================================================

// React hooks used for component state, lifecycle behavior,
// and DOM element references.
import { useEffect, useRef, useState } from 'react'

// Next.js client-side navigation.
import { useRouter } from 'next/navigation'

// Icons used throughout the dashboard.
import {
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	CheckCircle2,
	ChevronRight,
	ClipboardList,
	Clock3,
	Download,
	FileText,
	LayoutDashboard,
	Lightbulb,
	LogOut,
	MessageSquareText,
	Settings,
	Sparkles,
	Target,
	UserRound,
} from 'lucide-react'

// Application-specific hooks used to access authentication,
// dashboard statistics, interview reports, and resumes.
import { useAuth } from '@/hooks/useAuth'
import { useDashboard } from '@/hooks/useDashboard'
import { useInterview } from '@/hooks/useInterview'
import { useResume } from '@/hooks/useResume'

// ============================================================================
// Constants
// ============================================================================

// Static information currently displayed for the authenticated user.
// These values can later be replaced with profile API data without
// changing the dashboard component structure.
const CURRENT_USER = {
	initials: 'SR',
	name: 'Sudipto Raha',
	role: 'Backend Developer',
	email: 'sudipto@example.com',
	accountStatus: 'Verified',
	plan: 'Free',
	memberSince: '2026',
}

// Centralized application routes prevent route strings from being
// scattered throughout the page.
const DASHBOARD_ROUTES = {
	home: '/',
	profile: '/profile',
	settings: '/settings',
	signin: '/auth/signin',
	resumeGenerator: '/resume-generator',
	resumes: '/resumes',
	interviewPreparation: '/interview-preparation',
	interviewReports: '/interview-preparation-reports',
}

// Maximum number of recent items displayed in dashboard sections.
const RECENT_ITEM_LIMIT = 3

// Reusable workspace feature definitions.
// Icon components are stored as references and rendered dynamically.
const WORKSPACE_FEATURES = {
	interview: [
		{
			label: 'Job Match Score',
			icon: Target,
		},
		{
			label: 'Interview Questions',
			icon: MessageSquareText,
		},
		{
			label: 'Skill Gap Analysis',
			icon: Lightbulb,
		},
		{
			label: 'Daily Preparation Plan',
			icon: CalendarDays,
		},
	],
	resume: [
		{
			label: 'Resume Analysis',
			icon: FileText,
		},
		{
			label: 'AI Optimization',
			icon: Sparkles,
		},
		{
			label: 'ATS-Friendly Format',
			icon: CheckCircle2,
		},
		{
			label: 'PDF Generation',
			icon: Download,
		},
	],
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Formats a date into the dashboard's standard date format.
 *
 * Invalid or missing dates are handled gracefully instead of allowing
 * "Invalid Date" to appear in the UI.
 *
 * @param {string|Date} date - Date value returned by the API.
 * @returns {string} Formatted date string.
 */
const formatDashboardDate = (date) => {
	if (!date) {
		return 'Unknown date'
	}

	const parsedDate = new Date(date)

	if (Number.isNaN(parsedDate.getTime())) {
		return 'Unknown date'
	}

	return parsedDate.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	})
}

// ============================================================================
// Reusable UI Components
// ============================================================================

/**
 * Reusable header for the dashboard.
 *
 * Responsibilities:
 * - Render the ResumeAI brand.
 * - Navigate to settings.
 * - Render the authenticated user's profile menu.
 */
function DashboardHeader() {
	// Access Next.js client-side navigation.
	const router = useRouter()

	return (
		<header className='sticky top-0 z-50 border-b border-white/10 bg-[#030712]/80 backdrop-blur-xl'>
			<div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6'>
				{/* ResumeAI brand navigation. */}
				<button
					type='button'
					onClick={() => router.push(DASHBOARD_ROUTES.home)}
					className='ml-14 flex cursor-pointer items-center gap-2.5 transition'
				>
					<span className='text-lg font-semibold tracking-tight text-white'>
						ResumeAI
					</span>
				</button>

				{/* Header actions. */}
				<div className='flex items-center gap-2'>
					{/* Desktop settings shortcut. */}
					<button
						type='button'
						onClick={() => router.push(DASHBOARD_ROUTES.settings)}
						aria-label='Open settings'
						className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm text-gray-400 transition hover:bg-white/5 hover:text-white'
					>
						<Settings className='h-4 w-4' />
					</button>

					{/* Visual divider between settings and profile. */}
					<div className='mx-1 hidden h-6 w-px bg-white/10 sm:block' />

					{/* Profile dropdown. */}
					<ProfileMenu />
				</div>
			</div>
		</header>
	)
}

/**
 * Authenticated user profile dropdown.
 *
 * Responsibilities:
 * - Toggle the profile menu.
 * - Close the menu when clicking outside.
 * - Close the menu when pressing Escape.
 * - Handle profile/settings/workspace navigation.
 * - Handle sign out.
 */
function ProfileMenu() {
	// Access navigation and authentication functionality.
	const router = useRouter()
	const { handleSignout } = useAuth()

	// Track whether the dropdown is currently open.
	const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

	// Reference used to detect clicks outside the dropdown.
	const profileMenuRef = useRef(null)

	/**
	 * Handles sign out and redirects the user to the sign-in page.
	 */
	const signout = async () => {
		try {
			await handleSignout()
			router.replace(DASHBOARD_ROUTES.signin)
		} catch (error) {
			console.error('Failed to sign out:', error)
		}
	}

	/**
	 * Registers global dropdown event listeners.
	 *
	 * The menu closes when:
	 * - The user clicks outside the menu.
	 * - The user presses Escape.
	 */
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				profileMenuRef.current &&
				!profileMenuRef.current.contains(event.target)
			) {
				setIsProfileMenuOpen(false)
			}
		}

		const handleEscape = (event) => {
			if (event.key === 'Escape') {
				setIsProfileMenuOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		document.addEventListener('keydown', handleEscape)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEscape)
		}
	}, [])

	return (
		<div
			ref={profileMenuRef}
			className='relative'
		>
			{/* Profile trigger button. */}
			<button
				type='button'
				onClick={() =>
					setIsProfileMenuOpen((previousState) => !previousState)
				}
				aria-label='Open account menu'
				aria-haspopup='menu'
				aria-expanded={isProfileMenuOpen}
				className='flex cursor-pointer items-center gap-2 rounded-sm px-1.5 py-1 transition hover:bg-white/5'
			>
				{/* User avatar. */}
				<div className='flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
					{CURRENT_USER.initials}
				</div>

				{/* User identity shown on medium and larger screens. */}
				<div className='hidden text-left md:block'>
					<p className='text-xs font-medium text-gray-200'>
						{CURRENT_USER.name}
					</p>

					<p className='text-[11px] text-gray-500'>
						{CURRENT_USER.role}
					</p>
				</div>

				{/* Dropdown direction indicator. */}
				<ChevronRight
					className={`hidden h-3.5 w-3.5 text-gray-600 transition-transform duration-200 md:block ${
						isProfileMenuOpen ? '-rotate-90' : 'rotate-90'
					}`}
				/>
			</button>

			{/* Animated profile dropdown. */}
			<div
				className={`absolute right-0 top-[calc(100%+10px)] z-50 w-64 origin-top-right transition-all duration-200 ease-out ${
					isProfileMenuOpen
						? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
						: 'pointer-events-none -translate-y-1 scale-95 opacity-0'
				}`}
				role='menu'
				aria-hidden={!isProfileMenuOpen}
			>
				<div className='overflow-hidden rounded-lg border border-white/10 bg-[#0b1120]/95 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-2xl'>
					{/* Account identity header. */}
					<div className='px-3 py-3'>
						<div className='flex items-center gap-3'>
							<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-400/10 text-xs font-semibold text-cyan-300 ring-1 ring-cyan-400/20'>
								{CURRENT_USER.initials}
							</div>

							<div className='min-w-0'>
								<p className='truncate text-sm font-medium text-white'>
									{CURRENT_USER.name}
								</p>

								<p className='truncate text-xs text-gray-500'>
									{CURRENT_USER.email}
								</p>
							</div>
						</div>
					</div>

					<div className='my-1 h-px bg-white/10' />

					{/* Profile navigation item. */}
					<ProfileMenuItem
						icon={UserRound}
						label='Profile'
						onClick={() => {
							setIsProfileMenuOpen(false)
							router.push(DASHBOARD_ROUTES.profile)
						}}
					/>

					{/* Settings navigation item. */}
					<ProfileMenuItem
						icon={Settings}
						label='Settings'
						onClick={() => {
							setIsProfileMenuOpen(false)
							router.push(DASHBOARD_ROUTES.settings)
						}}
					/>

					{/* Resume generator navigation item. */}
					<ProfileMenuItem
						icon={FileText}
						label='Resume Generator'
						onClick={() => {
							setIsProfileMenuOpen(false)
							router.push(DASHBOARD_ROUTES.resumeGenerator)
						}}
					/>

					{/* Interview preparation navigation item. */}
					<ProfileMenuItem
						icon={Sparkles}
						label='Interview Preparation'
						onClick={() => {
							setIsProfileMenuOpen(false)
							router.push(DASHBOARD_ROUTES.interviewPreparation)
						}}
					/>

					<div className='my-1 h-px bg-white/10' />

					{/* Sign-out action. */}
					<button
						type='button'
						role='menuitem'
						onClick={() => {
							setIsProfileMenuOpen(false)
							signout()
						}}
						className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-400/10 hover:text-red-300'
					>
						<LogOut className='h-4 w-4 text-red-400/70 transition group-hover:text-red-300' />

						<span className='flex-1'>Sign Out</span>
					</button>
				</div>
			</div>
		</div>
	)
}

/**
 * Reusable profile dropdown menu item.
 *
 * This eliminates the repeated markup previously used for Profile,
 * Settings, Resume Generator, and Interview Preparation.
 *
 * @param {Object} props - Component properties.
 * @param {React.ComponentType} props.icon - Lucide icon component.
 * @param {string} props.label - Menu item label.
 * @param {Function} props.onClick - Navigation callback.
 */
function ProfileMenuItem({ icon: Icon, label, onClick }) {
	return (
		<button
			type='button'
			role='menuitem'
			onClick={onClick}
			className='group flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-gray-300 transition hover:bg-white/5 hover:text-white'
		>
			<Icon className='h-4 w-4 text-gray-500 transition group-hover:text-gray-300' />

			<span className='flex-1'>{label}</span>

			<ChevronRight className='h-3.5 w-3.5 text-gray-600 transition-transform group-hover:translate-x-0.5' />
		</button>
	)
}

/**
 * Welcome and profile summary section.
 *
 * This section contains the dashboard introduction and
 * authenticated user summary.
 */
function WelcomeSection() {
	return (
		<section className='mb-12 grid gap-6 lg:grid-cols-[1.6fr_1fr]'>
			{/* Dashboard welcome panel. */}
			<div className='relative overflow-hidden rounded-lg border border-white/10 bg-white/4 p-6 backdrop-blur-xl sm:p-8'>
				{/* Decorative background glow. */}
				<div className='pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl' />

				<div className='relative flex h-full flex-col justify-between'>
					<div>
						{/* Dashboard section label. */}
						<div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-400'>
							<LayoutDashboard className='h-4 w-4' />
							Dashboard
						</div>

						{/* Personalized dashboard heading. */}
						<h1 className='mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.6rem] lg:leading-tight'>
							Welcome back, Sudipto
						</h1>

						{/* Dashboard introduction. */}
						<p className='mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base'>
							Build a stronger resume and prepare for your next
							interview with AI-powered guidance tailored to your
							target role.
						</p>
					</div>

					{/* Workspace metadata. */}
					<div className='mt-8 flex flex-wrap items-center gap-3'>
						<WorkspaceHint
							icon={Sparkles}
							label='AI-powered workspace'
							iconClassName='text-cyan-400'
						/>

						<WorkspaceHint
							icon={Target}
							label='Career focused'
							iconClassName='text-gray-500'
						/>
					</div>
				</div>
			</div>

			{/* User profile summary panel. */}
			<ProfileSummary />
		</section>
	)
}

/**
 * Small reusable workspace metadata item.
 *
 * @param {Object} props - Component properties.
 * @param {React.ComponentType} props.icon - Icon component.
 * @param {string} props.label - Text displayed beside the icon.
 * @param {string} props.iconClassName - Tailwind classes for the icon.
 */
function WorkspaceHint({ icon: Icon, label, iconClassName }) {
	return (
		<div className='flex items-center gap-2 rounded-sm border border-white/10 bg-white/3 px-3 py-2'>
			<Icon className={`h-4 w-4 ${iconClassName}`} />

			<span className='text-xs font-medium text-gray-400'>{label}</span>
		</div>
	)
}

/**
 * Authenticated user's profile summary.
 */
function ProfileSummary() {
	// Navigation is required for the "View profile" action.
	const router = useRouter()

	return (
		<div className='rounded-lg border border-white/10 bg-white/4 p-6 backdrop-blur-xl sm:p-7'>
			<div className='flex h-full flex-col'>
				{/* Profile identity. */}
				<div className='flex items-start justify-between gap-4'>
					<div className='m-auto flex items-center gap-4'>
						{/* User avatar. */}
						<div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-sm font-bold text-cyan-300 ring-1 ring-cyan-400/20'>
							{CURRENT_USER.initials}
						</div>

						{/* User name and role. */}
						<div className='min-w-0'>
							<div className='flex items-center gap-2'>
								<h3 className='truncate font-semibold text-white'>
									{CURRENT_USER.name}
								</h3>

								<CheckCircle2 className='h-4 w-4 shrink-0 text-emerald-400' />
							</div>

							<p className='mt-1 text-sm text-gray-500'>
								{CURRENT_USER.role}
							</p>
						</div>
					</div>
				</div>

				{/* Divider between identity and account information. */}
				<div className='my-6 h-px bg-white/10' />

				{/* Account information. */}
				<div className='space-y-4'>
					{/* Account verification status. */}
					<ProfileDetail
						label='Account status'
						value={
							<div className='flex items-center gap-1.5 text-sm font-medium text-emerald-300'>
								<span className='h-1.5 w-1.5 rounded-full bg-emerald-400' />
								{CURRENT_USER.accountStatus}
							</div>
						}
					/>

					{/* Current subscription plan. */}
					<ProfileDetail
						label='Current plan'
						value={
							<span className='text-sm font-medium text-gray-200'>
								{CURRENT_USER.plan}
							</span>
						}
					/>

					{/* Account creation year. */}
					<ProfileDetail
						label='Member since'
						value={
							<span className='text-sm font-medium text-gray-200'>
								{CURRENT_USER.memberSince}
							</span>
						}
					/>
				</div>

				{/* Profile navigation action. */}
				<div className='mt-auto pt-6'>
					<button
						type='button'
						onClick={() => router.push(DASHBOARD_ROUTES.profile)}
						className='flex w-full cursor-pointer items-center justify-between rounded-sm border border-white/10 bg-white/2 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-white/15 hover:bg-white/5 hover:text-white'
					>
						{/* Profile icon. */}
						<div className='hidden h-7 w-7 items-center justify-center rounded-sm bg-white/3 text-gray-500 sm:flex'>
							<UserRound className='h-4 w-4' />
						</div>

						<span>View profile</span>

						<ChevronRight className='h-4 w-4 text-gray-500' />
					</button>
				</div>
			</div>
		</div>
	)
}

/**
 * Reusable profile detail row.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.label - Detail label.
 * @param {React.ReactNode} props.value - Detail value.
 */
function ProfileDetail({ label, value }) {
	return (
		<div className='flex items-center justify-between'>
			<span className='text-sm text-gray-500'>{label}</span>

			{value}
		</div>
	)
}

/**
 * Primary AI workspace section.
 *
 * Provides the two primary dashboard workflows:
 * - Interview Preparation
 * - ATS Resume Generation
 */
function AIWorkspace() {
	return (
		<section className='mb-12'>
			{/* Workspace section heading. */}
			<div className='mb-5 flex items-end justify-between gap-4'>
				<div>
					<h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
						Your AI Workspace
					</h2>

					<p className='mt-1 text-sm text-gray-400'>
						Choose what you want to work on today.
					</p>
				</div>
			</div>

			{/* Primary workspace cards. */}
			<div className='grid gap-6 lg:grid-cols-2'>
				<WorkspaceCard
					type='interview'
					icon={Target}
					badge='AI Guided'
					title='Interview Preparation'
					description='Analyze your current capabilities against a target job and receive a personalized interview preparation guide.'
					features={WORKSPACE_FEATURES.interview}
					actionLabel='Start Interview Preparation'
					actionRoute={DASHBOARD_ROUTES.interviewPreparation}
				/>

				<WorkspaceCard
					type='resume'
					icon={FileText}
					badge='AI Powered'
					title='ATS Resume'
					description='Generate or optimize an ATS-friendly resume using your existing resume, self-description, or both.'
					features={WORKSPACE_FEATURES.resume}
					actionLabel='Create ATS Resume'
					actionRoute={DASHBOARD_ROUTES.resumeGenerator}
				/>
			</div>
		</section>
	)
}

/**
 * Reusable AI workspace card.
 *
 * The card uses explicit style variants instead of dynamically constructed
 * Tailwind class names so Tailwind can statically detect all classes.
 *
 * @param {Object} props - Component properties.
 */
function WorkspaceCard({
	type,
	icon: Icon,
	badge,
	title,
	description,
	features,
	actionLabel,
	actionRoute,
}) {
	// Access navigation for the primary workspace action.
	const router = useRouter()

	// Define complete Tailwind variants for each workspace type.
	const variants = {
		interview: {
			border: 'hover:border-cyan-400/30',
			glow: 'bg-cyan-400/10 group-hover:bg-cyan-400/15',
			iconBackground: 'bg-cyan-400/10',
			iconRing: 'ring-cyan-400/10',
			iconColor: 'text-cyan-300',
			badgeBorder: 'border-cyan-400/20',
			badgeBackground: 'bg-cyan-400/5',
			badgeColor: 'text-cyan-300',
			featureIconColor: 'text-cyan-300',
			button: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
		},
		resume: {
			border: 'hover:border-blue-400/30',
			glow: 'bg-blue-500/10 group-hover:bg-blue-500/15',
			iconBackground: 'bg-blue-400/10',
			iconRing: 'ring-blue-400/10',
			iconColor: 'text-blue-300',
			badgeBorder: 'border-blue-400/20',
			badgeBackground: 'bg-blue-400/5',
			badgeColor: 'text-blue-300',
			featureIconColor: 'text-blue-300',
			button: 'border border-white/10 bg-white/5 text-white hover:bg-white/10',
		},
	}

	// Select the styling configuration for the current workspace.
	const variant = variants[type]

	return (
		<div
			className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition duration-300 hover:bg-white/[0.07] sm:p-8 ${variant.border}`}
		>
			{/* Decorative workspace glow. */}
			<div
				className={`pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition duration-300 ${variant.glow}`}
			/>

			<div className='relative'>
				{/* Workspace card header. */}
				<div className='flex items-start justify-between gap-4'>
					<div
						className={`flex h-12 w-12 items-center justify-center rounded-lg ring-1 ${variant.iconBackground} ${variant.iconRing}`}
					>
						<Icon className={`h-6 w-6 ${variant.iconColor}`} />
					</div>

					<span
						className={`rounded-full border px-3 py-1 text-xs font-medium ${variant.badgeBorder} ${variant.badgeBackground} ${variant.badgeColor}`}
					>
						{badge}
					</span>
				</div>

				{/* Workspace title and description. */}
				<h3 className='mt-6 text-xl font-semibold'>{title}</h3>

				<p className='mt-2 max-w-xl text-sm leading-6 text-gray-400'>
					{description}
				</p>

				{/* Workspace capabilities. */}
				<div className='mt-6 grid gap-3 sm:grid-cols-2'>
					{features.map(({ label, icon: FeatureIcon }) => (
						<div
							key={label}
							className='flex items-center gap-3 rounded-sm border border-white/5 bg-black/20 p-3'
						>
							<FeatureIcon
								className={`h-4 w-4 shrink-0 ${variant.featureIconColor}`}
							/>

							<span className='text-sm text-gray-300'>
								{label}
							</span>
						</div>
					))}
				</div>

				{/* Primary workspace navigation action. */}
				<button
					type='button'
					onClick={() => router.push(actionRoute)}
					className={`mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold transition ${variant.button}`}
				>
					{actionLabel}

					<ArrowRight className='h-4 w-4' />
				</button>
			</div>
		</div>
	)
}

/**
 * Dashboard activity statistics section.
 *
 * Displays only the two currently supported statistics:
 * - Interview Guides
 * - Generated Resumes
 */
function ActivitySection({ stats, loading }) {
	return (
		<section className='mb-12'>
			{/* Activity section heading. */}
			<div className='mb-5'>
				<h2 className='text-xl font-semibold tracking-tight sm:text-2xl'>
					Snapshot of Your Recent Activity
				</h2>

				<p className='mt-1 text-sm text-gray-400'>
					Stay informed about your latest interview guides, resume
					improvements, and overview throughout your ResumeAI journey.
				</p>
			</div>

			{/* Dashboard statistics. */}
			<div className='grid gap-4 sm:grid-cols-2'>
				<ActivityStatCard
					label='Interview Guides'
					description='Recently generated interview guides'
					value={stats?.interviewGuides ?? 0}
					loading={loading}
					icon={ClipboardList}
				/>

				<ActivityStatCard
					label='Generated Resumes'
					description='Recently generated resumes'
					value={stats?.generatedResumes ?? 0}
					loading={loading}
					icon={FileText}
				/>
			</div>
		</section>
	)
}

/**
 * Reusable activity statistic card.
 *
 * @param {Object} props - Component properties.
 */
function ActivityStatCard({ label, description, value, loading, icon: Icon }) {
	return (
		<div className='rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-xl'>
			<div className='flex items-center justify-between'>
				<div>
					<p className='text-sm font-medium text-gray-400'>{label}</p>

					{/* Skeleton displayed while statistics are loading. */}
					{loading ? (
						<div className='mt-3 h-8 w-12 animate-pulse rounded bg-white/10' />
					) : (
						<p className='mt-2 text-3xl font-semibold text-white'>
							{value}
						</p>
					)}

					<p className='mt-2 text-xs text-gray-500'>{description}</p>
				</div>

				{/* Statistic icon. */}
				<div className='flex h-10 w-10 items-center justify-center rounded-md bg-blue-400/10'>
					<Icon className='h-5 w-5 text-blue-300' />
				</div>
			</div>
		</div>
	)
}

/**
 * Recent activity section containing interview guides and resumes.
 */
function RecentWorkSection({
	reports,
	reportsLoading,
	resumes,
	resumesLoading,
}) {
	return (
		<section className='grid gap-6 lg:grid-cols-2'>
			{/* Recent interview guides. */}
			<RecentInterviewGuides
				reports={reports}
				loading={reportsLoading}
			/>

			{/* Recent generated resumes. */}
			<RecentResumes
				resumes={resumes}
				loading={resumesLoading}
			/>
		</section>
	)
}

/**
 * Recent interview guide list.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.reports - Interview reports returned by the API.
 * @param {boolean} props.loading - Whether reports are loading.
 */
function RecentInterviewGuides({ reports, loading }) {
	// Access navigation for report and creation actions.
	const router = useRouter()

	return (
		<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
			{/* Section header. */}
			<RecentSectionHeader
				title='Recent Interview Guides'
				description='Continue preparing for your target roles.'
				viewAllRoute={DASHBOARD_ROUTES.interviewReports}
				viewAllLabel='View all'
				accent='cyan'
			/>

			{/* Interview reports content. */}
			<div className='mt-6 space-y-3'>
				{loading ? (
					<RecentLoadingState message='Loading interview guides...' />
				) : reports.length === 0 ? (
					<InterviewEmptyState
						onCreate={() =>
							router.push(DASHBOARD_ROUTES.interviewPreparation)
						}
					/>
				) : (
					reports.slice(0, RECENT_ITEM_LIMIT).map((report) => (
						<InterviewReportItem
							key={report._id}
							report={report}
							onClick={() =>
								router.push(
									`${DASHBOARD_ROUTES.interviewReports}/${report._id}`,
								)
							}
						/>
					))
				)}
			</div>

			{/* Mobile "view all" action.
			 *
			 * This intentionally preserves the current route behavior
			 * of the existing dashboard implementation.
			 */}
			<button
				type='button'
				onClick={() =>
					router.push(DASHBOARD_ROUTES.interviewPreparation)
				}
				className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white sm:hidden'
			>
				View all guides
				<ArrowRight className='h-4 w-4' />
			</button>
		</div>
	)
}

/**
 * Header used by recent activity sections.
 *
 * @param {Object} props - Component properties.
 */
function RecentSectionHeader({
	title,
	description,
	viewAllRoute,
	viewAllLabel,
	accent,
}) {
	// Navigation is required for the desktop "View all" action.
	const router = useRouter()

	// Define explicit accent variants for Tailwind compatibility.
	const accentStyles = {
		cyan: 'text-cyan-300 hover:text-cyan-200',
		blue: 'text-blue-300 hover:text-blue-200',
	}

	return (
		<div className='flex items-start justify-between gap-4'>
			<div>
				<h2 className='text-xl font-semibold'>{title}</h2>

				<p className='mt-1 text-sm text-gray-400'>{description}</p>
			</div>

			{/* Desktop "View all" action. */}
			<button
				type='button'
				onClick={() => router.push(viewAllRoute)}
				className={`hidden cursor-pointer items-center gap-1 text-sm font-medium transition sm:flex ${accentStyles[accent]}`}
			>
				{viewAllLabel}

				<ChevronRight className='h-4 w-4' />
			</button>
		</div>
	)
}

/**
 * Loading state used by recent activity lists.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.message - Loading message.
 */
function RecentLoadingState({ message }) {
	return (
		<div className='rounded-md border border-white/5 bg-black/20 p-6 text-center'>
			<p className='text-sm text-gray-500'>{message}</p>
		</div>
	)
}

/**
 * Empty state for interview reports.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onCreate - Callback for creating a report.
 */
function InterviewEmptyState({ onCreate }) {
	return (
		<div className='rounded-md border border-white/5 bg-black/20 p-6 text-center'>
			<Target className='mx-auto h-8 w-8 text-gray-600' />

			<p className='mt-3 text-sm font-medium text-gray-300'>
				No interview guides yet
			</p>

			<p className='mt-1 text-xs text-gray-500'>
				Generate your first interview preparation guide to see it here.
			</p>

			<button
				type='button'
				onClick={onCreate}
				className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-sm bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300'
			>
				Create Interview Guide
				<ArrowRight className='h-3.5 w-3.5' />
			</button>
		</div>
	)
}

/**
 * Individual interview report item.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.report - Interview report data.
 * @param {Function} props.onClick - Navigation callback.
 */
function InterviewReportItem({ report, onClick }) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='group flex w-full cursor-pointer items-center justify-between gap-4 rounded-md border border-white/5 bg-black/20 p-4 text-left transition hover:border-cyan-400/20 hover:bg-white/5'
		>
			{/* Report information. */}
			<div className='min-w-0'>
				<div className='flex items-center gap-2'>
					<BriefcaseBusiness className='h-4 w-4 shrink-0 text-cyan-300' />

					<h3 className='truncate text-sm font-medium text-white'>
						{report.jobTitle}
					</h3>
				</div>

				{/* Report content counts. */}
				<div className='mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500'>
					<span>
						{report.technicalQuestions?.length ?? 0} technical
					</span>

					<span>
						{report.behavioralQuestions?.length ?? 0} behavioral
					</span>

					<span>{report.skillGaps?.length ?? 0} skill gaps</span>
				</div>

				{/* Report creation date. */}
				<div className='mt-2 flex items-center gap-1 text-xs text-gray-500'>
					<Clock3 className='h-3 w-3' />

					{formatDashboardDate(report.createdAt)}
				</div>
			</div>

			{/* Report match score. */}
			<div className='flex shrink-0 flex-col items-end gap-2'>
				<span className='text-lg font-semibold text-cyan-300'>
					{report.matchScore}%
				</span>

				<ChevronRight className='h-4 w-4 text-gray-600 transition group-hover:translate-x-0.5 group-hover:text-cyan-300' />
			</div>
		</button>
	)
}

/**
 * Recent generated resumes list.
 *
 * @param {Object} props - Component properties.
 * @param {Array} props.resumes - Resume data returned by the API.
 * @param {boolean} props.loading - Whether resumes are loading.
 */
function RecentResumes({ resumes, loading }) {
	// Access navigation for resume actions.
	const router = useRouter()

	// Limit dashboard rendering to the most recent resumes.
	const recentResumes = resumes.slice(0, RECENT_ITEM_LIMIT)

	return (
		<div className='rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-xl'>
			{/* Section header. */}
			<RecentSectionHeader
				title='Recent Resumes'
				description='Your latest ATS-optimized resumes.'
				viewAllRoute={DASHBOARD_ROUTES.resumes}
				viewAllLabel='View all'
				accent='blue'
			/>

			{/* Loading state. */}
			{loading && (
				<div className='mt-6 flex items-center justify-center rounded-md border border-white/5 bg-black/20 py-10'>
					<div className='flex items-center gap-3'>
						<div className='h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-blue-400' />

						<p className='text-sm text-gray-500'>
							Loading resumes...
						</p>
					</div>
				</div>
			)}

			{/* Empty state. */}
			{!loading && resumes.length === 0 && (
				<ResumeEmptyState
					onCreate={() =>
						router.push(DASHBOARD_ROUTES.resumeGenerator)
					}
				/>
			)}

			{/* Recent resume items. */}
			{!loading && resumes.length > 0 && (
				<div className='mt-6 space-y-3'>
					{recentResumes.map((resume) => (
						<ResumeItem
							key={resume._id}
							resume={resume}
							onOpen={() =>
								router.push(
									`${DASHBOARD_ROUTES.resumes}/${resume._id}`,
								)
							}
						/>
					))}
				</div>
			)}

			{/* Mobile "view all" action. */}
			{!loading && resumes.length > 0 && (
				<button
					type='button'
					onClick={() => router.push(DASHBOARD_ROUTES.resumes)}
					className='mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white sm:hidden'
				>
					View all resumes
					<ArrowRight className='h-4 w-4' />
				</button>
			)}
		</div>
	)
}

/**
 * Empty state for generated resumes.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onCreate - Callback for creating a resume.
 */
function ResumeEmptyState({ onCreate }) {
	return (
		<div className='mt-6 rounded-md border border-white/5 bg-black/20 px-5 py-8 text-center'>
			<div className='mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-blue-400/10'>
				<FileText className='h-5 w-5 text-blue-300' />
			</div>

			<h3 className='mt-3 text-sm font-medium text-white'>
				No resumes yet
			</h3>

			<p className='mt-1 text-xs leading-5 text-gray-500'>
				Create your first AI-optimized resume to get started.
			</p>

			<button
				type='button'
				onClick={onCreate}
				className='mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md bg-blue-400 px-4 py-2 text-xs font-semibold text-slate-950 transition hover:bg-blue-300'
			>
				Create Resume
				<ArrowRight className='h-3.5 w-3.5' />
			</button>
		</div>
	)
}

/**
 * Individual generated resume item.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.resume - Resume data.
 * @param {Function} props.onOpen - Callback for opening the resume.
 */
function ResumeItem({ resume, onOpen }) {
	/**
	 * Handles keyboard navigation for the resume item.
	 *
	 * Space and Enter behave like a mouse click.
	 *
	 * @param {KeyboardEvent} event - Keyboard event.
	 */
	const handleKeyDown = (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault()
			onOpen()
		}
	}

	return (
		<div
			role='button'
			tabIndex={0}
			onClick={onOpen}
			onKeyDown={handleKeyDown}
			className='group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-white/5 bg-black/20 p-4 transition hover:border-blue-400/20 hover:bg-white/5'
		>
			{/* Resume identity and metadata. */}
			<div className='flex min-w-0 items-center gap-3'>
				{/* Resume icon. */}
				<div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-400/10'>
					<FileText className='h-5 w-5 text-blue-300' />
				</div>

				{/* Resume information. */}
				<div className='min-w-0'>
					<h3 className='truncate text-sm font-medium text-white'>
						{resume.jobTitle || 'Generated Resume'}
					</h3>

					<p className='mt-1 truncate text-xs text-gray-500'>
						AI-generated resume
					</p>

					{/* Resume status and creation date. */}
					<div className='mt-2 flex items-center gap-2'>
						<span className='rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300'>
							Ready
						</span>

						<span className='text-[10px] text-gray-600'>
							{formatDashboardDate(resume.createdAt)}
						</span>
					</div>
				</div>
			</div>

			{/* Resume PDF download action.
			 *
			 * stopPropagation prevents the download action from also
			 * triggering the parent resume navigation.
			 */}
			<a
				href={resume.resumePdf}
				download
				target='_blank'
				rel='noopener noreferrer'
				aria-label={`Download ${resume.jobTitle || 'resume'}`}
				onClick={(event) => event.stopPropagation()}
				className='flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-sm border border-white/10 text-gray-400 transition hover:bg-white/5 hover:text-white'
			>
				<Download className='h-4 w-4' />
			</a>
		</div>
	)
}

/**
 * Mobile-only settings shortcut.
 */
function MobileSettings() {
	// Access navigation for the settings route.
	const router = useRouter()

	return (
		<div className='mt-6 sm:hidden'>
			<button
				type='button'
				onClick={() => router.push(DASHBOARD_ROUTES.settings)}
				className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 py-3 text-sm font-medium text-gray-400 transition hover:bg-white/5 hover:text-white'
			>
				<Settings className='h-4 w-4' />
				Settings
			</button>
		</div>
	)
}

// ============================================================================
// Dashboard Page
// ============================================================================

/**
 * Main dashboard page.
 *
 * Responsibilities:
 * - Fetch dashboard statistics.
 * - Fetch interview reports.
 * - Fetch generated resumes.
 * - Compose the dashboard feature sections.
 *
 * UI responsibilities are delegated to smaller feature components above.
 */
export default function Dashboard() {
	// --------------------------------------------------------------------------
	// Dashboard statistics feature
	// --------------------------------------------------------------------------

	// Access dashboard statistics and their loading state.
	const {
		stats: dashboardStats,
		loading: dashboardStatsLoading,
		handleGetDashboardStats,
	} = useDashboard()

	/**
	 * Fetch dashboard statistics when the dashboard is mounted.
	 */
	useEffect(() => {
		const fetchDashboardStats = async () => {
			try {
				await handleGetDashboardStats()
			} catch (error) {
				console.error('Failed to fetch dashboard statistics:', error)
			}
		}

		fetchDashboardStats()
	}, [handleGetDashboardStats])

	// --------------------------------------------------------------------------
	// Interview preparation feature
	// --------------------------------------------------------------------------

	// Access interview reports and their loading state.
	const {
		reports,
		loading: reportsLoading,
		handleGetReports,
	} = useInterview()

	/**
	 * Fetch the authenticated user's interview reports when the dashboard
	 * is mounted.
	 */
	useEffect(() => {
		const fetchReports = async () => {
			try {
				await handleGetReports()
			} catch (error) {
				console.error('Failed to fetch interview reports:', error)
			}
		}

		fetchReports()
	}, [handleGetReports])

	// --------------------------------------------------------------------------
	// Resume generation feature
	// --------------------------------------------------------------------------

	// Access generated resumes and their loading state.
	const { resumes, loading: resumesLoading, handleGetResumes } = useResume()

	/**
	 * Fetch the authenticated user's generated resumes when the dashboard
	 * is mounted.
	 */
	useEffect(() => {
		const fetchResumes = async () => {
			try {
				await handleGetResumes()
			} catch (error) {
				console.error('Failed to fetch dashboard resumes:', error)
			}
		}

		fetchResumes()
	}, [handleGetResumes])

	// --------------------------------------------------------------------------
	// Dashboard composition
	// --------------------------------------------------------------------------

	return (
		<main className='relative min-h-screen overflow-hidden bg-[#030712] text-white'>
			{/* Global dashboard background effects. */}
			<div className='pointer-events-none absolute inset-0 overflow-hidden'>
				<div className='absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl' />

				<div className='absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl' />

				<div className='absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl' />
			</div>

			{/* Sticky dashboard navigation header. */}
			<DashboardHeader />

			{/* Main dashboard content container. */}
			<div className='relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-12'>
				{/* Welcome and authenticated user summary. */}
				<WelcomeSection />

				{/* Primary AI workflows. */}
				<AIWorkspace />

				{/* Dashboard statistics. */}
				<ActivitySection
					stats={dashboardStats}
					loading={dashboardStatsLoading}
				/>

				{/* Recent interview guides and generated resumes. */}
				<RecentWorkSection
					reports={reports}
					reportsLoading={reportsLoading}
					resumes={resumes}
					resumesLoading={resumesLoading}
				/>

				{/* Mobile settings shortcut. */}
				<MobileSettings />
			</div>
		</main>
	)
}