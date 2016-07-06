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

import {Keyboard} from "src/input/keyboard";
import {Mouse} from "src/input/mouse";
import {TouchScreen} from "src/input/touchScreen";
import {InputState} from "src/input/inputState";
import {b2Vec2} from "src/core/constants";
import {Engine} from "src/core/engine";


export class InputEngine extends Engine
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create the input engine.
     */
    constructor ()
    {
        super();

        this.m_Keyboard =		Keyboard.getInstance();
        this.m_Mouse =			Mouse.getInstance();
        this.m_TouchScreen =	TouchScreen.getInstance();

        this.initialize();
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
            this.instance = new InputEngine();
        }
        return this.instance;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Initialize the input engine.
     */
    initialize ()
    {
        // Initialize input states
        for (let i = 0; i < this.m_Keyboard.m_aKeys.length; i++)
        {
            this.m_Keyboard.m_aKeys[i] = InputState.RELEASED;
        }
        for (let i = 0; i < this.m_Mouse.m_aButtons.length; i++)
        {
            this.m_Mouse.m_aButtons[i] = InputState.RELEASED;
        }
        this.m_TouchScreen.m_State = InputState.RELEASED;

        // Initialize key callbacks
        let self = this;
        window.onkeydown = function onKeyDown(a_Event) { self.onKeyDown(a_Event); };
        window.onkeyup = function onKeyUp(a_Event) { self.onKeyUp(a_Event); };

        // Initialize mouse callbacks
        let canvas = document.getElementById('canvas');
        if (canvas)
        {
            canvas.onmousedown = function onMouseDown(a_Event) { self.onMouseDown(a_Event); };
            canvas.onmouseup = function onMouseUp(a_Event) { self.onMouseUp(a_Event); };
            canvas.onmousemove = function onMouseMove(a_Event) { self.onMouseMove(a_Event); };

            canvas.ontouchstart = function onTouchStart(a_Event) { self.onTouchStart(a_Event); };
            canvas.ontouchend = function ontouchend(a_Event) { self.onTouchEnd(a_Event); };
            canvas.ontouchmove = function onTouchMove(a_Event) { self.onTouchMove(a_Event); };
        }
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


    //===================================================================
    // Callbacks
    //===================================================================

    /**
     * Called when key is pressed.
     * @param a_Event
     */
    onKeyDown(a_Event)
    {
        this.m_Keyboard.m_aKeys[a_Event.keyCode] = InputState.GOTO_PRESSED;
    }

    /**
     * Called when key is released.
     * @param a_Event
     */
    onKeyUp(a_Event)
    {
        this.m_Keyboard.m_aKeys[a_Event.keyCode] = InputState.GOTO_RELEASED;
    }

    /**
     * Called when mouse button is pressed.
     * @param a_Event
     */
    onMouseDown(a_Event)
    {
        this.m_Mouse.m_aButtons[a_Event.button] = InputState.GOTO_PRESSED;
    }

    /**
     * Called when mouse button is released.
     * @param a_Event
     */
    onMouseUp(a_Event)
    {
        this.m_Mouse.m_aButtons[a_Event.button] = InputState.GOTO_RELEASED;
    }

    /**
     * Called when mouse move.
     * @param a_Event
     */
    onMouseMove(a_Event)
    {
        let v2MousePos = this.m_Mouse.m_v2Pos;

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

        let v2Offset = new b2Vec2();
        v2Offset.x = 0;
        v2Offset.y = 0;
        let canvas = document.getElementById('canvas');
        let currentElement = canvas;
        while(currentElement)
        {
            v2Offset.x += currentElement.offsetLeft;
            v2Offset.y += currentElement.offsetTop;
            currentElement = currentElement.offsetParent
        }

        v2MousePos.x -= v2Offset.x;
        v2MousePos.y -= v2Offset.y;
    }

    /**
     * Called when screen is touched.
     * @param a_Event
     */
    onTouchStart()
    {
        this.m_TouchScreen.m_State = InputState.GOTO_PRESSED;
    }

    /**
     * Called when screen is released.
     * @param a_Event
     */
    onTouchEnd()
    {
        this.m_TouchScreen.m_State = InputState.GOTO_RELEASED;
    }

    /**
     * Called when touch move.
     * @param a_Event
     */
    onTouchMove(a_Event)
    {
        let v2TouchPos = this.m_TouchScreen.m_v2Pos;
        TouchScreen.m_State = InputState.GOTO_PRESSED;
        if (a_Event.originalEvent && a_Event.originalEvent.touches && a_Event.originalEvent.touches[0])
        {
            v2TouchPos.x = a_Event.originalEvent.touches[0].pageX;
            v2TouchPos.y = a_Event.originalEvent.touches[0].pageY;
        }
    }
}

console.debug('InputEngine loaded');