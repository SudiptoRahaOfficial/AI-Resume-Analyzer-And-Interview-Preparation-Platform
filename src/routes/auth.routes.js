/**
    - file name: auth.routes.js
    - responsibility: responsible for all auth related api endpoints
 */

// importing dependencis
const router = require('express').Router()
const {
	verifyEmailRateLimiter,
} = require('../middlewares/rate-limit.middlewares')
const {
	signupController,
	verifyEmailController,
} = require('../controllers/auth.controllers')

// signup : POST API - "/api/auth/signup"
router.post('/signup', signupController)

// verify-email : POST API - "/api/auth/verify-email"
router.post('/verify-email', verifyEmailRateLimiter, verifyEmailController)

// exporting router
module.exports = router