import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationGrid } from "./CalibrationGrid"
import { ColorConverter } from "cie-colorconverter";

export const enum Quadrant {
    North,
    NorthEast,
    East,
    SouthEast,
    South,
    SouthWest,
    West,
    NorthWest,
}

export function setupCalibration(baseLuv: NumericTriple, testLuv: NumericTriple, clearedQuadrant: Quadrant): CalibrationGrid {
    const calibrationGrid = new CalibrationGrid();

    const converter = new ColorConverter();

    converter.RefWhite = "D65";

    // To find the segment that we're not interested in, we need the gradients of the two lines
    // that deliniate our segments, at either 22.5 or 67.5 degrees
    const degrees22 = 0.414213562373095;
    const degrees67 = 2.414213562373095;
    let gradient1: number;
    let gradient2: number;
    let intercept1Direction: number;
    let intercept2Direction: number;

    // Get the gradients of the two lines we're interested in, with the first being the anti clockwise border, 
    // and the second being the clockwise

    // orientation is if we want to be left or right of the point where the perpendicualr line intercepst the
    // current point 1 means to the right, -1 means to the left
    switch (clearedQuadrant) {
        case Quadrant.North: {
            gradient1 = -1 * degrees67;
            gradient2 = degrees67;
            intercept1Direction = 1;
            intercept2Direction = -1;
            break;
        }
        case Quadrant.NorthEast: {
            gradient1 = degrees67;
            gradient2 = degrees22;
            intercept1Direction = 1;
            intercept2Direction = -1;
            break;
        }
        case Quadrant.East: {
            gradient1 = degrees22;
            gradient2 = -1 * degrees22;
            intercept1Direction = 1;
            intercept2Direction = 1;
            break;
        }
        case Quadrant.SouthEast: {
            gradient1 = -1 * degrees22;
            gradient2 = -1 * degrees67;
            intercept1Direction = -1;
            intercept2Direction = 1;
            break;
        }
        case Quadrant.South: {
            gradient1 = -1 * degrees67;
            gradient2 = degrees67;
            intercept1Direction = -1;
            intercept2Direction = 1;
            break;
        }
        case Quadrant.SouthWest: {
            gradient1 = degrees67;
            gradient2 = degrees22;
            intercept1Direction = -1;
            intercept2Direction = 1;
            break;
        }
        case Quadrant.West: {
            gradient1 = degrees22;
            gradient2 = -1 * degrees22;
            intercept1Direction = -1;
            intercept2Direction = -1;
            break;
        }
        case Quadrant.NorthWest: {
            gradient1 = -1 * degrees22;
            gradient2 = -1 * degrees67;
            intercept1Direction = 1;
            intercept2Direction = -1;
            break;
        }
        default: {
            throw new Error("Invalid quadrant");
        }
    }

    for (let x = -25; x <= 25; x++) {
        for (let y = -25; y <= 25; y++) {
            // to see if points are in the circle, use the formula for a circle: x^2+y^2=radius^2,
            // and see if the radius falls into the one that we want. Only calculate it once...
            const circleRadius=Math.sqrt(x**2 + y**2);

            // To see if we need to exclude thepoints for the wedge, we calculate what the x value along the
            // two lines of the wedge are to match the current y. The x should be between them 
            const intercept1x = y / gradient1;
            const intercept2x = y / gradient2;

            // Check if we need to draw a colour point, or a background point. We want to draw
            // a colour point, on the circle, unless it's also part of the empty wedge.
            if ((circleRadius > 13.5 && circleRadius<=20.5) && !((x * intercept1Direction > intercept1x * intercept1Direction) && (x * intercept2Direction > intercept2x * intercept2Direction))) {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB(testLuv));
            }
            else {
                calibrationGrid.setColourByXY(x, y, converter.Luv_to_RGB(baseLuv));
            }
        }
    }

    return calibrationGrid;
}