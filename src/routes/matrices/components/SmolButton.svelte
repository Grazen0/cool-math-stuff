<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export { className as class };
</script>

<button
	on:click
	{...$$props}
	class={classNames(className, 'rounded w-5 h-5 disabled:brightness-50')}
>
	<slot />
</button>
