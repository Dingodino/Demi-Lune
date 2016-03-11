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

import "src/core/constants";


export default class SpriteSheet
{
	//=======================
	// Constructors
	//=======================

    /**
     * Create a sprite sheet.
     */
    constructor ()
    {
        this.m_Image = 		    null;
        this.m_iFrameCount = 	0;
        this.m_iLineCount = 	0;
        this.m_iColumnCount =	0;
        this.m_v2FrameSize = 	new b2Vec2();
    }


    //=======================
    // Accessors
    //=======================

    /**
     * Get the image of the sprite sheet.
     * @returns {null|*}
     */
    getImage ()
    {
        return this.m_Image;
    }

    /**
     * Set the image of the sprite sheet.
     * @param a_Image : new image of the sprite sheet.
     */
    setImage (a_Image)
    {
        this.m_Image = a_Image;
    }

    /**
     * Get the number of frames in the sprite sheet.
     * @returns {number|*}
     */
    getFrameCount ()
    {
        return this.m_iFrameCount;
    }

    /**
     * Set the number of frames of the sprite sheet.
     * @param a_iFrameCount : new frame count.
     */
    setFrameCount (a_iFrameCount)
    {
        this.m_iFrameCount = a_iFrameCount;
    }

    /**
     * Get the number of lines in the sprite sheet.
     * @returns {number|*}
     */
    getLineCount ()
    {
        return this.m_iLineCount;
    }

    /**
     * Set the number of lines of the sprite sheet.
     * @param a_iLineCount : new line count.
     */
    setLineCount (a_iLineCount)
    {
        this.m_iLineCount = a_iLineCount;
    }

    /**
     * Get the number of column in the sprite sheet.
     * @returns {number|*}
     */
    getColumnCount ()
    {
        return this.m_iColumnCount;
    }

    /**
     * Set the number of column of the sprite sheet.
     * @param a_iColumnCount : new column count.
     */
    setColumnCount (a_iColumnCount)
    {
        this.m_iColumnCount = a_iColumnCount;
    }

    /**
     * Get the size of a frame.
     * @returns {*}
     */
    getFrameSize ()
    {
        return this.m_v2FrameSize;
    }

    /**
     * Set the size of a frame.
     * @param a_v2FrameSize : new size of a frame.
     */
    setFrameSize (a_v2FrameSize)
    {
        this.m_v2FrameSize.x = a_v2FrameSize.x;
        this.m_v2FrameSize.y = a_v2FrameSize.y;
    }
}

console.debug('SpriteSheet.js loaded');