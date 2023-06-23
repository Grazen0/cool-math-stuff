<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MdChevronLeft from 'svelte-icons/md/MdFastRewind.svelte';
	import MdChevronRight from 'svelte-icons/md/MdFastForward.svelte';
	import type { AnimationControlsEvent } from '../events';
	import SmolButton from './SmolButton.svelte';

	export let allowPrevious: Boolean;
	export let allowNext: Boolean;

	const dispatch = createEventDispatcher<AnimationControlsEvent>();
</script>

<div class="text-xl flex justify-center space-x-4">
	<SmolButton
		large
		title="Next transformation"
		on:click={() => dispatch('next')}
		disabled={!allowNext}
		class="bg-yellow-400 px-2"
	>
		<MdChevronLeft />
	</SmolButton>
	<SmolButton
		large
		title="Previous transformation"
		on:click={() => dispatch('previous')}
		disabled={!allowPrevious}
		class="bg-yellow-400 px-2"
	>
		<MdChevronRight />
	</SmolButton>
</div>
