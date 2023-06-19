const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				hover: 'hover 4s ease-in-out infinite',
			},
			keyframes: {
				hover: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(15%)' },
				},
			},
		},
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('slider-thumb', [
				'&::-webkit-slider-thumb',
				'&::-moz-range-thumb',
				'&::slider-thumb',
			]);
			addVariant('outer-spin-button', '&::-webkit-outer-spin-button');
			addVariant('inner-spin-button', '&::-webkit-inner-spin-button');
		}),
	],
};
