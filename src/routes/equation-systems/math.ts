import { gcd } from '$lib/math';

export const LETTERS = ['x', 'y', 'z', 'w', 'v'];

export class Fraction {
	private _numerator: number;
	private _denominator: number;

	public constructor(numerator: number, denominator: number) {
		this._numerator = numerator;
		this._denominator = denominator;
	}

	public static fromDecimal(decimal: number) {
		let num = decimal;
		let den = 1;

		while (!Number.isInteger(num)) {
			num *= 10;
			den *= 10;
		}

		return new Fraction(num, den);
	}

	public add(addend: Fraction) {
		this._numerator *= addend.denominator;
		this._numerator += addend.numerator * this._denominator;
		this._denominator *= addend.denominator;
		this.simplify();
		return this;
	}

	public subtract(sustraend: Fraction) {
		this._numerator *= sustraend.denominator;
		this._numerator -= sustraend.numerator * this._denominator;
		this._denominator *= sustraend.denominator;
		this.simplify();
		return this;
	}

	public multiply(factor: number): this;
	public multiply(factor: Fraction): this;
	public multiply(factor: Fraction | number) {
		if (typeof factor === 'number') {
			this._numerator *= factor;
		} else {
			this._numerator *= factor._numerator;
			this._denominator *= factor._denominator;
		}
		this.simplify();
		return this;
	}

	public divideBy(divisor: number): this;
	public divideBy(divisor: Fraction): this;
	public divideBy(divisor: Fraction | number) {
		if (typeof divisor === 'number') {
			this._numerator *= divisor;
		} else {
			this._numerator *= divisor._denominator;
			this._denominator *= divisor._numerator;
		}
		this.simplify();
		return this;
	}

	public simplify() {
		const divisor = gcd(this._numerator, this._denominator);
		this._numerator /= divisor;
		this._denominator /= divisor;

		if (this._denominator < 0) {
			this._numerator *= -1;
			this._denominator *= -1;
		}

		return this;
	}

	public compare(otherNumber: number): number {
		const equivalent = otherNumber * this._denominator;
		return Math.sign(this._numerator - equivalent);
	}

	public isZero() {
		return this._numerator === 0;
	}

	public value() {
		return this._numerator / this._denominator;
	}

	public sign() {
		return Math.sign(this._numerator);
	}

	public abs() {
		this._numerator = Math.abs(this._numerator);
		return this;
	}

	public clone() {
		return new Fraction(this._numerator, this._denominator);
	}

	public get numerator() {
		return this._numerator;
	}

	public get denominator() {
		return this._denominator;
	}

	public toString() {
		return `${this._numerator} / ${this._denominator}`;
	}

	public latex() {
		if (this._numerator === 0) return '0';
		if (this._denominator === 1) return this._numerator.toString();

		return `${this._numerator < 0 ? '-' : ''}\\frac{${Math.abs(this._numerator)}}{${
			this._denominator
		}}`;
	}
}

export const gaussJordan = (matrix: Fraction[][]) => {
	const rows = matrix.length;
	const columns = matrix[0].length;

	let h = 0;
	let k = 0;

	// gauss
	while (h < rows && k < columns) {
		let pivotRow = h;
		for (let i = h + 1; i < rows; i++) {
			if (matrix[i][k].compare(pivotRow) > 0) {
				// greater than pivotRow
				pivotRow = i;
			}
		}

		if (matrix[pivotRow][k].isZero()) {
			k++;
			continue;
		}

		[matrix[h], matrix[pivotRow]] = [matrix[pivotRow], matrix[h]];

		for (let i = h + 1; i < rows; i++) {
			const factor = matrix[i][k].divideBy(matrix[h][k]);
			matrix[i][k] = new Fraction(0, 1);

			for (let j = k + 1; j < columns; j++) {
				matrix[i][j].subtract(matrix[h][j].clone().multiply(factor));
			}
		}

		h++;
		k++;
	}

	h--;
	k--;

	// Jordan
	while (h > 0) {
		for (let i = h - 1; i >= 0; i--) {
			const factor = matrix[i][k].divideBy(matrix[h][k]);
			matrix[i][k] = new Fraction(0, 1);

			for (let j = k + 1; j < columns; j++) {
				matrix[i][j].subtract(matrix[h][j].clone().multiply(factor));
			}
		}

		h--;
		k--;
	}
};
