'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import LoadingScreen from '@/components/shared/loadingScreen'

export default function ProtectedRoute({ children }) {
	const router = useRouter()
	const { user, isLoading } = useAuth()

	// redirecting after the session check finishes
	useEffect(() => {
		if (!isLoading && !user) router.replace('/signin')
	}, [isLoading, user, router])

	// showing loader while checking session or redirecting
	if (isLoading || !user) {
		return <LoadingScreen />
	}

	return children
}