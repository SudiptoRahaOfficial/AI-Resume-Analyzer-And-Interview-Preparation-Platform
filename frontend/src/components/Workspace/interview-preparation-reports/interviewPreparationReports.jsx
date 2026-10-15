'use client'

import InterviewPreparationReportsLayout from '@/components/Workspace/common-layout/layout'
import InterviewReportList from '@/components/Workspace/interview-preparation-reports/interviewReportList'

export default function InterviewPreparationReports() {
	return (
		<InterviewPreparationReportsLayout
			title='Interview Preparation Reports'
			description='Review and manage your interview preparation reports'
		>
			<InterviewReportList />
		</InterviewPreparationReportsLayout>
	)
}