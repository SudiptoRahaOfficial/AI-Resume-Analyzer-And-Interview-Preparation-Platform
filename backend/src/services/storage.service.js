/**
    - file name: storage.service.js
    - responsibility: responsible for storage realted services
 */

// importing dependencis
const ImageKit = require('@imagekit/nodejs')

// client account private key setup
const client = new ImageKit({
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})

// function for uploading pdf to imagekit
async function uploadPdf(buffer) {
	// validating buffer
	if (!Buffer.isBuffer(buffer)) {
		throw new TypeError('File buffer is required')
	}

	const response = await client.files.upload({
		file: buffer.toString('base64'),
		fileName: `resume-${Date.now()}.pdf`,
		folder: '/resumeAi/resume-pdfs',
	})

	// returning only required storage information
	return {
		fileId: response.fileId,
		url: response.url,
		filePath: response.filePath,
	}
}

// function for uploading image to imagekit
async function uploadImage(buffer) {
	// validating buffer
	if (!Buffer.isBuffer(buffer)) {
		throw new TypeError('File buffer is required')
	}

	const response = await client.files.upload({
		file: buffer.toString('base64'),
		fileName: `profile-pic-${Date.now()}.jpg`,
		folder: '/resumeAi/profile-pics',
	})

	// returning only required storage information
	return {
		fileId: response.fileId,
		url: response.url,
		filePath: response.filePath,
	}
}

// exporting upload functions
module.exports = { uploadPdf, uploadImage }