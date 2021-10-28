import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationGrid } from "./CalibrationGrid";
import { ColorConverter } from "cie-colorconverter";
import type { Quadrant } from "./SectorUtilities";
import { SectorUtilities } from "./SectorUtilities"; // eslint-disable-line no-duplicate-imports


export function setupCalibration(baseLuv: NumericTriple, testLuv: NumericTriple, clearedQuadrant: Quadrant): CalibrationGrid {
    const sectorDefinition = SectorUtilities.GetSectorDefinition(clearedQuadrant);

    const calibrationGrid = new CalibrationGrid();

    const converter = new ColorConverter();

    converter.RefWhite = "D65";

    for (let x = -25; x <= 25; x++) {
        for (let y = -25; y <= 25; y++) {
            // To see if points are in the circle, use the formula for a circle: x^2+y^2=radius^2,
            // and see if the radius falls into the one that we want. Only calculate it once...
            const circleRadius = Math.sqrt(x ** 2 + y ** 2);


            const luminanceVariationBound = 0.5;
            const luminanceVariation = (Math.random() * luminanceVariationBound - luminanceVariationBound / 2) + 1;

            // Check if we need to draw a colour point, or a background point. We want to draw
            // a colour point, on the circle, unless it's also part of the empty wedge.
            if ((circleRadius > 13.5 && circleRadius <= 20.5) && !SectorUtilities.IsPointInSector(x, y, sectorDefinition)) {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB([testLuv[0] * luminanceVariation, testLuv[1], testLuv[2]]));
            }
            else {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB([baseLuv[0] * luminanceVariation, baseLuv[1], baseLuv[2]]));
            }
        }
    }

    return calibrationGrid;
}