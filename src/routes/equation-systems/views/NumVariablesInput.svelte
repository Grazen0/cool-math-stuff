<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '$lib/components/Button.svelte';
	import Range from '$lib/components/Range.svelte';

	export let min: number;
	export let max: number;
	export let disabled = false;

	const dispatch = createEventDispatcher<{ submit: { value: number } }>();

	let value = min;
</script>

<form class="text-center my-4" on:submit|preventDefault={() => dispatch('submit', { value })}>
	<label for="num-variables" class="my-3 inline-block">
		<p class="text-xl my-6">
			Solve a system with <span class="text-2xl font-semibold">{value}</span> variables...
		</p>
		<span class:brightness-50={disabled}>
			<span class="text-lg">{min}</span>
			<Range bind:value {min} {max} {disabled} class="mx-2 disabled:opacity-100" />
			<span class="text-lg">{max}</span>
		</span>
	</label>
	<br />
	<Button type="submit" large>Next</Button>
</form>
