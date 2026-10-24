// file: InterviewContext.jsx
// responsibility: keeps interview reports (list + currently opened report) & exposes interview actions

'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react'
import * as interviewApi from '@/services/interview.api'
import { useAuth } from '@/context/AuthContext' // adjust to your actual path

const InterviewContext = createContext(null)

export function InterviewProvider({ children }) {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	// list of reports for the history page (null until first successful fetch)
	const [reports, setReports] = useState(null)
	const [isReportsLoading, setIsReportsLoading] = useState(false)
	const [reportsError, setReportsError] = useState(null)

	// the single report opened on the detail page
	const [activeReport, setActiveReport] = useState(null)
	const [isReportLoading, setIsReportLoading] = useState(false)
	const [reportError, setReportError] = useState(null)

	// true while the AI is generating a report
	const [isGenerating, setIsGenerating] = useState(false)

	// latest-request counters: a response with an older id is stale and ignored
	const reportsRequestIdRef = useRef(0)
	const reportRequestIdRef = useRef(0)

	// synchronous lock against double submit (state updates are async, a ref is not)
	const isGeneratingRef = useRef(false)

	// remembering whether the list was ever loaded, so we only refresh it when needed
	const hasLoadedReportsRef = useRef(false)

	// fetching the list of reports
	// silent = true keeps the old list on screen instead of showing a loader
	const fetchReports = useCallback(async ({ silent = false } = {}) => {
		const requestId = ++reportsRequestIdRef.current

		if (!silent) setIsReportsLoading(true)
		setReportsError(null)

		try {
			const data = await interviewApi.getReports()
			if (requestId === reportsRequestIdRef.current) {
				setReports(data.interviewReports)
				hasLoadedReportsRef.current = true
			}
		} catch (error) {
			if (requestId === reportsRequestIdRef.current) {
				setReportsError(error)
			}
		} finally {
			if (requestId === reportsRequestIdRef.current) {
				setIsReportsLoading(false)
			}
		}
	}, [])

	// fetching one report by id
	const fetchReport = useCallback(async (reportId) => {
		const requestId = ++reportRequestIdRef.current

		// clearing the previous report so a different report never flashes on screen
		setActiveReport(null)
		setIsReportLoading(true)
		setReportError(null)

		try {
			const data = await interviewApi.getReportById(reportId)
			if (requestId === reportRequestIdRef.current) {
				setActiveReport(data.interviewReport)
			}
		} catch (error) {
			if (requestId === reportRequestIdRef.current) {
				setReportError(error)
			}
		} finally {
			if (requestId === reportRequestIdRef.current) {
				setIsReportLoading(false)
			}
		}
	}, [])

	// generating a new report: the caller (form) handles the thrown error
	const generateReport = useCallback(
		async (reportInput) => {
			// ignoring a second click while one generation is already running
			if (isGeneratingRef.current) return null

			isGeneratingRef.current = true
			setIsGenerating(true)

			try {
				const data = await interviewApi.generateReport(reportInput)

				// the list is now outdated: refreshing it quietly (only if it was loaded before)
				if (hasLoadedReportsRef.current) fetchReports({ silent: true })

				// data.interviewReport.id is what the caller uses to navigate to the report
				return data
			} finally {
				isGeneratingRef.current = false
				setIsGenerating(false)
			}
		},
		[fetchReports],
	)

	// clearing everything on signout so one user's reports never reach the next user
	useEffect(() => {
		if (isAuthLoading || isAuthenticated) return

		// invalidating in-flight requests
		reportsRequestIdRef.current++
		reportRequestIdRef.current++
		hasLoadedReportsRef.current = false

		setReports(null)
		setReportsError(null)
		setIsReportsLoading(false)
		setActiveReport(null)
		setReportError(null)
		setIsReportLoading(false)
	}, [isAuthLoading, isAuthenticated])

	const value = useMemo(
		() => ({
			reports,
			isReportsLoading,
			reportsError,
			activeReport,
			isReportLoading,
			reportError,
			isGenerating,
			fetchReports,
			fetchReport,
			generateReport,
		}),
		[
			reports,
			isReportsLoading,
			reportsError,
			activeReport,
			isReportLoading,
			reportError,
			isGenerating,
			fetchReports,
			fetchReport,
			generateReport,
		],
	)

	return (
		<InterviewContext.Provider value={value}>
			{children}
		</InterviewContext.Provider>
	)
}

// custom hook for using interview data in any client component
export function useInterview() {
	const context = useContext(InterviewContext)

	if (!context) {
		throw new Error('useInterview must be used inside InterviewProvider')
	}

	return context
}