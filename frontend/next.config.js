/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		// loader: 'custom',
		// loaderFile: './my/image/loader.js',
		domains: ['127.0.0.1', 'res.cloudinary.com'],
		remotePatterns: [],
	},
};

module.exports = nextConfig;
