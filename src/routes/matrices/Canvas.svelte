<script lang="ts">
	import { onMount } from 'svelte';
	import classNames from 'classnames';
	import { rotatePoint } from '$lib/math';
	import { determinant } from './math';

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

	const drawTransformedLine = (
		ctx: CanvasRenderingContext2D,
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
		ctx: CanvasRenderingContext2D,
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

	$: det = determinant(mat);

	$: (() => {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		const SPAN_X = 8;
		const SPAN_Y = 6;
		const EDGE_X = SPAN_X + 1;
		const EDGE_Y = SPAN_Y + 1;
		const CANVAS_WIDTH = Math.ceil(canvas.width / UNIT_PIXELS);
		const CANVAS_HEIGHT = Math.ceil(canvas.height / UNIT_PIXELS);

		ctx.clearRect(-CANVAS_WIDTH / 2, -CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT);
		ctx.lineCap = 'round';

		// BACKGROUND -------------------------------------

		// Half-unit lines
		ctx.lineWidth = 0.025;
		ctx.strokeStyle = '#ffffff24';
		for (let x = -EDGE_X + 0.5; x < EDGE_X; x++) {
			ctx.beginPath();
			ctx.moveTo(x, -EDGE_Y);
			ctx.lineTo(x, EDGE_Y);
			ctx.stroke();
		}
		for (let y = -EDGE_Y + 0.5; y < EDGE_Y; y++) {
			ctx.beginPath();
			ctx.moveTo(-EDGE_X, y);
			ctx.lineTo(EDGE_X, y);
			ctx.stroke();
		}

		// Unit lines
		ctx.lineWidth = 0.03;
		ctx.strokeStyle = '#ffffff3f';
		for (let x = -SPAN_X; x <= SPAN_X; x++) {
			ctx.beginPath();
			ctx.moveTo(x, -EDGE_Y);
			ctx.lineTo(x, EDGE_Y);
			ctx.stroke();
		}
		for (let y = -SPAN_Y; y <= SPAN_Y; y++) {
			ctx.beginPath();
			ctx.moveTo(-EDGE_X, y);
			ctx.lineTo(EDGE_X, y);
			ctx.stroke();
		}

		// FOREGROUND ---------------------------

		// Unit lines
		ctx.strokeStyle = '#27cfdb80';
		let [sx, sy] = transformPoint(-SPAN_X, -EDGE_Y, mat);
		let [ex, ey] = transformPoint(-SPAN_X, EDGE_Y, mat);
		for (let i = -SPAN_X; i <= SPAN_X + 1; i++) {
			if (i === 0) continue;
			ctx.beginPath();
			ctx.moveTo(sx, sy);
			ctx.lineTo(ex, ey);
			ctx.stroke();

			sx += mat[0];
			ex += mat[0];
			sy += mat[2];
			ey += mat[2];
		}

		[sx, sy] = transformPoint(-EDGE_X, -SPAN_Y, mat);
		[ex, ey] = transformPoint(EDGE_X, -SPAN_Y, mat);
		for (let i = -SPAN_Y; i <= SPAN_Y + 1; i++) {
			if (i === 0) continue;
			ctx.beginPath();
			ctx.moveTo(sx, sy);
			ctx.lineTo(ex, ey);
			ctx.stroke();

			sx += mat[1];
			ex += mat[1];
			sy += mat[3];
			ey += mat[3];
		}

		// Axes
		ctx.lineWidth = 0.035;
		ctx.strokeStyle = '#ffffffb0';
		drawTransformedLine(ctx, -EDGE_X, 0, EDGE_X, 0, mat);
		drawTransformedLine(ctx, 0, -EDGE_Y, 0, EDGE_Y, mat);

		// Square unit
		const color = det >= 0 ? 'fffb26' : 'ff73ff';
		const [iX, iY] = [mat[0], mat[2]];
		const [jX, jY] = [mat[1], mat[3]];
		const [ijX, ijY] = [mat[0] + mat[1], mat[2] + mat[3]];
		ctx.fillStyle = `#${color}60`;
		ctx.strokeStyle = `#${color}a0`;
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(iX, iY);
		ctx.lineTo(ijX, ijY);
		ctx.lineTo(jX, jY);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// i arrow
		ctx.strokeStyle = ctx.fillStyle = '#84ff80';
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(iX, iY);
		ctx.stroke();
		drawTransformedArrowHeadFromOrigin(ctx, 1, 0, 0.25, mat);

		// j arrow
		ctx.strokeStyle = ctx.fillStyle = '#ff544d';
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.lineTo(jX, jY);
		ctx.stroke();
		drawTransformedArrowHeadFromOrigin(ctx, 0, 1, 0.25, mat);
	})();
</script>

<canvas
	width="600"
	height="400"
	class={classNames(className, 'bg-black rounded-md max-w-full')}
	bind:this={canvas}
/>
