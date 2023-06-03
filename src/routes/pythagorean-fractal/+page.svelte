<script lang="ts">
	import Range from '$lib/components/Range.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import { PI_OVER_2, TWO_PI } from '$lib/math';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let maxDepth = 8;
	let angle = PI_OVER_2;

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

		let medianAngle = Math.PI - angle;

		const rotatePoint = (x: number, y: number, angle: number): [number, number] => {
			return [x * Math.cos(angle) - y * Math.sin(angle), x * Math.sin(angle) + y * Math.cos(angle)];
		};

		const drawThing = (posX: number, posY: number, angle: number, size: number, depth: number) => {
			ctx.save();
			ctx.translate(posX, posY);
			ctx.rotate(angle);
			ctx.fillRect(0, 0, size, size);
			ctx.restore();

			const pointX = Math.cos(medianAngle) * (size / 2);
			const pointY = Math.sin(medianAngle) * (size / 2);

			if (depth < maxDepth) {
				// Right square
				const angleChange = medianAngle / 2;
				const squareTopMiddle = rotatePoint(size / 2, size, angle);
				const netPoint = rotatePoint(pointX, pointY, angle);
				drawThing(
					posX + squareTopMiddle[0] + netPoint[0],
					posY + squareTopMiddle[1] + netPoint[1],
					angle - (PI_OVER_2 - angleChange),
					Math.sqrt((pointX - size / 2) ** 2 + pointY ** 2),
					depth + 1
				);

				// Left square
				const squareTopLeft = rotatePoint(0, size, angle);
				drawThing(
					posX + squareTopLeft[0],
					posY + squareTopLeft[1],
					angle + angleChange,
					Math.sqrt((pointX + size / 2) ** 2 + pointY ** 2),
					depth + 1
				);
			}
		};

		drawThing(canvas.width / 2 - 50, 0, 0, 100, 0);
	})();
</script>

<PageLayout title="Pythagorean Fractal">
	<canvas
		class="bg-gray-900 rounded max-w-full mx-auto"
		width="900"
		height="500"
		bind:this={canvas}
	/>

	<div class="text-center my-4 space-x-4">
		<label for="angle">
			Rotation:
			<Range bind:value={angle} min={0} max={Math.PI} step={0.01} />
		</label>
		<label for="max-depth">
			Max depth: <Range bind:value={maxDepth} min={1} max={10} step={1} />
		</label>
	</div>
</PageLayout>
