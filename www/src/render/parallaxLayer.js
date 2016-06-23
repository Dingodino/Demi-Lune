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

import {b2Vec2} from "src/core/constants";
import RenderEngine from "src/render/renderEngine";
import {Renderable} from "src/render/renderable";
import CameraEngine from "src/scene/cameraEngine";


export class ParallaxLayer extends Renderable
{
    //===================================================================
	// Constructors
	//===================================================================

    /**
     * Create a parallax layer.
     */
    constructor ()
    {
        super();

        this.m_Image =      null;
        this.m_v2Factor =   new b2Vec2();
        this.m_bRepeatOnX = true;
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the image of this layer.
     * @returns {null|*}
     */
    getImage ()
    {
        return this.m_Image;
    }

    /**
     * Set the image.
     * @param a_Image : new image.
     */
    setImage (a_Image)
    {
        this.m_Image = a_Image;
    }

    /**
     * Get the move factor.
     * @returns {*}
     */
    getFactor ()
    {
        return this.m_v2Factor;
    }

    /**
     * Set the move factor.
     * @param a_v2Factor : new move factor.
     */
    setFactor (a_v2Factor)
    {
        this.m_v2Factor = a_v2Factor;
    }

    /**
     * Tests if repeat on X axis.
     * @returns {boolean|*}
     */
    isRepeatOnX ()
    {
        return this.m_bRepeatOnX;
    }

    /**
     * Set repeat on X axis.
     * @param a_bRepeatOnX : true if repeat on X axis.
     */
    setRepeatOnX (a_bRepeatOnX)
    {
        this.m_bRepeatOnX = a_bRepeatOnX;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Move the parallax layer.
     * @param a_v2Move : move quantity.
     */
    move (a_v2Move)
    {
        this.m_SceneNode.m_v2Pos.x += a_v2Move.x * this.m_v2Factor.x;
        this.m_SceneNode.m_v2Pos.y += a_v2Move.y * this.m_v2Factor.y;
    }

    /**
     * Draw the image of the parallax layer.
     */
    draw ()
    {
        let v2LayerPos = new b2Vec2(this.m_SceneNode.m_v2WorldPos.x, this.m_SceneNode.m_v2WorldPos.y);
        let v2LayerScale = this.m_SceneNode.m_v2WorldScale;
        let v2CamPos = CameraEngine.m_SceneNode.m_v2Pos;
        let v2PosInScreen, context;
        if (this.m_bRepeatOnX)
        {
            let fLayerPosXMin = v2CamPos.x - RenderEngine.getCanvasHalfSize().x;
            let fLayerPosXMax = v2CamPos.x + RenderEngine.getCanvasHalfSize().x;
            let fDistanceX = v2CamPos.x - v2LayerPos.x;
            let fDelta = (fDistanceX / v2LayerScale.x) % 1;
            v2LayerPos.x = fLayerPosXMin - (1.0 - fDelta) * v2LayerScale.x;

            while (v2LayerPos.x - v2LayerScale.x * 0.5 < fLayerPosXMax)
            {
                v2PosInScreen = RenderEngine.convertScenePosToScreenPos(v2LayerPos, v2CamPos);

                context = RenderEngine.context;
                context.save();
                context.translate(v2PosInScreen.x, v2PosInScreen.y);
                context.rotate(this.m_SceneNode.m_fWorldOrientation);
                context.scale(v2LayerScale.x, v2LayerScale.y);
                context.drawImage(this.m_Image, -0.5, -0.5, 1, 1);
                context.restore();

                v2LayerPos.x += this.m_SceneNode.m_v2WorldScale.x;
            }
        }
        else
        {
            v2PosInScreen = RenderEngine.convertScenePosToScreenPos(v2LayerPos, v2CamPos);

            context = RenderEngine.context;
            context.save();
            context.translate(v2PosInScreen.x, v2PosInScreen.y);
            context.rotate(this.m_SceneNode.m_fWorldOrientation);
            context.scale(v2LayerScale.x, v2LayerScale.y);
            context.drawImage(this.m_Image, -0.5, -0.5, 1, 1);
            context.restore();
        }
    }
}

console.debug('ParallaxLayer.js loaded');