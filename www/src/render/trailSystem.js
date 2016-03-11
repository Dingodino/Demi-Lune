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

import TimeEngine from "src/core/timeEngine";
import TrailEmitter from "src/render/trailEmitter";
import TrailParticle from "src/render/trailParticle";


export default class TrailSystem
{
    //=======================
    // Constructors
    //=======================

    /**
     * Create a trail system.
     */
    constructor ()
    {
        this.m_aTrailEmitters =	    new Array();
        this.m_aTrailParticles =    new Array();
        this.m_Image =				null;
        this.m_ImageData =			null;
        this.m_iParticleCount =		0;
    }

    
    //=======================
    // Accessors
    //=======================

    /**
     * Set the image of the particles.
     * @param a_Image : new image.
     */
    setImage (a_Image)
    {
        this.m_Image = a_Image;
    }

    /**
     * Set the number of particles.
     * @param a_ParticleCount : new particle count.
     */
    setParticleCount (a_ParticleCount)
    {
        var iDiff = a_ParticleCount - this.m_iParticleCount;
        if (iDiff > 0)
        {
            for (var i = 0; i < iDiff; i++)
            {
                this.m_aTrailParticles.push(new TrailParticle());
            }
        }
        else if (iDiff < 0)
        {
            for (var i = 0; i < -iDiff; i++)
            {
                // TODO : save particle to remove
                if (this.m_aTrailParticles.length > 0)
                {
                    this.m_aTrailParticles.splice(0, 1);
                }
            }
        }
        this.m_iParticleCount = a_ParticleCount;
    }


    //=======================
    // Operations
    //=======================

    /**
     * Update the trail system.
     */
    update ()
    {
        // Update particle emission
        var fdt = TimeEngine.getDeltaTime();
        for (var i = 0; i < this.m_aTrailEmitters.length; i++)
        {
            var trailEmitter = this.m_aTrailEmitters[i];
            trailEmitter.emit(fdt);
        }
    
        // Update particle dynamic
        for (var i = 0; i < this.m_aTrailEmitters.length; i++)
        {
            var trailEmitter = this.m_aTrailEmitters[i];
            trailEmitter.update();
        }
    }

    /**
     * Add a trail emitter.
     */
    addTrailEmitter ()
    {
        var trailEmitter = new TrailEmitter();
        trailEmitter.m_TrailSystem = this;
        this.m_aTrailEmitters.push(trailEmitter);
        return trailEmitter;
    }

    /**
     * Remove the given trail emitter.
     * @param a_TrailEmitter : trail emitter to add.
     */
    removeTrailEmitter (a_TrailEmitter)
    {
        for (var i = 0; i < this.m_aTrailEmitters.length; i++)
        {
            if (this.m_aTrailEmitters[i] == a_TrailEmitter)
            {
                this.m_aTrailEmitters.splice(i, 1);
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
        if (this.m_aTrailParticles.length > 0)
        {
            var particle = this.m_aTrailParticles[0];
            this.m_aTrailParticles.splice(0, 1);
            return particle;
        }
        return null;
    }

    /**
     * Push the given particle.
     * @param a_Particle : particle to push.
     */
    pushParticle (a_Particle)
    {
        this.m_aTrailParticles.push(a_Particle);
    }
}

console.debug('TrailSystem.js loaded');