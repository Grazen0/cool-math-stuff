<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export let value: number;
	export let disabled = false;
	export let placeholder = '';
	export { className as class };
</script>

<input
type="number"
	{placeholder}
	{disabled}
	{...$$props}
	bind:value
	class={classNames(
		className,
		'bg-slate-900 rounded text-lg px-2 w-16 focus:placeholder:text-transparent placeholder:opacity-60 disabled:brightness-75'
	)}
/>
