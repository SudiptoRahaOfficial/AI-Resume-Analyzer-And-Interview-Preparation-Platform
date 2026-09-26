/**
    - file name: auth.routes.js
    - responsibility: responsible for all auth related api endpoints
 */

// importing dependencis
const router = require('express').Router()
const {
	verifyEmailRateLimiter,
	resendVerifyEmailRateLimiter,
	signinAccountRateLimiter,
	signinIpRateLimiter,
} = require('../middlewares/rate-limit.middlewares')
const {
	signupController,
	verifyEmailController,
	resendVerifyEmailController,
	signinController,
} = require('../controllers/auth.controllers')

// signup : POST API - "/api/auth/signup"
router.post('/signup', signupController)

// verify-email : POST API - "/api/auth/verify-email"
router.post('/verify-email', verifyEmailRateLimiter, verifyEmailController)

// resend-verify-email : POST API - "/api/auth/resend-verify-email"
router.post(
	'/resend-verify-email',
	resendVerifyEmailRateLimiter,
	resendVerifyEmailController,
)

// signin : POST API - "/api/auth/signin"
router.post(
	'/signin',
	signinAccountRateLimiter,
	signinIpRateLimiter,
	signinController,
)

// exporting router
module.exports = router