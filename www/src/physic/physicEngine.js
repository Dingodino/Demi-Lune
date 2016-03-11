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


class PhysicEngine
{
	//=======================
	// Constructors
	//=======================

    /**
     * Create the physic engine.
     */
    constructor ()
    {
        this.m_v2Gravity =                  new b2Vec2(0, -50);
        this.m_World =                      new b2World(this.m_v2Gravity, true);
        this.m_fTimeStep =                  1.0 / 30.0;// TODO : FPS;
        this.m_iVelocityIterationCount =    6;
        this.m_iPositionIterationCount =    2;
    }


    //=======================
    // Accessors
    //=======================

    /**
     * Get the physic world.
     * @returns {*}
     */
    getWorld ()
    {
        return this.m_World;
    }

    /**
     * Get the garvity.
     * @returns {*}
     */
    getGravity ()
    {
        return this.m_v2Gravity;
    }

    /**
     * Set the gravity.
     * @param a_v2Gravity : new gravity.
     */
    setGravity (a_v2Gravity)
    {
        this.m_v2Gravity = a_v2Gravity;
    }

    /**
     * Get the number of velocity iterations.
     * @returns {number|*}
     */
    getVelocityIterationCount ()
    {
        return this.m_iVelocityIterationCount;
    }

    /**
     * Set the number of velocity iterations.
     * @param a_iVelocityIterationCount : new iteration count.
     */
    setVelocityIterationCount (a_iVelocityIterationCount)
    {
        this.m_iVelocityIterationCount = a_iVelocityIterationCount;
    }

    /**
     * Get the number of position iterations.
     * @returns {number|*}
     */
    getPositionIterationCount ()
    {
        return this.m_iPositionIterationCount;
    }

    /**
     * Set the number of position iterations.
     * @param a_iPositionIterationCount : new iteration count.
     */
    setPositionIterationCount (a_iPositionIterationCount)
    {
        this.m_iPositionIterationCount = a_iPositionIterationCount;
    }


    //=======================
    // Operations
    //=======================

    /**
     * Update the physic engine.
     */
    update ()
    {
        this.m_World.Step(this.m_fTimeStep, this.m_iVelocityIterationCount, this.m_iPositionIterationCount);
    }
}

export default new PhysicEngine();

console.debug('PhysicEngine.js loaded');