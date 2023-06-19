<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export { className as class };
</script>

<div
	{...$$props}
	class={classNames(
		className,
		'inline-grid grid-cols-2 border-x-[3px] w-fit gap-2 border-white before:absolute before:top-0 before:left-0 before:w-2 before:h-full before:border-white before:border-y-[3px] after:absolute after:top-0 after:right-0 after:w-2 after:h-full after:border-white after:border-y-[3px] border-x-white rounded-sm relative px-4'
	)}
>
	<slot />
</div>
