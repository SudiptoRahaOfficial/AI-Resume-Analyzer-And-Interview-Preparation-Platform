'use client'

import DashboardLayout from '@/components/Workspace/common-layout/layout'

import WelcomeSection from '@/components/Workspace/dashboard/WelcomeSection'
import StatisticsSection from '@/components/Workspace/dashboard/StatisticsSection'
import AIToolsSection from '@/components/Workspace/dashboard/AIToolsSection'
import RecentActivitySection from '@/components/Workspace/dashboard/RecentActivitySection'

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
		</DashboardLayout>
	)
}