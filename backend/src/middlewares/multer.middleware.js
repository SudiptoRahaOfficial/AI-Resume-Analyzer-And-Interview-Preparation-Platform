// importing dependencis
const multer = require('multer')
const path = require('node:path')

// configuring upload middleware
const upload = multer({
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

// exporting upload middleware
module.exports = { upload }