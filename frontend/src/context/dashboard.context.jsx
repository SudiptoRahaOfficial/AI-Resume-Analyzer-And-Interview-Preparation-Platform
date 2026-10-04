'use client'

import { createContext, useState } from 'react'

export const DashboardContext = createContext(null)

const initialStats = {
	interviewGuides: 0,
	generatedResumes: 0,
}

export const DashboardProvider = ({ children }) => {
	const [stats, setStats] = useState(initialStats)

	const [loading, setLoading] = useState(false)

	return (
		<DashboardContext.Provider
			value={{
				stats,
				setStats,
				loading,
				setLoading,
			}}
		>
			{children}
		</DashboardContext.Provider>
	)
}