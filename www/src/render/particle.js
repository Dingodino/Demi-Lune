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


export class Particle
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create a particle.
     */
    constructor ()
    {
        this.m_ParticleEmitter =	null;
        this.m_v2Forces =			new b2Vec2(0, 0);
        this.m_v2Speed =			new b2Vec2(0, 0);
        this.m_v2Position = 		new b2Vec2(0, 0);
        this.m_v2ScaleInit = 		new b2Vec2(1, 1);
        this.m_v2Scale =	 		new b2Vec2(1, 1);
        this.m_fAngularSpeed =		0;
        this.m_fOrientation =		0;
        this.m_fLifeInit =			1;
        this.m_fLife =				1;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the particle.
     * @param a_fdt : delta time since last update.
     */
    update (a_fdt)
    {
        this.m_v2Speed.x += this.m_v2Forces.x * a_fdt;
        this.m_v2Speed.y += this.m_v2Forces.y * a_fdt;
        this.m_v2Position.x += this.m_v2Speed.x * a_fdt;
        this.m_v2Position.y += this.m_v2Speed.y * a_fdt;

        this.m_fOrientation += this.m_fAngularSpeed * a_fdt;

        this.m_v2Forces.x = 0;
        this.m_v2Forces.y = 0;

        this.m_fLife -= a_fdt;

        if (this.m_ParticleEmitter.m_bScaleInTime)
        {
            let fRatio = this.m_fLife / this.m_fLifeInit;
            this.m_v2Scale.x = this.m_v2ScaleInit.x * fRatio + this.m_ParticleEmitter.m_fScaleEnd * (1 - fRatio);
            this.m_v2Scale.y = this.m_v2ScaleInit.y * fRatio + this.m_ParticleEmitter.m_fScaleEnd * (1 - fRatio);
        }
    }

    /**
     * Apply the given force to the particle.
     * @param a_v2Force : force to apply.
     */
    applyForce (a_v2Force)
    {
        this.m_v2Forces.x += a_v2Force.x;
        this.m_v2Forces.y += a_v2Force.y;
    }
}

console.debug('Particle.js loaded');