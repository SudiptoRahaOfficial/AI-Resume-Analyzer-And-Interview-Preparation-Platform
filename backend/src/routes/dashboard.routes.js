/**
	- file name: dashboard.routes.js
	- responsibility: responsible for all dashboard related api endpoints
 */

// importing dependencies
const router = require('express').Router()
const { authenticateUser } = require('../middlewares/auth.middlewares')
const {
	getDashboardStatisticsController,
} = require('../controllers/dashboard.controllers')

// get dashboard statistics : GET API - "/api/dashboard/statistics"
router.get('/statistics', authenticateUser, getDashboardStatisticsController)

// exporting router
module.exports = router