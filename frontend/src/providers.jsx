'use client'

import { useEffect } from 'react'
import { AuthProvider } from '@/context/auth.context'
import { useAuth } from '@/hooks/useAuth'
import AuthInitializer from '@/components/common/auth-initializer'

function TokenManager() {
	const { accessToken, refreshAccessToken } = useAuth()

	useEffect(() => {
		if (!accessToken) return

		const interval = setInterval(
			async () => {
				try {
					await refreshAccessToken()
				} catch {
					// session expired
				}
			},
			14 * 60 * 1000,
		)

		return () => clearInterval(interval)
	}, [accessToken])

	return null
}

export default function Providers({ children }) {
	return (
		<AuthProvider>
			<TokenManager />
			<AuthInitializer />
			{children}
		</AuthProvider>
	)
}