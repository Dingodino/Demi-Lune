"use strict";

import TrailEmitter from "src/render/trailEmitter";
import Color from "src/core/color";


describe("TrailEmitter", function ()
{
    it("should be created", function ( done )
    {
        expect(TrailEmitter).not.toBeNull();
        expect(TrailEmitter).not.toBeUndefined();

        done();
    });

    it("should take accessors into account", function ( done )
    {
        var trailEmitter = new TrailEmitter();
        expect(trailEmitter).not.toBeNull();
        expect(trailEmitter).not.toBeUndefined();

        trailEmitter.setColorStart(new Color(255, 200, 150, 255));
        trailEmitter.setColorEnd(new Color(255, 150, 200, 255));
        trailEmitter.setThickness(1);
        trailEmitter.setLife(10);
        trailEmitter.setFrequency(2);
        trailEmitter.setBlending('lighter');
        trailEmitter.setScaleInTime(true);

        expect(trailEmitter.getColorStart().r).toBe(255);
        expect(trailEmitter.getColorStart().g).toBe(200);
        expect(trailEmitter.getColorStart().b).toBe(150);
        expect(trailEmitter.getColorStart().a).toBe(255);

        expect(trailEmitter.getColorEnd().r).toBe(255);
        expect(trailEmitter.getColorEnd().g).toBe(150);
        expect(trailEmitter.getColorEnd().b).toBe(200);
        expect(trailEmitter.getColorEnd().a).toBe(255);

        expect(trailEmitter.getThickness()).toBe(1);
        expect(trailEmitter.getLife()).toBe(10);
        expect(trailEmitter.getFrequency()).toBe(2);
        expect(trailEmitter.getBlending()).toBe('lighter');
        expect(trailEmitter.isScaleInTime()).toBe(true);

        done();
    });
});
