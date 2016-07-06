"use strict";

import {CallbackEngine} from "src/callback/callbackEngine";


describe("CallbackEngine", function ()
{
    it("should be created", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();
        expect(callbackEngine).not.toBeNull();
        expect(callbackEngine).not.toBeUndefined();

        expect(callbackEngine.timeoutCallbacks).not.toBeNull();
        expect(callbackEngine.timeoutCallbacks).not.toBeUndefined();

        expect(callbackEngine.intervalCallbacks).not.toBeNull();
        expect(callbackEngine.intervalCallbacks).not.toBeUndefined();

        expect(callbackEngine.postRenderCallbacks).not.toBeNull();
        expect(callbackEngine.postRenderCallbacks).not.toBeUndefined();

        done();
    });

    it("should subscribe and run a timeout callback", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();

        // Run callback engine
        let previousTime = new Date();
        let newTime = new Date();
        let deltaTime = 0;
        let intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            callbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(callbackEngine.timeoutCallbacks.length).toBe(0);

        // Subscribe a callback
        let result = false;
        let callback = function () { result = true; };
        callbackEngine.subscribeTimeoutCallback(callback, 150);

        // Check subscribe
        expect(callbackEngine.timeoutCallbacks.length).toBe(1);

        // Wait 200 ms
        setTimeout(function ()
        {
            // Check unsubscribe
            expect(callbackEngine.timeoutCallbacks.length).toBe(0);

            // Check result
            expect(result).toBe(true);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 200);
    });

    it("should unsubscribe a timeout callback", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();

        // Run callback engine
        let previousTime = new Date();
        let newTime = new Date();
        let deltaTime = 0;
        let intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            callbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(callbackEngine.timeoutCallbacks.length).toBe(0);

        // Subscribe a callback
        let result = false;
        let callback = function () { result = true; };
        let callbackID = callbackEngine.subscribeTimeoutCallback(callback, 150);

        // Check subscribe
        expect(callbackEngine.timeoutCallbacks.length).toBe(1);

        // Unsubscribe the callback
        callbackEngine.unsubscribeTimeoutCallback(callbackID);

        // Check unsubscribe
        expect(callbackEngine.timeoutCallbacks.length).toBe(0);

        // Wait 200 ms
        setTimeout(function ()
        {
            // Check unsubscribe
            expect(callbackEngine.timeoutCallbacks.length).toBe(0);

            // Check result
            expect(result).toBe(false);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 200);
    });

    it("should subscribe and run an interval callback", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();

        // Run callback engine
        let previousTime = new Date();
        let newTime = new Date();
        let deltaTime = 0;
        let intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            callbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(callbackEngine.intervalCallbacks.length).toBe(0);

        // Subscribe a callback
        let result = 0;
        let callback = function () { result++; };
        let callbackID = callbackEngine.subscribeIntervalCallback(callback, 150);

        // Check subscribe
        expect(callbackEngine.intervalCallbacks.length).toBe(1);

        // Wait 200 ms
        setTimeout(function ()
        {
            // Check result
            expect(callbackEngine.intervalCallbacks.length).toBe(1);
            expect(result).toBe(1);

            // Wait 200 ms
            setTimeout(function ()
            {
                // Check result
                expect(callbackEngine.intervalCallbacks.length).toBe(1);
                expect(result).toBe(2);

                // Unsubcribe callback
                callbackEngine.unsubscribeIntervalCallback(callbackID);

                // Check unsubscribe
                expect(callbackEngine.intervalCallbacks.length).toBe(0);

                // Stop callback engine
                clearInterval(intervalID);

                done();
            }, 200);
        }, 200);
    });

    it("should subscribe and run a post-render callback", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();

        // Run callback engine
        let previousTime = new Date();
        let newTime = new Date();
        let deltaTime = 0;
        let intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            callbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(callbackEngine.postRenderCallbacks.length).toBe(0);

        // Subscribe a callback
        let result = false;
        let callback = function () { result = true; };
        callbackEngine.subscribePostRenderCallback(callback);

        // Check subscribe
        expect(callbackEngine.postRenderCallbacks.length).toBe(1);

        // Wait 100 ms
        setTimeout(function ()
        {
            // Check unsubscribe
            expect(callbackEngine.postRenderCallbacks.length).toBe(0);

            // Check result
            expect(result).toBe(true);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 100);
    });

    it("should unsubscribe a post-render callback", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();

        // Run callback engine
        let previousTime = new Date();
        let newTime = new Date();
        let deltaTime = 0;
        let intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            callbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(callbackEngine.postRenderCallbacks.length).toBe(0);

        // Subscribe a callback
        let result = false;
        let callback = function () { result = true; };
        let callbackID = callbackEngine.subscribePostRenderCallback(callback);

        // Check subscribe
        expect(callbackEngine.postRenderCallbacks.length).toBe(1);

        // Unsubscribe the callback
        callbackEngine.unsubscribePostRenderCallback(callbackID);

        // Check unsubscribe
        expect(callbackEngine.postRenderCallbacks.length).toBe(0);

        // Wait 100 ms
        setTimeout(function ()
        {
            // Check result
            expect(result).toBe(false);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 100);
    });

    it("should reset all callbacks", function ( done )
    {
        let callbackEngine = CallbackEngine.getInstance();

        // Check initial state
        expect(callbackEngine.timeoutCallbacks.length).toBe(0);
        expect(callbackEngine.intervalCallbacks.length).toBe(0);
        expect(callbackEngine.postRenderCallbacks.length).toBe(0);

        // Subscribe several callbacks
        let callback = function () { };
        let timeoutID = callbackEngine.subscribeTimeoutCallback(callback, 150);
        let intervalID = callbackEngine.subscribeIntervalCallback(callback, 150);
        let postRenderID = callbackEngine.subscribePostRenderCallback(callback);

        // Check subscribe
        expect(callbackEngine.timeoutCallbacks.length).toBe(1);
        expect(callbackEngine.intervalCallbacks.length).toBe(1);
        expect(callbackEngine.postRenderCallbacks.length).toBe(1);

        // Reset all callbacks
        callbackEngine.unsubscribeTimeoutCallback(timeoutID);
        callbackEngine.unsubscribeIntervalCallback(intervalID);
        callbackEngine.unsubscribePostRenderCallback(postRenderID);

        // Check unsubscribe
        expect(callbackEngine.timeoutCallbacks.length).toBe(0);
        expect(callbackEngine.intervalCallbacks.length).toBe(0);
        expect(callbackEngine.postRenderCallbacks.length).toBe(0);

        done();
    });
});
