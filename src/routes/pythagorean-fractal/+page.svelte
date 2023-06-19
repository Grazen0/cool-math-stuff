<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Range from '$lib/components/Range.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import { PI_OVER_2 } from '$lib/math';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let depth = 8;
	let angle = 90;
	let showColors = false;

	onMount(() => {
		// Turn Y coordinates upside down
		// Move origin to bottom middle
		const ctx = canvas.getContext('2d');
		ctx?.transform(1, 0, 0, -1, 0, canvas.height);
	});

	$: (() => {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = 'white';

		let medianAngle = Math.PI - (angle / 180) * Math.PI;

		const rotatePoint = (x: number, y: number, angle: number): [number, number] => {
			return [x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle)];
		};

		const drawThing = (
			posX: number,
			posY: number,
			angle: number,
			size: number,
			currentDepth: number
		) => {
			ctx.save();
			ctx.translate(posX, posY);
			ctx.rotate(angle);
			const hue = (currentDepth / depth) * 270;
			if (showColors) ctx.fillStyle = `hsl(${hue},100%,60%)`;
			ctx.fillRect(0, 0, size, size);
			ctx.restore();

			const pointX = Math.cos(medianAngle) * (size / 2);
			const pointY = Math.sin(medianAngle) * (size / 2);

			if (currentDepth < depth) {
				// Right square
				const angleChange = medianAngle / 2;
				const squareTopMiddle = rotatePoint(size / 2, size, angle);
				const netPoint = rotatePoint(pointX, pointY, angle);
				drawThing(
					posX + squareTopMiddle[0] + netPoint[0],
					posY + squareTopMiddle[1] + netPoint[1],
					angle - (PI_OVER_2 - angleChange),
					Math.sqrt((pointX - size / 2) ** 2 + pointY ** 2),
					currentDepth + 1
				);

				// Left square
				const squareTopLeft = rotatePoint(0, size, angle);
				drawThing(
					posX + squareTopLeft[0],
					posY + squareTopLeft[1],
					angle + angleChange,
					Math.sqrt((pointX + size / 2) ** 2 + pointY ** 2),
					currentDepth + 1
				);
			}
		};

		ctx.fillStyle = 'white';
		drawThing(canvas.width / 2 - 50, 0, 0, 100, 0);
	})();
</script>

<PageLayout title="Pythagorean Fractal">
	<div class="my-12">
		<canvas
			class="bg-slate-900 rounded max-w-full mx-auto"
			width="900"
			height="500"
			bind:this={canvas}
		/>
	</div>

	<div class="max-w-full w-96 sm:w-[26rem] mx-auto text-center text-md sm:text-lg">
		<div class="text-right my-4 grid grid-cols-4 gap-x-4 gap-y-2 items-center">
			<label for="angle"> Rotation: </label>
			<Range bind:value={angle} min={0} max={180} step={1} class="col-span-2" />
			<span class="text-left">{angle}°</span>
			<label for="max-depth">Depth: </label>
			<Range bind:value={depth} min={1} max={15} step={1} class="col-span-2" />
			<span class="text-left">{depth}</span>
		</div>
		<Checkbox bind:checked={showColors}>Show colors</Checkbox>
	</div>
</PageLayout>
