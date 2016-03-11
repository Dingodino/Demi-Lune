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


export default class TrailParticle
{
    //=======================
    // Constructors
    //=======================

    /**
     * Create a trail particle.
     */
    constructor ()
    {
        this.m_TrailEmitter =		null;
        this.m_v2PositionStart =	new b2Vec2(0, 0);
        this.m_v2PositionEnd =      new b2Vec2(0, 0);
        this.m_fOrientation =		0;
        this.m_fLifeInit =			1;
        this.m_fLife =				1;
        this.m_Color = 				"#ffaa00";
    }


    //=======================
    // Operations
    //=======================

    /**
     * Update the trail particle.
     * @param a_fdt : delta time since last update.
     */
    update (a_fdt)
    {
        this.m_fLife -= a_fdt;
    }
}

console.debug('TrailParticle.js loaded');