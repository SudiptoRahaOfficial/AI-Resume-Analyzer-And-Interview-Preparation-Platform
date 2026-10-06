/**
	- file name: profile.controllers.js
	- responsibility: responsible for all profile related api controllers
 */

// importing dependencies
const { uploadImage } = require('../services/storage.service')
const profileModel = require('../models/profile.model')

// constants
const MAX_SKILLS = 20
const MAX_SOCIAL_LINKS = 10

// helper function for checking whether a value is a non-empty string
function isNonEmptyString(value) {
	return typeof value === 'string' && value.trim().length > 0
}

// helper function for validating HTTP/HTTPS URL
function isValidUrl(value) {
	try {
		const url = new URL(value)
		return url.protocol === 'http:' || url.protocol === 'https:'
	} catch {
		return false
	}
}

/**
	- create profile controller
	- POST API - "/api/profile/create-profile"
 */
async function createProfileController(req, res) {
	try {
		// getting authenticated user id
		const userId = req.user.id

		// preventing duplicate profile creation
		const existingProfile = await profileModel.exists({
			user: userId,
		})
		if (existingProfile) {
			return res.status(409).json({
				message: 'Profile already exists for this user',
				success: false,
			})
		}

		// getting profile data from request
		let {
			firstName,
			lastName,
			bio,
			phone,
			location,
			profession,
			experience,
			skills,
			socialLinks,
		} = req.body

		// parsing JSON fields sent through multipart/form-data
		if (typeof location === 'string') {
			location = JSON.parse(location)
		}
		if (typeof skills === 'string') {
			skills = JSON.parse(skills)
		}
		if (typeof socialLinks === 'string') {
			socialLinks = JSON.parse(socialLinks)
		}

		// validating skills
		if (skills !== undefined) {
			if (!Array.isArray(skills)) {
				return res.status(400).json({
					message: 'Skills must be an array',
					success: false,
				})
			}

			if (skills.length > MAX_SKILLS) {
				return res.status(400).json({
					message: `You can add a maximum of ${MAX_SKILLS} skills`,
					success: false,
				})
			}

			if (skills.some((skill) => !isNonEmptyString(skill))) {
				return res.status(400).json({
					message: 'Every skill must be a non-empty string',
					success: false,
				})
			}
		}

		// validating social links
		if (socialLinks !== undefined) {
			if (!Array.isArray(socialLinks)) {
				return res.status(400).json({
					message: 'Social links must be an array',
					success: false,
				})
			}

			if (socialLinks.length > MAX_SOCIAL_LINKS) {
				return res.status(400).json({
					message: `You can add a maximum of ${MAX_SOCIAL_LINKS} social links`,
					success: false,
				})
			}

			for (const socialLink of socialLinks) {
				if (
					!socialLink ||
					typeof socialLink !== 'object' ||
					!isNonEmptyString(socialLink.platform) ||
					!isNonEmptyString(socialLink.url)
				) {
					return res.status(400).json({
						message: 'Invalid social link',
						success: false,
					})
				}

				if (!isValidUrl(socialLink.url.trim())) {
					return res.status(400).json({
						message:
							'Social link URL must be a valid HTTP or HTTPS URL',
						success: false,
					})
				}
			}
		}

		// parsing experience
		if (experience !== undefined && experience !== '') {
			experience = Number(experience)

			if (
				!Number.isFinite(experience) ||
				experience < 0 ||
				experience > 50
			) {
				return res.status(400).json({
					message: 'Experience must be between 0 and 50 years',
					success: false,
				})
			}
		}

		// uploading profile image
		let profileImage
		if (req.file) {
			const uploadedImage = await uploadImage(req.file.buffer)
			profileImage = uploadedImage.url
		}

		// creating profile to db
		const profile = await profileModel.create({
			user: userId,
			firstName,
			lastName,
			bio,
			phone,
			location,
			profession,
			experience,
			skills: skills?.map((skill) => skill.trim()),
			socialLinks: socialLinks?.map((socialLink) => ({
				platform: socialLink.platform.trim(),
				url: socialLink.url.trim(),
			})),
			profileImage,
		})

		// response back on success
		return res.status(201).json({
			message: 'Profile created successfully',
			success: true,
			profile,
		})
	} catch (error) {
		// handling duplicate profile race condition
		if (error?.code === 11000) {
			return res.status(409).json({
				message: 'Profile already exists for this user',
				success: false,
			})
		}

		// handling invalid JSON
		if (error instanceof SyntaxError) {
			return res.status(400).json({
				message: 'Invalid JSON data provided',
				success: false,
			})
		}

		// logging on unexpected profile creation error
		console.error('Profile creation failed:', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected profile creation error
		return res.status(500).json({
			message: 'Internal server error',
			success: false,
		})
	}
}

/**
	- update profile controller
	- PATCH API - "/api/profile/update-profile"
 */
async function updateProfileController(req, res) {
	try {
		// getting authenticated user id
		const userId = req.user.id

		// finding existing profile
		const profile = await profileModel.findOne({ user: userId })

		// checking profile exists or not
		if (!profile) {
			return res.status(404).json({
				message: 'Profile not found',
				success: false,
			})
		}

		// getting profile data from request
		let {
			firstName,
			lastName,
			bio,
			phone,
			location,
			profession,
			experience,
			skills,
			socialLinks,
		} = req.body

		// parsing JSON fields sent through multipart/form-data
		if (typeof location === 'string') {
			location = JSON.parse(location)
		}

		if (typeof skills === 'string') {
			skills = JSON.parse(skills)
		}

		if (typeof socialLinks === 'string') {
			socialLinks = JSON.parse(socialLinks)
		}

		// validating skills
		if (skills !== undefined) {
			if (!Array.isArray(skills)) {
				return res.status(400).json({
					message: 'Skills must be an array',
					success: false,
				})
			}

			if (skills.length > MAX_SKILLS) {
				return res.status(400).json({
					message: `You can add a maximum of ${MAX_SKILLS} skills`,
					success: false,
				})
			}

			if (skills.some((skill) => !isNonEmptyString(skill))) {
				return res.status(400).json({
					message: 'Every skill must be a non-empty string',
					success: false,
				})
			}
		}

		// validating social links
		if (socialLinks !== undefined) {
			if (!Array.isArray(socialLinks)) {
				return res.status(400).json({
					message: 'Social links must be an array',
					success: false,
				})
			}

			if (socialLinks.length > MAX_SOCIAL_LINKS) {
				return res.status(400).json({
					message: `You can add a maximum of ${MAX_SOCIAL_LINKS} social links`,
					success: false,
				})
			}

			for (const socialLink of socialLinks) {
				if (
					!socialLink ||
					typeof socialLink !== 'object' ||
					!isNonEmptyString(socialLink.platform) ||
					!isNonEmptyString(socialLink.url)
				) {
					return res.status(400).json({
						message: 'Invalid social link',
						success: false,
					})
				}

				if (!isValidUrl(socialLink.url.trim())) {
					return res.status(400).json({
						message:
							'Social link URL must be a valid HTTP or HTTPS URL',
						success: false,
					})
				}
			}
		}

		// parsing and validating experience
		if (experience !== undefined && experience !== '') {
			experience = Number(experience)

			if (
				!Number.isFinite(experience) ||
				experience < 0 ||
				experience > 50
			) {
				return res.status(400).json({
					message: 'Experience must be between 0 and 50 years',
					success: false,
				})
			}
		}

		// preparing profile data for update
		const updateData = {}

		if (firstName !== undefined) updateData.firstName = firstName
		if (lastName !== undefined) updateData.lastName = lastName
		if (bio !== undefined) updateData.bio = bio
		if (phone !== undefined) updateData.phone = phone
		if (location !== undefined) updateData.location = location
		if (profession !== undefined) updateData.profession = profession
		if (experience !== undefined) updateData.experience = experience

		if (skills !== undefined) {
			updateData.skills = skills.map((skill) => skill.trim())
		}

		if (socialLinks !== undefined) {
			updateData.socialLinks = socialLinks.map((socialLink) => ({
				platform: socialLink.platform.trim(),
				url: socialLink.url.trim(),
			}))
		}

		// uploading new profile image
		if (req.file) {
			const uploadedImage = await uploadImage(req.file.buffer)
			updateData.profileImage = uploadedImage.url
		}

		// updating profile
		const updatedProfile = await profileModel.findOneAndUpdate(
			{ user: userId },
			{ $set: updateData },
			{ new: true, runValidators: true },
		)

		// response back on success
		return res.status(200).json({
			message: 'Profile updated successfully',
			success: true,
			profile: updatedProfile,
		})
	} catch (error) {
		// handling invalid JSON
		if (error instanceof SyntaxError) {
			return res.status(400).json({
				message: 'Invalid JSON data provided',
				success: false,
			})
		}

		// logging unexpected profile update error
		console.error('Profile update failed:', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected profile update error
		return res.status(500).json({
			message: 'Internal server error',
			success: false,
		})
	}
}

/**
	- get profile controller
	- GET API - "/api/profile"
 */
async function getProfileController(req, res) {
	// getting authenticated user id
	const userId = req.user.id

	try {
		// finding profile belonging to requested user
		const profile = await profileModel.findOne({ user: userId })

		// checking profile exists or not
		if (!profile) {
			return res.status(404).json({
				message: 'Profile not found',
				success: false,
			})
		}

		// response back on success
		return res.status(200).json({
			message: 'Profile fetched successfully',
			success: true,
			profile,
		})
	} catch (error) {
		// logging on unexpected error
		console.error('Profile fetch failed:', {
			error: error.message,
			stack: error.stack,
		})

		// failed response back on unexpected error
		return res.status(500).json({
			message: 'Internal server error',
			success: false,
		})
	}
}

// exporting controller
module.exports = {
	createProfileController,
	updateProfileController,
	getProfileController,
}