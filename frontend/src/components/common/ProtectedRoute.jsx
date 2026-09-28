'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function ProtectedRoute({ children }) {
	const router = useRouter()

	const { isAuthenticated, accessToken, refreshAccessToken } = useAuth()

	const [checking, setChecking] = useState(true)

	useEffect(() => {
		const verifySession = async () => {
			try {
				if (accessToken && isAuthenticated) {
					setChecking(false)
					return
				}

				await refreshAccessToken()
				setChecking(false)
			} catch {
				router.replace('/auth/signin')
			}
		}

		verifySession()
	}, [])

	if (checking) {
		return (
			<main className='flex min-h-screen items-center justify-center bg-[#030712] text-white'>
				<p className='text-gray-400'>Checking session...</p>
			</main>
		)
	}

	return children
}