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

import {Text2D} from "src/render/text2D";


class TimeEngine
{
    //===================================================================
	// Constructors
	//===================================================================

    /**
     * Create the time engine.
     */
    constructor ()
    {
        this.m_fTime =		(new Date()).getTime();
        this.m_fTotalTime =	0;
        this.m_fDeltaTime =	0;

        this.m_iFps =		60;
        this.m_FpsText =	new Text2D();
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the current time (current date).
     * @returns {number|*}
     */
    getCurrentTime ()
    {
        return this.m_fTime;
    }

    /**
     * Get the total time since time engine creation.
     * @returns {number|*}
     */
    getTotalTime ()
    {
        return this.m_fTotalTime;
    }

    /**
     * Get the delta time since last update.
     * @returns {number|*}
     */
    getDeltaTime ()
    {
        return this.m_fDeltaTime;
    }

    /**
     * Get the number of frames per second.
     * @returns {number|*}
     */
    getFPS ()
    {
        return this.m_iFps;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the time engine.
     */
    update ()
    {
        // Compute the delta time and total time
        let fNewTime = (new Date()).getTime();
        this.m_fDeltaTime = (fNewTime - this.m_fTime) * 0.001;
        this.m_fTime = fNewTime;
        this.m_fTotalTime += this.m_fDeltaTime;

        // TODO : save last 10 fps
        let iFPS = Math.floor(1 / this.m_fDeltaTime);
        this.m_iFps = Math.floor((this.m_iFps * 9 + iFPS) * 0.1);
        this.m_FpsText.m_Text = "FPS : " + this.m_iFps;
        if (this.m_iFps > 50)
        {
            this.m_FpsText.m_Color = "#00FF00";
        }
        else if (this.m_iFps > 30)
        {
            this.m_FpsText.m_Color = "#FFAA00";
        }
        else
        {
            this.m_FpsText.m_Color = "#FF0000";
        }
    }
}

export default new TimeEngine();

console.debug('TimeEngine.js loaded');