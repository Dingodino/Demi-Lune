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
import {InputState} from "src/input/inputState";


export class Mouse
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create the mouse state.
     */
    constructor ()
    {
        this.m_aButtons =	new Array(3);
        this.m_v2Pos =	    new b2Vec2(0, 0);
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the unique instance of this class.
     * @returns {*}
     */
    static getInstance()
    {
        if(!this.instance)
        {
            this.instance = new Mouse();
        }
        return this.instance;
    }

    /**
     * Get the state of the mouse's button with given index.
     * @param a_MouseButtonIndex : index of the button.
     * @returns {*}
     */
    getMouseButtonState (a_MouseButtonIndex)
    {
        return this.m_aButtons[a_MouseButtonIndex];
    }
    
    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the mouse state.
     */
    update ()
    {
        for (let i = 0; i < this.m_aButtons.length; i++)
        {
            let buttonState = this.m_aButtons[i];
            if (buttonState == InputState.GOTO_PRESSED)
            {
                this.m_aButtons[i] = InputState.PRESSED;
            }
            else if (buttonState == InputState.PRESSED)
            {
                this.m_aButtons[i] = InputState.HOLD;
            }
            else if (buttonState == InputState.GOTO_RELEASED)
            {
                this.m_aButtons[i] = InputState.RELEASED;
            }
        }
    }
}

console.debug('Mouse loaded');