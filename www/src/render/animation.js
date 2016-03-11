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


export default class Animation
{
	//=======================
	// Constructors
	//=======================

    /**
     * Create an animation.
     */
    constructor ()
    {
        this.m_SpriteSheet =	null;
        this.m_aFrameIndexes =  new Array();
        this.m_iFrameCount = 	0;
        this.m_fDuration = 		0;
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
     * Get the frame indexes.
     * @returns {Array|*}
     */
    getFrameIndexes ()
    {
        return this.m_aFrameIndexes;
    }

    /**
     * Set the frame indexes.
     * @param a_aFrameIndexes : new frame indexes.
     */
    setFrameIndexes (a_aFrameIndexes)
    {
        this.m_aFrameIndexes = a_aFrameIndexes;
    }

    /**
     * Get the frame count.
     * @returns {number|*}
     */
    getFrameCount ()
    {
        return this.m_iFrameCount;
    }

    /**
     * Set the frame count.
     * @param a_iFrameCount : new frame count.
     */
    setFrameCount (a_iFrameCount)
    {
        this.m_iFrameCount = a_iFrameCount;
    }

    /**
     * Get the frame duration.
     * @returns {number|*}
     */
    getDuration ()
    {
        return this.m_fDuration;
    }

    /**
     * Set the frame duration.
     * @param a_fDuration : new frame duration.
     */
    setDuration (a_fDuration)
    {
        this.m_fDuration = a_fDuration;
    }
}

console.debug('Animation.js loaded');