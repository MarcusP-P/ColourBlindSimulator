import { ColourSpaceConversion } from "./IColourSpaceConversion"
import { Matrix } from "../Maths/Matrix"
import "../Maths/MathExtensions"

// This uses the transformations from:
// * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// * http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
// * http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_RGB.html

export class CIELUVColourspace implements ColourSpaceConversion {

    ToXYZ?: Matrix;
    FromXYZ?: Matrix;

    PreToXYZ?: (source: Matrix) => Matrix;
    PostFromXYZ?: (source: Matrix) => Matrix;

    constructor() {
        this.PreToXYZ = (source: Matrix) => {
            return this.PreToXYZConversion(source);
        }

        this.PostFromXYZ = (source: Matrix) => {
            return this.PostFromXYZConversion(source);
        }
    }

    // Implement http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_Luv.html
    // Whitepoints are for D65 from http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    PreToXYZConversion(initial: Matrix): Matrix {
        const result = new Matrix(3, 1);

        const L = initial.GetValue(0, 0);
        const u = initial.GetValue(1, 0)
        const v = initial.GetValue(2, 0)

        const Xr = 0.95047;
        const Yr = 1.00000;
        const Zr = 1.08883;

        const u0 = Math.roundToPrecision(4 * Xr / (Xr + 15 * Yr + 3 * Zr), 15);
        const v0 = Math.roundToPrecision(9 * Yr / (Xr + 15 * Yr + 3 * Zr), 15);

        const e = Math.roundToPrecision(216 / 24389, 15);
        const k = Math.roundToPrecision(24389 / 27, 15);
        const ke = Math.roundToPrecision(k * e, 15);

        let Y: number;
        if (L > ke) {
            Y = Math.roundToPrecision(Math.pow(((L + 16) / 116), 3), 15);
        } else {
            Y = Math.roundToPrecision(L / k, 15);
        }

        const a = Math.roundToPrecision(1 / 3 * ((52 * L / (u + 13 * L * u0)) - 1), 15);
        const b = Math.roundToPrecision(-5 * Y, 15);
        const c = Math.roundToPrecision(-1 / 3, 15);
        const d = Math.roundToPrecision(Y * (39 * L / (v + 13 * L * v0) - 5), 15);

        const X = Math.roundToPrecision((d-b)/(a-c), 15);
        const Z = Math.roundToPrecision(X*a+b, 15);

        result.SetArray([[X], [Y], [Z]]);

        return result;
    }

    PostFromXYZConversion(initial: Matrix): Matrix {
        const result = new Matrix(3, 1);

        const X = initial.GetValue(0, 0);
        const Y = initial.GetValue(1, 0)
        const Z = initial.GetValue(2, 0)

        const Xr = 0.95047;
        const Yr = 1.00000;
        const Zr = 1.08883;

        const yr = Y / Yr;
        const uPrime = Math.roundToPrecision(4 * X / (X + 15 * Y + 3 * Z), 15);
        const vPrime = Math.roundToPrecision(9 * Y / (X + 15 * Y + 3 * Z), 15);

        const urPrime = Math.roundToPrecision(4 * Xr / (Xr + 15 * Yr + 3 * Zr), 15);
        const vrPrime = Math.roundToPrecision(9 * Yr / (Xr + 15 * Yr + 3 * Zr), 15);

        const e = Math.roundToPrecision(216 / 24389, 15);
        const k = Math.roundToPrecision(24389 / 27, 15);

        let L: number;

        if (yr > e) {
            L = 116 * Math.cbrt(yr) - 16;
        } else {
            L = k * yr;
        }
        L = Math.roundToPrecision(L, 15);

        let u = Math.roundToPrecision(13 * L * (uPrime - urPrime), 15);
        let v = Math.roundToPrecision(13 * L * (vPrime - vrPrime), 15);

        result.SetArray([[L], [u], [v]]);

        return result;
    }


}