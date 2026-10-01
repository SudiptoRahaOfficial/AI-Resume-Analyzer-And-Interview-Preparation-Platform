// making client component
'use client'

// importing dependencis
import { createContext, useState } from 'react'

// creating InterviewContext
const InterviewContext = createContext()

// making InterviewProvider
export const InterviewProvider = ({ children }) => {
	// states
	const [report, setReport] = useState(null)
	const [reports, setReports] = useState([])
	const [loading, setLoading] = useState(true)

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