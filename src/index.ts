import "./helloWorld.ts"

import { ColorConverter } from 'cie-colorconverter'

let converter = new ColorConverter()

converter.RefWhite = "D65";

let LuvNewNew = converter.RGB_to_Luv([119, 119, 119]);
let RGBNewNew = converter.Luv_to_RGB([50, 0, 0]);
