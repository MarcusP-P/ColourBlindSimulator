import fscreen from "fscreen";

// Get the canvas element form the page
const canvas = document.querySelector("canvas");



function fullscreen() {
    const el = document.getElementById("calibrationCanvas");
    
    if (el) {
        fscreen.requestFullscreen(el);
    }
}

if (canvas) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.addEventListener("click", fullscreen);
}
