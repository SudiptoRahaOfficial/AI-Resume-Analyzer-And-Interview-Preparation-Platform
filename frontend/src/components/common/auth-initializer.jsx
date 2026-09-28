'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function AuthInitializer() {
	const { initializeAuth } = useAuth()

	useEffect(() => {
		initializeAuth()
	}, [])

	return null
}