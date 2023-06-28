export const PI_OVER_2 = Math.PI / 2;
export const TWO_PI = Math.PI * 2;

export const gcd = (a: number, b: number): number => {
	if (!b) return a;
	return gcd(b, a % b);
};

export const lcm = (a: number, b: number): number => {
	const divisor = gcd(a, b);
	return (a * b) / divisor;
};

export const rotatePoint = (x: number, y: number, angleRadians: number): [number, number] => {
	const sin = Math.sin(angleRadians);
	const cos = Math.cos(angleRadians);
	return [x * cos - y * sin, x * sin + y * cos];
};

export const clamp = (num: number, min: number, max: number) => Math.min(max, Math.max(min, num));
