"use strict";

import ParticleSystem from "src/render/particleSystem";


describe("ParticleSystem", function ()
{
    it("should be created", function ( done )
    {
        expect(ParticleSystem).not.toBeNull();
        expect(ParticleSystem).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var particleSystem = new ParticleSystem();

        expect(particleSystem).not.toBeNull();
        expect(particleSystem).not.toBeUndefined();

        expect(particleSystem.m_aParticleEmitters).not.toBeNull();
        expect(particleSystem.m_aParticleEmitters).not.toBeUndefined();

        expect(particleSystem.m_aParticles).not.toBeNull();
        expect(particleSystem.m_aParticles).not.toBeUndefined();

        expect(particleSystem.m_Image).toBeNull();
        expect(particleSystem.m_Image).not.toBeUndefined();

        expect(particleSystem.m_ImageData).toBeNull();
        expect(particleSystem.m_ImageData).not.toBeUndefined();

        expect(particleSystem.m_iParticleCount).not.toBeNull();
        expect(particleSystem.m_iParticleCount).not.toBeUndefined();
        expect(particleSystem.m_iParticleCount).toBe(0);

        done();
    });
});
