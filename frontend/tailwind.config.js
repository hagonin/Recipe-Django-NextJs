/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				md: '0rem',
			},
		},
		extend: {
			colors: {
				primary: '#8db0a6',
				primaryLight: '#7ba3960d',
				primaryDark: '#7ea399',
				second: '#757575',
				grey: '#EEEEEE',
				black: '#111111',
				border: '#e6e6e6',
			},
		},
	},
	plugins: [],
};
