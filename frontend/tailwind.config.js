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
		},
		extend: {
			colors: {
				primary: '#95B5AC',
				second: '#757575',
				grey: '#EEEEEE',
				black: '#111111',
				border: '#e6e6e6',
			},
		},
	},
	plugins: [],
};
