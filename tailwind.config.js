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
		extend: {
			width: {
				lg: '1520px',
			},
			fontFamily: {
				sans: ['Poppins', 'ui-sans'],
			},
			colors: {
				white: '#ffffff',
				accent: '#745BF0',
				'white.6': 'rgba(255,255,255,0.6)',
				'white.02': 'rgba(255,255,255,0.02)',
				bgBox: '#0F1A1F',
				bgBorder: '#2B373D',
				primary: '#ACE74D',
				negative: '#E93323',
				txtWhite: '#DEDFDF',
				txtGray: '#6E7477',
				txtBlack: '#09121F',
			},
		},
	},
	// eslint-disable-next-line global-require
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
};
