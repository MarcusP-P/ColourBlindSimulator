export class MathUtilities {
	public static isZero(value: number): boolean {
		return Math.abs(value) < 1e-9;
	}

	public static degreesToGradient(degrees: number): number {
		if (degrees === 90) {
			return Number.POSITIVE_INFINITY;
		} else if (degrees === 270) {
			return Number.NEGATIVE_INFINITY;
		}
		return Math.tan(degrees * Math.PI / 180);
	}
}

