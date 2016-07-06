"use strict";

// import Demi-Lune application
import Application from "src/core/application";


/****************************************************************
 * Game launcher
 ****************************************************************/

// TODO : replace by window.onload
setTimeout(function ()
{
    // Get the canvas
    let canvas = document.getElementById('canvas');
    Application.setCanvas(canvas);

    // Initialize the application
    Application.initialize();

    // Start the application
    Application.run(16); // ~60 fps

}, 2000);
