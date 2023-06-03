<script lang="ts">
	import { WEBSITE_NAME } from '$lib/constants';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>{WEBSITE_NAME}</title>
</svelte:head>

<div class="h-full flex flex-col">
	<Header />
	<div class="p-6 grow">
		<slot />
	</div>
	<Footer />
</div>

<style lang="postcss">
	:global(html) {
		@apply h-full;
	}

	:global(body) {
		@apply bg-slate-950 text-white relative min-h-full h-1;
	}
</style>
