// @ts-check

/**
 * @type {import('next').NextConfig}
 * */
const nextConfig = {
	optimizeFonts: false,
	reactStrictMode: true,
	images: {
		domains: ['raw.githubusercontent.com'],
	},
};

module.exports = nextConfig;
