import type { Point } from "./Cartesian";
import { MathUtilities } from "./MathExtensions";

type CartesianLine = {
    yIntercept: number;
    gradient: number;
}


export class Line {
    readonly LineFormula: CartesianLine | number;

    public static yIntercept(position: Point, gradient: number): number {
        const riseFromOrigin = position.x * gradient;
        return position.y - riseFromOrigin;
    }

    // construct a line in the form of y = mx + a
    public constructor(gradient: number, yIntercept: number);

    // construct a vertical line in the form of x = n
    public constructor(x: number);

    public constructor(...argv: number[]) {
        if (argv.length == 2) {
            this.LineFormula = { gradient: argv[0]!, yIntercept: argv[1]! };
        } else {
            this.LineFormula = argv[0]!;
        }
    }

    // Is the point to the left of a line (for a horizontal line, point is above)
    public IsPointLeftOfLine(position: Point): boolean {
        if (typeof this.LineFormula === "number") {
            // If it's a line, this is an easy test.
            return (position.x < this.LineFormula)
        }

        // Our formula is in the form of y = mx + c
        // If there is no gradient, jsut check if it's above...
        if (this.LineFormula.gradient === 0) {
            return (position.y > this.LineFormula.yIntercept)
        }

        // Otherwise just check

        // y=mx+c
        // (y-c)/m=x
        return (position.x < (position.y - this.LineFormula.yIntercept) / this.LineFormula.gradient)
    }

    // Is the point to the right of a line (for a horizontal line, point is below)
    public IsPointRightOfLine(position: Point): boolean {
        if (typeof this.LineFormula === "number") {
            // If it's a line, this is an easy test.
            return (position.x > this.LineFormula)
        }

        // Our formula is in the form of y = mx + c
        // If there is no gradient, jsut check if it's above...
        if (this.LineFormula.gradient === 0) {
            return (position.y < this.LineFormula.yIntercept)
        }

        // Otherwise just check

        // y=mx+c
        // (y-c)/m=x
        return (position.x > (position.y - this.LineFormula.yIntercept) / this.LineFormula.gradient)

    }

    public isPointOnLine(position: Point): boolean {
        if (typeof this.LineFormula === "number") {
            // If it's a line, this is an easy test.
            return (MathUtilities.isZero(position.x - this.LineFormula))
        }

        // Our formula is in the form of y = mx + c
        // If there is no gradient, jsut check if it's above...
        if (this.LineFormula.gradient === 0) {
            return (MathUtilities.isZero(position.y - this.LineFormula.yIntercept))
        }

        // Otherwise just check

        // y=mx+c
        // (y-c)/m=x
        return (MathUtilities.isZero(position.y - (this.LineFormula.gradient * position.x) + this.LineFormula.yIntercept))
    }

    // A positive distance moves right, or up on a vertical line

    public getPointAlongLine(position: Point, distance: number): Point {
        if (!this.isPointOnLine(position)) {
            throw new Error("point is not on the Line.");
        }
        if (typeof this.LineFormula === "number") {
            // If it's a line, this is an easy test.
            return ({ x: position.x, y: position.y + distance });
        }

        if (this.LineFormula.gradient === 0) {
            return ({ x: position.x + distance, y: position.y });

        }

        const angle=Math.atan(this.LineFormula.gradient);
        const x=Math.cos(angle)*distance+position.x;

        const y = this.LineFormula.gradient * x + this.LineFormula.yIntercept;

        return { x: x, y: y };
    }
}