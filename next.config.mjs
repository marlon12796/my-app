/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: {
			allowedOrigins: ['localhost:3000', 'x606jbdg-3000.brs.devtunnels.ms:3000'],
		},
	},
};

export default nextConfig;
