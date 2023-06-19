<script lang="ts">
	import { onMount } from 'svelte';
	import classNames from 'classnames';
	import { rotatePoint } from '$lib/math';
	import { identityMatrix, determinant } from './math';

	const UNIT_PIXELS = 62;

	let className = '';
	export let mat: number[];
	export { className as class };

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('Cannot get 2D context');
		ctx.transform(UNIT_PIXELS, 0, 0, -UNIT_PIXELS, 0.5 + canvas.width / 2, 0.5 + canvas.height / 2);
	});

	const transformPoint = (x: number, y: number, matrix: number[]): [number, number] => [
		x * matrix[0] + y * matrix[1],
		x * matrix[2] + y * matrix[3],
	];

	const hexColorWithOpacity = (color: string, opacity: number) => {
		return `#${color}${Math.floor(opacity).toString(16).padStart(2, '0')}`;
	};

	$: (() => {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		const drawTransformedLine = (
			fromX: number,
			fromY: number,
			toX: number,
			toY: number,
			mat: number[]
		) => {
			[fromX, fromY] = transformPoint(fromX, fromY, mat);
			[toX, toY] = transformPoint(toX, toY, mat);

			ctx.beginPath();
			ctx.moveTo(fromX, fromY);
			ctx.lineTo(toX, toY);
			ctx.stroke();
		};

		const drawTransformedArrowHeadFromOrigin = (
			x: number,
			y: number,
			size: number,
			mat: number[]
		) => {
			[x, y] = transformPoint(x, y, mat);
			const angleRadians = Math.atan2(y, x);

			const inclination = Math.PI / 8;
			let [aX, aY] = [size * -Math.cos(inclination), size * Math.sin(inclination)];
			const [bX, bY] = rotatePoint(aX, -aY, angleRadians);
			[aX, aY] = rotatePoint(aX, aY, angleRadians);

			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x + aX, y + aY);
			ctx.lineTo(x + bX, y + bY);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		};

		const drawGrid = (mat: number[], bg: boolean, opacity: number) => {
			ctx.lineCap = 'round';

			if (bg) {
				// Gray half-unit lines
				ctx.lineWidth = 0.025;
				ctx.strokeStyle = hexColorWithOpacity('ffffff', opacity * 0x90);
				for (let x = -EDGE_X + 0.5; x < EDGE_X; x++) {
					drawTransformedLine(x, -EDGE_Y, x, EDGE_Y, mat);
				}
				for (let y = -EDGE_Y + 0.5; y < EDGE_Y; y++) {
					drawTransformedLine(-EDGE_X, y, EDGE_X, y, mat);
				}
			}

			// Unit lines
			ctx.lineWidth = 0.03;
			ctx.strokeStyle = bg
				? hexColorWithOpacity('ffffff', opacity * 0xff)
				: hexColorWithOpacity('27cfdb', opacity * 0x80);
			for (let x = -SPAN_X; x <= SPAN_X; x++) {
				if (x === 0) continue;
				drawTransformedLine(x, -EDGE_Y, x, EDGE_Y, mat);
			}
			for (let y = -SPAN_Y; y <= SPAN_Y; y++) {
				if (y === 0) continue;
				drawTransformedLine(-EDGE_X, y, EDGE_X, y, mat);
			}

			// Axes
			ctx.lineWidth = 0.035;
			ctx.strokeStyle = hexColorWithOpacity('ffffff', opacity * 0xb0);
			drawTransformedLine(-EDGE_X, 0, EDGE_X, 0, mat);
			drawTransformedLine(0, -EDGE_Y, 0, EDGE_Y, mat);

			if (!bg) {
				// Square unit
				const color = determinant(mat) >= 0 ? 'fffb26' : 'ff73ff';
				const [iX, iY] = transformPoint(1, 0, mat);
				const [jX, jY] = transformPoint(0, 1, mat);
				const [ijX, ijY] = transformPoint(1, 1, mat);
				ctx.fillStyle = hexColorWithOpacity(color, opacity * 0x60);
				ctx.strokeStyle = hexColorWithOpacity(color, opacity * 0xa0);
				ctx.beginPath();
				ctx.moveTo(0, 0);
				ctx.lineTo(iX, iY);
				ctx.lineTo(ijX, ijY);
				ctx.lineTo(jX, jY);
				ctx.closePath();
				ctx.fill();
				ctx.stroke();

				ctx.strokeStyle = ctx.fillStyle = '#84ff80';
				drawTransformedLine(0, 0, iX, iY, identityMatrix());
				drawTransformedArrowHeadFromOrigin(1, 0, 0.25, mat);

				ctx.strokeStyle = ctx.fillStyle = '#ff544d';
				drawTransformedLine(0, 0, jX, jY, identityMatrix());
				drawTransformedArrowHeadFromOrigin(0, 1, 0.25, mat);
			}
		};

		const SPAN_X = 10;
		const SPAN_Y = 8;
		const EDGE_X = SPAN_X + 1;
		const EDGE_Y = SPAN_Y + 1;
		const CANVAS_WIDTH = Math.ceil(canvas.width / UNIT_PIXELS);
		const CANVAS_HEIGHT = Math.ceil(canvas.height / UNIT_PIXELS);

		ctx.clearRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);

		drawGrid(identityMatrix(), true, 0.25);
		drawGrid(mat, false, 1);
	})();
</script>

<canvas
	width="600"
	height="400"
	class={classNames(className, 'bg-black rounded-md max-w-full')}
	bind:this={canvas}
/>
