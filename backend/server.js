/**
	- file name: server.js
	- responsibility: responsible for application's server
 */

// importing dependencis
const app = require('./src/app')
const envConfig = require('./src/configs/env.config')
const connectDB = require('./src/db/connectDB')

const port = envConfig.PORT || 5000 // defining port

// connecting server with database
connectDB()

// starting server or listening for server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})