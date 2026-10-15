/** @type {import('next').NextConfig} */
const nextConfig = {
	// Allow access to Next.js development resources from your LAN IP.
	allowedDevOrigins: ['192.168.1.104'],

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