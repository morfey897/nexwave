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
					from: { opacity: '0', transform: 'translateX(2px)' },
					to: { opacity: '1', transform: 'translateX(0)' },
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
				gray: {
					'1': 'var(--gray-1)',
					'2': 'var(--gray-2)',
					'3': 'var(--gray-3)',
					'4': 'var(--gray-4)',
					'5': 'var(--gray-5)',
					'6': 'var(--gray-6)',
					'7': 'var(--gray-7)',
					'8': 'var(--gray-8)',
					'9': 'var(--gray-9)',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
export default config;
