import { helloWorld } from "./helloWorld";

import {CalibrationTest} from "./calibration/CalibrationTest";

const calibrationHost=document.querySelector<HTMLDivElement>("#canvasHost");
if (calibrationHost===null) {
    throw new Error("Can't find canvashost");
}

const tester=new CalibrationTest(calibrationHost,[50, 0, 0], [50, -11.5396, -121.9686]);
const promise=tester.getCalibrationResult();
promise.then((result)=>{console.log(`${result?"true":"false"}`);});
console.log("foo");

helloWorld();