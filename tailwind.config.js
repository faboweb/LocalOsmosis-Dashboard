/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	purge: [
		'./components/**/*.{ts,tsx,js,jsx}',
		'./pages/**/*.{ts,tsx,js,jsx}',
	],
	content: ["./src/**/*.{html,js}"],
	theme: {
		extend: {},
	},
	plugins: [],
};
