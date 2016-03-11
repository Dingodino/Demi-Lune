"use strict";

import TrailParticle from "src/render/trailParticle";


describe("TrailParticle", function ()
{
    it("should be created", function ( done )
    {
        expect(TrailParticle).not.toBeNull();
        expect(TrailParticle).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var particle = new TrailParticle();

        expect(particle).not.toBeNull();
        expect(particle).not.toBeUndefined();

        expect(particle.m_TrailEmitter).toBeNull();
        expect(particle.m_TrailEmitter).not.toBeUndefined();

        expect(particle.m_v2PositionStart).not.toBeNull();
        expect(particle.m_v2PositionStart).not.toBeUndefined();
        expect(particle.m_v2PositionStart.x).toBe(0);
        expect(particle.m_v2PositionStart.y).toBe(0);

        expect(particle.m_v2PositionEnd).not.toBeNull();
        expect(particle.m_v2PositionEnd).not.toBeUndefined();
        expect(particle.m_v2PositionEnd.x).toBe(0);
        expect(particle.m_v2PositionEnd.y).toBe(0);

        expect(particle.m_fOrientation).not.toBeNull();
        expect(particle.m_fOrientation).not.toBeUndefined();
        expect(particle.m_fOrientation).toBe(0);

        expect(particle.m_fLifeInit).not.toBeNull();
        expect(particle.m_fLifeInit).not.toBeUndefined();
        expect(particle.m_fLifeInit).toBe(1);

        expect(particle.m_fLife).not.toBeNull();
        expect(particle.m_fLife).not.toBeUndefined();
        expect(particle.m_fLife).toBe(1);

        expect(particle.m_Color).not.toBeNull();
        expect(particle.m_Color).not.toBeUndefined();
        expect(particle.m_Color).toBe("#ffaa00");

        done();
    });
});
