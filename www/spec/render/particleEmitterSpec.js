"use strict";

import {ParticleEmitter} from "src/render/particleEmitter";
import {Color} from "src/core/color";
import {b2Vec2} from "src/core/constants";


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
        let particleEmitter = new ParticleEmitter();

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

        done();
    });

    it("should take accessors into account", function ( done )
    {
        let particleEmitter = new ParticleEmitter();
        expect(particleEmitter).not.toBeNull();
        expect(particleEmitter).not.toBeUndefined();
        expect(particleEmitter.getSceneNode()).not.toBeNull();
        expect(particleEmitter.getSceneNode()).not.toBeUndefined();

        particleEmitter.setColorStart(new Color(255, 200, 150, 255));
        particleEmitter.setColorEnd(new Color(255, 150, 200, 255));
        particleEmitter.setSpeedMin(10);
        particleEmitter.setSpeedMax(20);
        particleEmitter.setAngularSpeedMin(0);
        particleEmitter.setAngularSpeedMax(10);
        particleEmitter.setAngleMin(0);
        particleEmitter.setAngleMax(Math.PI);
        particleEmitter.setScaleMin(0.5);
        particleEmitter.setScaleMax(3);
        particleEmitter.setScaleEnd(0);
        particleEmitter.setShape(particleEmitter.EParticleShape.RECTANGLE);
        particleEmitter.setEmitAngle(2 * Math.PI);
        particleEmitter.setEmitShape(particleEmitter.EParticleEmitterShape.DISK);
        particleEmitter.setEmitRadius(50);
        particleEmitter.setEmitArea(new b2Vec2(10, 10));
        particleEmitter.setFollowEmitter(true);
        particleEmitter.setLifeMin(3);
        particleEmitter.setLifeMax(10);
        particleEmitter.setFrequency(2);
        particleEmitter.setBlending('lighter');
        particleEmitter.setScaleInTime(true);

        expect(particleEmitter.getColorStart().r).toBe(255);
        expect(particleEmitter.getColorStart().g).toBe(200);
        expect(particleEmitter.getColorStart().b).toBe(150);
        expect(particleEmitter.getColorStart().a).toBe(255);

        expect(particleEmitter.getColorEnd().r).toBe(255);
        expect(particleEmitter.getColorEnd().g).toBe(150);
        expect(particleEmitter.getColorEnd().b).toBe(200);
        expect(particleEmitter.getColorEnd().a).toBe(255);

        expect(particleEmitter.getSpeedMin()).toBe(10);
        expect(particleEmitter.getSpeedMax()).toBe(20);
        expect(particleEmitter.getAngularSpeedMin()).toBe(0);
        expect(particleEmitter.getAngularSpeedMax()).toBe(10);
        expect(particleEmitter.getAngleMin()).toBe(0);
        expect(particleEmitter.getAngleMax()).toBe(Math.PI);
        expect(particleEmitter.getScaleMin()).toBe(0.5);
        expect(particleEmitter.getScaleMax()).toBe(3);
        expect(particleEmitter.getScaleEnd()).toBe(0);

        expect(particleEmitter.getShape()).toBe(particleEmitter.EParticleShape.RECTANGLE);
        expect(particleEmitter.getEmitAngle()).toBe(2 * Math.PI);
        expect(particleEmitter.getEmitShape()).toBe(particleEmitter.EParticleEmitterShape.DISK);
        expect(particleEmitter.getEmitRadius()).toBe(50);
        expect(particleEmitter.getEmitArea().x).toBe(10);
        expect(particleEmitter.getEmitArea().y).toBe(10);
        expect(particleEmitter.isFollowEmitter()).toBe(true);

        expect(particleEmitter.getLifeMin()).toBe(3);
        expect(particleEmitter.getLifeMax()).toBe(10);
        expect(particleEmitter.getFrequency()).toBe(2);
        expect(particleEmitter.getBlending()).toBe('lighter');
        expect(particleEmitter.isScaleInTime()).toBe(true);

        done();
    });
});
