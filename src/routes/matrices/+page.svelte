<script lang="ts">
	import { browser } from '$app/environment';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import Canvas from './Canvas.svelte';
	import Description from './Description.svelte';
	import MatrixItem from './components/MatrixItem.svelte';
	import { identityMatrix, multiplyMatrices } from './math';
	import AnimationControls from './components/AnimationControls.svelte';
	import MatrixInfo from './components/MatrixInfo.svelte';
	import MatrixInput from './components/MatrixInput.svelte';
	import Katex from '$lib/components/Katex.svelte';
	import classNames from 'classnames';
	import { clamp } from '$lib/math';

	const ANIMATION_DURATION = 30;
	const MAX_MATRICES = 4;

	let matrices: number[][] = [];
	let startMatrix = identityMatrix();
	let endMatrix = identityMatrix();
	let currentMatrix = identityMatrix();
	let totalProductMatrix = identityMatrix();
	let animating = false;
	let animationTime = 0;
	let animationStage = 0;

	const addMatrix = (matrix: number[]) => {
		matrices = [matrix, ...matrices];
	};

	const deleteMatrix = (index: number) => {
		matrices = matrices.filter((_, i) => index !== i);
	};

	const handleMove = (direction: 'left' | 'right', index: number) => {
		const swapIndex = direction === 'left' ? index - 1 : index + 1;
		const newMatrices = matrices.map(mat => [...mat]);

		[newMatrices[index], newMatrices[swapIndex]] = [newMatrices[swapIndex], newMatrices[index]];
		matrices = newMatrices;
	};

	const smoothing = (t: number) => Math.sin((t * Math.PI) / 2) ** 2;

	const animate = () => {
		if (!browser) return;
		const progress = animationTime / ANIMATION_DURATION;

		currentMatrix = startMatrix.map((n, i) => n + (endMatrix[i] - n) * smoothing(progress));

		if (animationTime++ >= ANIMATION_DURATION) {
			animating = false;
		} else {
			requestAnimationFrame(animate);
		}
	};

	const setEndMatrix = (newEnd: number[]) => {
		startMatrix = currentMatrix;
		endMatrix = newEnd;
		animationTime = 0;

		if (!animating) {
			animating = true;
			animate();
		}
	};

	$: totalProductMatrix = matrices
		.slice(animationStage)
		.reduce((product, mat) => multiplyMatrices(product, mat), identityMatrix());
	$: setEndMatrix(totalProductMatrix);
	$: animationStage = clamp(animationStage, 0, matrices.length);
</script>

<PageLayout title="Matrices">
	<div
		class="my-16 flex flex-col lg:flex-row justify-evenly items-center lg:items-start space-y-6 lg:space-y-0"
	>
		<Canvas mat={currentMatrix} />
		<div class="space-y-6 w-[26rem] py-4">
			<MatrixInput
				disabled={matrices.length >= MAX_MATRICES}
				on:submit={e => addMatrix(e.detail.matrix)}
			/>
			<AnimationControls
				allowNext={animationStage > 0}
				allowPrevious={animationStage < matrices.length}
				on:next={() => animationStage--}
				on:previous={() => animationStage++}
			/>
			<ul class="flex flex-wrap items-center space-x-2">
				{#each matrices as mat, index}
					<MatrixItem
						selected={animationStage === index}
						bind:mat
						disableLeft={index === 0}
						disableRight={index === matrices.length - 1}
						on:move={e => handleMove(e.detail.direction, index)}
						on:delete={() => deleteMatrix(index)}
					/>
					<span class="text-2xl">&middot;</span>
				{/each}
				<span
					class={classNames('text-center text-3xl rounded transition-all duration-75')}
					class:text-yellow-400={animationStage === matrices.length}
				>
					<Katex math="I" />
				</span>
			</ul>
			<div class="text-center text-xl">
				<h2 class="text-2xl my-4">Product and determinant:</h2>
				<MatrixInfo matrix={totalProductMatrix} />
			</div>
		</div>
	</div>
	<Description />
</PageLayout>
