// file: profile.api.js
// responsibility: one function per profile endpoint

import { authRequest } from './client'

// fields sent as plain text in multipart/form-data
const TEXT_FIELDS = [
	'firstName',
	'lastName',
	'bio',
	'phone',
	'profession',
	'experience',
]

// fields the backend JSON.parse()s, so they must be stringified
const JSON_FIELDS = ['location', 'skills', 'socialLinks']

// converting a plain profile object into FormData
// (backend uses multer, so the request is always multipart/form-data)
function buildProfileFormData(profileData = {}) {
	const formData = new FormData()

	// appending only the fields that were actually provided,
	// so PATCH never overwrites a field the user didn't touch
	for (const field of TEXT_FIELDS) {
		const value = profileData[field]
		if (value !== undefined && value !== null) {
			formData.append(field, String(value))
		}
	}

	for (const field of JSON_FIELDS) {
		const value = profileData[field]
		if (value !== undefined) {
			formData.append(field, JSON.stringify(value))
		}
	}

	// field name must match getImageBuffer.single('profileImage')
	if (profileData.profileImage instanceof Blob) {
		formData.append('profileImage', profileData.profileImage)
	}

	return formData
}

// GET /api/profile
export function getProfile() {
	return authRequest('/profile')
}

// POST /api/profile/create-profile
export function createProfile(profileData) {
	return authRequest('/profile/create-profile', {
		method: 'POST',
		body: buildProfileFormData(profileData),
	})
}

// PATCH /api/profile/update-profile
export function updateProfile(profileData) {
	return authRequest('/profile/update-profile', {
		method: 'PATCH',
		body: buildProfileFormData(profileData),
	})
}