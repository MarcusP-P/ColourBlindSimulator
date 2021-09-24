import "./helloWorld.ts"
import "./calibrate.ts"

import { Matrix } from "./matrix"


let foo=new Matrix(3,3);

foo.SetArray([[2,1,3],[1,3,-3],[-2,4,4]]);

let foo2=Matrix.InvertMatrix(foo);

let foo3=Matrix.MatrixMultiply(foo,foo2);

let foo4=new Matrix(1,1);