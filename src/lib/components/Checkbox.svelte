<script lang="ts">
	import classNames from 'classnames';

	export let checked: boolean;
	let className: string | undefined = undefined;

	export { className as class };
</script>

<label class={classNames(className, 'relative cursor-pointer select-none pl-8 inline-block')}>
	<input type="checkbox" bind:checked class="opacity-0 cursor-pointer absolute w-0 h-0 peer" />
	<span
		class="absolute top-1/2 -translate-y-1/2 left-0 h-6 w-6 bg-gray-800 rounded after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded after:transition-all duration-[20ms] after:scale-0 after:bg-gray-300 peer-checked:after:scale-[.6]"
	/>
	<slot />
</label>
