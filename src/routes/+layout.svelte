<script lang="ts">
	import { WEBSITE_NAME } from '$lib/constants';
	import Header from '$lib/components/layout/Header.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>{WEBSITE_NAME}</title>
</svelte:head>

<Header />

<div class="p-6">
	<slot />
</div>

<style lang="postcss">
	:global(body) {
		@apply bg-slate-950 text-white;
	}
</style>
