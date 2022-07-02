/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ['./components/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
	theme: {
		extend: {
			colors: {
				bg: '#080C0E',
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
