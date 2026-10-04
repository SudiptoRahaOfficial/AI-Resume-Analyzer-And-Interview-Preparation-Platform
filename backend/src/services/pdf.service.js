/**
 * - file name: pdf.service.js
 * - responsibility: responsible for PDF related services
 */

// importing dependencies
const puppeteer = require('puppeteer')

// function for generating PDF from HTML
async function generateResumePdfFromHtml(htmlContent) {
	let browser

	try {
		// validating HTML content
		if (!htmlContent || typeof htmlContent !== 'string') {
			throw new TypeError('HTML content is required to generate PDF')
		}

		// launching browser
		browser = await puppeteer.launch()

		// creating new page
		const page = await browser.newPage()

		// setting HTML content
		await page.setContent(htmlContent, {
			waitUntil: 'networkidle0',
		})

		// generating PDF
		const pdfData = await page.pdf({
			format: 'A4',
			printBackground: true,
			preferCSSPageSize: true,
		})

		// converting Puppeteer PDF data to Node.js Buffer
		const pdfBuffer = Buffer.from(pdfData)

		return pdfBuffer
	} finally {
		// closing browser
		if (browser) {
			await browser.close()
		}
	}
}

// exporting functions
module.exports = {
	generateResumePdfFromHtml,
}