import "./MathExtensions"

export class Matrix {

    get Rows(): number {
        return this.matrix.length;
    }

    get Columns(): number {
        return this.matrix[0].length;
    }

    // The cells of matrix [row][column]
    private matrix: number[][];

    GetValue(row: number, column: number): number {
        return (this.matrix[row][column]);
    }

    SetValue(row: number, column: number, value: number) {
        this.matrix[row][column] = value;
    }

    SetArray(source: number[][]) {
        let sourceLength = source.length;
        let matrixLength = this.matrix.length;
        let source0Length = source.reduce((current, element) => Math.max(current, element.length), 0);
        let matrix0Length = this.matrix[0].length;
        if (sourceLength != matrixLength
            || source0Length != matrix0Length) {
            throw ("Array dimensions don't match matrix");
        }

        let row: number;
        for (row = 0; row < this.matrix.length; row++) {
            let column: number
            for (column = 0; column < this.matrix[0].length; column++) {
                this.matrix[row][column] = source[row][column];
            }
        }
    }

    constructor(rows: number, columns: number) {
        // initialise the matrix array.
        this.matrix = [];

        var row: number;
        for (row = 0; row < rows; row++) {
            this.matrix[row] = [];

            var column: number;

            for (column = 0; column < columns; column++) {
                this.matrix[row][column] = 0;
            }
        }
    }

    static MatrixMultiply(first: Matrix, second: Matrix): Matrix {
        // Matrices can only be multiplied if the number of columns in the first = number of rows in the second
        if (first.Columns != second.Rows) {
            throw ("Invalid matrix multiplication");
        }

        const result = new Matrix(first.Rows, second.Columns);
        let destRow: number;
        for (destRow = 0; destRow < result.Rows; destRow++) {

            let destColumn: number;
            for (destColumn = 0; destColumn < result.Columns; destColumn++) {
                let accumulator: number = 0;

                let position: number;
                for (position = 0; position < first.Columns; position++) {
                    accumulator += first.GetValue(destRow, position) * second.GetValue(position, destColumn);
                }

                result.SetValue(destRow, destColumn, Math.roundToPrecision(accumulator, 10));
            }
        }
        return result;
    }

    static ScalarMultiply(scalar: number, matrix: Matrix): Matrix {
        const result = new Matrix(matrix.Rows, matrix.Columns);
        let destRow: number;
        for (destRow = 0; destRow < result.Rows; destRow++) {

            let destColumn: number;
            for (destColumn = 0; destColumn < result.Columns; destColumn++) {
                result.SetValue(destRow, destColumn, Math.roundToPrecision(scalar * matrix.GetValue(destRow, destColumn), 10));
            }
        }
        return result;
    }

    // This algorithm comes from https://www.researchgate.net/publication/220337322_An_Efficient_and_Simple_Algorithm_for_Matrix_Inversion
    // I don't pretend to understand how it works.
    static InvertMatrix(source: Matrix): Matrix {
        if (source.Rows != source.Columns) {
            throw ("Can only invert a square matrix");
        }

        let result = new Matrix(source.Rows, source.Rows);
        result.SetArray(source.matrix);

        let i: number;
        let j: number;
        let p: number;

        // Step 1 - Clear numbers
        let pivot: number = 0.0;
        let determinant = 1.0;

        // Step 2 move to next iteration
        for (p = 0; p < source.Rows; p++) {
            // Step 2 - Select the pivot
            pivot = result.GetValue(p, p);

            // Step 3 - Of the pivot is 0, we can't calculate the inverse
            if (Math.abs(pivot) < 1e-5) {
                throw ("Unable to invert matrix");
            }

            // Step 4 - update determinant
            determinant = determinant * pivot;

            // Step 5 - Calculate the new values of the pivot row
            for (j = 0; j < source.Rows; j++) {
                if (j != p) {
                    result.SetValue(p, j, result.GetValue(p, j) / pivot);
                }
            }

            // Step 7 - calculate the rest of the new elements
            // The worked example uses a minus, rather than the plus in the paper.
            // The worked example also calculates this before step 6 occurs.
            for (i = 0; i < source.Rows; i++) {
                if (i != p) {
                    for (j = 0; j < source.Rows; j++) {
                        if (j != p) {
                            result.SetValue(i, j, result.GetValue(i, j) - result.GetValue(p, j) * result.GetValue(i, p));
                        }
                    }
                }
            }

            // Step 6 - Calculate new values in the pivot column
            // Note: Step 6 needs to be done after step 7...
            for (i = 0; i < source.Rows; i++) {
                if (i != p) {
                    result.SetValue(i, p, - result.GetValue(i, p) / pivot);
                }
            }

            // Step 8 - Calculate the new value of the current pivot
            result.SetValue(p, p, 1 / pivot);

            // Step 9 - go onto next iteration
        }

        // Not part of the algorithm, but javascript float calculation leaves some pretty annoying rounding errors 
        for (i = 0; i < source.Rows; i++) {
            for (j = 0; j < source.Rows; j++) {
                result.SetValue(i, j, Math.roundToPrecision(result.GetValue(i, j), 10));
            }
        }

        // Step 10 - return the inverse
        return result;
    }

}