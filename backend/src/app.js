/**
	- file name: app.js
	- responsibility: responsible for application's root functionalities
 */

// importing dependencis
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// importing routers
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')
const resumeRouter = require('./routes/resume.routes')
const dashboardRouter = require('./routes/dashboard.routes')

// making app
const app = express()

// middlewares array
const middlewares = [
	express.urlencoded({ extended: true }), // accept form-data
	express.json(), // accept json-data
	cookieParser(), // parse cookies from incoming requests
	cors({ origin: 'http://localhost:3001', credentials: true }),
]
app.use(middlewares) // using middlewares

// connecting all API routers
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/dashboard', dashboardRouter)

// exporting app
module.exports = app