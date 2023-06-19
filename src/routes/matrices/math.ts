export const identityMatrix = () => [1, 0, 0, 1];

export const determinant = (mat: number[]) => mat[0] * mat[3] - mat[1] * mat[2];

export const multiplyMatrices = (a: number[], b: number[]) => [
	a[0] * b[0] + a[1] * b[2],
	a[0] * b[1] + a[1] * b[3],
	a[2] * b[0] + a[3] * b[2],
	a[2] * b[1] + a[3] * b[3],
];
