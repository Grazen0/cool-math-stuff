<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/components/Button.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Katex from '$lib/components/Katex.svelte';
	import PageLayout from '$lib/components/layout/PageLayout.svelte';
	import Canvas from './Canvas.svelte';
	import Description from './Description.svelte';
	import MatrixDiv from './components/MatrixDiv.svelte';
	import MatrixItem from './components/MatrixItem.svelte';
	import { identityMatrix, determinant, multiplyMatrices } from './math';

	let matrices: { id: number; mat: number[] }[] = [];
	let inputMat: number[] = [1, 0, 0, 1];
	let animating = false;
	let oldMatrix = identityMatrix();
	let targetMatrix = identityMatrix();
	let displayMatrix = identityMatrix();
	let productMatrix = identityMatrix();
	let animationTime = 0;
	let ANIMATION_DURATION = 30;

	onMount(() => {});

	const addMatrix = () => {
		if ((inputMat as (number | null)[]).includes(null)) {
			alert('Some numbers in the matrix are invalid');
			return;
		}

		matrices = [{ id: Date.now(), mat: [...(inputMat as any)] }, ...matrices];
		inputMat = identityMatrix();
	};

	const deleteMatrix = (id: number) => {
		matrices = matrices.filter(matInfo => matInfo.id !== id);
	};

	const handleMove = (direction: 'left' | 'right', index: number) => {
		const swapIndex = direction === 'left' ? index - 1 : index + 1;
		const newMatrices = matrices.map(matInfo => ({
			id: matInfo.id,
			mat: [...matInfo.mat],
		}));

		[newMatrices[index], newMatrices[swapIndex]] = [newMatrices[swapIndex], newMatrices[index]];
		matrices = newMatrices;
	};

	const smoothing = (t: number) => Math.sin((t * Math.PI) / 2) ** 2;

	const animate = () => {
		if (!browser) return;
		const progress = animationTime / ANIMATION_DURATION;

		displayMatrix = oldMatrix.map((n, i) => n + (targetMatrix[i] - n) * smoothing(progress));

		if (animationTime++ >= ANIMATION_DURATION) {
			animating = false;
		} else {
			requestAnimationFrame(animate);
		}
	};

	const setTargetMatrix = (newTarget: number[]) => {
		oldMatrix = displayMatrix;
		targetMatrix = newTarget;
		animationTime = 0;

		if (!animating) {
			animating = true;
			animate();
		}
	};

	$: matricesFull = matrices.length >= 8;
	$: productMatrix = matrices.reduce(
		(product, matInfo) => multiplyMatrices(product, matInfo.mat),
		identityMatrix()
	);
	$: setTargetMatrix(productMatrix);
</script>

<PageLayout title="Matrices">
	<div
		class="my-16 flex flex-col lg:flex-row justify-evenly items-center lg:items-start space-y-6 lg:space-y-0"
	>
		<Canvas mat={displayMatrix} />
		<div class="space-y-6 w-[26rem] py-4">
			<div class="flex flex-row items-center space-x-6 mx-auto w-fit">
				<MatrixDiv class={matricesFull ? 'brightness-75' : ''}>
					{#each inputMat as _, index}
						<NumberInput
							bind:value={inputMat[index]}
							disabled={matricesFull}
							placeholder="0"
							class="text-center text-xl disabled:brightness-100 spin-button-none"
						/>
					{/each}
				</MatrixDiv>
				<Button on:click={addMatrix} disabled={matricesFull}>
					{#if !matricesFull}
						Add matrix
					{:else}
						Full!
					{/if}
				</Button>
			</div>
			{#if matrices.length > 0}
				<ul class="flex flex-wrap items-center">
					{#each matrices as matInfo, i (matInfo.id)}
						{#if i !== 0}
							<span class="text-2xl">&middot;</span>
						{/if}
						<MatrixItem
							mat={matInfo.mat}
							disableLeft={i === 0}
							disableRight={i === matrices.length - 1}
							on:move={e => handleMove(e.detail.direction, i)}
							on:delete={() => deleteMatrix(matInfo.id)}
						/>
					{/each}
				</ul>
			{:else}
				<p class="text-slate-600 text-center py-12">(Empty)</p>
			{/if}
			<div class="text-center text-xl">
				<h2 class="text-2xl my-4">Product and determinant:</h2>
				<Katex
					math={`
				\\begin{aligned}
				M &= \\begin{bmatrix} 
				${productMatrix[0]} & ${productMatrix[1]} \\\\ 
				${productMatrix[2]} & ${productMatrix[3]} 
				\\end{bmatrix} \\\\ 
				|M| &= ${determinant(productMatrix)} 
				\\end{aligned}
				`}
				/>
			</div>
		</div>
	</div>
	<Description />
</PageLayout>
