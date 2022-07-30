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
			colors: {
				white: '#ffffff',
				card: '#2D2755',
				accent: '#745BF0',
				'white.6': 'rgba(255,255,255,0.6)',
				'white.02': 'rgba(255,255,255,0.02)',
				'white.16': 'rgba(255,255,255,0.16)',
				green: '#26FF63',
				negative: '#E93323',
				transparent: 'transparent',
				enabledGold: '#C4A46A',
			},
			width: {
				lg: '1520px',
			},
			fontFamily: {
				sans: ['Poppins', 'ui-sans'],
			},
		},
		borderRadius: {
			'2xlinset': '0.938rem',
			'2xl': '1rem',
		},
	},
	// eslint-disable-next-line global-require
	plugins: [require('tailwind-scrollbar-hide'), require('@tailwindcss/typography')],
};
