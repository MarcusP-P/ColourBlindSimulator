import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationGrid } from "./CalibrationGrid"
import { ColorConverter } from "cie-colorconverter";

export function setupCalibration(baseLuv: NumericTriple, testLuv: NumericTriple): CalibrationGrid {
    const calibrationGrid = new CalibrationGrid();

    const converter = new ColorConverter();

    converter.RefWhite = "D65";

    for (let x = -25; x <= 25; x++) {
        for (let y = -25; y <= 25; y++) {
            // to see if points are in the circle, use the formula for a circle: x^2+y^2=radius^2,
            // and see if the radius falls into the one that we want. Only calculate it once...
            const circleRadius=Math.sqrt(x**2 + y**2);
            if (circleRadius > 13.5 && circleRadius<=20.5) {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB(testLuv));
            }
            else {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB(baseLuv));
            }
        }
    }

    return calibrationGrid;
}