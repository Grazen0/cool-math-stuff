<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Katex from '$lib/components/Katex.svelte';
	import ToggleButton from '$lib/components/ToggleButton.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import Canvas from './Canvas.svelte';
	import type { Colors } from './types';

	const colors: Colors = {
		sin: 'steelblue',
		cos: 'firebrick',
		tan: 'gold',
		sec: 'springgreen',
		csc: 'deeppink',
		cot: 'chocolate',
	};

	let angle = 30 + Math.floor(Math.random() * 30);
	let sin = true;
	let cos = true;
	let tan = true;
	let sec = false;
	let csc = false;
	let cot = false;
	let showLabels = true;

	let animating = false;

	const toggleAnimation = () => {
		animating = !animating;
	};

	const animationFrame = () => {
		angle = (angle + 1) % 360;
		if (animating) requestAnimationFrame(animationFrame);
	};

	$: angleRadians = (angle / 180) * Math.PI;

	$: if (animating) {
		requestAnimationFrame(animationFrame);
	}
</script>

<PageLayout title="Trigonometry Visualized">
	<div class="flex flex-col lg:flex-row justify-center items-center lg:space-x-12 my-20">
		<Canvas angle={angleRadians} {sin} {cos} {tan} {sec} {csc} {cot} {showLabels} {colors} />
		<div class="my-12 text-center">
			<div class="text-center my-4 select-none">
				<div class="text-xl">
					<Katex math="\theta={angle}\degree" />
				</div>
				<div class="flex flex-row items-center my-2 w-full space-x-2">
					<Katex math="0\degree" />
					<input
						name="angle"
						type="range"
						min="0"
						max="360"
						step="1"
						bind:value={angle}
						disabled={animating}
						class="grow outline-none appearance-none bg-transparent h-3 border-2 border-gray-700 rounded-full slider-thumb:appearance-none slider-thumb:cursor-pointer slider-thumb:rounded-full slider-thumb:border-gray-700 slider-thumb:bg-gray-300 slider-thumb:w-5 slider-thumb:h-5 slider-thumb:border-2 disabled:opacity-50 slider-thumb:disabled:cursor-default"
					/>
					<Katex math="360\degree" />
				</div>
				<ToggleButton bind:toggled={animating} large>Animate</ToggleButton>
			</div>

			<div class="grid grid-cols-3">
				<ToggleButton bind:toggled={sin} color={colors.sin}>Sine</ToggleButton>
				<ToggleButton bind:toggled={cos} color={colors.cos}>Cosine</ToggleButton>
				<ToggleButton bind:toggled={tan} color={colors.tan}>Tangent</ToggleButton>
				<ToggleButton bind:toggled={sec} color={colors.sec}>Secant</ToggleButton>
				<ToggleButton bind:toggled={csc} color={colors.csc}>Cosecant</ToggleButton>
				<ToggleButton bind:toggled={cot} color={colors.cot}>Cotangent</ToggleButton>
			</div>
			<br />
			<Checkbox bind:checked={showLabels}>Show labels</Checkbox>
		</div>
	</div>
</PageLayout>
