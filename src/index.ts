import { helloWorld } from "./helloWorld";

import { ColorConverter } from "cie-colorconverter";
import { CalibrationImage } from "./calibration/CalibrationImage";
import { setupCalibration, Quadrant } from "./calibration/CalibrationSetup";
const converter = new ColorConverter();

converter.RefWhite = "D65";

const LuvNewNew = converter.RGB_to_Luv([119, 119, 119]);
console.log(`RGB 119, 119, 119=Luv${LuvNewNew[0]}, ${LuvNewNew[1]}, ${LuvNewNew[2]}`);
const RGBNewNew = converter.Luv_to_RGB([50, 0, 0]);
console.log(`Luv 50, 0, 0=RGB${RGBNewNew[0]}, ${RGBNewNew[1]}, ${RGBNewNew[2]}`);


const el = document.querySelector<HTMLCanvasElement>("#calibrationCanvas");
if (el === null) {
    throw new Error("Could not find the canvas.");
}
const setup = new CalibrationImage(el);
const requestAnimationFrame=window.requestAnimationFrame;

let lastTimer=0;

function drawCalibrate(timer:number):void {
    if (timer-lastTimer > 50)
    {
        console.log(`${timer}`);
        const generatedGrid = setupCalibration([50, 0, 0], [50, 175, 25], Quadrant.North);
        setup.initialiseCanvas(generatedGrid);
        lastTimer=timer;
    }
    requestAnimationFrame(drawCalibrate);

}


requestAnimationFrame(drawCalibrate);



helloWorld();