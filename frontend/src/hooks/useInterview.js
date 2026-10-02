// importing dependencis
import { useCallback, useContext } from 'react'
import { InterviewContext } from '@/context/interview.context'
import {
	callGenerateReportApi,
	callGetReportByIdApi,
	callGetReportsApi,
} from '@/services/interview.api'
import { useAuth } from '@/hooks/useAuth'

// useInterview hook
export const useInterview = () => {
	const context = useContext(InterviewContext)

	if (!context) {
		throw new Error('useInterview must be used inside InterviewProvider')
	}

	const { report, setReport, reports, setReports, loading, setLoading } =
		context

	const { accessToken } = useAuth()

	// generate interview report
	const handleGenerateReport = useCallback(
		async ({ resumeFile, selfDescription, jobDescription }) => {
			try {
				setLoading(true)

				const data = await callGenerateReportApi({
					resumeFile,
					selfDescription,
					jobDescription,
					accessToken,
				})

				setReport(data.interviewReport)

				return data
			} finally {
				setLoading(false)
			}
		},
		[accessToken, setReport, setLoading],
	)

	// get interview report by id
	const handleGetReportById = useCallback(
		async (reportId) => {
			try {
				setLoading(true)

				const data = await callGetReportByIdApi({
					reportId,
					accessToken,
				})

				setReport(data.interviewReport)

				return data
			} finally {
				setLoading(false)
			}
		},
		[accessToken, setReport, setLoading],
	)

	// get all interview reports
	const handleGetReports = useCallback(async () => {
		try {
			setLoading(true)

			const data = await callGetReportsApi({
				accessToken,
			})

			setReports(data.interviewReports)

			return data
		} finally {
			setLoading(false)
		}
	}, [accessToken, setReports, setLoading])

	return {
		report,
		reports,
		loading,
		handleGenerateReport,
		handleGetReportById,
		handleGetReports,
	}
}