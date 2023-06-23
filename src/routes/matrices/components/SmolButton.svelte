<script lang="ts">
	import classNames from 'classnames';

	export let large = false;
	let className = '';
	export { className as class };
</script>

<button
	on:click
	{...$$props}
	class={classNames(
		className,
		'rounded disabled:brightness-50 transition-all duration-75',
		large ? 'w-14 h-10' : 'w-5 h-5'
	)}
>
	<slot />
</button>
