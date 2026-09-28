// making client component
'use client'

// importing dependencis
import { useState, createContext } from 'react'

// creating authContext
export const AuthContext = createContext()

// making authProvider
export const AuthProvider = ({ children }) => {
	// states
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const [accessToken, setAccessToken] = useState(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,
				loading,
				setLoading,
				accessToken,
				setAccessToken,
				isAuthenticated,
				setIsAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}