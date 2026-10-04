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

// function for uploading file to imagekit
async function uploadFile(buffer) {
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

// exporting uploadFile function
module.exports = uploadFile