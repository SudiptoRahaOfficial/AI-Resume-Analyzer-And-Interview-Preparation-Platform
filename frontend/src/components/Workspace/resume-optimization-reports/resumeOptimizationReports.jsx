'use client'

import ResumeOptimizationReportsLayout from '@/components/Workspace/common-layout/layout'
import ResumeReportList from '@/components/Workspace/resume-optimization-reports/resumeReportList'

export default function ResumeOptimizationReports() {
	return (
		<ResumeOptimizationReportsLayout
			title='Resume Optimization Reports'
			description='Access and manage your optimized resumes'
		>
			<ResumeReportList />
		</ResumeOptimizationReportsLayout>
	)
}