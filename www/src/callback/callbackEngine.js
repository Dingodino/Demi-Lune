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

import "libs/lodash.min.js";


class CallbackEngine
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create the engine.
     */
    constructor ()
    {
        // Timeout callback list
        this.timeoutCallbacks = [];

        // Interval callback list
        this.intervalCallbacks = [];

        // Post render callback list
        this.postRenderCallbacks = [];
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Initialize the callback engine.
     */
    initialize ()
    {

    }

    /**
     * Update the callback engine.
     */
    update ( dt )
    {
        let deltaTime = dt * 1000;
        let self = this;

        // Update timeout callbacks
        let callbackIDsToRemove = [];
        let callbackIDsToReset = [];
        let postRenderCallbackIDsToRemove = [];
        _.forEach(this.timeoutCallbacks, function(obj)
        {
            if ( obj ) // TODO : why ?
            {
                obj.time += deltaTime;
                if ( obj.time >= obj.delay )
                {
                    self._callCallback(obj);
                    callbackIDsToRemove.push(obj.callbackID);
                }
            }
        });

        // Update interval callbacks
        _.forEach(this.intervalCallbacks, function (obj)
        {
            if ( obj )
            {
                obj.time += deltaTime;
                if ( obj.time >= obj.delay )
                {
                    self._callCallback(obj);
                    callbackIDsToReset.push(obj.callbackID);
                }
            }
        });

        // Update post render callbacks
        _.forEach(this.postRenderCallbacks, function (obj)
        {
            if ( obj.count <= 0 )
            {
                if ( !obj.toBeRemoved )
                {
                    self._callCallback(obj);
                }
                postRenderCallbackIDsToRemove.push(obj.callbackID);
            }
            else
            {
                obj.count -= 1;
            }
        });

        this._clear(callbackIDsToRemove, callbackIDsToReset, postRenderCallbackIDsToRemove);
    }

    /**
     * Terminate the callback engine.
     */
    terminate ()
    {

    }

    /**
     * Subscribe a new time out callback.
     */
    subscribeTimeoutCallback ( callback, delay )
    {
        if ( callback == null || delay == null ) return;
        if ( !this.callbackID )
        {
            this.callbackID = 0;
        }
        this.callbackID++;
        let id = this.callbackID;

        this.timeoutCallbacks.push({callback: callback, callbackID: id, delay: delay, time: 0});

        return id;
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
        if ( !this.callbackID )
        {
            this.callbackID = 0;
        }
        this.callbackID++;

        let id = this.callbackID;
        let obj = {callback: callback, callbackID: id, delay: delay, time: 0};

        this.intervalCallbacks.push(obj);

        return id;
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
        if ( !this.callbackID )
        {
            this.callbackID = 0;
        }
        this.callbackID++;
        let id = this.callbackID;

        this.postRenderCallbacks.push({callback: callback, callbackID: id, count: 0});

        return id;
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
     * Clear callbacks to remove.
     * @private
     */
    _clear ( callbackIDsToRemove, callbackIDsToReset, postRenderCallbackIDsToRemove )
    {
        let self = this;

        // TODO : use a map ?
        // Remove old timeout callbacks
        _.forEach(callbackIDsToRemove, function (id)
        {
            _.remove(self.timeoutCallbacks, function (obj)
            {
                return obj.callbackID == id;
            });
        });

        // Reset old interval callbacks
        _.forEach(callbackIDsToReset, function (id)
        {
            _.forEach(self.intervalCallbacks, function (obj)
            {
                if (obj.callbackID == id)
                {
                    obj.time = 0;
                }
            });
        });

        // Remove old timeout callbacks
        _.forEach(postRenderCallbackIDsToRemove, function (id)
        {
            _.remove(self.postRenderCallbacks, function (obj)
            {
                return obj.callbackID == id;
            });
        });
    }

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

export default new CallbackEngine();

console.debug("CallbackEngine.js loaded");
