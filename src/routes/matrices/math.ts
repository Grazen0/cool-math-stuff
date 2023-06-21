export const identityMatrix = () => [1, 0, 0, 1];

export const determinant = (mat: number[]) => mat[0] * mat[3] - mat[1] * mat[2];

export const multiplyMatrices = (a: number[], b: number[]) => [
	a[0] * b[0] + a[1] * b[2],
	a[0] * b[1] + a[1] * b[3],
	a[2] * b[0] + a[3] * b[2],
	a[2] * b[1] + a[3] * b[3],
];

const formatRoundedNumber = (num: number, decimalPlaces = 2): string => {
	if (Number.isInteger(num)) return num.toString();

	const str = num.toString();
	const pointIndex = str.indexOf('.');
	const decimals = str.length - pointIndex - 1;
	if (decimals > decimalPlaces) {
		return str.substring(0, pointIndex + decimalPlaces + 1) + '...';
	}

	return str;
};

export const latexMatrix = (mat: number[]) => {
	const formatted = mat.map(n => formatRoundedNumber(n));
	return `
	\\begin{bmatrix}
	${formatted[0]} & ${formatted[1]} \\\\
	${formatted[2]} & ${formatted[3]}
	\\end{bmatrix}
	`;
};
