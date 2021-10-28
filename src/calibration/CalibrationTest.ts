import type { NumericTriple } from "cie-colorconverter/dist/Matrix";
import { CalibrationImage } from "./CalibrationImage";
import { setupCalibration } from "./CalibrationSetup";
import { Quadrant, SectorUtilities } from "./SectorUtilities";

export class CalibrationTest {
    private readonly canvas: HTMLCanvasElement;
    private readonly parentDiv: HTMLDivElement;
    private readonly container: HTMLDivElement;

    private readonly calibrationImage: CalibrationImage;
    private lastTime: number;

    private readonly baseLuv: NumericTriple;
    private readonly testLuv: NumericTriple;

    private readonly quadrant: Quadrant;

    private animationRunning: boolean;

    public constructor(parentDiv: HTMLDivElement, baseLuv: NumericTriple, testLuv: NumericTriple) {
        this.parentDiv = parentDiv;

        this.container = document.createElement("div");
        this.parentDiv.appendChild(this.container);
        this.container.style.background = "#000000";
        this.container.style.width = "100%";
        this.container.style.height = "100%";
        this.container.style.alignItems = "center";
        this.container.style.justifyContent = "center";
        this.container.style.display = "flex";

        this.canvas = document.createElement("canvas");
        this.canvas.style.margin = "auto";
        this.container.appendChild(this.canvas);

        this.calibrationImage = new CalibrationImage(this.canvas);

        this.baseLuv = baseLuv;
        this.testLuv = testLuv;

        this.lastTime = 0;

        let quadrantSelector = Math.random();

        // to make sure we have equal chances of each quadrant, we need to exclude 1
        while (quadrantSelector === 1) {
            quadrantSelector = Math.random();
        }
        if (quadrantSelector < 0.125) {
            this.quadrant = Quadrant.North;
        }
        else if (quadrantSelector < 0.25) {
            this.quadrant = Quadrant.NorthEast;
        }
        else if (quadrantSelector < 0.375) {
            this.quadrant = Quadrant.East;
        }
        else if (quadrantSelector < 0.5) {
            this.quadrant = Quadrant.SouthEast;
        }
        else if (quadrantSelector < 0.625) {
            this.quadrant = Quadrant.South;
        }
        else if (quadrantSelector < 0.75) {
            this.quadrant = Quadrant.SouthWest;
        }
        else if (quadrantSelector < 0.875) {
            this.quadrant = Quadrant.West;
        }
        else {
            this.quadrant = Quadrant.NorthWest;
        }

        this.animationRunning = false;
    }

    // eslint-disable-next-line require-await
    public async getCalibrationResult(): Promise<boolean> {
        this.animationRunning = true;
        window.requestAnimationFrame((time: number) => { this.animate(time); });

        return new Promise<boolean>((resolve) => {
            this.canvas.addEventListener("click", (event) => {
                this.animationRunning = false;

                // convert the co-ordinate system from origin at top left, y increasing down to centered origin
                const x=event.offsetX-this.calibrationImage.originX;
                const y=this.calibrationImage.totalY-event.offsetY-this.calibrationImage.originY;
                const sectorDefinition = SectorUtilities.GetSectorDefinition(this.quadrant);
                const correctClick = SectorUtilities.IsPointInSector(x,y,sectorDefinition);
                console.log(`OffsetX=${event.offsetX}, OffsetY=${event.offsetY}, X=${x}, Y=${y}, correct=${correctClick?"true":"false"}`);
                resolve(correctClick);
            }, { once: true });
        });
    }

    public animate(time: number): void {
        if (this.animationRunning) {
            if (time - this.lastTime > 50) {
                const generatedGrid = setupCalibration(this.baseLuv, this.testLuv, this.quadrant);
                this.calibrationImage.initialiseCanvas(generatedGrid);
                this.lastTime = time;
            }
            window.requestAnimationFrame((newTime: number) => { this.animate(newTime); });
        }
    }
}