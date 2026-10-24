// file: auth.api.js
// responsibility: one function per auth endpoint

import { apiRequest } from './client'

// POST /api/auth/signup
export function signup({ username, email, password }) {
	return apiRequest('/auth/signup', {
		method: 'POST',
		body: { username, email, password },
	})
}

// POST /api/auth/verify-email
export function verifyEmail({ email, otp }) {
	return apiRequest('/auth/verify-email', {
		method: 'POST',
		body: { email, otp },
	})
}

// POST /api/auth/resend-verify-email
export function resendVerifyEmail({ email }) {
	return apiRequest('/auth/resend-verify-email', {
		method: 'POST',
		body: { email },
	})
}

// POST /api/auth/signin (send either username or email, never both)
export function signin(credentials) {
	return apiRequest('/auth/signin', {
		method: 'POST',
		body: credentials,
	})
}

// POST /api/auth/signout
export function signout() {
	return apiRequest('/auth/signout', { method: 'POST' })
}

// POST /api/auth/signout-all
export function signoutAll() {
	return apiRequest('/auth/signout-all', { method: 'POST' })
}