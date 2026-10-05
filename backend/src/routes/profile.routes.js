/**
    - file name: profile.routes.js
    - responsibility: responsible for all profile related api endpoints
 */

// importing dependencies
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const {
	createProfileController,
} = require('../controllers/profile.controllers')

// create profile : POST API - "/api/profile/create-profile"
router.post('/create-profile', authenticateUser, createProfileController)

// exporting router
module.exports = router