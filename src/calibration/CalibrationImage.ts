import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import type { CalibrationGrid } from "./CalibrationGrid";

export class CalibrationImage {
    private readonly calibrationCanvas: HTMLCanvasElement;

    private readonly context: CanvasRenderingContext2D;
    public readonly originX=51*8/2;
    public readonly originY=51*8/2;
    public readonly totalX=51*8;
    public readonly totalY=51*8;

    public constructor(calibrationCanvas: HTMLCanvasElement) {
        this.calibrationCanvas = calibrationCanvas;
        this.calibrationCanvas.width = 8 * 51;
        this.calibrationCanvas.height = 8 * 51;
        this.calibrationCanvas.style.backgroundColor = "#000000";
        const myContext = this.calibrationCanvas.getContext("2d");
        if (myContext===null){
            throw new Error("Can't get context");
        }
        this.context=myContext;
        this.context.globalCompositeOperation = "source-over";
    }

    public initialiseCanvas(calibrationGrid: CalibrationGrid): void {
        for (let column = 0; column <= 50; column++) {
            for (let row = 0; row <= 50; row++) {
                CalibrationImage.drawCircle(column, row, calibrationGrid.getColourByColumnRow(column, row), this.context);
            }
        }
    }


    private static drawCircle(column: number, row: number, color: NumericTriple, context: CanvasRenderingContext2D): void {
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