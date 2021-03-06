import type { NumericTriple } from "cie-colorconverter/dist/Matrix";

export class CalibrationGrid {
    private readonly grid: NumericTriple[][] = [];

    public constructor() {
        // Initialise the matrix array.        
        for (let column = 0; column < 51; column++) {
            const rowArray: NumericTriple[] = [];
            for (let row = 0; row < 51; row++) {

                rowArray.push([0, 0, 0]);
            }
            this.grid.push(rowArray);
        }
    }

    // When we generate these, we want to use x and y ranging from -25 to 25, withthe origin in the centre
    public setColourByXY(x: number, y: number, colour: NumericTriple): void {
        if (x < -25 || x > 25) {
            throw new Error("x must be between -25 and 25 inclusive");
        }
        if (y < -25 || y > 25) {
            throw new Error("y must be between -25 and 25 inclusive");
        }

        const column = x + 25;
        const row = y + 25;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.grid[column]![row] = colour;
    }

    public getColourByXY(x: number, y: number): NumericTriple {
        if (x < -25 || x > 25) {
            throw new Error("x must be between -25 and 25 inclusive");
        }
        if (y < -25 || y > 25) {
            throw new Error("y must be between -25 and 25 inclusive");
        }

        const column = x + 25;
        const row = y + 25;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return (this.grid[column]![row]!);
    }

    // When we want to draw these on the screen, we want to use row/column from 0 to 51 with the origin in
    // the top left, so as we move down, we need to increase the numbers    
    public setColourByColumnRow(column: number, row: number, colour: NumericTriple): void {
        if (column < 0 || column > 50) {
            throw new Error("column must be between 0 and 50 inclusive");
        }
        if (row < 0 || row > 50) {
            throw new Error("row must be between 0 and 50 inclusive");
        }

        const newRow = 50 - row;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.grid[column]![newRow] = colour;
    }

    public getColourByColumnRow(column: number, row: number): NumericTriple {
        if (column < 0 || column > 51) {
            throw new Error("column must be between 0 and 51 inclusive");
        }
        if (row < 0 || row > 51) {
            throw new Error("row must be between 0 and 51 inclusive");
        }

        const newRow = 50 - row;

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return (this.grid[column]![newRow]!);
    }


}