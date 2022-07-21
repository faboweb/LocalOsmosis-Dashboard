/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./components/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
	theme: {
		screens: {
			xl: '1920px',
			lg: '1600px',
			md: '1024px',
			sm: '768px',
			xs: '576px',
		},
		colors: {
			white: '#ffffff',
			accent: '#745BF0',
			'white.6': 'rgba(255,255,255,0.6)',
			'white.02': 'rgba(255,255,255,0.02)',
			green: '#26FF63',
			negative: '#E93323',
			transparent: 'transparent',
		},
		extend: {
			width: {
				lg: '1520px',
			},
			fontFamily: {
				sans: ['Poppins', 'ui-sans'],
			},
		},
	},
	// eslint-disable-next-line global-require
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
};
