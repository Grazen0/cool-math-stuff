<script lang="ts">
	import { PI_OVER_2, TWO_PI } from '$lib/math';
	import type { Colors } from './types';

	export let colors: Colors;
	export let angle: number;
	export let sin: boolean;
	export let cos: boolean;
	export let tan: boolean;
	export let sec: boolean;
	export let csc: boolean;
	export let cot: boolean;
	export let showLabels: boolean;

	let canvas: HTMLCanvasElement;

	$: (() => {
		const UNIT = 120;
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;

		const { width, height } = ctx.canvas;
		const midX = width / 2;
		const midY = height / 2;

		const pointX = UNIT * Math.cos(angle);
		const pointY = UNIT * Math.sin(angle);
		const tanPointX = -pointY / Math.tan(angle - PI_OVER_2) + pointX;
		const tanPointY = Math.tan(angle + PI_OVER_2) * -pointX + pointY;

		let altTanPointX = UNIT;
		let altTanPointY = Math.tan(angle) * UNIT;
		if (angle > PI_OVER_2 && angle < Math.PI + PI_OVER_2) {
			altTanPointY *= -1;
			altTanPointX *= -1;
		}

		ctx.clearRect(0, 0, width, height);

		ctx.lineCap = 'round';

		if (angle > 0) {
			ctx.lineWidth = 0;
			ctx.fillStyle = 'brown';
			ctx.beginPath();
			ctx.arc(midX, midY, 20, 0, TWO_PI - angle + 0.001, true);
			ctx.lineTo(midX, midY);
			ctx.fill();
		}

		ctx.lineWidth = 2;

		// X and Y axes
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
		ctx.beginPath();
		ctx.moveTo(0, midY);
		ctx.lineTo(width, midY);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(midX, 0);
		ctx.lineTo(midX, height);
		ctx.stroke();

		// Unit circle
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.arc(midX, midY, UNIT, 0, Math.PI * 2);
		ctx.stroke();

		// Radius
		ctx.beginPath();
		ctx.moveTo(midX, midY);
		ctx.lineTo(midX + pointX, midY - pointY);
		ctx.stroke();

		const textSpacing = 14;
		const isUpperHalf = angle < Math.PI;
		const isRightHalf = angle < PI_OVER_2 || angle > 3 * PI_OVER_2;
		const isEvenQuadrant = angle % Math.PI < PI_OVER_2;

		if (showLabels) {
			const unitSpacingAngle = isEvenQuadrant ? angle - PI_OVER_2 : angle + PI_OVER_2;
			ctx.fillStyle = 'white';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.font = '20px Times New Roman';
			ctx.fillText(
				'1',
				midX + pointX / 2 + textSpacing * Math.cos(unitSpacingAngle),
				midY - pointY / 2 - textSpacing * Math.sin(unitSpacingAngle)
			);
		}

		ctx.font = '20px Times New Roman';

		if (sin) {
			ctx.strokeStyle = ctx.fillStyle = colors.sin;
			ctx.beginPath();
			ctx.moveTo(midX + pointX, midY - pointY);
			ctx.lineTo(midX + pointX, midY);
			ctx.stroke();

			if (showLabels) {
				ctx.save();
				ctx.translate(midX + pointX, midY - pointY / 2);
				ctx.rotate(!isRightHalf ? -PI_OVER_2 : PI_OVER_2);
				ctx.fillText('sin', 0, -textSpacing);
				ctx.restore();
			}
		}

		if (cos) {
			ctx.strokeStyle = ctx.fillStyle = colors.cos;
			ctx.beginPath();
			ctx.moveTo(midX + pointX, midY - pointY);
			ctx.lineTo(midX, midY - pointY);
			ctx.stroke();

			if (showLabels) {
				ctx.fillText('cos', midX + pointX / 2, midY - pointY - textSpacing);
			}
		}

		const drawTanAndSec = () => {
			if (angle !== PI_OVER_2 && angle !== 3 * PI_OVER_2) {
				if (tan) {
					ctx.strokeStyle = ctx.fillStyle = colors.tan;

					// I actually had to grab a paper and do some math for this shit
					ctx.beginPath();
					ctx.moveTo(midX + pointX, midY - pointY);
					ctx.lineTo(midX + tanPointX, midY);
					ctx.stroke();

					if (showLabels) {
						ctx.save();
						ctx.translate(midX + pointX + (tanPointX - pointX) / 2, midY - pointY / 2);

						if (angle < Math.PI) {
							ctx.rotate(PI_OVER_2 - angle);
							ctx.fillText('tan', 0, -textSpacing);
						} else {
							ctx.rotate(-angle - PI_OVER_2);
							ctx.fillText('tan', 0, textSpacing);
						}

						ctx.restore();
					}
				}

				if (sec) {
					ctx.strokeStyle = ctx.fillStyle = colors.sec;

					ctx.beginPath();
					ctx.moveTo(midX, midY);
					ctx.lineTo(midX + tanPointX, midY);
					ctx.stroke();

					if (showLabels) {
						ctx.fillText(
							'sec',
							midX + tanPointX / 2,
							isUpperHalf ? midY + textSpacing : midY - textSpacing
						);
					}
				}
			}
		};

		const drawCotAndCsc = () => {
			if (angle % Math.PI !== 0) {
				const cotY = angle < Math.PI ? UNIT : -UNIT;
				const cotX = Math.tan(PI_OVER_2 - angle) * cotY;

				if (csc) {
					ctx.strokeStyle = ctx.fillStyle = colors.csc;

					ctx.beginPath();
					ctx.moveTo(midX, midY);
					ctx.lineTo(midX, midY - tanPointY);
					ctx.stroke();

					if (showLabels) {
						ctx.save();
						ctx.translate(midX, midY - tanPointY / 2);
						ctx.rotate(angle > PI_OVER_2 && angle < 3 * PI_OVER_2 ? PI_OVER_2 : -PI_OVER_2);
						ctx.fillText('csc', 0, -textSpacing);
						ctx.restore();
					}
				}

				if (cot) {
					ctx.strokeStyle = ctx.fillStyle = colors.cot;
					ctx.beginPath();
					ctx.moveTo(midX + pointX, midY - pointY);
					ctx.lineTo(midX, midY - tanPointY);
					ctx.stroke();

					if (showLabels) {
						ctx.save();
						ctx.translate(midX + pointX / 2, midY - pointY - (tanPointY - pointY) / 2);

						if (angle < Math.PI) {
							ctx.rotate(PI_OVER_2 - angle);
							ctx.fillText('cot', 0, -textSpacing);
						} else {
							ctx.rotate(-angle - PI_OVER_2);
							ctx.fillText('cot', 0, textSpacing);
						}

						ctx.restore();
					}
				}
			}
		};

		drawTanAndSec();
		drawCotAndCsc();
	})();
</script>

<canvas class="bg-gray-900 rounded max-w-full" width="600" height="400" bind:this={canvas} />
