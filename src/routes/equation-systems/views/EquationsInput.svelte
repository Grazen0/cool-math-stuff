<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import classNames from 'classnames';
	import Button from '$lib/components/Button.svelte';
	import Katex from '$lib/components/Katex.svelte';
	import { LETTERS } from '../math';
	import TextInput from '$lib/components/TextInput.svelte';

	let className = '';
	export { className as class };
	export let numVariables: number;

	const dispatch = createEventDispatcher<{ submit: { matrix: number[][] } }>();

	let coefMatrix: string[][] = [...Array(numVariables)].map(() => Array(numVariables).fill(''));
	let constantsMatrix: string[] = Array(numVariables).fill('');

	const handleSubmit = () => {
		const augmentedMatrix = coefMatrix.map((row, i) =>
			[...row, constantsMatrix[i]].map(s => (s.length === 0 ? 0 : Number(s)))
		);

		if (augmentedMatrix.some(row => row.some(isNaN))) {
			alert('An invalid number was entered');
			return;
		}

		dispatch('submit', { matrix: augmentedMatrix });
	};

	$: coefMatrix = coefMatrix.map(row => row.map(s => s.trim().replace(/[^-\.0-9]/g, '')));
</script>

<form
	{...$$props}
	class={classNames(className, 'text-center text-xl mb-8')}
	on:submit|preventDefault={handleSubmit}
>
	<div>
		{#each coefMatrix as row, i}
			<div class="my-4">
				{#each row as _, j}
					<TextInput bind:value={coefMatrix[i][j]} class="w-12 text-right text" placeholder="0" />
					<Katex math={LETTERS[j] + (j < numVariables - 1 ? '\\space+\\space' : '')} />
				{/each}
				<Katex math=" = " />
				<TextInput bind:value={constantsMatrix[i]} class="w-12 text-center" placeholder="0" />
			</div>
		{/each}
	</div>
	<Button type="submit" large class="bg-green-500">Go!</Button>
</form>
