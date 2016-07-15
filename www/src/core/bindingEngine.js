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

import {Engine} from "src/core/engine";
import {Binding} from "src/core/binding";


export class BindingEngine extends Engine
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create the binding engine.
     */
    constructor ()
    {
        super();

        this.m_Bindings = [];
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
            this.instance = new BindingEngine();
        }
        return this.instance;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the binding engine.
     */
    update ()
    {
        let index = 0;
        let length = this.m_Bindings.length;
        for (; index < length; ++index)
        {
            this.m_Bindings[index].update();
        }
    }

    /**
     * Bind two members.
     * @param source : source of the binding
     * @param sourceMemberName : member name of the source of the binding
     * @param observer : observer of the binding
     * @param observerMemberName : member name of the observer of the binding
     */
    createBinding(source, sourceMemberName, observer, observerMemberName)
    {
        this.m_Bindings.push(new Binding(source, sourceMemberName, observer, observerMemberName));
    }
}

console.debug('BindingEngine loaded');