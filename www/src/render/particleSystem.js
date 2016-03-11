/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2015 Nicolas DAURES
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *******************************************************************************************************************/

"use strict";

import Particle from "src/render/particle";
import ParticleEmitter from "src/render/particleEmitter";
import TimeEngine from "src/core/timeEngine";


export default class ParticleSystem
{
    //=======================
    // Constructors
    //=======================

    /**
     * Create a particle system.
     */
    constructor ()
    {
        this.m_aParticleEmitters =	new Array();
        this.m_aParticles =			new Array();
        this.m_Image =				null;
        this.m_ImageData =			null;
        this.m_iParticleCount =		0;
    }


    //=======================
    // Accessors
    //=======================

    /**
     * Set the particle image.
     * @param a_Image : new image of the particles.
     */
    setImage (a_Image)
    {
        this.m_Image = a_Image;
    }

    /**
     * Set the number of particles.
     * @param a_ParticleCount : new number of particles.
     */
    setParticleCount (a_ParticleCount)
    {
        var iDiff = a_ParticleCount - this.m_iParticleCount;
        if (iDiff > 0)
        {
            for (var i = 0; i < iDiff; i++)
            {
                this.m_aParticles.push(new Particle());
            }
        }
        else if (iDiff < 0)
        {
            for (var i = 0; i < -iDiff; i++)
            {
                // TODO : save particle to remove
                if (this.m_aParticles.length > 0)
                {
                    this.m_aParticles.splice(0, 1);
                }
            }
        }
        this.m_iParticleCount = a_ParticleCount;
    }


    //=======================
    // Operations
    //=======================

    /**
     * Update the particle system.
     */
    update ()
    {
        // Update particle emission
        var fdt = TimeEngine.getDeltaTime();
        for (var i = 0; i < this.m_aParticleEmitters.length; i++)
        {
            var particleEmitter = this.m_aParticleEmitters[i];
            particleEmitter.emit(fdt);
        }

        // Update particle dynamic
        for (var i = 0; i < this.m_aParticleEmitters.length; i++)
        {
            var particleEmitter = this.m_aParticleEmitters[i];
            particleEmitter.update();
        }
    }

    /**
     * Create and add a particle emitter.
     */
    addParticleEmitter ()
    {
        var particleEmitter = new ParticleEmitter();
        particleEmitter.m_ParticleSystem = this;
        this.m_aParticleEmitters.push(particleEmitter);
        return particleEmitter;
    }

    /**
     * Remove the given particle emitter.
     * @param a_ParticleEmitter : emitter to remove.
     */
    removeParticleEmitter (a_ParticleEmitter)
    {
        for (var i = 0; i < this.m_aParticleEmitters.length; i++)
        {
            if (this.m_aParticleEmitters[i] == a_ParticleEmitter)
            {
                this.m_aParticleEmitters.splice(i, 1);
                return;
            }
        }
    }

    /**
     * Pop a particle.
     * @returns {*}
     */
    popParticle ()
    {
        if (this.m_aParticles.length > 0)
        {
            var particle = this.m_aParticles[0];
            this.m_aParticles.splice(0, 1);
            return particle;
        }
        return null;
    }

    /**
     * Push a particle.
     * @param a_Particle : particle to push.
     */
    pushParticle (a_Particle)
    {
        this.m_aParticles.push(a_Particle);
    }
}

console.debug('ParticleSystem.js loaded');