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
import TimeEngine from "src/core/timeEngine";
import CameraEngine from "src/scene/cameraEngine";


export default class AnimationPlayer extends Renderable
{
    //=======================
	// Constructors
	//=======================

    /**
     * Create an animation player.
     */
    constructor ()
    {
        super();

        this.m_SpriteSheet = 			null;
        this.m_aAnimations = 			new Array();
        this.m_iCurrentAnimation =	    0;
        this.m_fCurrentTime = 		    0;
        this.m_iCurrentFrameLine = 	    0;
        this.m_iCurrentFrameColumn =    0;
        this.m_bHFlip = 				false;
        this.m_bVFlip = 				false;
    }


    //=======================
    // Accessors
    //=======================

    /**
     * Get the sprite sheet.
     * @returns {null|*}
     */
    getSpriteSheet ()
    {
        return this.m_SpriteSheet;
    }

    /**
     * Set the sprite sheet.
     * @param a_SpriteSheet : new sprite sheet.
     */
    setSpriteSheet (a_SpriteSheet)
    {
        this.m_SpriteSheet = a_SpriteSheet;
    }

    /**
     * Get the animations.
     * @returns {Array|*}
     */
    getAnimations ()
    {
        return this.m_aAnimations;
    }

    /**
     * Set the animations.
     * @param a_aAnimations : new animations.
     */
    setAnimations (a_aAnimations)
    {
        this.m_aAnimations = a_aAnimations;
    }

    /**
     * Get the current animation index.
     * @returns {number|*}
     */
    getCurrentAnimation ()
    {
        return this.m_iCurrentAnimation;
    }

    /**
     * Set the current animation index.
     * @param a_iCurrentAnimation : current animation index.
     */
    setCurrentAnimation (a_iCurrentAnimation)
    {
        this.m_iCurrentAnimation = a_iCurrentAnimation;
    }

    /**
     * Get the current time.
     * @returns {number|*}
     */
    getCurrentTime ()
    {
        return this.m_fCurrentTime;
    }

    /**
     * Set the current time.
     * @param a_fCurrentTime : new current time.
     */
    setCurrentTime (a_fCurrentTime)
    {
        this.m_fCurrentTime = a_fCurrentTime;
    }

    /**
     * Get the current frame line.
     * @returns {number|*}
     */
    getCurrentFrameLine ()
    {
        return this.m_iCurrentFrameLine;
    }

    /**
     * Set the current frame line.
     * @param a_iCurrentFrameLine : new current frame line.
     */
    setCurrentFrameLine (a_iCurrentFrameLine)
    {
        this.m_iCurrentFrameLine = a_iCurrentFrameLine;
    }

    /**
     * Get the current frame column.
     * @returns {number|*}
     */
    getCurrentFrameColumn ()
    {
        return this.m_iCurrentFrameColumn;
    }

    /**
     * Set the current frame column.
     * @param a_iCurrentFrameColumn : new current frame column.
     */
    setCurrentFrameColumn (a_iCurrentFrameColumn)
    {
        this.m_iCurrentFrameColumn = a_iCurrentFrameColumn;
    }
    
    
    //=======================
    // Operations
    //=======================

    /**
     * Draw the current animation.
     */
    draw ()
    {
        this.update();
    
        var v2CamPos = CameraEngine.m_SceneNode.m_v2Pos;
        var v2PosInScreen = RenderEngine.convertScenePosToScreenPos(this.m_SceneNode.m_v2WorldPos, v2CamPos);

        var context = RenderEngine.context;
        context.save();
        context.translate(v2PosInScreen.x, v2PosInScreen.y);
        context.rotate(this.m_SceneNode.m_fWorldOrientation);
        context.scale(this.m_SceneNode.m_v2WorldScale.x, this.m_SceneNode.m_v2WorldScale.y);
        context.drawImage(this.m_SpriteSheet.m_Image,
            this.m_iCurrentFrameColumn * this.m_SpriteSheet.m_v2FrameSize.x,
            this.m_iCurrentFrameLine * this.m_SpriteSheet.m_v2FrameSize.y,
            this.m_SpriteSheet.m_v2FrameSize.x, this.m_SpriteSheet.m_v2FrameSize.y,
            -0.5, -0.5,
            1, 1);
        context.restore();
    }

    /**
     * Update the animation player.
     */
    update ()
    {
        var animation = this.m_aAnimations[this.m_iCurrentAnimation];
    
        this.m_fCurrentTime += TimeEngine.m_fDeltaTime;
        if (this.m_fCurrentTime >= animation.m_fDuration)
        {
            this.m_fCurrentTime -= animation.m_fDuration;
        }
    
        var iFrameCount = animation.m_iFrameCount;
        var iFrameIndex = animation.m_aFrameIndexes[Math.floor(this.m_fCurrentTime * iFrameCount/ animation.m_fDuration)];
        this.m_iCurrentFrameLine = Math.floor(iFrameIndex / this.m_SpriteSheet.m_iColumnCount);
        this.m_iCurrentFrameColumn = iFrameIndex % this.m_SpriteSheet.m_iColumnCount;
    }

    /**
     * Flip the player horizontally.
     */
    horizontalFlip ()
    {
        this.m_bHFlip = !this.m_bHFlip;
        this.m_SceneNode.m_v2Scale.x *= -1;
    }

    /**
     * Flip the player vertically.
     */
    verticalFlip ()
    {
        this.m_bVFlip = !this.m_bVFlip;
        this.m_SceneNode.m_v2Scale.y *= -1;
    }
}

console.debug('AnimationPlayer.js loaded');