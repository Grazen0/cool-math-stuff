<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export let value = 0;
	export let disabled = false;
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: number | undefined = undefined;

	export { className as class };
</script>

<input
	name="angle"
	type="range"
	{min}
	{max}
	{step}
	bind:value
	{disabled}
	class={classNames(
		className,
		' outline-none appearance-none bg-transparent h-3 border-2 border-gray-700 rounded-full slider-thumb:appearance-none slider-thumb:cursor-pointer slider-thumb:rounded-full slider-thumb:border-gray-700 slider-thumb:bg-gray-300 slider-thumb:w-5 slider-thumb:h-5 slider-thumb:border-2 disabled:opacity-50 slider-thumb:disabled:cursor-default'
	)}
/>
