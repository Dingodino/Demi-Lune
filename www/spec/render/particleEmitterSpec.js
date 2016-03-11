"use strict";

import ParticleEmitter from "src/render/particleEmitter";


describe("ParticleEmitter", function ()
{
    it("should be created", function ( done )
    {
        expect(ParticleEmitter).not.toBeNull();
        expect(ParticleEmitter).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var particleEmitter = new ParticleEmitter();

        expect(particleEmitter).not.toBeNull();
        expect(particleEmitter).not.toBeUndefined();

        expect(particleEmitter.EParticleEmitterShape).not.toBeNull();
        expect(particleEmitter.EParticleEmitterShape).not.toBeUndefined();

        expect(particleEmitter.EParticleShape).not.toBeNull();
        expect(particleEmitter.EParticleShape).not.toBeUndefined();

        expect(particleEmitter.m_ParticleSystem).toBeNull();
        expect(particleEmitter.m_ParticleSystem).not.toBeUndefined();

        expect(particleEmitter.m_SceneNode).not.toBeNull();
        expect(particleEmitter.m_SceneNode).not.toBeUndefined();

        expect(particleEmitter.m_aParticles).not.toBeNull();
        expect(particleEmitter.m_aParticles).not.toBeUndefined();

        /* TODO : this.m_fSpeedMin =			    10;
        this.m_fSpeedMax =			    20;
        this.m_fAngularSpeedMin = 	    0;
        this.m_fAngularSpeedMax =	    0;
        this.m_fLifeMin = 			    3;
        this.m_fLifeMax = 			    5;
        this.m_fScaleMin = 			    10;
        this.m_fScaleMax = 			    20;
        this.m_fScaleEnd = 			    0;
        this.m_fAngleMin = 			    0;
        this.m_fAngleMax = 			    0;
        this.m_fEmitAngle = 			0.2;

        this.m_ColorStart =             new Color(255, 255, 255, 255);
        this.m_ColorEnd =               new Color(0, 0, 0, 0);

        this.m_eEmitShape =             this.EParticleEmitterShape.POINT;
        this.m_fEmitRadius =            10;
        this.m_v2EmitArea =             new b2Vec2(10, 10);

        this.m_eShape =                 this.EParticleShape.DISK;

        this.m_bScaleInTime =			true;
        this.m_bFollowEmitter =			false;

        this.m_fTimeSinceLastPulse =    0;
        this.m_fFrequency =			    0;

        this.m_Blending =				"lighter";

        this.m_bIsLaunched = 			false;*/

        done();
    });
});
