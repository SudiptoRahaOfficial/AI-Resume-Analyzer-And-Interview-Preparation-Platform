/**
    - file name: multer.middlewares.js
    - responsibility: responsible for converting files to buffer
 */

// importing dependencis
const multer = require('multer')
const path = require('node:path')

// configuring get-pdf-buffer middleware
const getPdfBuffer = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024 * 3, // 3mb
	},
	fileFilter: (req, file, cb) => {
		const type = /pdf/
		const ext = type.test(path.extname(file.originalname).toLowerCase())
		const mimetype = type.test(file.mimetype)

		if (ext && mimetype) {
			cb(null, true)
		} else {
			cb(new Error('File format not supported!'))
		}
	},
})

// configuring get-image-buffer middleware
const getImageBuffer = multer({
	storage: multer.memoryStorage(),
	limits: {
		fileSize: 1024 * 1024 * 3, // 3mb
	},
	fileFilter: (req, file, cb) => {
		const types = /jpg|jpeg|png/
		const ext = types.test(path.extname(file.originalname).toLowerCase())
		const mimetype = types.test(file.mimetype)

		if (ext && mimetype) {
			cb(null, true)
		} else {
			cb(new Error('File format not supported!'))
		}
	},
})

// exporting multer middlewares
module.exports = { getPdfBuffer, getImageBuffer }