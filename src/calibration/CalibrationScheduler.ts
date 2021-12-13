import { CalibrationBinarySearch } from "./CalibrationBinarySearch";
import type { Point } from "math/Cartesian";
import { CalibrationTest } from "./CalibrationTest";

export class CalibrationScheduler {

    private initialPoint: Point;
    private luminance: number;
    private calibrationSearch:CalibrationBinarySearch;

    public constructor() {
        this.initialPoint={x:0, y:0};
        this.luminance=50;

        this.calibrationSearch=new CalibrationBinarySearch(this.initialPoint,0,10);
    }

    public async  findPoint() : Promise<void> {
        const introductionContainer= document.querySelector<HTMLDivElement>("#introduction");
        const calibrationHost = document.querySelector<HTMLDivElement>("#canvasHost");
        if (introductionContainer=== null) {
            throw new Error("Can't locate intorduction container");
        }
        if (calibrationHost === null) {
            throw new Error("Can't find canvashost");
        }
        introductionContainer.classList.add("hide-all");
        calibrationHost.classList.remove("hide-all");
    
        let currentPoint=this.calibrationSearch.getFirstPoint();

        while (! this.calibrationSearch.isGapLessThan(0.001)) {
            let tester=new CalibrationTest(calibrationHost, [this.luminance, this.initialPoint.x, this.initialPoint.y], [this.luminance, currentPoint.x, currentPoint.y]);
            let result=await tester.getCalibrationResult();
            currentPoint=this.calibrationSearch.getNextPoint(result);
        }
        currentPoint=this.calibrationSearch.getFinalPoint();
        console.log(`Final point: X:${currentPoint.x}, Y:${currentPoint.y}`);
    }

    /*
    const tester = new CalibrationTest(calibrationHost, [50, 22.294886634339058, 80.86387581452101], [50, -120, 25]);
    const promise = tester.getCalibrationResult();
    // eslint-disable-next-line no-alert
    promise.then((result) => { alert(`You ${result ? "have" : "haven't"} clicked on the gap`); });
*/

}