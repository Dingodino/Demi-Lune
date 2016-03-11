/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Nicolas DAURES
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *******************************************************************************************************************/

"use strict";

import TimeEngine from "src/core/timeEngine";
import CameraEngine from "src/scene/cameraEngine";
import "src/core/constants";


export default class AutoMoveCamera
{
	//=======================
	// Constructors
	//=======================

    /**
     * Create an auto-move behavior for camera.
     */
    constructor ()
    {
        this.m_v2Speed = new b2Vec2(20, 0);
    }


    //=======================
    // Operations
    //=======================

    /**
     * Update the camera behavior.
     */
    update ()
    {
        var fdt = TimeEngine.m_fDeltaTime;
        var v2CamPos = CameraEngine.m_SceneNode.m_v2Pos;
        v2CamPos.x += this.m_v2Speed.x * fdt;
        v2CamPos.y += this.m_v2Speed.y * fdt;
    }
}

console.debug('AutoMoveCamera.js loaded');