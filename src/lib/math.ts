export const PI_OVER_2 = Math.PI / 2;
export const TWO_PI = Math.PI * 2;

export const gcd = (a: number, b: number): number => {
	if (!b) return a;
	return gcd(b, a % b);
};

export const rotatePoint = (x: number, y: number, angleRadians: number): [number, number] => {
	const sin = Math.sin(angleRadians);
	const cos = Math.cos(angleRadians);
	return [x * cos - y * sin, x * sin + y * cos];
};
