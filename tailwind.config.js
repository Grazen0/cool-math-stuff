const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('slider-thumb', [
				'&::-webkit-slider-thumb',
				'&::-moz-range-thumb',
				'&::slider-thumb',
			]);
		}),
	],
};
