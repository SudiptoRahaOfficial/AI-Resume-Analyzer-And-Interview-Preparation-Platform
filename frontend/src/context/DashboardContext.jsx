// file: DashboardContext.jsx
// responsibility: keeps the dashboard statistics & exposes a refetch action to dashboard components

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
import * as dashboardApi from '@/services/dashboard.api'
import { useAuth } from '@/context/AuthContext' // adjust to your actual path

const DashboardContext = createContext(null)

export function DashboardProvider({ children }) {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	// { interviewGuides, generatedResumes } (null until the first successful fetch)
	const [statistics, setStatistics] = useState(null)

	// true until the first fetch settles (also covers the time auth is restoring)
	const [isStatisticsLoading, setIsStatisticsLoading] = useState(true)

	// set when the latest fetch failed
	const [statisticsError, setStatisticsError] = useState(null)

	// id of the latest request: any response with an older id is stale and ignored
	const requestIdRef = useRef(0)

	// fetching statistics
	// silent = true keeps the old numbers on screen instead of showing a loader
	const fetchStatistics = useCallback(async ({ silent = false } = {}) => {
		const requestId = ++requestIdRef.current

		if (!silent) setIsStatisticsLoading(true)
		setStatisticsError(null)

		try {
			const data = await dashboardApi.getDashboardStatistics()
			if (requestId === requestIdRef.current) {
				setStatistics(data.statistics)
			}
		} catch (error) {
			if (requestId === requestIdRef.current) {
				setStatisticsError(error)
			}
		} finally {
			if (requestId === requestIdRef.current) {
				setIsStatisticsLoading(false)
			}
		}
	}, [])

	// loading statistics when auth settles, clearing them on signout
	useEffect(() => {
		// waiting for AuthProvider to finish restoring the session
		if (isAuthLoading) return

		if (!isAuthenticated) {
			// invalidating any in-flight request, then clearing user-specific data
			requestIdRef.current++
			setStatistics(null)
			setStatisticsError(null)
			setIsStatisticsLoading(false)
			return
		}

		fetchStatistics()

		// invalidating the in-flight request on unmount / auth change
		return () => {
			requestIdRef.current++
		}
	}, [isAuthLoading, isAuthenticated, fetchStatistics])

	const value = useMemo(
		() => ({
			statistics,
			isStatisticsLoading,
			statisticsError,
			// usage: refetchStatistics() for a retry button,
			//        refetchStatistics({ silent: true }) after creating a resume/guide
			refetchStatistics: fetchStatistics,
		}),
		[statistics, isStatisticsLoading, statisticsError, fetchStatistics],
	)

	return (
		<DashboardContext.Provider value={value}>
			{children}
		</DashboardContext.Provider>
	)
}

// custom hook for using dashboard data in any client component
export function useDashboard() {
	const context = useContext(DashboardContext)

	if (!context) {
		throw new Error('useDashboard must be used inside DashboardProvider')
	}

	return context
}