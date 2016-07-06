/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Nicolas DAURES
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

import {b2Vec2} from "src/core/constants";
import {Color} from "src/core/color";
import {SceneNode} from "src/scene/sceneNode";
import {TimeEngine} from "src/core/timeEngine";
import {RenderEngine} from "src/render/renderEngine";


export class TrailEmitter
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create a trailer emitter.
     */
    constructor ()
    {
        this.m_TrailSystem =		    null;
        this.m_SceneNodeStart =		    new SceneNode();
        this.m_SceneNodeEnd =		    new SceneNode();
        this.m_aTrailParticles =		[];

        this.m_ColorStart =             new Color(255, 255, 255, 255);
        this.m_ColorEnd =               new Color(0, 0, 0, 0);

        this.m_fThickness =             10;

        this.m_fLife = 			        3;

        this.m_fFrequency =			    10;
        this.m_fTimeSinceLastPulse =    0;

        this.m_Blending =				"source-over";

        this.m_bScaleInTime =			false;

        this.m_bIsLaunched = 			false;
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the start node.
     * @returns {*}
     */
    getSceneNodeStart ()
    {
        return this.m_SceneNodeStart;
    }

    /**
     * Get the end node.
     * @returns {*}
     */
    getSceneNodeEnd ()
    {
        return this.m_SceneNodeEnd;
    }

    /**
     * Get the start color.
     * @returns {*}
     */
    getColorStart ()
    {
        return this.m_ColorStart;
    }

    /**
     * Set the start color.
     * @param a_ColorStart : new start color.
     */
    setColorStart (a_ColorStart)
    {
        this.m_ColorStart = a_ColorStart;
    }

    /**
     * Get the end color.
     * @returns {*}
     */
    getColorEnd ()
    {
        return this.m_ColorEnd;
    }

    /**
     * Set the end color.
     * @param a_ColorEnd : new end color.
     */
    setColorEnd (a_ColorEnd)
    {
        this.m_ColorEnd = a_ColorEnd;
    }

    /**
     * Get the thickness.
     * @returns {number|*}
     */
    getThickness ()
    {
        return this.m_fThickness;
    }

    /**
     * Set the thickness.
     * @param a_fThickness : new thickness.
     */
    setThickness (a_fThickness)
    {
        this.m_fThickness = a_fThickness;
    }

    /**
     * Get the life duration.
     * @returns {number|*}
     */
    getLife ()
    {
        return this.m_fLife;
    }

    /**
     * Set the life duration.
     * @param a_fLife : new life duration.
     */
    setLife (a_fLife)
    {
        this.m_fLife = a_fLife;
    }

    /**
     * Get the frequency.
     * @returns {number|*}
     */
    getFrequency ()
    {
        return this.m_fFrequency;
    }

    /**
     * Set the frequency.
     * @param a_fFrequency : new frequency.
     */
    setFrequency (a_fFrequency)
    {
        this.m_fFrequency = a_fFrequency;
    }

    /**
     * Get the blending.
     * @returns {string|*}
     */
    getBlending ()
    {
        return this.m_Blending;
    }

    /**
     * Set the blending.
     * @param a_Blending : new blending.
     */
    setBlending (a_Blending)
    {
        this.m_Blending = a_Blending;
    }

    /**
     * Test if scale in time.
     * @returns {boolean|*}
     */
    isScaleInTime ()
    {
        return this.m_bScaleInTime;
    }

    /**
     * Set if scale in time.
     * @param a_bScaleInTime : new scale in time.
     */
    setScaleInTime (a_bScaleInTime)
    {
        this.m_bScaleInTime = a_bScaleInTime;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Update the trail emitter.
     */
    update ()
    {
        let fdt = TimeEngine.getInstance().getDeltaTime();

        // Remove killed particles
        let particleToRemove = [];
        for (let i = 0; i < this.m_aTrailParticles.length; i++)
        {
            let particle = this.m_aTrailParticles[i];
            if (particle.m_fLife < 0)
            {
                particleToRemove.push(particle);
                this.m_TrailSystem.pushParticle(particle);
            }
        }
        for (let i = 0; i < particleToRemove.length; i++)
        {
            let particle = particleToRemove[i];
            for (let j = 0; j < this.m_aTrailParticles.length; j++)
            {
                if (this.m_aTrailParticles[j] == particle)
                {
                    this.m_aTrailParticles.splice(j, 1);
                }
            }
        }

        // Update particles
        for (let i = 0; i < this.m_aTrailParticles.length; i++)
        {
            let particle = this.m_aTrailParticles[i];
            particle.update(fdt);
        }

        // Draw particles
        this.draw();
    }

    /**
     * Draw the trail emitter.
     */
    draw ()
    {
        let renderEngine = RenderEngine.getInstance();
        let context = renderEngine.context;
        let v2CamPos = renderEngine.m_CurrentCamera.m_SceneNode.m_v2Pos;
        let v2PositionStart = new b2Vec2(0, 0);
        let v2PositionEnd = new b2Vec2(0, 0);
        let v2Dir = new b2Vec2(0, 0);
        let fLenght = 0;
        let fHalfLenght = 0;
        let fThickness = 0;
        let fOrientation = 0;
        let fRatio = 0;
        let f1mRatio = 0;

        // Draw particles
        for (let i = 0; i < this.m_aTrailParticles.length; i++)
        {
            let particle = this.m_aTrailParticles[i];

            v2PositionStart.x = particle.m_v2PositionStart.x;
            v2PositionStart.y = particle.m_v2PositionStart.y;
            v2PositionEnd.x = particle.m_v2PositionEnd.x;
            v2PositionEnd.y = particle.m_v2PositionEnd.y;

            let v2PosStartInScreen = renderEngine.convertScenePosToScreenPos(v2PositionStart, v2CamPos);

            v2Dir.x = v2PositionEnd.x - v2PositionStart.x;
            v2Dir.y = v2PositionEnd.y - v2PositionStart.y;
            fLenght = Math.sqrt(v2Dir.x * v2Dir.x + v2Dir.y * v2Dir.y);

            fThickness = this.m_fThickness;
            fOrientation = particle.m_fOrientation;

            fRatio = particle.m_fLife / particle.m_fLifeInit;
            f1mRatio = 1 - fRatio;

            if (this.m_bScaleInTime)
            {
                fLenght = fLenght * fRatio;
                fThickness = fThickness * fRatio;
            }
            fHalfLenght = fLenght * 0.5;

            context.save();
            context.globalCompositeOperation = this.m_Blending;
            context.translate(v2PosStartInScreen.x - fHalfLenght, v2PosStartInScreen.y - fHalfLenght);
            context.rotate(fOrientation);
            let r = Math.floor(this.m_ColorEnd.r * f1mRatio + this.m_ColorStart.r * fRatio);
            let g = Math.floor(this.m_ColorEnd.g * f1mRatio + this.m_ColorStart.g * fRatio);
            let b = Math.floor(this.m_ColorEnd.b * f1mRatio + this.m_ColorStart.b * fRatio);
            let a = Math.floor(this.m_ColorEnd.a * f1mRatio + this.m_ColorStart.a * fRatio);
            context.fillStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
            context.fillRect(-0.5, -0.5, fThickness, fLenght);
            context.restore();
        }
    }

    /**
     * Launch the trail emitter.
     */
    launch ()
    {
        this.m_bIsLaunched = true;
    }

    /**
     * Stop the trail emitter.
     */
    stop ()
    {
        this.m_bIsLaunched = false;
    }

    /**
     * Emit particles.
     * @param a_fdt : delta time since last emit.
     */
    emit (a_fdt)
    {
        if (this.m_bIsLaunched)
        {
            this.m_fTimeSinceLastPulse += a_fdt;
            let iParticleCount = Math.floor(this.m_fTimeSinceLastPulse * this.m_fFrequency);
            if (iParticleCount > 0)
            {
                this.pulse(iParticleCount);
                this.m_fTimeSinceLastPulse -= iParticleCount / this.m_fFrequency;
            }
        }
    }

    /**
     * Pulse particles.
     * @param a_iParticleCount : number of particles to pulse.
     */
    pulse (a_iParticleCount)
    {
        for (let i = 0; i < a_iParticleCount; i++)
        {
            let particle = this.m_TrailSystem.popParticle();
            if (particle == null)
            {
                return;
            }
            this.m_aTrailParticles.push(particle);

            // Initialize position
            particle.m_v2PositionStart.x = this.m_SceneNodeStart.getWorldPosition().x;
            particle.m_v2PositionStart.y = this.m_SceneNodeStart.getWorldPosition().y;
            particle.m_v2PositionEnd.x = this.m_SceneNodeEnd.getWorldPosition().x;
            particle.m_v2PositionEnd.y = this.m_SceneNodeEnd.getWorldPosition().y;

            // Initialize orientation
            let v2Dir = new b2Vec2(particle.m_v2PositionEnd.x - particle.m_v2PositionStart.x,
                particle.m_v2PositionEnd.y - particle.m_v2PositionStart.y);
            let fLenght = Math.sqrt(v2Dir.x * v2Dir.x + v2Dir.y * v2Dir.y);
            v2Dir.x = v2Dir.x / fLenght;
            v2Dir.y = v2Dir.y / fLenght;
            let fOrientation = Math.acos(v2Dir.x);
            if (v2Dir.y < 0.0)
            {
                fOrientation = 2 * Math.PI - fOrientation;
            }
            particle.m_fOrientation = fOrientation;

            // Initialize life
            particle.m_fLifeInit = this.m_fLife;
            particle.m_fLife = this.m_fLife;
        }
    }
}

console.debug('TrailEmitter loaded');