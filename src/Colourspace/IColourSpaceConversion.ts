import { Matrix } from "../Maths/Matrix"

export interface ColourSpaceConversion {
    ToXYZ?: Matrix;
    FromXYZ?: Matrix;

    PreToXYZ?: (source: Matrix) => Matrix;
    PostFromXYZ?: (source: Matrix) => Matrix;

}