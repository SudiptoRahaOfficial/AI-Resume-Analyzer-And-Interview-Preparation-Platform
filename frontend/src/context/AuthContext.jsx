// file: AuthContext.jsx
// responsibility: keeps the logged in user & exposes auth actions to all components

'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import * as authApi from '@/services/auth.api'
import { refreshAccessToken, setAccessToken } from '@/services/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
	// logged in user (null means not signed in)
	const [user, setUser] = useState(null)

	// true until we finish checking for an existing session
	const [isLoading, setIsLoading] = useState(true)

	// restoring session on first load using the refresh cookie
	useEffect(() => {
		let isActive = true

		async function restoreSession() {
			try {
				const data = await refreshAccessToken()
				if (isActive) setUser(data.user)
			} catch {
				// no valid session, user stays signed out
				if (isActive) setUser(null)
			} finally {
				if (isActive) setIsLoading(false)
			}
		}

		restoreSession()

		// preventing state updates after unmount
		return () => {
			isActive = false
		}
	}, [])

	// signin: store token in memory and user in state
	async function signin(credentials) {
		const data = await authApi.signin(credentials)
		setAccessToken(data.accessToken)
		setUser(data.user)
		return data
	}

	// signout from current device
	async function signout() {
		try {
			await authApi.signout()
		} finally {
			// clearing local state even if the api call fails
			setAccessToken(null)
			setUser(null)
		}
	}

	// signout from all devices
	async function signoutAll() {
		try {
			await authApi.signoutAll()
		} finally {
			setAccessToken(null)
			setUser(null)
		}
	}

	return (
		<AuthContext.Provider
			value={{ user, isLoading, signin, signout, signoutAll }}
		>
			{children}
		</AuthContext.Provider>
	)
}

// custom hook for using auth in any client component
export function useAuth() {
	const context = useContext(AuthContext)

	// helping developers who forget to wrap with AuthProvider
	if (!context) {
		throw new Error('useAuth must be used inside AuthProvider')
	}

	return context
}