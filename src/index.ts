import { CalibrationScheduler } from "./calibration/CalibrationScheduler";
import { ColorConverter } from "cie-colorconverter";

const approach1Button = document.querySelector<HTMLButtonElement>("#approach1");

if (approach1Button=== null) {
    throw new Error("Can't locate intorduction container");
}

approach1Button.addEventListener("click", async () => {
    let foo = new CalibrationScheduler();
    await foo.findPoint();
});

const x = 0.403;
const y = 0.442;

const Y = 0.5;
const X = Y / y * x;
const Z = Y / y * (1 - x - y);

const converter = new ColorConverter();

converter.RefWhite = "D65";
converter.GammaModel = "sRGB";

const Luv = converter.XYZ_to_Luv([X, Y, Z]);

console.count(`Luv=[${Luv[0]}, ${Luv[1]}, ${Luv[2]}], u'=${4 * X / (X + 15 * Y + 3 * Z)} v'=${9 * Y / (X + 15 * Y + 3 * Z)}`);



console.log("foo");
