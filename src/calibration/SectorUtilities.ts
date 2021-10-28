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
    gradientAntiClockwise: number;
    gradientClockwise: number;

    // The position of the edge relative to a point in the wedge.
    // If this is positive, the points we want are to the right of the edge, if it is negative, the left
    gradientAntiClockwisePosition: number;
    gradientClockwisePosition: number;
};

export class SectorUtilities {

    public static GetSectorDefinition(quadrant: Quadrant): SectorDefinition {
        // To find the segment that we're not interested in, we need the gradients of the two lines
        // that deliniate our segments, at either 22.5 or 67.5 degrees
        // The lines on the edge of our slice are either at +/- 22.5 and +/-67.5 degrees.
        const degrees22Gradient = 0.414213562373095;
        const degrees67Gradient = 2.414213562373095;

        // Get the gradients of the two lines we're interested in, with the first being the anti clockwise border, 
        // and the second being the clockwise

        let sectorDefinition: SectorDefinition;

        switch (quadrant) {
            case Quadrant.North: {
                sectorDefinition = {
                    gradientAntiClockwise: -1 * degrees67Gradient,
                    gradientClockwise: degrees67Gradient,
                    gradientAntiClockwisePosition: 1,
                    gradientClockwisePosition: -1,
                };
                break;
            }
            case Quadrant.NorthEast: {
                sectorDefinition = {
                    gradientAntiClockwise: degrees67Gradient,
                    gradientClockwise: degrees22Gradient,
                    gradientAntiClockwisePosition: 1,
                    gradientClockwisePosition: -1,
                };
                break;
            }
            case Quadrant.East: {
                sectorDefinition = {
                    gradientAntiClockwise: degrees22Gradient,
                    gradientClockwise: -1 * degrees22Gradient,
                    gradientAntiClockwisePosition: 1,
                    gradientClockwisePosition: 1,
                };
                break;
            }
            case Quadrant.SouthEast: {
                sectorDefinition = {
                    gradientAntiClockwise: -1 * degrees22Gradient,
                    gradientClockwise: -1 * degrees67Gradient,
                    gradientAntiClockwisePosition: -1,
                    gradientClockwisePosition: 1,
                };
                break;
            }
            case Quadrant.South: {
                sectorDefinition = {
                    gradientAntiClockwise: -1 * degrees67Gradient,
                    gradientClockwise: degrees67Gradient,
                    gradientAntiClockwisePosition: -1,
                    gradientClockwisePosition: 1,
                };
                break;
            }
            case Quadrant.SouthWest: {
                sectorDefinition = {
                    gradientAntiClockwise: degrees67Gradient,
                    gradientClockwise: degrees22Gradient,
                    gradientAntiClockwisePosition: -1,
                    gradientClockwisePosition: 1,
                };
                break;
            }
            case Quadrant.West: {
                sectorDefinition = {
                    gradientAntiClockwise: degrees22Gradient,
                    gradientClockwise: -1 * degrees22Gradient,
                    gradientAntiClockwisePosition: -1,
                    gradientClockwisePosition: -1,
                };
                break;
            }
            case Quadrant.NorthWest: {
                sectorDefinition = {
                    gradientAntiClockwise: -1 * degrees22Gradient,
                    gradientClockwise: -1 * degrees67Gradient,
                    gradientAntiClockwisePosition: 1,
                    gradientClockwisePosition: -1,
                };
                break;
            }
            default: {
                throw new Error("Invalid quadrant");
            }
        }
        return sectorDefinition;
    }

    public static IsPointInSector(x: number, y: number, sectorDefinition: SectorDefinition): boolean {
        // 0,0 is never included in the sector, no matter what.
        if (x > -0.5 && x < 0.5 && y > -0.5 && y < 0.5) {
            return false;
        }

        // To see if we need to exclude thepoints for the wedge, we calculate what the x value along the
        // two lines of the wedge are to match the current y. The x should be between them 
        const intercept1x = y / sectorDefinition.gradientAntiClockwise;
        const intercept2x = y / sectorDefinition.gradientClockwise;

        // the gradientAntiClockwisePosition and gradientClockwisePosition are adjsutments to account for
        // needing to be on the left or the right of the line
        return (x * sectorDefinition.gradientAntiClockwisePosition > intercept1x * sectorDefinition.gradientAntiClockwisePosition) && 
            (x * sectorDefinition.gradientClockwisePosition > intercept2x * sectorDefinition.gradientClockwisePosition);
    }
}
