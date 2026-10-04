'use client'

import { createContext, useState } from 'react'

export const ResumeContext = createContext(null)

export const ResumeProvider = ({ children }) => {
	const [resume, setResume] = useState(null)
	const [resumes, setResumes] = useState([])
	const [loading, setLoading] = useState(false)

	return (
		<ResumeContext.Provider
			value={{
				resume,
				setResume,
				resumes,
				setResumes,
				loading,
				setLoading,
			}}
		>
			{children}
		</ResumeContext.Provider>
	)
}