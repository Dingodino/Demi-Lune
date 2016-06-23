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
import InputState from "src/input/inputState";


class TouchScreen
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create the touch screen state.
     */
    constructor ()
    {
        this.m_State =		InputState.NONE;
        this.m_v2Pos =	    new b2Vec2(0, 0);
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the state of the touch screen.
     * @returns {number|*}
     */
    getState ()
    {
        return this.m_State;
    }
    
    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the touch screen state.
     */
    update ()
    {
        if (this.m_State == InputState.GOTO_PRESSED)
        {
            this.m_State = InputState.PRESSED;
        }
        else if (this.m_State == InputState.PRESSED)
        {
            this.m_State = InputState.HOLD;
        }
        else if (this.m_State == InputState.GOTO_RELEASED)
        {
            this.m_State = InputState.RELEASED;
        }
        else if (this.m_State == InputState.RELEASED)
        {
            this.m_State = InputState.NONE;
        }
    }
}

export default new TouchScreen();

console.debug('TouchScreen.js loaded');