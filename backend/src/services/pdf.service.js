/**
    - file name: pdf.service.js
    - responsibility: responsible for generating PDF files from HTML content
 */

// importing dependencies
const puppeteer = require('puppeteer')

// function for generate resume pdf from html
async function generateResumePdfFromHtml(htmlContent) {
	let browser

	try {
		// Validate html content
		if (!htmlContent || typeof htmlContent !== 'string') {
			throw new Error('HTML content is required to generate PDF')
		}

		// Launch puppeteer browser
		browser = await puppeteer.launch()

		// Create a new page
		const page = await browser.newPage()

		// Load the HTML content directly into the page
		await page.setContent(htmlContent, {
			waitUntil: 'networkidle0',
		})

		// Generate PDF from the HTML content
		const pdfBuffer = await page.pdf({
			format: 'A4',
			printBackground: true,
			preferCSSPageSize: true,
		})

		// Return generated PDF buffer
		return pdfBuffer
	} finally {
		// Always close the browser
		if (browser) {
			await browser.close()
		}
	}
}

// exporting functions
module.exports = {
	generateResumePdfFromHtml,
}