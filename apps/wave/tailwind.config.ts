import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			transitionProperty: {
				'max-height': 'max-height',
				'max-width': 'max-width',
			},
			keyframes: {
				slideDownAndFade: {
					from: { opacity: '0', transform: 'translateY(-2px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				slideLeftAndFade: {
					from: { opacity: '1', transform: 'translateX(2px)' },
					to: { opacity: '0', transform: 'translateX(0)' },
				},
				slideUpAndFade: {
					from: { opacity: '0', transform: 'translateY(2px)' },
					to: { opacity: '1', transform: 'translateY(0)' },
				},
				slideRightAndFade: {
					from: { opacity: '0', transform: 'translateX(-2px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
				},
			},
			animation: {
				slideDownAndFade:
					'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideLeftAndFade:
					'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
				slideRightAndFade:
					'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
			},
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				'primary-text': 'var(--primary-text)',
				'secondary-text': 'var(--secondary-text)',
				stroke: 'var(--stroke)',
				gray: {
					'1': 'var(--gray-1)',
					'2': 'var(--gray-2)',
					'3': 'var(--gray-3)',
					'4': 'var(--gray-4)',
					'5': 'var(--gray-5)',
					'6': 'var(--gray-6)',
					'7': 'var(--gray-7)',
					'8': 'var(--gray-8)',
				},
				dark: {
					'1': 'var(--dark-1)',
					'2': 'var(--dark-2)',
					'3': 'var(--dark-3)',
					'4': 'var(--dark-4)',
					'5': 'var(--dark-5)',
					'6': 'var(--dark-6)',
					'7': 'var(--dark-7)',
					'8': 'var(--dark-8)',
				},
				white: {
					'': 'var(--white)',
				},
				yellow: {
					'': 'var(--yellow-1)',
					dark: 'var(--yellow-dark)',
					'dark-2': 'var(--yellow-dark-2)',
					light: 'var(--yellow-light)',
					'light-2': 'var(--yellow-light-2)',
					'light-3': 'var(--yellow-light-3)',
					'light-4': 'var(--yellow-light-4)',
				},
				orange: {
					'': 'var(--orange)',
					dark: 'var(--orange-dark)',
					light: 'var(--orange-light)',
					'light-2': 'var(--orange-light-2)',
					'light-3': 'var(--orange-light-3)',
					'light-4': 'var(--orange-light-4)',
					'light-5': 'var(--orange-light-5)',
				},
				red: {
					'': 'var(--red)',
					dark: 'var(--red-dark)',
					light: 'var(--red-light)',
					'light-2': 'var(--red-light-2)',
					'light-3': 'var(--red-light-3)',
					'light-4': 'var(--red-light-4)',
					'light-5': 'var(--red-light-5)',
					'light-6': 'var(--red-light-6)',
				},
				pink: {
					'': 'var(--pink)',
					dark: 'var(--pink-dark)',
					light: 'var(--pink-light)',
					'light-2': 'var(--pink-light-2)',
					'light-3': 'var(--pink-light-3)',
					'light-4': 'var(--pink-light-4)',
				},
				purple: {
					'': 'var(--purple)',
					dark: 'var(--purple-dark)',
					'dark-2': 'var(--purple-dark-2)',
					light: 'var(--purple-light)',
					'light-2': 'var(--purple-light-2)',
					'light-3': 'var(--purple-light-3)',
					'light-4': 'var(--purple-light-4)',
					'light-5': 'var(--purple-light-5)',
				},
				blue: {
					'': 'var(--blue)',
					dark: 'var(--blue-dark)',
					light: 'var(--blue-light)',
					'light-2': 'var(--blue-light-2)',
					'light-3': 'var(--blue-light-3)',
					'light-4': 'var(--blue-light-4)',
					'light-5': 'var(--blue-light-5)',
				},
				cyan: {
					'': 'var(--cyan)',
					dark: 'var(--cyan-dark)',
					light: 'var(--cyan-light)',
					'light-2': 'var(--cyan-light-2)',
					'light-3': 'var(--cyan-light-3)',
				},
				teal: {
					'': 'var(--teal)',
					dark: 'var(--teal-dark)',
					light: 'var(--teal-light)',
					'light-2': 'var(--teal-light-2)',
					'light-3': 'var(--teal-light-3)',
				},
				green: {
					'': 'var(--green)',
					dark: 'var(--green-dark)',
					light: 'var(--green-light)',
					'light-2': 'var(--green-light-2)',
					'light-3': 'var(--green-light-3)',
					'light-4': 'var(--green-light-4)',
					'light-5': 'var(--green-light-5)',
					'light-6': 'var(--green-light-6)',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
export default config;
