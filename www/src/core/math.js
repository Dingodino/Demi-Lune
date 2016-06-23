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


/****************************************************************
 * Math functions
 ****************************************************************/

// Get a random number between given min and max
export function random(min, max)
{
    if (min == max) return min;
    return Math.floor(min + (max - min + 1) * Math.random());
}

// Get a random float between given min and max
export function randomf(min, max)
{
    if (min == max) return min;
    return min + (max - min) * Math.random();
}

// Clamp the given value between given min and max
export function clamp(value, min, max)
{
    if (value < min)
      return min;
    else if (value > max)
      return max;
    
    return value;
}

// Rotate vector
export function rotateVector(a_v2Vector, a_fAngle)
{
    let v2Result = new b2Vec2();
    let cs = Math.cos(a_fAngle);
    let sn = Math.sin(a_fAngle);
    
    v2Result.x = a_v2Vector.x * cs - a_v2Vector.y * sn;
    v2Result.y = a_v2Vector.x * sn + a_v2Vector.y * cs;

    return v2Result;
}

console.debug('math.js loaded');