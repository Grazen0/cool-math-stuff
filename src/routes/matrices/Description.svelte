<script lang="ts">
	import Katex from '$lib/components/Katex.svelte';
</script>

<article class="text-center text-lg space-y-4 max-w-3xl mx-auto my-8">
	<p>...</p>
	<br />
	<p>
		In linear algebra, a matrix can represent what is called a <strong>linear transformation</strong
		>.
	</p>
	<p>When working in 2 dimensions, a 2x2 matrix means a nice way to pack two coordinates:</p>
	<p>
		<Katex
			math={'A = \\begin{bmatrix} \\color{lime}a & \\color{red}b \\\\ \\color{lime}c & \\color{red}d \\end{bmatrix}'}
		/>
	</p>
	<p>
		When this matrix <Katex math="A" /> is applied as a transformation, the basis vectors <Katex
			math={'\\color{lime}\\hat{i}'}
		/> and <Katex math={'\\color{red}\\hat{j}'} /> are moved to <Katex
			math={'\\begin{bmatrix} \\color{lime}a \\\\ \\color{lime}c \\end{bmatrix}'}
		/> and <Katex math={'\\begin{bmatrix} \\color{red}b \\\\ \\color{red}d \\end{bmatrix}'} /> respectively,
		transforming all space alongside them.
	</p>
	<p>When matrices are multiplied together, the effects of their transformations are composed.</p>
	<p>
		The <strong>determinant</strong> of this matrix (denoted as <Katex math="|A|" />) tells the area
		of a square unit in the resulting transformed space.
	</p>
	<br />
	<p>...</p>
	<br />
	<div
		class="w-auto inline-block font-mono bg-black rounded-lg text-green-500 p-3 leading-relaxed animate-hover shadow-md shadow-black [text-shadow:theme(colors.green.500)_0_0_3px]"
	>
		<p>
			"Unfortunately, no one can be told what the <b>Matrix</b> is. <br /> You have to see it for yourself."
		</p>
		<p class="text-right">—Morpheus</p>
	</div>
</article>
