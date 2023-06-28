<script lang="ts">
	import Katex from '$lib/components/Katex.svelte';
	import { Fraction, LETTERS } from '../math';

	export let inputMatrix: Fraction[][];
	export let results: Fraction[] | null;

	$: console.log('input:', inputMatrix);
</script>

<div class="text-center text-xl my-18">
	<div class="my-12">
		<p class="text-center text-2xl my-4">Solving for system:</p>
		<Katex
			math={`
\\begin{cases}
  ${inputMatrix
		.map(row => {
			const coefficients = row.slice(0, row.length - 1);
			const rightHand = row[row.length - 1].latex();

			if (coefficients.every(n => n.isZero())) return `0 = ${rightHand}`;

			return `${coefficients
				.map((coef, index) => {
					if (coef.isZero()) return '';

					let str = '';
					if (index > 0 || coef.sign() === -1) {
						str += coef.sign() === 1 ? '+' : '-';
					}

					const absCoef = coef.clone().abs();
					if (absCoef.value() !== 1) str += absCoef.latex();

					return str + LETTERS[index];
				})
				.join('')} = ${rightHand}`;
		})
		.join('\\\\')}
\\end{cases}
`}
		/>
	</div>
	<div class="my-6 text-2xl">
		<p class="text-center text-xl my-2">Result:</p>
		{#if results !== null}
			<Katex
				math={`
			\\begin{aligned}
			${results.map((n, i) => `${LETTERS[i]} &= ${n.latex()}`).join('\\\\')}
			\\end{aligned}
			`}
			/>
		{:else}
			<Katex math={'\\text{No solutions / Infinite solutions}'} />
		{/if}
	</div>
</div>
