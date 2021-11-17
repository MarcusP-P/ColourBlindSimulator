import {CalibrationTest} from "./calibration/CalibrationTest";

import {ColorConverter} from "cie-colorconverter";

const x=0.403;
const y=0.442;
const approach1Button = document.querySelector<HTMLButtonElement>("#approach1");

if (approach1Button=== null) {
    throw new Error("Can't locate intorduction container");
}

approach1Button.addEventListener("click", () => {
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

    const tester = new CalibrationTest(calibrationHost, [50, 22.294886634339058, 80.86387581452101], [50, -120, 25]);
    const promise = tester.getCalibrationResult();
    // eslint-disable-next-line no-alert
    promise.then((result) => { alert(`You ${result ? "have" : "haven't"} clicked on the gap`); });
});

const x = 0.403;
const y = 0.442;

const Y = 0.5;
const X = Y / y * x;
const Z = Y / y * (1 - x - y);

const Y=0.5;
const X=Y/y*x;
const Z=Y/y*(1-x-y);
    
const converter = new ColorConverter();

converter.RefWhite = "D65";
converter.GammaModel="sRGB";

const  Luv=converter.XYZ_to_Luv([X, Y, Z]);

console.count(`Luv=[${Luv[0]}, ${Luv[1]}, ${Luv[2]}], u'=${4*X/(X+15*Y+3*Z)} v'=${9*Y/(X+15*Y+3*Z)}`);



console.log("foo");
