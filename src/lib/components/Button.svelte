<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export let large = false;
	export let disabled = false;
	export let type: 'button' | 'reset' | 'submit' | null = null;

	export { className as class };
</script>

<button
	{type}
	class={classNames(
		className,
		'bg-slate-900 px-3 py-1 transition-all duration-100 m-2 disabled:brightness-75 enabled:active:brightness-150',
		large ? 'text-xl py-2 px-4 rounded-lg' : 'px-3 py-1 rounded'
	)}
	on:click
	{disabled}
>
	<slot />
</button>
