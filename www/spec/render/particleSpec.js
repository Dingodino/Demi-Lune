"use strict";

import Particle from "src/render/particle";


describe("Particle", function ()
{
    it("should be created", function ( done )
    {
        expect(Particle).not.toBeNull();
        expect(Particle).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var particle = new Particle();

        expect(particle).not.toBeNull();
        expect(particle).not.toBeUndefined();

        expect(particle.m_ParticleEmitter).toBeNull();
        expect(particle.m_ParticleEmitter).not.toBeUndefined();

        expect(particle.m_v2Forces).not.toBeNull();
        expect(particle.m_v2Forces).not.toBeUndefined();
        expect(particle.m_v2Forces.x).toBe(0);
        expect(particle.m_v2Forces.y).toBe(0);

        expect(particle.m_v2Speed).not.toBeNull();
        expect(particle.m_v2Speed).not.toBeUndefined();
        expect(particle.m_v2Speed.x).toBe(0);
        expect(particle.m_v2Speed.y).toBe(0);

        expect(particle.m_v2Position).not.toBeNull();
        expect(particle.m_v2Position).not.toBeUndefined();
        expect(particle.m_v2Position.x).toBe(0);
        expect(particle.m_v2Position.y).toBe(0);

        expect(particle.m_v2ScaleInit).not.toBeNull();
        expect(particle.m_v2ScaleInit).not.toBeUndefined();
        expect(particle.m_v2ScaleInit.x).toBe(1);
        expect(particle.m_v2ScaleInit.y).toBe(1);

        expect(particle.m_v2Scale).not.toBeNull();
        expect(particle.m_v2Scale).not.toBeUndefined();
        expect(particle.m_v2Scale.x).toBe(1);
        expect(particle.m_v2Scale.y).toBe(1);

        expect(particle.m_fAngularSpeed).not.toBeNull();
        expect(particle.m_fAngularSpeed).not.toBeUndefined();
        expect(particle.m_fAngularSpeed).toBe(0);

        expect(particle.m_fOrientation).not.toBeNull();
        expect(particle.m_fOrientation).not.toBeUndefined();
        expect(particle.m_fOrientation).toBe(0);

        expect(particle.m_fLifeInit).not.toBeNull();
        expect(particle.m_fLifeInit).not.toBeUndefined();
        expect(particle.m_fLifeInit).toBe(1);

        expect(particle.m_fLife).not.toBeNull();
        expect(particle.m_fLife).not.toBeUndefined();
        expect(particle.m_fLife).toBe(1);

        done();
    });
});
