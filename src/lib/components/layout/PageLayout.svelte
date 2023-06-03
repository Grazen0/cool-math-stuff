<script lang="ts">
	import { WEBSITE_NAME } from '$lib/constants';

	export let title: string;

	$: displayTitle = title ? `${title} · ${WEBSITE_NAME}` : WEBSITE_NAME;
</script>

<svelte:head>
	<title>{displayTitle}</title>
</svelte:head>

<h1 class="text-center text-4xl my-8 font-semibold">{title}</h1>
<slot />
