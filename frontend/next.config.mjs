/** @type {import('next').NextConfig} */

// backend url (server side only, never exposed to the browser)
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3000'

const nextConfig = {
	// forwarding every /api/* request to the express server
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${BACKEND_URL}/api/:path*`,
			},
		]
	},

	// Allow access to Next.js development resources from your LAN IP.
	allowedDevOrigins: ['192.168.1.100'],

	// Existing configuration
	cacheComponents: true,
	partialPrefetching: true,
	reactCompiler: true,

	turbopack: {
		rules: {
			'*.css': {
				loaders: ['@tailwindcss/turbopack'],
				as: '*.css',
			},
		},
	},
}

export default nextConfig