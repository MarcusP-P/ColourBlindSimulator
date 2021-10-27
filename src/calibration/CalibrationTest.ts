import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationImage } from "./CalibrationImage";
import { setupCalibration, Quadrant } from "./CalibrationSetup";


export class CalibrationTest {
    private readonly canvas: HTMLCanvasElement;
    private readonly parentDiv: HTMLDivElement;
    private readonly container: HTMLDivElement;

    private readonly calibrationImage: CalibrationImage;
    private lastTime:number;

    private readonly baseLuv: NumericTriple;
    private readonly testLuv: NumericTriple;

    public constructor(parentDiv: HTMLDivElement, baseLuv: NumericTriple, testLuv: NumericTriple) {
        this.parentDiv = parentDiv;

        this.container = document.createElement("div");
        this.parentDiv.appendChild(this.container);
        this.container.style.background = "#000000";
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.alignItems="center";
        this.container.style.justifyContent="center";
        this.container.style.display="flex";

        this.canvas = document.createElement("canvas");
        this.canvas.style.margin="auto";
        this.container.appendChild(this.canvas);

        this.calibrationImage = new CalibrationImage(this.canvas);

        this.baseLuv=baseLuv;
        this.testLuv=testLuv;

        this.lastTime=0;
    }

    public getCalibrationResult(): boolean {
        window.requestAnimationFrame((time:number) => {this.animate(time);});
        return false;
    }

    public animate(time: number): void {
        if (time-this.lastTime > 50)
        {
            const generatedGrid = setupCalibration(this.baseLuv, this.testLuv, Quadrant.North);
            this.calibrationImage.initialiseCanvas(generatedGrid);
            this.lastTime=time;
        }
        window.requestAnimationFrame((newTime:number) => {this.animate(newTime);});
    }
}