//import { CalibrationGrid } from "./CalibrationMatrix"
import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationGrid } from "./CalibrationGrid";

export class CalibrationImage {
    private calibrationCanvas: HTMLCanvasElement;

    constructor(calibrationCanvas: HTMLCanvasElement) {
        this.calibrationCanvas = calibrationCanvas;
    }

    initialiseCanvas(calibrationGrid:CalibrationGrid) {
        this.calibrationCanvas.width = 8 * 51;
        this.calibrationCanvas.height = 8 * 51;
        this.calibrationCanvas.style.backgroundColor="#000000";
        const context = this.calibrationCanvas.getContext("2d");

        if (context === null) {
            throw new Error("Can't get context");
        }

        for (let column=0; column<=50; column++){
            for (let row=0; row <=50; row++){
                this.drawCircle(column, row, calibrationGrid.getColourByColumnRow(column, row), context);
            }
        }
    }


    drawCircle(column: number, row: number, color: NumericTriple, context: CanvasRenderingContext2D) {
        const drawX = column * 8;
        const drawY = row * 8;

        context.fillStyle = `rgb(${color[0]},${color[1]},${color[2]})`;

        context.fillRect(drawX + 3, drawY + 2, 1, 1);
        context.fillRect(drawX + 4, drawY + 2, 1, 1);
        context.fillRect(drawX + 2, drawY + 3, 1, 1);
        context.fillRect(drawX + 3, drawY + 3, 1, 1);
        context.fillRect(drawX + 4, drawY + 3, 1, 1);
        context.fillRect(drawX + 5, drawY + 3, 1, 1);
        context.fillRect(drawX + 2, drawY + 4, 1, 1);
        context.fillRect(drawX + 3, drawY + 4, 1, 1);
        context.fillRect(drawX + 4, drawY + 4, 1, 1);
        context.fillRect(drawX + 5, drawY + 4, 1, 1);
        context.fillRect(drawX + 3, drawY + 5, 1, 1);
        context.fillRect(drawX + 4, drawY + 5, 1, 1);
    }
}