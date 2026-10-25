'use client'

import { useRouter } from 'next/navigation'
import { useResume } from '@/context/ResumeContext'
import ResumeOptimizationLayout from '@/components/Workspace/common-layout/layout'
import ResumeOptimizationForm from '@/components/Workspace/resume-optimization/form'

export default function ResumeOptimization() {
	const router = useRouter()
	const { generateResume, isGenerating } = useResume()

	const handleGenerateResume = async (resumeInput) => {
		const data = await generateResume(resumeInput)

		// context returns null when a duplicate submit was ignored
		if (!data) return

		// report detail route
		router.push(`/resume-optimization-reports/${data.resume.id}`)
	}

	return (
		<ResumeOptimizationLayout
			title='Resume Optimization'
			description='Optimize your resume for ATS compatibility and your target role'
		>
			<ResumeOptimizationForm
				onGenerateResume={handleGenerateResume}
				isGenerating={isGenerating}
			/>
		</ResumeOptimizationLayout>
	)
}