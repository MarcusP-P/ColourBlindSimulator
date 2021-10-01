import { ColourSpaceConversion } from "./IColourSpaceConversion"
import { Matrix } from "../Maths/Matrix"
import "../Maths/MathExtensions"

// This uses the transformations from:
// * http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
// * http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html
// * http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_RGB.html

export class sRGBColourspace implements ColourSpaceConversion {

    ToXYZ?: Matrix;
    FromXYZ?: Matrix;

    PreToXYZ?: (source: Matrix) => Matrix;
    PostFromXYZ?: (source: Matrix) => Matrix;

    constructor() {
        this.ToXYZ = new Matrix(3, 3);

        this.ToXYZ.SetArray(
            [[0.4124564, 0.3575761, 0.1804375],
            [0.2126729, 0.7151522, 0.0721750],
            [0.0193339, 0.1191920, 0.9503041]]
        );

        this.FromXYZ = new Matrix(3, 3);

        this.FromXYZ.SetArray(
            [[3.2404542, -1.5371385, -0.4985314],
            [-0.9692660, 1.8760108, 0.0415560],
            [0.0556434, -0.2040259, 1.0572252]]
        );

        this.PreToXYZ = (source: Matrix) => {
            const result = new Matrix(3, 1);

            let row: number;

            for (row = 0; row < 3; row++) {
                result.SetValue(row, 0, this.PreToXYZSingleChannelConversion(source.GetValue(row, 0)));
            }

            return result;
        }

        this.PostFromXYZ = (source: Matrix) => {
            const result = new Matrix(3, 1);

            let row: number;

            for (row = 0; row < 3; row++) {
                result.SetValue(row, 0, this.PostFromXYZSingleChannelConversion(source.GetValue(row, 0)));
            }

            return result;
        }
    }

    PreToXYZSingleChannelConversion(initial: number): number {
        initial = initial / 255;

        let result: number;
        if (initial <= 0.4045) {
            result = initial / 12.92;
        } else {
            result = Math.pow(Math.roundToPrecision(Math.roundToPrecision(initial + 0.055, 15) / 1.055, 15), 2.4);
        }

        result = Math.roundToPrecision(result, 15);

        return result;
    }

    PostFromXYZSingleChannelConversion(initial: number): number {
        let result: number;

        if (initial <= 0.0031308) {
            result = Math.roundToPrecision(initial * 12.92, 15);
        } else {
            result = Math.roundToPrecision(Math.roundToPrecision(1.055 * Math.roundToPrecision(Math.pow(initial, 1 / 2.4), 15), 15) - 0.055, 15);
        }
        result *= 255;
        result = Math.round(result);

        return result;
    }


}