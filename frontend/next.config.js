/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [
			{
				hostname: 'k7d2p7y5.stackpathcdn.com',
			},
			{
				hostname: 'res.cloudinary.com',
			},
		],
		domains: ['127.0.0.1'],
	},
};

module.exports = nextConfig;
