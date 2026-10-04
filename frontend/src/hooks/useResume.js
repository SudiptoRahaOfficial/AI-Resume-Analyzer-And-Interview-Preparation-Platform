// importing dependencies
import { useCallback, useContext } from 'react'

// importing context
import { ResumeContext } from '@/context/resume.context'

// importing APIs
import {
	callGenerateResumeApi,
	callGetResumeByIdApi,
	callGetResumesApi,
} from '@/services/resume.api'

// importing custom hook
import { useAuth } from '@/hooks/useAuth'

// useResume hook
export const useResume = () => {
	// getting resume context
	const context = useContext(ResumeContext)

	// validating provider
	if (!context) {
		throw new Error('useResume must be used inside ResumeProvider')
	}

	// extracting context values
	const { resume, setResume, resumes, setResumes, loading, setLoading } =
		context

	// authentication
	const { accessToken } = useAuth()

	// generate resume
	const handleGenerateResume = useCallback(
		async ({ resumeFile, selfDescription, jobDescription }) => {
			try {
				setLoading(true)

				const data = await callGenerateResumeApi({
					resumeFile,
					selfDescription,
					jobDescription,
					accessToken,
				})

				setResume(data.resume)

				return data
			} finally {
				setLoading(false)
			}
		},
		[accessToken, setResume, setLoading],
	)

	// get resume by id
	const handleGetResumeById = useCallback(
		async (resumeId) => {
			try {
				setLoading(true)

				const data = await callGetResumeByIdApi({
					resumeId,
					accessToken,
				})

				setResume(data.resume)

				return data
			} finally {
				setLoading(false)
			}
		},
		[accessToken, setResume, setLoading],
	)

	// get all resumes
	const handleGetResumes = useCallback(async () => {
		try {
			setLoading(true)

			const data = await callGetResumesApi({
				accessToken,
			})

			setResumes(data.resumes)

			return data
		} finally {
			setLoading(false)
		}
	}, [accessToken, setResumes, setLoading])

	// return hook values
	return {
		resume,
		resumes,
		loading,
		handleGenerateResume,
		handleGetResumeById,
		handleGetResumes,
	}
}