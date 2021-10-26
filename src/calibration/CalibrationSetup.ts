import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationGrid } from "./CalibrationGrid"
import { ColorConverter } from "cie-colorconverter";

export function setupCalibration(baseLuv: NumericTriple, testLuv: NumericTriple): CalibrationGrid {
    const calibrationGrid = new CalibrationGrid();

    const converter = new ColorConverter();

    converter.RefWhite = "D65";

    for (let x = -25; x <= 25; x++) {
        for (let y = -25; y <= 25; y++) {
            if (y % 2 === 0) {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB(baseLuv));
            }
            else {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB(testLuv));
            }
        }
    }

    return calibrationGrid;
}