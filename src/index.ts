import { helloWorld } from './helloWorld'

import { ColorConverter } from 'cie-colorconverter'

let converter = new ColorConverter()

converter.RefWhite = "D65";

let LuvNewNew = converter.RGB_to_Luv([119, 119, 119]);
console.log(`RGB 119, 119, 119=Luv${LuvNewNew[0]}, ${LuvNewNew[1]}, ${LuvNewNew[2]}`);
let RGBNewNew = converter.Luv_to_RGB([50, 0, 0]);
console.log(`Luv 50, 0, 0=RGB${RGBNewNew[0]}, ${RGBNewNew[1]}, ${RGBNewNew[2]}`);

helloWorld();