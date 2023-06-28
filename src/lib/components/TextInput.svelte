<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export let value: string;
	export let disabled = false;
	export let placeholder = '';
	export { className as class };
</script>

<input
	{placeholder}
	{disabled}
	{...$$props}
	bind:value
	type="text"
	class={classNames(
		className,
		'bg-slate-900 rounded text-lg px-2 w-16 focus:placeholder:text-transparent placeholder:opacity-60 disabled:brightness-75 spin-button-none'
	)}
/>
