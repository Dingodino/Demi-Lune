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


export class SceneNode
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create a scene node.
     */
    constructor ()
    {
        this.m_ParentNode =			null;
        this.m_aChildNodes = 		[];
        this.m_v2Pos = 				new b2Vec2(0, 0);
        this.m_v2Scale = 			new b2Vec2(1, 1);
        this.m_fOrientation =		0;
        this.m_v2WorldPos =			new b2Vec2(0, 0);
        this.m_v2WorldScale = 		new b2Vec2(1, 1);
        this.m_fWorldOrientation =	0;
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the parent node.
     * @returns {null}
     */
    getParentNode ()
    {
        return this.m_ParentNode;
    }

    /**
     * Get the chdil nodes.
     * @returns {Array|*}
     */
    getChildNodes ()
    {
        return this.m_aChildNodes;
    }

    /**
     * Get the position.
     * @returns {*}
     */
    getPosition ()
    {
        return this.m_v2Pos;
    }

    /**
     * Set the position.
     * @param a_v2Pos : new position.
     */
    setPosition (a_v2Pos)
    {
        this.m_v2Pos = a_v2Pos;
    }

    /**
     * Get the scale.
     * @returns {*}
     */
    getScale ()
    {
        return this.m_v2Scale;
    }

    /**
     * Set the scale.
     * @param a_v2Scale : new scale.
     */
    setScale (a_v2Scale)
    {
        this.m_v2Scale = a_v2Scale;
    }

    /**
     * Get the orientation.
     * @returns {number|*}
     */
    getOrientation ()
    {
        return this.m_fOrientation;
    }

    /**
     * Set the orientation.
     * @param a_fOrientation : enw orientation.
     */
    setOrientation (a_fOrientation)
    {
        this.m_fOrientation = a_fOrientation;
    }

    /**
     * Get the computed world position.
     * @returns {*}
     */
    getWorldPosition ()
    {
        return this.m_v2WorldPos;
    }

    /**
     * Get the computed world scale.
     * @returns {*}
     */
    getWorldScale ()
    {
        return this.m_v2WorldScale;
    }

    /**
     * Get the computed world orientation.
     * @returns {*}
     */
    getWorldOrientation ()
    {
        return this.m_fWorldOrientation;
    }
    
    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the scene node (position, scale, orientation).
     */
    update ()
    {
        if (this.m_ParentNode != null)
        {
            this.m_v2WorldPos.x = this.m_ParentNode.m_v2Pos.x + this.m_v2Pos.x;
            this.m_v2WorldPos.y = this.m_ParentNode.m_v2Pos.y + this.m_v2Pos.y;
            this.m_v2WorldScale.x = this.m_ParentNode.m_v2Scale.x * this.m_v2Scale.x;
            this.m_v2WorldScale.y = this.m_ParentNode.m_v2Scale.y * this.m_v2Scale.y;
            this.m_fWorldOrientation = this.m_ParentNode.m_fOrientation + this.m_fOrientation;
        }
        else
        {
            this.m_v2WorldPos.x = this.m_v2Pos.x;
            this.m_v2WorldPos.y = this.m_v2Pos.y;
            this.m_v2WorldScale.x = this.m_v2Scale.x;
            this.m_v2WorldScale.y = this.m_v2Scale.y;
            this.m_fWorldOrientation = this.m_fOrientation;
        }
    
        for (let i = 0; i < this.m_aChildNodes.length; i++)
        {
            this.m_aChildNodes[i].update();
        }
    }

    /**
     * Attach the given scene node.
     * @param a_SceneNode : scene node to attach.
     */
    attachSceneNode (a_SceneNode)
    {
        this.m_aChildNodes.push(a_SceneNode);
        a_SceneNode.m_ParentNode = this;
    }

    /**
     * Detach the given scene node.
     * @param a_SceneNode : scene node to detach.
     */
    detachSceneNode (a_SceneNode)
    {
        for (let i = 0; i < this.m_aChildNodes.length; i++)
        {
            if (this.m_aChildNodes[i] == a_SceneNode)
            {
                this.m_aChildNodes.splice(i, 1);
                a_SceneNode.m_ParentNode = null;
            }
        }
    }
}

console.debug('SceneNode loaded');