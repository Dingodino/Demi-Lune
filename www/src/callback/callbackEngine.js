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


class CallbackEngine
{
    //=======================
    // Constructors
    //=======================

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


    //=======================
    // Operations
    //=======================

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
        var deltaTime = dt * 1000;

        // Update timeout callbacks
        var callbackIDsToRemove = [];
        var callbackIDsToReset = [];
        var postRenderCallbackIDsToRemove = [];
        var index;
        var obj;
        var length = this.timeoutCallbacks.length;
        for ( index = 0; index < length; index++ )
        {
            obj = this.timeoutCallbacks[index];
            if ( obj ) // TODO : why ?
            {
                obj.time += deltaTime;
                if ( obj.time >= obj.delay )
                {
                    this._callCallback(obj);
                    callbackIDsToRemove.push(obj.callbackID);
                }
            }
        }

        // Update interval callbacks
        length = this.intervalCallbacks.length;
        for ( index = 0; index < length; index++ )
        {
            obj = this.intervalCallbacks[index];
            if ( obj )
            {
                obj.time += deltaTime;
                if ( obj.time >= obj.delay )
                {
                    this._callCallback(obj);
                    callbackIDsToReset.push(obj.callbackID);
                }
            }
        }

        // Update post render callbacks
        length = this.postRenderCallbacks.length;
        for ( index = 0; index < length; index++ )
        {
            obj = this.postRenderCallbacks[index];
            if ( obj.count <= 0 )
            {
                if ( !obj.toBeRemoved )
                {
                    this._callCallback(obj);
                }
                postRenderCallbackIDsToRemove.push(obj.callbackID);
            }
            else
            {
                obj.count -= 1;
            }
        }

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
        var id = this.callbackID;

        this.timeoutCallbacks.push({callback: callback, callbackID: id, delay: delay, time: 0});

        return id;
    }

    /**
     * Unsubscribe the time out callback with the given identifier.
     */
    unsubscribeTimeoutCallback ( id )
    {
        var cb;
        var index;
        var toRemove = null;
        for ( index in this.timeoutCallbacks )
        {
            cb = this.timeoutCallbacks[index];
            if ( cb.callbackID == id )
            {
                toRemove = index;
                break;
            }
        }
        if ( toRemove != null )
        {
            this.timeoutCallbacks.splice(toRemove, 1);
        }
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

        var id = this.callbackID;
        var obj = {callback: callback, callbackID: id, delay: delay, time: 0};

        this.intervalCallbacks.push(obj);

        return id;
    }

    /**
     * Unsubscribe the interval callback with the given identifier.
     */
    unsubscribeIntervalCallback ( id )
    {
        var cb;
        var index;
        var toRemove = null;
        for ( index in this.intervalCallbacks )
        {
            cb = this.intervalCallbacks[index];
            if ( cb.callbackID == id )
            {
                toRemove = index;
                break;
            }
        }
        if ( toRemove != null )
        {
            this.intervalCallbacks.splice(toRemove, 1);
        }
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
        var id = this.callbackID;

        this.postRenderCallbacks.push({callback: callback, callbackID: id, count: 0});

        return id;
    }

    /**
     * Unsubscribe the post render callback with the given identifier.
     */
    unsubscribePostRenderCallback ( id )
    {
        var cb;
        var index;
        var toRemove = null;
        for ( index in this.postRenderCallbacks )
        {
            cb = this.postRenderCallbacks[index];
            if ( cb.callbackID == id )
            {
                cb.toBeRemoved = true;
                break;
            }
        }
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


    //=======================
    // Private Operations
    //=======================

    /**
     * Clear callbacks to remove.
     * @private
     */
    _clear ( callbackIDsToRemove, callbackIDsToReset, postRenderCallbackIDsToRemove )
    {
        // Remove old timeout callbacks
        while (callbackIDsToRemove.length > 0)
        {
            var callbackIDToRemove = callbackIDsToRemove.shift();
            for ( var index in this.timeoutCallbacks )
            {
                var callback = this.timeoutCallbacks[index];
                if ( callback.callbackID == callbackIDToRemove )
                {
                    this.timeoutCallbacks.splice(index, 1);
                    break;
                }
            }
        }

        // Reset old interval callbacks
        while (callbackIDsToReset.length > 0)
        {
            var callbackIDToReset = callbackIDsToReset.shift();
            for ( var index in this.intervalCallbacks )
            {
                var callback = this.intervalCallbacks[index];
                if ( callback.callbackID == callbackIDToReset )
                {
                    // Reset the time
                    callback.time = 0;
                    break;
                }
            }
        }

        // Remove old timeout callbacks
        while (postRenderCallbackIDsToRemove.length > 0)
        {
            var callbackIDToRemove = postRenderCallbackIDsToRemove.shift();
            for ( var index in this.postRenderCallbacks )
            {
                var callback = this.postRenderCallbacks[index];
                if ( callback.callbackID == callbackIDToRemove )
                {
                    this.postRenderCallbacks.splice(index, 1);
                    break;
                }
            }
        }
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
