"use strict";

import {TrailSystem} from "src/render/trailSystem";


describe("TrailSystem", function ()
{
    it("should be created", function ( done )
    {
        expect(TrailSystem).not.toBeNull();
        expect(TrailSystem).not.toBeUndefined();

        done();
    });

    it("should take accessors into account", function ( done )
    {
        // Create a trail system
        let trailSystem = new TrailSystem();
        expect(trailSystem).not.toBeNull();
        expect(trailSystem).not.toBeUndefined();

        // Create a trail emitter
        expect(trailSystem.m_aTrailEmitters.length).toBe(0);
        let trailEmitter = trailSystem.addTrailEmitter();
        expect(trailSystem.m_aTrailEmitters.length).toBe(1);

        // Update the trail emitter
        trailSystem.update();

        // Remove the trail emitter
        expect(trailSystem.m_aTrailEmitters.length).toBe(1);
        trailSystem.removeTrailEmitter(trailEmitter);
        expect(trailSystem.m_aTrailEmitters.length).toBe(0);

        done();
    });
});
