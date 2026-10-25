'use client'

import { useRouter } from 'next/navigation'
import { useInterview } from '@/context/InterviewContext'
import InterviewPreparationLayout from '@/components/Workspace/common-layout/layout'
import InterviewPreparationForm from '@/components/Workspace/interview-preparation/form'

export default function InterviewPreparation() {
	const router = useRouter()
	const { generateReport, isGenerating } = useInterview()

	const handleGenerateReport = async (reportInput) => {
		const data = await generateReport(reportInput)

		// context returns null when a duplicate submit was ignored
		if (!data) return

		// report detail route
		router.push(`/interview-preparation-reports/${data.interviewReport.id}`)
	}

	return (
		<InterviewPreparationLayout
			title='Interview Preparation'
			description='Build your personalized interview strategy'
		>
			<InterviewPreparationForm
				onGenerateReport={handleGenerateReport}
				isGenerating={isGenerating}
			/>
		</InterviewPreparationLayout>
	)
}