// importing dependencis
import { useContext } from 'react'
import { InterviewContext } from '@/context/interview.context'
import {
	callGenerateReportApi,
	callGetReportByIdApi,
	callGetReportsApi,
} from '@/services/interview.api'

// making useInterview custom hook
export const useInterview = () => {
	const context = useContext(InterviewContext)
	const { report, setReport, reports, setReports, loading, setLoading } =
		context

	const handleGenerateReport = async ({
		resumeFile,
		selfDescription,
		jobDescription,
	}) => {
		try {
			setLoading(true)

			const data = await callGenerateReportApi({
				resumeFile,
				selfDescription,
				jobDescription,
			})

			setReport(data.interviewReport)

			return data
		} finally {
			setLoading(false)
		}
	}

	const handleGetReportById = async (reportId) => {
		try {
			setLoading(true)

			const data = await callGetReportByIdApi(reportId)

			setReport(data.interviewReport)

			return data
		} finally {
			setLoading(false)
		}
	}

	const handleGetReports = async () => {
		try {
			setLoading(true)

			const data = await callGetReportsApi()

			setReports(data.interviewReports)

			return data
		} finally {
			setLoading(false)
		}
	}

	return {
		report,
		reports,
		loading,
		handleGenerateReport,
		handleGetReportById,
		handleGetReports,
	}
}