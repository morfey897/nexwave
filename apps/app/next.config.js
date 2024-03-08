const withPWAInit = require('@ducanh2912/next-pwa');
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next-pwa').PWAConfig} */
const withPWA = withPWAInit.default({
	dest: 'public',
	disable: true, //process.env.NODE_ENV !== 'production',
	fallbacks: {
		document: '/~offline',
	},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	trailingSlash: true,
	images: {
		remotePatterns: [
			{ hostname: 'images.unsplash.com' },
			{ hostname: 'merakiui.com' },
			{ hostname: 'i.pravatar.cc' },
		],
	},
};

module.exports = withPWA(withNextIntl(nextConfig));
