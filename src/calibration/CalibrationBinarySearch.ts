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

    public readonly angle: number;

    public constructor(origin: Point, angle: number, initialDistance: number) {
        this.origin = origin;
        const gradient = MathUtilities.degreesToGradient(angle);
        if (gradient === Infinity || gradient === -Infinity) {
            this.searchLine = new Line(origin.x);
        } else {
            const yIntercept = Line.yIntercept(origin, gradient);
            this.searchLine = new Line(gradient, yIntercept);
        }

        this.initialDistance = initialDistance;

        this.angle = angle;

        if (this.angle > 90 && this.angle <= 270) {
            this.initialDistance *= -1;
        }

        // This is the current minimum
        this.lowerBound = 0;
        this.upperBound = null;

        this.current = this.initialDistance;

    }

    public prepareNextPoint(prevoiousFound: boolean) {
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
    }

    public isGapLessThan(gap: number): boolean {
        if (this.upperBound === null) {
            return false;
        }
        else {
            return (Math.abs(this.upperBound - this.lowerBound) <= gap);
        }
    }

    public getCurrentPoint(): Point {
        console.log(`GetPoint - Gap between items: ${this.upperBound === null ? "searching..." : this.upperBound - this.lowerBound} current:${this.current}`);
        const currentPoint = this.searchLine.getPointAlongLine(this.origin, this.current);
        if (isNaN(currentPoint.x) || isNaN(currentPoint.y)) {
            console.log(`Bad value`);
        }
        return currentPoint;
    }


    public getFinalPoint(): Point {
        return this.searchLine.getPointAlongLine(this.origin, this.lowerBound);
    }
}