import { useCallback, useContext } from 'react'

import { DashboardContext } from '@/context/dashboard.context'
import { callGetDashboardStatisticsApi } from '@/services/dashboard.api'
import { useAuth } from '@/hooks/useAuth'

export const useDashboard = () => {
	const context = useContext(DashboardContext)

	if (!context) {
		throw new Error('useDashboard must be used inside DashboardProvider')
	}

	const { stats, setStats, loading, setLoading } = context

	const { accessToken } = useAuth()

	const handleGetDashboardStats = useCallback(async () => {
		try {
			setLoading(true)

			const data = await callGetDashboardStatisticsApi({
				accessToken,
			})

			setStats({
				interviewGuides: data.statistics?.interviewGuides ?? 0,
				generatedResumes: data.statistics?.generatedResumes ?? 0,
			})

			return data
		} finally {
			setLoading(false)
		}
	}, [accessToken, setStats, setLoading])

	return {
		stats,
		loading,
		handleGetDashboardStats,
	}
}