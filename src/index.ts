import "./helloWorld.ts"
import "./calibrate.ts"

import { Matrix } from "./Maths/Matrix"
import { CIELUVColourspace } from "./Colourspace/CIELUVColourspace"
import { sRGBColourspace } from "./Colourspace/sRGBColourspace"

let foo=new Matrix(3,1);

foo.SetArray([[50], [0], [0]]);

let Luv=new CIELUVColourspace();

let XYZ=Luv.PreToXYZConversion(foo);

let rgb=new sRGBColourspace();

let unscaledRGB=Matrix.MatrixMultiply(rgb.FromXYZ!, XYZ)

let result=rgb.PostFromXYZ!(unscaledRGB);

console.log("LuvToRGB: %d, %d, %d", result.GetValue(0,0), result.GetValue(1,0),result.GetValue(2,0))

let sourceRgb=new Matrix(3,1);

sourceRgb.SetArray([[119], [119], [119]]);

let sourceUnscaledRGB=rgb.PreToXYZ!(sourceRgb)

let sourceXYZ=Matrix.MatrixMultiply(rgb.ToXYZ!, sourceUnscaledRGB)

let result2=Luv.PostFromXYZConversion(sourceXYZ);

console.log("%d, %d, %d", result2.GetValue(0,0), result2.GetValue(1,0),result2.GetValue(2,0))


/*
let foo=new Matrix(3,3);

foo.SetArray([[2,1,3],[1,3,-3],[-2,4,4]]);

let foo2=Matrix.InvertMatrix(foo);

let foo3=Matrix.MatrixMultiply(foo,foo2);

let foo4=new Matrix(1,1);

*/

