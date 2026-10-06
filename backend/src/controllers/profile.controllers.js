/**
    - file name: profile.controllers.js
    - responsibility: responsible for all profile related api controllers
 */

// importing dependencies
const mongoose = require('mongoose')
const { uploadImage } = require('../services/storage.service')
const profileModel = require('../models/profile.model')

// constants
const MAX_SKILLS = 20
const MAX_SOCIAL_LINKS = 10

// =================================================
//      - Helper functions :
//          - isNonEmptyString
//          - isValidUrl
//          - removeUndefinedValues
// =================================================

// function for checking whether a value is a non-empty string
function isNonEmptyString(value) {
	return typeof value === 'string' && value.trim().length > 0
}

// function for validating URL - only http and https URLs are accepted
function isValidUrl(value) {
	try {
		const url = new URL(value)
		return url.protocol === 'http:' || url.protocol === 'https:'
	} catch {
		return false
	}
}

// function for removeing undefined values from an object
function removeUndefinedValues(object) {
	return Object.fromEntries(
		Object.entries(object).filter(([, value]) => value !== undefined),
	)
}

/**
    - create profile controller
    - POST API - "/api/profile/create-profile"
 */
async function createProfileController(req, res) {
	try {
		// extracting userId from req.user
		const userId = req.user?.id

		// validating requested user authenticated or not
		if (!userId) {
			return res.status(401).json({
				message: 'Unauthenticated user',
				success: false,
			})
		}

		// validating userId is a valid mongoose generated id
		if (!mongoose.isValidObjectId(userId)) {
			return res.status(401).json({
				message: 'Invalid authenticated user',
				success: false,
			})
		}

		// preventing duplicate profile creation
		const existingProfile = await profileModel.exists({ user: userId })
		if (existingProfile) {
			return res.status(409).json({
				message: 'Profile already exists for this user',
				success: false,
			})
		}

		// extracting all data sent by client
		const {
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

		// parsing location JSON string into an object
		let parsedLocation = location

		if (typeof location === 'string') {
			try {
				parsedLocation = JSON.parse(location)
			} catch {
				return res.status(400).json({
					message: 'Location must be a valid JSON object',
					success: false,
				})
			}
		}

		// parsing social links JSON string into an array
		let parsedSocialLinks = socialLinks

		if (typeof socialLinks === 'string') {
			try {
				parsedSocialLinks = JSON.parse(socialLinks)
			} catch {
				return res.status(400).json({
					message: 'Social links must be a valid JSON array',
					success: false,
				})
			}
		}

		// parsing skills JSON string into an array
		let parsedSkills = skills

		if (typeof skills === 'string') {
			try {
				parsedSkills = JSON.parse(skills)
			} catch {
				return res.status(400).json({
					message: 'Skills must be a valid JSON array',
					success: false,
				})
			}
		}

		// parsing experience string into a number
		let parsedExperience = experience
		if (typeof experience === 'string') {
			if (experience.trim() === '') {
				parsedExperience = undefined
			} else {
				parsedExperience = Number(experience)
			}
		}

		// validating first name
		if (firstName !== undefined && !isNonEmptyString(firstName)) {
			return res.status(400).json({
				message: 'First name must be a non-empty string',
				success: false,
			})
		}
		if (typeof firstName === 'string' && firstName.trim().length > 50) {
			return res.status(400).json({
				message: 'First name cannot exceed 50 characters',
				success: false,
			})
		}

		// validating last name
		if (lastName !== undefined && !isNonEmptyString(lastName)) {
			return res.status(400).json({
				message: 'Last name must be a non-empty string',
				success: false,
			})
		}
		if (typeof lastName === 'string' && lastName.trim().length > 50) {
			return res.status(400).json({
				message: 'Last name cannot exceed 50 characters',
				success: false,
			})
		}

		// validating bio
		if (bio !== undefined && typeof bio !== 'string') {
			return res.status(400).json({
				message: 'Bio must be a string',
				success: false,
			})
		}
		if (typeof bio === 'string' && bio.trim().length > 500) {
			return res.status(400).json({
				message: 'Bio cannot exceed 500 characters',
				success: false,
			})
		}

		// validating phone
		if (phone !== undefined && typeof phone !== 'string') {
			return res.status(400).json({
				message: 'Phone must be a string',
				success: false,
			})
		}
		if (typeof phone === 'string' && phone.trim().length > 20) {
			return res.status(400).json({
				message: 'Phone cannot exceed 20 characters',
				success: false,
			})
		}

		// validating location
		if (parsedLocation !== undefined) {
			if (
				typeof parsedLocation !== 'object' ||
				parsedLocation === null ||
				Array.isArray(parsedLocation)
			) {
				return res.status(400).json({
					message: 'Location must be an object',
					success: false,
				})
			}

			// extracting city & country from location object
			const { city, country } = parsedLocation

			// validating location city
			if (city !== undefined && typeof city !== 'string') {
				return res.status(400).json({
					message: 'Location city must be a string',
					success: false,
				})
			}
			if (typeof city === 'string' && city.trim().length > 50) {
				return res.status(400).json({
					message: 'Location city cannot exceed 50 characters',
					success: false,
				})
			}

			// validating location country
			if (country !== undefined && typeof country !== 'string') {
				return res.status(400).json({
					message: 'Location country must be a string',
					success: false,
				})
			}
			if (typeof country === 'string' && country.trim().length > 50) {
				return res.status(400).json({
					message: 'Location country cannot exceed 50 characters',
					success: false,
				})
			}
		}

		// validating profession
		if (profession !== undefined) {
			if (!isNonEmptyString(profession)) {
				return res.status(400).json({
					message: 'Profession must be a non-empty string',
					success: false,
				})
			}
			if (profession.trim().length > 50) {
				return res.status(400).json({
					message: 'Profession cannot exceed 50 characters',
					success: false,
				})
			}
		}

		// validating experience
		if (parsedExperience !== undefined) {
			if (
				typeof parsedExperience !== 'number' ||
				!Number.isFinite(parsedExperience)
			) {
				return res.status(400).json({
					message: 'Experience must be a valid number',
					success: false,
				})
			}

			if (parsedExperience < 0 || parsedExperience > 50) {
				return res.status(400).json({
					message: 'Experience must be between 0 and 50 years',
					success: false,
				})
			}
		}

		// validating skills
		if (parsedSkills !== undefined) {
			if (!Array.isArray(parsedSkills)) {
				return res.status(400).json({
					message: 'Skills must be an array',
					success: false,
				})
			}
			if (parsedSkills.length > MAX_SKILLS) {
				return res.status(400).json({
					message: `You can add a maximum of ${MAX_SKILLS} skills`,
					success: false,
				})
			}

			for (const skill of parsedSkills) {
				if (!isNonEmptyString(skill)) {
					return res.status(400).json({
						message: 'Every skill must be a non-empty string',
						success: false,
					})
				}
				if (skill.trim().length > 50) {
					return res.status(400).json({
						message: 'Each skill cannot exceed 50 characters',
						success: false,
					})
				}
			}
		}

		// validating social links
		if (parsedSocialLinks !== undefined) {
			if (!Array.isArray(parsedSocialLinks)) {
				return res.status(400).json({
					message: 'Social links must be an array',
					success: false,
				})
			}

			if (parsedSocialLinks.length > MAX_SOCIAL_LINKS) {
				return res.status(400).json({
					message: `You can add a maximum of ${MAX_SOCIAL_LINKS} social links`,
					success: false,
				})
			}

			for (const socialLink of parsedSocialLinks) {
				if (
					typeof socialLink !== 'object' ||
					socialLink === null ||
					Array.isArray(socialLink)
				) {
					return res.status(400).json({
						message: 'Each social link must be an object',
						success: false,
					})
				}

				// extracting platform & url from social links object
				const { platform, url } = socialLink

				// validating platform
				if (!isNonEmptyString(platform)) {
					return res.status(400).json({
						message: 'Social link platform is required',
						success: false,
					})
				}

				// validating URL
				if (!isNonEmptyString(url)) {
					return res.status(400).json({
						message: 'Social link URL is required',
						success: false,
					})
				}

				if (!isValidUrl(url.trim())) {
					return res.status(400).json({
						message:
							'Social link URL must be a valid HTTP or HTTPS URL',
						success: false,
					})
				}
			}
		}

		// uploading profile pic to cloud storage & getting url
		let profileImage = ''
		if (req.file) {
			const uploadedProfilePic = await uploadImage(req.file.buffer)
			profileImage = uploadedProfilePic.url
		}

		// validating profile image
		if (typeof profileImage !== 'string') {
			return res.status(400).json({
				message: 'Profile image must be a string',
				success: false,
			})
		}
		if (profileImage.trim() && !isValidUrl(profileImage.trim())) {
			return res.status(400).json({
				message: 'Profile image must be a valid HTTP or HTTPS URL',
				success: false,
			})
		}

		// preparing all profile data
		const profileData = {
			user: userId,
			firstName:
				typeof firstName === 'string' ? firstName.trim() : undefined,
			lastName:
				typeof lastName === 'string' ? lastName.trim() : undefined,
			bio: typeof bio === 'string' ? bio.trim() : undefined,
			phone: typeof phone === 'string' ? phone.trim() : undefined,
			location:
				parsedLocation !== undefined
					? {
							city:
								typeof parsedLocation.city === 'string'
									? parsedLocation.city.trim()
									: undefined,
							country:
								typeof parsedLocation.country === 'string'
									? parsedLocation.country.trim()
									: undefined,
						}
					: undefined,
			profileImage:
				typeof profileImage === 'string'
					? profileImage.trim()
					: undefined,
			profession:
				typeof profession === 'string' ? profession.trim() : undefined,
			experience: parsedExperience,
			skills: Array.isArray(parsedSkills)
				? [...new Set(parsedSkills.map((skill) => skill.trim()))]
				: undefined,
			socialLinks: Array.isArray(parsedSocialLinks)
				? parsedSocialLinks.map((socialLink) => ({
						platform: socialLink.platform.trim(),
						url: socialLink.url.trim(),
					}))
				: undefined,
		}

		// removing undefined properties before creating document
		const sanitizedProfileData = removeUndefinedValues(profileData)

		// creating profile of requested user
		const profile = await profileModel.create(sanitizedProfileData)

		// response back on success
		return res.status(201).json({
			message: 'Profile created successfully',
			success: true,
			profile: {
				id: profile._id,
				user: profile.user,
				firstName: profile.firstName,
				lastName: profile.lastName,
				bio: profile.bio,
				phone: profile.phone,
				location: profile.location,
				profileImage: profile.profileImage,
				profession: profile.profession,
				experience: profile.experience,
				skills: profile.skills,
				socialLinks: profile.socialLinks,
				createdAt: profile.createdAt,
				updatedAt: profile.updatedAt,
			},
		})
	} catch (error) {
		// handleing duplicate key race condition
		if (error?.code === 11000) {
			return res.status(409).json({
				message: 'Profile already exists for this user',
				success: false,
			})
		}

		// logging on unexpected server errors
		console.error('Profile creation failed', {
			error: error.message,
			stack: error.stack,
			userId: req.user?.id,
		})

		// failed response back on unexpected server errors
		return res.status(500).json({
			message: 'Internal server error',
			success: false,
		})
	}
}

// exporting controllers
module.exports = {
	createProfileController,
}