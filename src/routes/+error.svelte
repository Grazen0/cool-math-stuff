<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1 class="text-4xl text-center mt-24">
	{$page.status === 404 ? '404 - Page not found' : 'Something went wrong :('}
</h1>
