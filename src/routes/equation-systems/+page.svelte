<script lang="ts">
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import EquationsInput from './views/EquationsInput.svelte';
	import NumVariablesInput from './views/NumVariablesInput.svelte';
	import { Fraction, gaussJordan } from './math';
	import Results from './views/Results.svelte';
	import Button from '$lib/components/Button.svelte';

	let numVariables: number | null = null;
	let inputMatrix: Fraction[][] | null = null;
	let results: Fraction[] | null = null;

	const beginCalculation = (numberMatrix: number[][]) => {
		if (numVariables === null) return;

		const matrix = numberMatrix.map(row => row.map(Fraction.fromDecimal));
		const resultMatrix = matrix.map(row => row.map(frac => frac.clone()));

		gaussJordan(resultMatrix);

		if (resultMatrix.some((row, index) => row[index].isZero())) {
			results = null;
		} else {
			results = [...Array(numVariables)].map((_, i) =>
				resultMatrix[i][numVariables as number].clone().divideBy(resultMatrix[i][i])
			);
		}

		inputMatrix = matrix;
	};

	const reset = () => {
		numVariables = null;
		inputMatrix = null;
		results = null;
	};

	$: if (numVariables === null) results = null;
</script>

<PageLayout title="Equation Systems Solver">
	{#if numVariables === null}
		<NumVariablesInput
			min={2}
			max={5}
			on:submit={e => (numVariables = e.detail.value)}
			disabled={numVariables !== null}
		/>
	{:else if inputMatrix === null}
		<div class="text-center">
			<p class="text-xl mb-6">...and the following coefficients:</p>
			<EquationsInput {numVariables} on:submit={e => beginCalculation(e.detail.matrix)} />
		</div>
	{:else}
		<Results {inputMatrix} {results} />
		<div class="text-center my-6">
			<Button on:click={() => reset()}>Do another one</Button>
		</div>
	{/if}
</PageLayout>
