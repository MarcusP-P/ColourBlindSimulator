import type { Point } from "../math/Cartesian"
import { Line } from "../math/Line";
import { MathUtilities } from "../math/MathExtensions";

export class CalibrationBinarySearch {
    private origin: Point;

    private searchLine: Line;

    private upperBound: number | null;
    private lowerBound: number

    private current: number;

    private initialDistance: number;

    public constructor(origin: Point, angle: number, initialDistance: number) {
        this.origin = origin;
        const gradient = MathUtilities.degreesToGradient(angle);
        const yIntercept = Line.yIntercept(origin, gradient);
        this.searchLine = new Line(gradient, yIntercept);

        this.initialDistance = initialDistance;

        // This is the current minimum
        this.lowerBound = 0;
        this.upperBound = null;

        this.current = 0;
    }

    public getFirstPoint(): Point {
        this.current = this.initialDistance;
        return this.searchLine.getPointAlongLine(this.origin, this.current);
    }

    public getNextPoint(prevoiousFound: boolean): Point {
        if (prevoiousFound) {
            this.upperBound = this.current;
        } else {
            this.lowerBound = this.current;
        }

        if (this.upperBound === null) {
            // We're still looking for an upperbound
            this.current = this.current * 2;
        } else {
            this.current = (this.upperBound + this.lowerBound) / 2
        }

        console.log(`Gap between items: ${this.upperBound === null ? "searching..." : this.upperBound - this.lowerBound}`);
        return this.searchLine.getPointAlongLine(this.origin, this.current);
    }

    public isGapLessThan(gap: number): boolean {
        if (this.upperBound === null) {
            return false;
        }
        else
        {
            return (Math.abs(this.upperBound-this.lowerBound) <= gap);
        }
    }

    public getFinalPoint () : Point {
        return this.searchLine.getPointAlongLine(this.origin, this.current);
    }
}