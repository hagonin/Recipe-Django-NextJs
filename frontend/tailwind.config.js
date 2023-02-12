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
				primary: '#96b7ae',
				primaryLight: '#7ba39617',
				primaryDark: '#88a79f',
				primaryTransparent: 'rgb(150, 183, 174, 0.8)',
				second: '#757575',
				grey: '#EEEEEE',
				black: '#111111',
				blackLigt: '#575757',
				border: '#e6e6e6',
				red: '#F33A58',
				redLight: 'rgba(243, 58, 89, 0.15)',
			},
			animation: {
				'spin-slow': 'spin 2s linear infinite',
			},
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
