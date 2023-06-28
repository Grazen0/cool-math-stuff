<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import MatrixDiv from './MatrixDiv.svelte';
	import { identityMatrix } from '../math';

	export let disabled = false;

	const dispatch = createEventDispatcher<{ submit: { matrix: number[] } }>();

	let inputMatrix = identityMatrix();

	const handleClick = () => {
		if ((inputMatrix as (number | null)[]).includes(null)) {
			alert('Some numbers in the matrix are invalid');
			return;
		}

		dispatch('submit', { matrix: [...inputMatrix] });
		inputMatrix = identityMatrix();
	};
</script>

<div class="flex flex-row items-center space-x-6 mx-auto w-fit">
	<MatrixDiv class={disabled ? 'brightness-75' : ''}>
		{#each inputMatrix as _, index}
			<NumberInput
				bind:value={inputMatrix[index]}
				{disabled}
				class="text-center text-xl disabled:brightness-100"
			/>
		{/each}
	</MatrixDiv>
	<Button on:click={handleClick} {disabled}>Add matrix</Button>
</div>
