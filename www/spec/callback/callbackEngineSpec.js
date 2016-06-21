"use strict";

import CallbackEngine from "src/callback/callbackEngine";


describe("CallbackEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(CallbackEngine).not.toBeNull();
        expect(CallbackEngine).not.toBeUndefined();

        expect(CallbackEngine.timeoutCallbacks).not.toBeNull();
        expect(CallbackEngine.timeoutCallbacks).not.toBeUndefined();

        expect(CallbackEngine.intervalCallbacks).not.toBeNull();
        expect(CallbackEngine.intervalCallbacks).not.toBeUndefined();

        expect(CallbackEngine.postRenderCallbacks).not.toBeNull();
        expect(CallbackEngine.postRenderCallbacks).not.toBeUndefined();

        done();
    });

    it("should subscribe and run a timeout callback", function ( done )
    {
        // Run callback engine
        var previousTime = new Date();
        var newTime = new Date();
        var deltaTime = 0;
        var intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            CallbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(CallbackEngine.timeoutCallbacks.length).toBe(0);

        // Subscribe a callback
        var result = false;
        var callback = function () { result = true; };
        CallbackEngine.subscribeTimeoutCallback(callback, 150);

        // Check subscribe
        expect(CallbackEngine.timeoutCallbacks.length).toBe(1);

        // Wait 200 ms
        setTimeout(function ()
        {
            // Check unsubscribe
            expect(CallbackEngine.timeoutCallbacks.length).toBe(0);

            // Check result
            expect(result).toBe(true);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 200);
    });

    it("should unsubscribe a timeout callback", function ( done )
    {
        // Run callback engine
        var previousTime = new Date();
        var newTime = new Date();
        var deltaTime = 0;
        var intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            CallbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(CallbackEngine.timeoutCallbacks.length).toBe(0);

        // Subscribe a callback
        var result = false;
        var callback = function () { result = true; };
        var callbackID = CallbackEngine.subscribeTimeoutCallback(callback, 150);

        // Check subscribe
        expect(CallbackEngine.timeoutCallbacks.length).toBe(1);

        // Unsubscribe the callback
        CallbackEngine.unsubscribeTimeoutCallback(callbackID);

        // Check unsubscribe
        expect(CallbackEngine.timeoutCallbacks.length).toBe(0);

        // Wait 200 ms
        setTimeout(function ()
        {
            // Check unsubscribe
            expect(CallbackEngine.timeoutCallbacks.length).toBe(0);

            // Check result
            expect(result).toBe(false);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 200);
    });

    it("should subscribe and run an interval callback", function ( done )
    {
        // Run callback engine
        var previousTime = new Date();
        var newTime = new Date();
        var deltaTime = 0;
        var intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            CallbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(CallbackEngine.intervalCallbacks.length).toBe(0);

        // Subscribe a callback
        var result = 0;
        var callback = function () { result++; };
        var callbackID = CallbackEngine.subscribeIntervalCallback(callback, 150);

        // Check subscribe
        expect(CallbackEngine.intervalCallbacks.length).toBe(1);

        // Wait 200 ms
        setTimeout(function ()
        {
            // Check result
            expect(CallbackEngine.intervalCallbacks.length).toBe(1);
            expect(result).toBe(1);

            // Wait 200 ms
            setTimeout(function ()
            {
                // Check result
                expect(CallbackEngine.intervalCallbacks.length).toBe(1);
                expect(result).toBe(2);

                // Unsubcribe callback
                CallbackEngine.unsubscribeIntervalCallback(callbackID);

                // Check unsubscribe
                expect(CallbackEngine.intervalCallbacks.length).toBe(0);

                // Stop callback engine
                clearInterval(intervalID);

                done();
            }, 200);
        }, 200);
    });

    it("should subscribe and run a post-render callback", function ( done )
    {
        // Run callback engine
        var previousTime = new Date();
        var newTime = new Date();
        var deltaTime = 0;
        var intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            CallbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(CallbackEngine.postRenderCallbacks.length).toBe(0);

        // Subscribe a callback
        var result = false;
        var callback = function () { result = true; };
        CallbackEngine.subscribePostRenderCallback(callback);

        // Check subscribe
        expect(CallbackEngine.postRenderCallbacks.length).toBe(1);

        // Wait 100 ms
        setTimeout(function ()
        {
            // Check unsubscribe
            expect(CallbackEngine.postRenderCallbacks.length).toBe(0);

            // Check result
            expect(result).toBe(true);

            // Stop callback engine
            clearInterval(intervalID);

            done();
        }, 100);
    });

    it("should unsubscribe a post-render callback", function ( done )
    {
        // Run callback engine
        var previousTime = new Date();
        var newTime = new Date();
        var deltaTime = 0;
        var intervalID = setInterval(function ()
        {
            newTime = new Date();
            deltaTime = newTime - previousTime;
            previousTime = newTime;
            CallbackEngine.update(deltaTime * 0.001);
        }, 16);

        // Check initial state
        expect(CallbackEngine.postRenderCallbacks.length).toBe(0);

        // Subscribe a callback
        var result = false;
        var callback = function () { result = true; };
        var callbackID = CallbackEngine.subscribePostRenderCallback(callback);

        // Check subscribe
        expect(CallbackEngine.postRenderCallbacks.length).toBe(1);

        // Unsubscribe the callback
        CallbackEngine.unsubscribePostRenderCallback(callbackID);

        // Check unsubscribe
        expect(CallbackEngine.postRenderCallbacks.length).toBe(0);

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
        // Check initial state
        expect(CallbackEngine.timeoutCallbacks.length).toBe(0);
        expect(CallbackEngine.intervalCallbacks.length).toBe(0);
        expect(CallbackEngine.postRenderCallbacks.length).toBe(0);

        // Subscribe several callbacks
        var callback = function () { };
        var timeoutID = CallbackEngine.subscribeTimeoutCallback(callback, 150);
        var intervalID = CallbackEngine.subscribeIntervalCallback(callback, 150);
        var postRenderID = CallbackEngine.subscribePostRenderCallback(callback);

        // Check subscribe
        expect(CallbackEngine.timeoutCallbacks.length).toBe(1);
        expect(CallbackEngine.intervalCallbacks.length).toBe(1);
        expect(CallbackEngine.postRenderCallbacks.length).toBe(1);

        // Reset all callbacks
        CallbackEngine.unsubscribeTimeoutCallback(timeoutID);
        CallbackEngine.unsubscribeIntervalCallback(intervalID);
        CallbackEngine.unsubscribePostRenderCallback(postRenderID);

        // Check unsubscribe
        expect(CallbackEngine.timeoutCallbacks.length).toBe(0);
        expect(CallbackEngine.intervalCallbacks.length).toBe(0);
        expect(CallbackEngine.postRenderCallbacks.length).toBe(0);

        done();
    });
});
