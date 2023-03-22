const { fontFamily } = require('tailwindcss/defaultTheme');

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
				DEFAULT: '1.12rem',
				md: '0rem',
			},
		},
		extend: {
			fontFamily: {
				sans: ['var(--nunito-sans)', ...fontFamily.sans],
				serif: ['var(--libre-baskerville)', ...fontFamily.serif],
			},
			colors: {
				primary: '#96b7ae',
				primaryLight: '#7ba39617',
				primaryDark: '#79aa9e',
				primaryDark2: '#6f9e92',
				primary3: '#f5fffd',
				primaryTransparent: 'rgb(150, 183, 174, 0.85)',
				second: '#757575',
				third: '#F9F8F3',
				grey: '#EEEEEE',
				black: '#1a1a1a',
				blackLight: '#575757',
				border: '#e6e6e6',
				red: '#e3304e',
				red2: '#d85734',
				red3: '#DF7857',
				red4: '#FEF0F0',
				redLight: 'rgba(243, 58, 89, 0.15)',
				yellow: '#FFC438',
				yellowDark: '#f0b62d',
				whiteTransparent: 'rgba(255, 255, 255, 0.87)',
			},
			animation: {
				'spin-slow': 'spin 2s linear infinite',
				smoothbounceball:
					'smoothbounceball .6s ease-in-out infinite alternate',
			},
			keyframes: {
				smoothbounceball: {
					from: { transform: 'translate3d(0, 0, 0)' },
					to: { transform: 'translate3d(0, 30px, 0)' },
				},
			},
			spacing: {
				'search-bar': '48px',
				'logo-bar-pc': '208px',
				'logo-bar-mobile': '80px',
				'navigate-height': '60px',
			},
		},
		fontSize: {
			xsm: '0.625rem', //10px
			sm: '0.75rem', //12px
			xbase: '0.813rem', //13px
			base: '0.875rem', //14px
			lg: '0.9375rem', //15px
			xl: '1rem', //16px
			'2xl': '1.125rem', //18px
			'3xl': '1.25rem', //20px
			'4xl': '1.375rem', //22px
			'5xl': '1.5rem', //24px
		},
	},
	plugins: [require('@tailwindcss/line-clamp')],
};
