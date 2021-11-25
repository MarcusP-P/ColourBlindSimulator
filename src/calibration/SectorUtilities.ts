import { degreesToGradient, Line } from "../math/Line";
import type { Point } from "../math/Cartesian";

// eslint-disable-next-line no-shadow
export const enum Quadrant {
    North, // eslint-disable-line no-unused-vars
    NorthEast, // eslint-disable-line no-unused-vars
    East, // eslint-disable-line no-unused-vars
    SouthEast, // eslint-disable-line no-unused-vars
    South, // eslint-disable-line no-unused-vars
    SouthWest, // eslint-disable-line no-unused-vars
    West, // eslint-disable-line no-unused-vars
    NorthWest, // eslint-disable-line no-unused-vars
}

export type SectorDefinition = {
    // The gradients of the clockwise and anticlockwise edges of the segment
    gradientAntiClockwise: Line;
    gradientClockwise: Line;

    // The position of the edge relative to a point in the wedge.
    // If this is positive, the points we want are to the right of the edge, if it is negative, the left
    gradientAntiClockwiseRight: boolean;
    gradientClockwiseRight: boolean;
};

export class SectorUtilities {

    // To find the segment that we're not interested in, we need the gradients of the two lines
    // that deliniate our segments, at either 22.5 or 67.5 degrees
    // The lines on the edge of our slice are either at +/- 22.5 and +/-67.5 degrees.

    private static readonly degrees22Gradient = degreesToGradient(22.5);
    private static readonly degrees67Gradient = degreesToGradient(67.5);

    public static GetSectorDefinition(quadrant: Quadrant): SectorDefinition {

        // Get the gradients of the two lines we're interested in, with the first being the anti clockwise border, 
        // and the second being the clockwise

        let sectorDefinition: SectorDefinition;

        switch (quadrant) {
            case Quadrant.North: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(-1 * SectorUtilities.degrees67Gradient, 0),
                    gradientClockwise: new Line(SectorUtilities.degrees67Gradient, 0),
                    gradientAntiClockwiseRight: true,
                    gradientClockwiseRight: false,
                };
                break;
            }
            case Quadrant.NorthEast: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(SectorUtilities.degrees67Gradient, 0),
                    gradientClockwise: new Line(SectorUtilities.degrees22Gradient, 0),
                    gradientAntiClockwiseRight: true,
                    gradientClockwiseRight: false,
                };
                break;
            }
            case Quadrant.East: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(SectorUtilities.degrees22Gradient, 0),
                    gradientClockwise: new Line(-1 * SectorUtilities.degrees22Gradient, 0),
                    gradientAntiClockwiseRight: true,
                    gradientClockwiseRight: true,
                };
                break;
            }
            case Quadrant.SouthEast: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(-1 * SectorUtilities.degrees22Gradient, 0),
                    gradientClockwise: new Line(-1 * SectorUtilities.degrees67Gradient, 0),
                    gradientAntiClockwiseRight: false,
                    gradientClockwiseRight: true,
                };
                break;
            }
            case Quadrant.South: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(-1 * SectorUtilities.degrees67Gradient, 0),
                    gradientClockwise: new Line(SectorUtilities.degrees67Gradient, 0),
                    gradientAntiClockwiseRight: false,
                    gradientClockwiseRight: true,
                };
                break;
            }
            case Quadrant.SouthWest: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(SectorUtilities.degrees67Gradient, 0),
                    gradientClockwise: new Line(SectorUtilities.degrees22Gradient, 0),
                    gradientAntiClockwiseRight: false,
                    gradientClockwiseRight: true,
                };
                break;
            }
            case Quadrant.West: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(SectorUtilities.degrees22Gradient, 0),
                    gradientClockwise: new Line(-1 * SectorUtilities.degrees22Gradient, 0),
                    gradientAntiClockwiseRight: false,
                    gradientClockwiseRight: false,
                };
                break;
            }
            case Quadrant.NorthWest: {
                sectorDefinition = {
                    gradientAntiClockwise: new Line(-1 * SectorUtilities.degrees22Gradient, 0),
                    gradientClockwise: new Line(-1 * SectorUtilities.degrees67Gradient, 0),
                    gradientAntiClockwiseRight: true,
                    gradientClockwiseRight: false,
                };
                break;
            }
            default: {
                throw new Error("Invalid quadrant");
            }
        }
        return sectorDefinition;
    }

    public static IsPointInSector(position: Point, sectorDefinition: SectorDefinition): boolean {
        // If it's on a line we aren't interested
        if (sectorDefinition.gradientClockwise.isPointOnLine(position)
            || sectorDefinition.gradientAntiClockwise.isPointOnLine(position)) {
            return false
        }

        let anticlockwiseOkay: boolean;
        if (sectorDefinition.gradientAntiClockwiseRight) {
            anticlockwiseOkay=sectorDefinition.gradientAntiClockwise.IsPointRightOfLine(position);
        } else {
            anticlockwiseOkay=sectorDefinition.gradientAntiClockwise.IsPointLeftOfLine(position);
        }

        let clockwiseOkay: boolean;
        if (sectorDefinition.gradientClockwiseRight) {
            clockwiseOkay=sectorDefinition.gradientClockwise.IsPointRightOfLine(position);
        } else {
            clockwiseOkay=sectorDefinition.gradientClockwise.IsPointLeftOfLine(position);
        }

        return (anticlockwiseOkay && clockwiseOkay);
    }
}
