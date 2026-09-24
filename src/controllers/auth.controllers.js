/**
    - file name: auth.controllers.js
    - responsibility: responsible for all auth related api controllers
 */

// importing dependencis

/**
    - signup controller
    - POST API - "/api/auth/signup"
 */
async function signupController(req, res) {
	res.send('AI Resume Analyzer Signup')
}

// exporting controllers
module.exports = {
	signupController,
}