/**
	- file name: env.config.js
	- responsibility: responsible for all .env variables import
 */

// importing & configuring dotenv
require('dotenv').config()

// Error setup for environmental valriables defenation
// port error
if (!process.env.PORT) {
	throw new Error('PORT is not defined in .env')
}

// trusted origin errors
if (!process.env.TRUSTED_ORIGIN_1) {
	throw new Error('TRUSTED_ORIGIN_1 is not defined in .env')
}
if (!process.env.TRUSTED_ORIGIN_2) {
	throw new Error('TRUSTED_ORIGIN_2 is not defined in .env')
}

// db connection uri error
if (!process.env.MONGO_DB_URI) {
	throw new Error('MONGO_DB_URI is not defined in .env')
}

// jwt secret errors
if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
	throw new Error('JWT_ACCESS_TOKEN_SECRET is not defined in .env')
}
if (!process.env.JWT_REFRESH_TOKEN_SECRET) {
	throw new Error('JWT_REFRESH_TOKEN_SECRET is not defined in .env')
}

// google oAuth credentials errors
if (!process.env.GOOGLE_CLIENT_ID) {
	throw new Error('GOOGLE_CLIENT_ID is not defined in .env')
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
	throw new Error('GOOGLE_CLIENT_SECRET is not defined in .env')
}
if (!process.env.GOOGLE_REFRESH_TOKEN) {
	throw new Error('GOOGLE_REFRESH_TOKEN is not defined in .env')
}
if (!process.env.GOOGLE_USER) {
	throw new Error('GOOGLE_USER is not defined in .env')
}

// gemini api key error
if (!process.env.GEMINI_API_KEY) {
	throw new Error('GEMINI_API_KEY is not defined in .env')
}

// imagekit private key error
if (!process.env.IMAGEKIT_PRIVATE_KEY) {
	throw new Error('IMAGEKIT_PRIVATE_KEY is not defined in .env')
}

// configuration object
const config = {
	PORT: process.env.PORT,

	TRUSTED_ORIGIN_1: process.env.TRUSTED_ORIGIN_1,
	TRUSTED_ORIGIN_2: process.env.TRUSTED_ORIGIN_2,

	MONGO_DB_URI: process.env.MONGO_DB_URI,

	JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
	JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,

	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
	GOOGLE_USER: process.env.GOOGLE_USER,

	GEMINI_API_KEY: process.env.GEMINI_API_KEY,

	IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
}

// exporting config object
module.exports = config