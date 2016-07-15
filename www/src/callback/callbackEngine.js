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

import * as _ from "libs/lodash.min";
import {Engine} from "src/core/engine";


export class CallbackEngine extends Engine
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create the engine.
     */
    constructor ()
    {
        super();

        // Timeout callback list
        this.timeoutCallbacks = [];

        // Interval callback list
        this.intervalCallbacks = [];

        // Post render callback list
        this.postRenderCallbacks = [];

        // Current callback identifier
        this.callbackID = 0;
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
            this.instance = new CallbackEngine();
        }
        return this.instance;
    }

    
    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the callback engine.
     */
    update ( dt )
    {
        let deltaTime = dt * 1000;
        let mustCall = false;
        let self = this;

        // Update timeout callbacks
        _.remove(this.timeoutCallbacks, function(obj)
        {
            obj.time += deltaTime;

            mustCall = (obj.time >= obj.delay);
            if ( mustCall )
            {
                self._callCallback(obj);
            }

            return mustCall;
        });

        // Update interval callbacks
        _.forEach(this.intervalCallbacks, function (obj)
        {
            obj.time += deltaTime;
            if ( obj.time >= obj.delay )
            {
                self._callCallback(obj);
                obj.time = 0;
            }
        });

        // Update post render callbacks
        _.remove(this.postRenderCallbacks, function (obj)
        {
            mustCall = (obj.count <= 0);
            if ( mustCall )
            {
                self._callCallback(obj);
            }
            else
            {
                obj.count -= 1;
            }
            return mustCall;
        });
    }

    /**
     * Terminate the callback engine.
     */
    terminate ()
    {
        this.reset();
    }

    /**
     * Subscribe a new time out callback.
     */
    subscribeTimeoutCallback ( callback, delay )
    {
        if ( callback == null || delay == null ) return;

        this.callbackID++;

        this.timeoutCallbacks.push({callback: callback, callbackID: this.callbackID, delay: delay, time: 0});

        return this.callbackID;
    }

    /**
     * Unsubscribe the time out callback with the given identifier.
     */
    unsubscribeTimeoutCallback ( id )
    {
        _.remove(this.timeoutCallbacks, function (obj)
        {
            return obj.callbackID == id;
        });
    }

    /**
     * Subscribe a new interval callback.
     */
    subscribeIntervalCallback ( callback, delay )
    {
        if ( callback == null || delay == null ) return;

        this.callbackID++;

        this.intervalCallbacks.push({callback: callback, callbackID: this.callbackID, delay: delay, time: 0});

        return this.callbackID;
    }

    /**
     * Unsubscribe the interval callback with the given identifier.
     */
    unsubscribeIntervalCallback ( id )
    {
        _.remove(this.intervalCallbacks, function (obj)
        {
            return obj.callbackID == id;
        });
    }

    /**
     * Subscribe a new post render callback.
     */
    subscribePostRenderCallback ( callback )
    {
        if ( callback == null ) return;

        this.callbackID++;

        this.postRenderCallbacks.push({callback: callback, callbackID: this.callbackID, count: 0});

        return this.callbackID;
    }

    /**
     * Unsubscribe the post render callback with the given identifier.
     */
    unsubscribePostRenderCallback ( id )
    {
        _.remove(this.postRenderCallbacks, function (obj)
        {
            return obj.callbackID == id;
        });
    }

    /**
     * Reset all callbacks' lists.
     */
    reset ()
    {
        this.timeoutCallbacks = [];
        this.intervalCallbacks = [];
        this.postRenderCallbacks = [];
    }


    //===================================================================
    // Private Operations
    //===================================================================

    /**
     * Call the given callback and profile it if needed.
     * @param obj
     * @private
     */
    _callCallback ( obj )
    {
        try
        {
            obj.callback.call(obj);
        } catch (error)
        {
            console.error("Error while calling a callback from the callback engine", error);
        }
    }
}

console.debug("CallbackEngine loaded");
