export class MathUtilities {
	public static isZero (value :number) :boolean {
		return Math.abs(value)<1e-9;
	}
}