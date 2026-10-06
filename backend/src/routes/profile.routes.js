/**
    - file name: profile.routes.js
    - responsibility: responsible for all profile related api endpoints
 */

// importing dependencies
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const { getImageBuffer } = require('../middlewares/multer.middlewares')
const {
	createProfileController,
	updateProfileController,
	getProfileController,
} = require('../controllers/profile.controllers')

// create profile : POST API - "/api/profile/create-profile"
router.post(
	'/create-profile',
	authenticateUser,
	getImageBuffer.single('profileImage'),
	createProfileController,
)

// update profile : PATCH API - "/api/profile/update-profile"
router.patch(
	'/update-profile',
	authenticateUser,
	getImageBuffer.single('profileImage'),
	updateProfileController,
)

// get profile : GET API - "/api/profile"
router.get('/', authenticateUser, getProfileController)

// exporting router
module.exports = router