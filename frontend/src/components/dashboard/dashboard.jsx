'use client'

import DashboardLayout from '@/components/dashboard/DashboardLayout'

import WelcomeSection from '@/components/dashboard/WelcomeSection'
import StatisticsSection from '@/components/dashboard/StatisticsSection'
import AIToolsSection from '@/components/dashboard/AIToolsSection'
import RecentActivitySection from '@/components/dashboard/RecentActivitySection'
import GettingStartedSection from '@/components/dashboard/GettingStartedSection'
import DashboardFooter from '@/components/dashboard/DashboardFooter'

export default function DashboardPage() {
	return (
		<DashboardLayout
			title='Overview'
			description='Your career development workspace'
		>
			<WelcomeSection />
			<StatisticsSection />
			<AIToolsSection />
			<RecentActivitySection />
			<GettingStartedSection />
			<DashboardFooter />
		</DashboardLayout>
	)
}