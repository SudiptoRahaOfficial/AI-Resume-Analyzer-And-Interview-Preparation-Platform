'use client'

import InterviewPreparationLayout from '@/components/Workspace/common-layout/layout'
import InterviewPreparationForm from '@/components/Workspace/interview-preparation/form'

export default function InterviewPreparation() {
	return (
		<InterviewPreparationLayout
			title='Interview Preparation'
			description='Build your personalized interview strategy'
		>
			<InterviewPreparationForm />
		</InterviewPreparationLayout>
	)
}