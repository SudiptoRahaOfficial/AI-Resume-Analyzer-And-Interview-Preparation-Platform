'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import LoadingScreen from '@/components/shared/loadingScreen'

export default function GuestRoute({ children }) {
	const router = useRouter()
	const { user, isLoading } = useAuth()

	// redirecting signed in users to dashboard
	useEffect(() => {
		if (!isLoading && user) router.replace('/dashboard')
	}, [isLoading, user, router])

	if (isLoading || user) {
		return <LoadingScreen />
	}

	return children
}