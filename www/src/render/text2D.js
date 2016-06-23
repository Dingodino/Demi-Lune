/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Nicolas DAURES
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
import {Renderable} from "src/render/renderable";
import CameraEngine from "src/scene/cameraEngine";


export class Text2D extends Renderable
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create a text 2D.
     */
    constructor ()
    {
        super();

        this.m_Color = 		"#000000";
        this.m_Font = 		"italic small-caps bold 12px arial";
        this.m_Text = 		"Text";
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the color of the text.
     * @returns {string|*}
     */
    getColor ()
    {
        return this.m_Color;
    }

    /**
     * Set the color of the text.
     * @param a_Color : new color of the text.
     */
    setColor (a_Color)
    {
        this.m_Color = a_Color;
    }

    /**
     * Get the font.
     * @returns {string|*}
     */
    getFont ()
    {
        return this.m_Font;
    }

    /**
     * Set the font.
     * @param a_Font : new font.
     */
    setFont (a_Font)
    {
        this.m_Font = a_Font;
    }

    /**
     * Get the text.
     * @returns {string|*}
     */
    getText ()
    {
        return this.m_Text;
    }

    /**
     * Set the text.
     * @param a_Text : new text.
     */
    setText (a_Text)
    {
        this.m_Text = a_Text;
    }
    
    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Draw the text.
     */
    draw ()
    {
        let v2CamPos = CameraEngine.m_SceneNode.m_v2Pos;
        let v2PosInScreen = RenderEngine.convertScenePosToScreenPos(this.m_SceneNode.m_v2WorldPos, v2CamPos);

        // TODO : add accessor
        let context = RenderEngine.context;
        context.save();
        context.translate(v2PosInScreen.x, v2PosInScreen.y);
        context.rotate(this.m_SceneNode.m_fWorldOrientation);
        context.scale(this.m_SceneNode.m_v2WorldScale.x, this.m_SceneNode.m_v2WorldScale.y);
        context.fillStyle = this.m_Color;
        context.font = this.m_Font;
        context.fillText(this.m_Text, 0, 0);
        context.restore();
    }
}

console.debug('Text2D.js loaded');