"use strict";

import * as Utils from "src/core/math";


describe("Math", function ()
{
    it("should be created", function ( done )
    {
        expect(Utils.random).not.toBeNull();
        expect(Utils.random).not.toBeUndefined();

        expect(Utils.randomf).not.toBeNull();
        expect(Utils.randomf).not.toBeUndefined();

        expect(Utils.clamp).not.toBeNull();
        expect(Utils.clamp).not.toBeUndefined();

        expect(Utils.rotateVector).not.toBeNull();
        expect(Utils.rotateVector).not.toBeUndefined();

        done();
    });

    it("should random a value", function ( done )
    {
        var v = Utils.random(10, 20);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v >= 10).toBeTruthy();
        expect(v <= 20).toBeTruthy();

        v = Utils.random(15, 15);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v === 15).toBeTruthy();

        done();
    });

    it("should randomf a value", function ( done )
    {
        var v = Utils.randomf(10, 20);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v >= 10).toBeTruthy();
        expect(v <= 20).toBeTruthy();

        v = Utils.randomf(15, 15);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v === 15).toBeTruthy();

        done();
    });

    it("should clamp a value", function ( done )
    {
        var v = Utils.clamp(7, 10, 20);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v).toBe(10);

        v = Utils.clamp(25, 10, 20);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v).toBe(20);

        v = Utils.clamp(16, 10, 20);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v).toBe(16);

        done();
    });

    it("should rotate a vector", function ( done )
    {
        var v = Utils.rotateVector(new b2Vec2(1, 0), Math.PI * 0.5);
        expect(v).not.toBeNull();
        expect(v).not.toBeUndefined();
        expect(v.x >= -0.001).toBeTruthy();
        expect(v.x <= 0.001).toBeTruthy();
        expect(v.y >= 0.999).toBeTruthy();
        expect(v.y <= 1.001).toBeTruthy();

        done();
    });
});
