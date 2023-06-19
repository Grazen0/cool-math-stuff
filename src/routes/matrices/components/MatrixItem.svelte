<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdChevronLeft.svelte';
	import MdChevronRight from 'svelte-icons/md/MdChevronRight.svelte';
	import MdClose from 'svelte-icons/md/MdClose.svelte';
	import Katex from '$lib/components/Katex.svelte';
	import SmolButton from './SmolButton.svelte';
	import type { MatrixItemEvent } from '../events';

	export let disableLeft: boolean;
	export let disableRight: boolean;
	export let mat: number[];

	const dispatch = createEventDispatcher<MatrixItemEvent>();
</script>

<li class="text-xl px-2 py-2 bg-slate-900 rounded m-1">
	<div class="grid grid-cols-3 justify-items-center mb-2">
		<SmolButton
			on:click={() => dispatch('move', { direction: 'left' })}
			disabled={disableLeft}
			class="bg-slate-600"
			title="Move left"
		>
			<MdChevronLeft />
		</SmolButton>
		<SmolButton
			on:click={() => dispatch('move', { direction: 'right' })}
			disabled={disableRight}
			class="bg-slate-600"
			title="Move right"
		>
			<MdChevronRight />
		</SmolButton>
		<SmolButton on:click={() => dispatch('delete')} class="bg-slate-700" title="Remove">
			<MdClose />
		</SmolButton>
	</div>
	<Katex
		math={`\\begin{bmatrix} ${mat[0]} & ${mat[1]} \\\\ ${mat[2]} & ${mat[3]} \\end{bmatrix}`}
	/>
</li>
