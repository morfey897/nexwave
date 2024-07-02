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
				overlayShow: {
					from: { opacity: '0' },
					to: { opacity: '1' },
				},
				contentShow: {
					from: {
						opacity: '0',
						transform: 'translate(-50%, -48%) scale(0.96)',
					},
					to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
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
				overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
				contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
			},
			colors: {
				'user-selected': 'var(--user-selected)',
				primary: 'var(--primary)',
				secondary: 'var(--secondary)',
				'primary-text': 'var(--primary-text)',
				'primary-text-gray': 'var(--primary-text-gray)',
				'secondary-text': 'var(--secondary-text)',
				stroke: 'var(--stroke)',
				main: 'var(--main)',
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
					text: 'var(--dark-text)',
				},
				white: 'var(--white)',
				yellow: {
					yellow: 'var(--yellow-1)',
					dark: 'var(--yellow-dark)',
					'dark-2': 'var(--yellow-dark-2)',
					light: 'var(--yellow-light)',
					'light-2': 'var(--yellow-light-2)',
					'light-3': 'var(--yellow-light-3)',
					'light-4': 'var(--yellow-light-4)',
				},
				orange: {
					orange: 'var(--orange)',
					dark: 'var(--orange-dark)',
					light: 'var(--orange-light)',
					'light-2': 'var(--orange-light-2)',
					'light-3': 'var(--orange-light-3)',
					'light-4': 'var(--orange-light-4)',
					'light-5': 'var(--orange-light-5)',
				},
				red: {
					'1': 'var(--red-1)',
					'2': 'var(--red-2)',
					'3': 'var(--red-3)',
					'4': 'var(--red-4)',
					'5': 'var(--red-5)',
					'6': 'var(--red-6)',
					'7': 'var(--red-7)',
					'8': 'var(--red-8)',
				},
				pink: {
					pink: 'var(--pink)',
					dark: 'var(--pink-dark)',
					light: 'var(--pink-light)',
					'light-2': 'var(--pink-light-2)',
					'light-3': 'var(--pink-light-3)',
					'light-4': 'var(--pink-light-4)',
				},
				purple: {
					purple: 'var(--purple)',
					dark: 'var(--purple-dark)',
					'dark-2': 'var(--purple-dark-2)',
					light: 'var(--purple-light)',
					'light-2': 'var(--purple-light-2)',
					'light-3': 'var(--purple-light-3)',
					'light-4': 'var(--purple-light-4)',
					'light-5': 'var(--purple-light-5)',
				},
				blue: {
					'1': 'var(--blue-1)',
					'2': 'var(--blue-2)',
					'3': 'var(--blue-3)',
					'4': 'var(--blue-4)',
					'5': 'var(--blue-5)',
					'6': 'var(--blue-6)',
					'7': 'var(--blue-7)',
				},
				cyan: {
					'1': 'var(--cyan-1)',
					'2': 'var(--cyan-2)',
					'3': 'var(--cyan-3)',
					'4': 'var(--cyan-4)',
					'5': 'var(--cyan-5)',
				},
				teal: {
					teal: 'var(--teal)',
					dark: 'var(--teal-dark)',
					light: 'var(--teal-light)',
					'light-2': 'var(--teal-light-2)',
					'light-3': 'var(--teal-light-3)',
				},
				green: {
					'1': 'var(--green-1)',
					'2': 'var(--green-2)',
					'3': 'var(--green-3)',
					'4': 'var(--green-4)',
					'5': 'var(--green-5)',
					'6': 'var(--green-6)',
					'7': 'var(--green-7)',
					'8': 'var(--green-8)',
				},
			},
		},
	},
	// eslint-disable-next-line global-require
	plugins: [require('@tailwindcss/forms')],
};
export default config;
