import InterviewPreparationReports from '@/components/interview/interviewPreparationReports'
import ProtectedRoute from '@/components/common/ProtectedRoute'

export default function page() {
    return (
        <ProtectedRoute>
            <InterviewPreparationReports />
        </ProtectedRoute>
    )
}