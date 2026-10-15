'use client'

import ResumeOptimizationLayout from '@/components/Workspace/common-layout/layout'
import ResumeOptimizationForm from '@/components/Workspace/resume-optimization/form'

export default function ResumeOptimization() {
	return (
		<ResumeOptimizationLayout
			title='Resume Optimization'
			description='Optimize your resume for ATS compatibility and your target role'
		>
			<ResumeOptimizationForm />
		</ResumeOptimizationLayout>
	)
}