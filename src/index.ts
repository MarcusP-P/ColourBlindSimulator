import {CalibrationTest} from "./calibration/CalibrationTest";

const calibrationHost=document.querySelector<HTMLDivElement>("#canvasHost");
if (calibrationHost===null) {
    throw new Error("Can't find canvashost");
}

const tester=new CalibrationTest(calibrationHost,[50, 0, 0], [50, -120, 25]);
const promise=tester.getCalibrationResult();
// eslint-disable-next-line no-alert
promise.then((result)=>{alert(`You ${result?"have":"haven't"} clicked on the gap`);}); 
console.log("foo");
