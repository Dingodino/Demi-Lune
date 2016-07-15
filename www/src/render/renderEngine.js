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
import {SceneEngine} from "src/scene/sceneEngine";
import {Camera} from "src/scene/camera";
import {Engine} from "src/core/engine";


export class RenderEngine extends Engine
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create the render engine.
     */
    constructor ()
    {
        super();

        this.m_aRenderables =		[];
        this.m_ClearColor = 		"#ffffff";
        this.m_v2CanvasSize     =	new b2Vec2(640, 480);
        this.m_v2CanvasHalfSize =	new b2Vec2(320, 240);
        this.m_bSortRenderables =   false;
        this.m_CurrentCamera = new Camera();

        SceneEngine.getInstance().getRootSceneNode().attachSceneNode(this.m_CurrentCamera.m_SceneNode);
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
            this.instance = new RenderEngine();
        }
        return this.instance;
    }

    /**
     * Set the canvas.
     * @param canvas : new canvas.
     */
    setCanvas (canvas)
    {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');
    }

    /**
     * Get the clear color.
     * @returns {string|*}
     */
    getClearColor ()
    {
        return this.m_ClearColor;
    }

    /**
     * Set the clear color.
     * @param a_ClearColor : new clear color.
     */
    setClearColor (a_ClearColor)
    {
        this.m_ClearColor = a_ClearColor;
    }

    /**
     * Get the canvas size.
     * @returns {*}
     */
    getCanvasSize ()
    {
        return this.m_v2CanvasSize;
    }

    /**
     * Set the canvas size.
     * @param a_v2CanvasSize : new canvas size.
     */
    setCanvasSize (a_v2CanvasSize)
    {
        this.m_v2CanvasSize.x = a_v2CanvasSize.x;
        this.m_v2CanvasSize.y = a_v2CanvasSize.y;
        this.m_v2CanvasHalfSize.x = a_v2CanvasSize.x * 0.5;
        this.m_v2CanvasHalfSize.y = a_v2CanvasSize.y * 0.5;
    }

    /**
     * Get the canvas half size.
     * @returns {*}
     */
    getCanvasHalfSize ()
    {
        return this.m_v2CanvasHalfSize;
    }
    
    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the render engine.
     */
    update ()
    {
        if (this.m_bSortRenderables)
        {
            this.sort();
            this.m_bSortRenderables = false;
        }

        this.context.fillStyle = this.m_ClearColor;
        this.context.fillRect(0, 0, this.m_v2CanvasSize.x, this.m_v2CanvasSize.y);
    
        // Display renderables
        for (let i = 0; i < this.m_aRenderables.length; i++)
        {
            this.m_aRenderables[i].draw();
        }
    }

    /**
     * Add a renderable to render engine.
     * @param a_Renderable : renderable to add.
     */
    addRenderable (a_Renderable)
    {
        this.m_aRenderables.push(a_Renderable);
        this.m_bSortRenderables = true;
    }

    /**
     * Remove the given renderable from the render engine.
     * @param a_Renderable : renderable to remove.
     */
    removeRenderable (a_Renderable)
    {
        for (let i = 0; i < this.m_aRenderables.length; i++)
        {
            if (this.m_aRenderables[i] == a_Renderable)
            {
                this.m_aRenderables.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Sort all renderable by priority.
     */
    sort ()
    {
        this.m_aRenderables.sort(function sortRenderableFunction(a_Renderable1, a_Renderable2)
        {
            if (a_Renderable1.getPriority() > a_Renderable2.getPriority()) return 1;
            if (a_Renderable1.getPriority() < a_Renderable2.getPriority()) return -1;
            return 0;
        });
    }

    /**
     * Convert a scene to position to screen position.
     * @param a_v2ScenePos : position to convert.
     * @param a_v2CamPos : camera's position.
     * @returns {*}
     */
    convertScenePosToScreenPos (a_v2ScenePos, a_v2CamPos)
    {
        let v2CanvasHalfSize = this.getCanvasHalfSize();
        return new b2Vec2(a_v2ScenePos.x - a_v2CamPos.x + v2CanvasHalfSize.x, -(a_v2ScenePos.y - a_v2CamPos.y) + v2CanvasHalfSize.y);
    }
}

console.debug('RenderEngine loaded');