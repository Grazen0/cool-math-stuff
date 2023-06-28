<script lang="ts">
	import { page } from '$app/stores';
	import classNames from 'classnames';
	import { WEBSITE_NAME } from '$lib/constants';
	import { withBaseUrl } from '$lib/routing';

	const links = [
		{
			path: withBaseUrl('/trig-visualized'),
			label: 'Trig Visualized',
		},
		{
			path: withBaseUrl('/pythagorean-fractal'),
			label: 'Pythagorean Fractal',
		},
		{
			path: withBaseUrl('/matrices'),
			label: 'Matrices',
		},
		{
			path: withBaseUrl('/equation-systems'),
			label: 'Equation Systems',
		},
	];
</script>

<header class="bg-slate-900 p-3 flex flex-row items-center text-lg">
	<a href={withBaseUrl('/')} class="font-semibold text-3xl px-4">{WEBSITE_NAME}</a>
	<nav>
		<ul class="inline-flex flex-row space-x-4 mx-6">
			{#each links as link}
				<li
					class={classNames(
						'transition-all duration-100',
						$page.url.pathname === link.path
							? 'underline'
							: 'opacity-70 hover:opacity-90 active:opacity-100'
					)}
				>
					<a href={link.path}>{link.label}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>
