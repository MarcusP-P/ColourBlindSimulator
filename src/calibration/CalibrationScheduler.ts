import { CalibrationBinarySearch } from "./CalibrationBinarySearch";
import type { Point } from "math/Cartesian";
import { CalibrationTest } from "./CalibrationTest";

export class CalibrationScheduler {

    private luminance: number;
    private calibrationSearch: CalibrationBinarySearch[];
    private foundCalibrations: CalibrationBinarySearch[];
    private initialPoint: Point;

    public constructor() {
        this.initialPoint = { x: 0, y: 0 };
        this.luminance = 50;

        this.calibrationSearch = [
            new CalibrationBinarySearch(this.initialPoint, 0, 10),
            new CalibrationBinarySearch(this.initialPoint, 30, 10),
            new CalibrationBinarySearch(this.initialPoint, 60, 10),
            new CalibrationBinarySearch(this.initialPoint, 90, 10),
            new CalibrationBinarySearch(this.initialPoint, 120, 10),
            new CalibrationBinarySearch(this.initialPoint, 150, 10),
            new CalibrationBinarySearch(this.initialPoint, 180, 10),
            new CalibrationBinarySearch(this.initialPoint, 210, 10),
            new CalibrationBinarySearch(this.initialPoint, 240, 10),
            new CalibrationBinarySearch(this.initialPoint, 270, 10),
            new CalibrationBinarySearch(this.initialPoint, 300, 10),
            new CalibrationBinarySearch(this.initialPoint, 330, 10),
        ];

        this.foundCalibrations = [];
    }

    public async findPoint(): Promise<void> {
        const introductionContainer = document.querySelector<HTMLDivElement>("#introduction");
        const calibrationHost = document.querySelector<HTMLDivElement>("#canvasHost");
        if (introductionContainer === null) {
            throw new Error("Can't locate intorduction container");
        }
        if (calibrationHost === null) {
            throw new Error("Can't find canvashost");
        }
        introductionContainer.classList.add("hide-all");
        calibrationHost.classList.remove("hide-all");

        while (this.calibrationSearch.length !== 0) {
            const currentIndex = Math.floor(Math.random() * this.calibrationSearch.length);
            // if Math.random === 1 then we end up out of bound, so get the next value...
            if (currentIndex === this.calibrationSearch.length) {
                continue;
            }

            const currentCalibration = this.calibrationSearch[currentIndex];

            if (currentCalibration === undefined) {
                throw new Error("Unable to find calibration");
            }

            const currentPoint = currentCalibration.getCurrentPoint();

            if (isNaN( currentPoint.x) || isNaN(currentPoint.y)) {
                console.log(`Bad value`);
            }
            else
            {
                console.log(`Point x=${currentPoint.x} y=${currentPoint.y}`);
            }

            let tester = new CalibrationTest(calibrationHost, [this.luminance, this.initialPoint.x, this.initialPoint.y], [this.luminance, currentPoint.x, currentPoint.y]);
            let result = await tester.getCalibrationResult();
            currentCalibration.prepareNextPoint(result);

            if (currentCalibration.isGapLessThan(0.001)) {
                this.foundCalibrations.push(currentCalibration);
                this.calibrationSearch.splice(currentIndex, 1);
            }

        }
        this.foundCalibrations.forEach((currentSearch) => {
            const currentPoint=currentSearch.getFinalPoint();
            console.log(`Final point: X:${currentPoint.x}, Y:${currentPoint.y}`);
        });
    }

    /*
    const tester = new CalibrationTest(calibrationHost, [50, 22.294886634339058, 80.86387581452101], [50, -120, 25]);
    const promise = tester.getCalibrationResult();
    // eslint-disable-next-line no-alert
    promise.then((result) => { alert(`You ${result ? "have" : "haven't"} clicked on the gap`); });
*/

}