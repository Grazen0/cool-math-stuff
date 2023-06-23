<script lang="ts">
	import Katex from '$lib/components/Katex.svelte';
	import { determinant, latexMatrix } from '../math';

	export let matrix: number[];
</script>

<Katex
	math={`
				\\begin{aligned}
				M &= ${latexMatrix(matrix)} \\\\ 
				|M| &= ${determinant(matrix)} 
				\\end{aligned}
				`}
/>
