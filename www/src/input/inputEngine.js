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

import Keyboard from "src/input/keyboard";
import Mouse from "src/input/mouse";
import TouchScreen from "src/input/touchScreen";
import InputState from "src/input/inputState";
import "src/core/constants";


class InputEngine
{
	//=======================
	// Constructors
	//=======================

    /**
     * Create the input engine.
     */
    constructor ()
    {
        this.m_Keyboard =		Keyboard;
        this.m_Mouse =			Mouse;
        this.m_TouchScreen =	TouchScreen;

        this.initialize();
    }


    //=======================
    // Operations
    //=======================

    /**
     * Initialize the input engine.
     */
    initialize ()
    {
        for (let i = 0; i < this.m_Keyboard.m_aKeys.length; i++)
        {
            this.m_Keyboard.m_aKeys[i] = InputState.NONE;
        }
        for (let i = 0; i < this.m_Mouse.m_aButtons.length; i++)
        {
            this.m_Mouse.m_aButtons[i] = InputState.NONE;
        }
        this.m_TouchScreen.m_State = InputState.NONE;
    }

    /**
     * Update the input engine.
     */
    update ()
    {
        this.m_Keyboard.update();
        this.m_Mouse.update();
        this.m_TouchScreen.update();
    }
}




/****************************************************************
 * Input functions
 ****************************************************************/

// Keyboard event listener
window.onkeydown = function onKeyDown(a_Event)
{
    Keyboard.m_aKeys[a_Event.keyCode] = InputState.GOTO_PRESSED;
}

// Keyboard event listener
window.onkeyup = function onKeyUp(a_Event)
{
    Keyboard.m_aKeys[a_Event.keyCode] = InputState.GOTO_RELEASED;
}

var canvas = document.getElementById('canvas');
if (canvas)
{
    // Mouse event listener
    canvas.onmousedown = function onMouseDown(a_Event)
    {
        Mouse.m_aButtons[a_Event.button] = InputState.GOTO_PRESSED;
    }

    // Mouse event listener
    canvas.onmouseup = function onMouseUp(a_Event)
    {
        Mouse.m_aButtons[a_Event.button] = InputState.GOTO_RELEASED;
    }

    // Mouse event listener
    canvas.onmousemove = function onMouseMove(a_Event)
    {
        var v2MousePos = Mouse.m_v2Pos;

        if (a_Event.pageX || a_Event.pageY)
        {
            v2MousePos.x = a_Event.pageX;
            v2MousePos.y = a_Event.pageY;
        }
        else
        {
            v2MousePos.x = a_Event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            v2MousePos.y = a_Event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        var v2Offset = new b2Vec2();
        v2Offset.x = 0;
        v2Offset.y = 0;
        var canvas = document.getElementById('canvas');
        var currentElement = canvas;
        while(currentElement)
        {
            v2Offset.x += currentElement.offsetLeft;
            v2Offset.y += currentElement.offsetTop;
            currentElement = currentElement.offsetParent
        }

        v2MousePos.x -= v2Offset.x;
        v2MousePos.y -= v2Offset.y;
    }

    // Touch event listener
    canvas.ontouchstart = function onTouchStart()
    {
        TouchScreen.m_State = InputState.GOTO_PRESSED;
    }

    // Touch event listener
    canvas.ontouchend = function onTouchEnd()
    {
        TouchScreen.m_State = InputState.GOTO_RELEASED;
    }

    // Touch event listener
    canvas.ontouchmove = function onTouchMove(a_Event)
    {
        var v2TouchPos = TouchScreen.m_v2Pos;
        TouchScreen.m_State = InputState.GOTO_PRESSED;
        if (a_Event.originalEvent && a_Event.originalEvent.touches && a_Event.originalEvent.touches[0])
        {
            v2TouchPos.x = a_Event.originalEvent.touches[0].pageX;
            v2TouchPos.y = a_Event.originalEvent.touches[0].pageY;
        }
    }
}

export default new InputEngine();

console.debug('InputEngine.js loaded');