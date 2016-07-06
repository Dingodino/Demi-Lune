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

import {InputState} from "src/input/inputState";


// Keyboard state
export class Keyboard
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create a keyboard.
     */
    constructor ()
    {
        this.m_aKeys =	new Array(222);
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
            this.instance = new Keyboard();
        }
        return this.instance;
    }

    /**
     * Get the key's state of the given index.
     * @param a_KeyIndex : index of the key.
     * @returns {*}
     */
    getKeyState (a_KeyIndex)
    {
        return this.m_aKeys[a_KeyIndex];
    }
    
    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the keyboard state.
     */
    update ()
    {
        for (let i = 0; i < this.m_aKeys.length; i++)
        {
            let keyState = this.m_aKeys[i];
            if (keyState == InputState.GOTO_PRESSED)
            {
                this.m_aKeys[i] = InputState.PRESSED;
            }
            else if (keyState == InputState.PRESSED)
            {
                this.m_aKeys[i] = InputState.HOLD;
            }
            else if (keyState == InputState.GOTO_RELEASED)
            {
                this.m_aKeys[i] = InputState.RELEASED;
            }
        }
    }
}

console.debug('Keyboard loaded');