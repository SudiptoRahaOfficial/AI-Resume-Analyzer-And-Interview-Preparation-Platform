'use client'

import { createContext, useState } from 'react'

export const InterviewContext = createContext(null)

export const InterviewProvider = ({ children }) => {
	const [report, setReport] = useState(null)
	const [reports, setReports] = useState([])
	const [loading, setLoading] = useState(false)

	return (
		<InterviewContext.Provider
			value={{
				report,
				setReport,
				reports,
				setReports,
				loading,
				setLoading,
			}}
		>
			{children}
		</InterviewContext.Provider>
	)
}