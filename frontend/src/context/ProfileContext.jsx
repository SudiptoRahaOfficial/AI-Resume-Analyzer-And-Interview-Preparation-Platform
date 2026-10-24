// file: ProfileContext.jsx
// responsibility: keeps the signed-in user's profile & exposes profile actions to all components

'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import * as profileApi from '@/services/profile.api'
import { useAuth } from '@/context/AuthContext' // adjust to your actual path

const ProfileContext = createContext(null)

export function ProfileProvider({ children }) {
	const { user, isLoading: isAuthLoading } = useAuth()
	const isAuthenticated = Boolean(user)

	// profile document (null means "no profile yet" or "signed out")
	const [profile, setProfile] = useState(null)

	// true until the first profile fetch settles
	const [isProfileLoading, setIsProfileLoading] = useState(true)

	// set only when fetching fails for a real reason (not 404)
	const [profileError, setProfileError] = useState(null)

	// bumping this number re-runs the fetch effect (used by refetchProfile)
	const [reloadKey, setReloadKey] = useState(0)

	// loading the profile whenever the auth state settles or changes
	useEffect(() => {
		// waiting for AuthProvider to finish restoring the session
		if (isAuthLoading) return

		// signed out: clearing everything so one user's profile never leaks to the next
		if (!isAuthenticated) {
			setProfile(null)
			setProfileError(null)
			setIsProfileLoading(false)
			return
		}

		let isActive = true

		async function loadProfile() {
			setIsProfileLoading(true)
			setProfileError(null)

			try {
				const data = await profileApi.getProfile()
				if (isActive) setProfile(data.profile)
			} catch (error) {
				if (!isActive) return

				// 404 is a normal state here: the user just hasn't created a profile yet
				if (error.status === 404) {
					setProfile(null)
				} else {
					setProfileError(error)
				}
			} finally {
				if (isActive) setIsProfileLoading(false)
			}
		}

		loadProfile()

		// ignoring stale responses after unmount / auth change
		return () => {
			isActive = false
		}
	}, [isAuthLoading, isAuthenticated, reloadKey])

	// creating profile: server response is the source of truth
	const createProfile = useCallback(async (profileData) => {
		const data = await profileApi.createProfile(profileData)
		setProfile(data.profile)
		return data
	}, [])

	// updating profile
	const updateProfile = useCallback(async (profileData) => {
		const data = await profileApi.updateProfile(profileData)
		setProfile(data.profile)
		return data
	}, [])

	// manual re-fetch (e.g. retry button after a failed load)
	const refetchProfile = useCallback(() => {
		setReloadKey((key) => key + 1)
	}, [])

	// memoizing so consumers re-render only when something they read changes
	const value = useMemo(
		() => ({
			profile,
			hasProfile: profile !== null,
			isProfileLoading,
			profileError,
			createProfile,
			updateProfile,
			refetchProfile,
		}),
		[
			profile,
			isProfileLoading,
			profileError,
			createProfile,
			updateProfile,
			refetchProfile,
		],
	)

	return (
		<ProfileContext.Provider value={value}>
			{children}
		</ProfileContext.Provider>
	)
}

// custom hook for using profile in any client component
export function useProfile() {
	const context = useContext(ProfileContext)

	if (!context) {
		throw new Error('useProfile must be used inside ProfileProvider')
	}

	return context
}