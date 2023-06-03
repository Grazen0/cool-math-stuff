<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export let toggled = false;
	export let color = 'white';
	export let large = false;

	const onClick = () => {
		toggled = !toggled;
	};

	export { className as class };
</script>

<button
	class={classNames(
		className,
		'bg-gray-900 rounded-md px-3 py-1 transition-all duration-[25ms] outline m-2 active:bg-gray-800',
		toggled ? 'outline-2' : 'outline-0',
		large ? 'text-xl py-2 px-4 rounded-lg' : 'px-3 py-1'
	)}
	style="outline-color: {color}"
	on:click={onClick}
>
	<slot />
</button>
