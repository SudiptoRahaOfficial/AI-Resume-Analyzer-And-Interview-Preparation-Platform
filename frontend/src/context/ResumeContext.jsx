// file: ResumeContext.jsx
// responsibility: keeps generated resumes (list + currently opened resume) & exposes resume actions

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
import * as resumeApi from '@/services/resume.api'
import { useAuth } from '@/context/AuthContext' // adjust to your actual path

const ResumeContext = createContext(null)

export function ResumeProvider({ children }) {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	// list of resumes for the history page (null until first successful fetch)
	const [resumes, setResumes] = useState(null)
	const [isResumesLoading, setIsResumesLoading] = useState(false)
	const [resumesError, setResumesError] = useState(null)

	// the single resume opened on the detail page
	const [activeResume, setActiveResume] = useState(null)
	const [isResumeLoading, setIsResumeLoading] = useState(false)
	const [resumeError, setResumeError] = useState(null)

	// true while the AI is generating a resume
	const [isGenerating, setIsGenerating] = useState(false)

	// latest-request counters: a response with an older id is stale and ignored
	const resumesRequestIdRef = useRef(0)
	const resumeRequestIdRef = useRef(0)

	// synchronous lock against double submit (state updates are async, a ref is not)
	const isGeneratingRef = useRef(false)

	// remembering whether the list was ever loaded, so we only refresh it when needed
	const hasLoadedResumesRef = useRef(false)

	// fetching the list of resumes
	// silent = true keeps the old list on screen instead of showing a loader
	const fetchResumes = useCallback(async ({ silent = false } = {}) => {
		const requestId = ++resumesRequestIdRef.current

		if (!silent) setIsResumesLoading(true)
		setResumesError(null)

		try {
			const data = await resumeApi.getResumes()
			if (requestId === resumesRequestIdRef.current) {
				setResumes(data.resumes)
				hasLoadedResumesRef.current = true
			}
		} catch (error) {
			if (requestId === resumesRequestIdRef.current) {
				setResumesError(error)
			}
		} finally {
			if (requestId === resumesRequestIdRef.current) {
				setIsResumesLoading(false)
			}
		}
	}, [])

	// fetching one resume by id
	const fetchResume = useCallback(async (resumeId) => {
		const requestId = ++resumeRequestIdRef.current

		// clearing the previous resume so a different resume never flashes on screen
		setActiveResume(null)
		setIsResumeLoading(true)
		setResumeError(null)

		try {
			const data = await resumeApi.getResumeById(resumeId)
			if (requestId === resumeRequestIdRef.current) {
				setActiveResume(data.resume)
			}
		} catch (error) {
			if (requestId === resumeRequestIdRef.current) {
				setResumeError(error)
			}
		} finally {
			if (requestId === resumeRequestIdRef.current) {
				setIsResumeLoading(false)
			}
		}
	}, [])

	// generating a new resume: the caller (form) handles the thrown error
	const generateResume = useCallback(
		async (resumeInput) => {
			// ignoring a second click while one generation is already running
			if (isGeneratingRef.current) return null

			isGeneratingRef.current = true
			setIsGenerating(true)

			try {
				const data = await resumeApi.generateResume(resumeInput)

				// the list is now outdated: refreshing it quietly (only if it was loaded before)
				if (hasLoadedResumesRef.current) fetchResumes({ silent: true })

				// data.resume.id is what the caller uses to navigate to the resume
				return data
			} finally {
				isGeneratingRef.current = false
				setIsGenerating(false)
			}
		},
		[fetchResumes],
	)

	// clearing everything on signout so one user's resumes never reach the next user
	useEffect(() => {
		if (isAuthLoading || isAuthenticated) return

		// invalidating in-flight requests
		resumesRequestIdRef.current++
		resumeRequestIdRef.current++
		hasLoadedResumesRef.current = false

		setResumes(null)
		setResumesError(null)
		setIsResumesLoading(false)
		setActiveResume(null)
		setResumeError(null)
		setIsResumeLoading(false)
	}, [isAuthLoading, isAuthenticated])

	const value = useMemo(
		() => ({
			resumes,
			isResumesLoading,
			resumesError,
			activeResume,
			isResumeLoading,
			resumeError,
			isGenerating,
			fetchResumes,
			fetchResume,
			generateResume,
		}),
		[
			resumes,
			isResumesLoading,
			resumesError,
			activeResume,
			isResumeLoading,
			resumeError,
			isGenerating,
			fetchResumes,
			fetchResume,
			generateResume,
		],
	)

	return (
		<ResumeContext.Provider value={value}>
			{children}
		</ResumeContext.Provider>
	)
}

// custom hook for using resume data in any client component
export function useResume() {
	const context = useContext(ResumeContext)

	if (!context) {
		throw new Error('useResume must be used inside ResumeProvider')
	}

	return context
}