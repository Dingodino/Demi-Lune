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

import RenderEngine from "src/render/renderEngine";
import Renderable from "src/render/renderable";
import CameraEngine from "src/scene/cameraEngine";


export default class Texture extends Renderable
{
    //=======================
	// Constructors
	//=======================

    /**
     * Create a texture.
     */
    constructor ()
    {
        super();

        this.m_Image = 		null;
    }


    //=======================
    // Accessors
    //=======================

    /**
     * Get the image of the texture.
     * @returns {null|*}
     */
    getImage ()
    {
        return this.m_Image;
    }

    /**
     * Set the image of the texture.
     * @param a_Image : new image of the texture.
     */
    setImage (a_Image)
    {
        this.m_Image = a_Image;
    }
    
    
    //=======================
    // Operations
    //=======================

    /**
     * Draw the texture.
     */
    draw ()
    {
        var v2CamPos = CameraEngine.m_SceneNode.m_v2Pos;
        var v2PosInScreen = RenderEngine.convertScenePosToScreenPos(this.m_SceneNode.m_v2WorldPos, v2CamPos);

        var context = RenderEngine.context;
        context.save();
        context.translate(v2PosInScreen.x, v2PosInScreen.y);
        context.rotate(this.m_SceneNode.m_fWorldOrientation);
        context.scale(this.m_SceneNode.m_v2WorldScale.x, this.m_SceneNode.m_v2WorldScale.y);
        context.drawImage(this.m_Image, -0.5, -0.5, 1, 1);
        context.restore();
    }

    /**
     * Flip the texture horizontally.
     */
    horizontalFlip ()
    {
        this.m_SceneNode.m_v2Scale.x *= -1;
    }

    /**
     * Flip the texture vertically.
     */
    verticalFlip ()
    {
        this.m_SceneNode.m_v2Scale.y *= -1;
    }
}

console.debug('Texture.js loaded');