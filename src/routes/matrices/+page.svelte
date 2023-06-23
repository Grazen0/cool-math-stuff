<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import classNames from 'classnames';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import Katex from '$lib/components/Katex.svelte';
	import { clamp } from '$lib/math';
	import Canvas from './Canvas.svelte';
	import Description from './Description.svelte';
	import MatrixItem from './components/MatrixItem.svelte';
	import { identityMatrix, multiplyMatrices } from './math';
	import AnimationControls from './components/AnimationControls.svelte';
	import MatrixInfo from './components/MatrixInfo.svelte';
	import MatrixInput from './components/MatrixInput.svelte';

	const MAX_MATRICES = 4;

	const displayMatrix = tweened(identityMatrix(), {
		duration: 500,
		easing: cubicInOut,
	});

	let matrices: number[][] = [];
	let totalProductMatrix = identityMatrix();
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

	$: totalProductMatrix = matrices
		.slice(animationStage)
		.reduce((product, mat) => multiplyMatrices(product, mat), identityMatrix());
	$: displayMatrix.set(totalProductMatrix);
	$: animationStage = clamp(animationStage, 0, matrices.length);
</script>

<PageLayout title="Matrices">
	<div
		class="my-16 flex flex-col lg:flex-row justify-evenly items-center lg:items-start space-y-6 lg:space-y-0"
	>
		<Canvas mat={$displayMatrix} />
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
