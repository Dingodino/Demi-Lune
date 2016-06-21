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

import "src/core/constants";

// Import engines
import TimeEngine from "src/core/timeEngine";
import SceneEngine from "src/scene/sceneEngine";
import CameraEngine from "src/scene/cameraEngine";
import RenderEngine from "src/render/renderEngine";
import CallbackEngine from "src/callback/callbackEngine";
import AudioEngine from "src/audio/audioEngine";
import InputEngine from "src/input/inputEngine";
import PhysicEngine from "src/physic/physicEngine";

// Import other classes
import Sound from "src/audio/sound";
import Color from "src/core/color";
import InputState from "src/input/inputState";
import Keyboard from "src/input/keyboard";
import Mouse from "src/input/mouse";
import TouchScreen from "src/input/touchScreen";
import Animation from "src/render/animation";
import AnimationPlayer from "src/render/animationPlayer";
import Parallax from "src/render/parallax";
import ParallaxLayer from "src/render/parallaxLayer";
import Particle from "src/render/particle";
import ParticleEmitter from "src/render/particleEmitter";
import ParticleSystem from "src/render/particleSystem";
import Renderable from "src/render/renderable";
import SpriteSheet from "src/render/spriteSheet";
import Text2D from "src/render/text2D";
import Texture from "src/render/texture";
import TrailEmitter from "src/render/trailEmitter";
import TrailParticle from "src/render/trailParticle";
import TrailSystem from "src/render/trailSystem";
import AutoMoveCamera from "src/scene/autoMoveCamera";
import SceneNode from "src/scene/sceneNode";

// Import utils
import * as Utils from "src/core/math"; // TODO : polyfill Math


class Application
{
    //=======================
    // Constructors
    //=======================

    /**
     * Create the application.
     */
    constructor ()
    {
        // Application loop identifier
        this._animationFrameId = null;

        // Date of the last update
        this._lastUpdateDate = null;
    }


    //=======================
    // Operations
    //=======================

    /**
     * Initialize the application.
     */
    initialize ()
    {
        RenderEngine.setClearColor("#000000");
    }

    /**
     * Update the application.
     * @param dt : delta time since last update.
     */
    update (dt)
    {
        TimeEngine.update(dt);
        InputEngine.update(dt);
        SceneEngine.update(dt);
        CameraEngine.update(dt);
        PhysicEngine.update(dt);
        RenderEngine.update(dt);
        CallbackEngine.update(dt);
    }

    /**
     * Terminate the application.
     */
    terminate ()
    {
        if (this._animationFrameId)
        {
            window.cancelAnimationFrame(this._animationFrameId);
            this._animationFrameId = null;
        }
    }

    /**
     * Launch the application.
     */
    run ()
    {
        this._lastUpdateDate = new Date();

        // Cancel the old animation frame
        if (this._animationFrameId)
        {
            window.cancelAnimationFrame(this._animationFrameId);
        }

        var self = this;
        var callback = function ()
        {
            var dt = new Date() - self._lastUpdateDate;

            self.update(dt);
            self._lastUpdateDate = new Date();

            self._animationFrameId = window.requestAnimationFrame(callback);
        };
        this._animationFrameId = window.requestAnimationFrame(callback);
    }
}

export default new Application();

window.demilune =
{
    Application:    Application,
    RenderEngine:   RenderEngine,
    SceneEngine:    SceneEngine,
    CallbackEngine: CallbackEngine,
    TimeEngine:     TimeEngine,
    CameraEngine:   CameraEngine,
    AudioEngine:    AudioEngine,
    InputEngine:    InputEngine,
    PhysicEngine:   PhysicEngine,

    Sound:          Sound,
    Color:          Color,
    InputState:     InputState,
    Keyboard:       Keyboard,
    Mouse:          Mouse,
    TouchScreen:    TouchScreen,
    Animation:      Animation,
    AnimationPlayer:   AnimationPlayer,
    Parallax:       Parallax,
    ParallaxLayer:  ParallaxLayer,
    Particle:       Particle,
    ParticleEmitter:    ParticleEmitter,
    ParticleSystem: ParticleSystem,
    Renderable:     Renderable,
    SpriteSheet:    SpriteSheet,
    Text2D:         Text2D,
    Texture:        Texture,
    TrailEmitter:   TrailEmitter,
    TrailParticle:  TrailParticle,
    TrailSystem:    TrailSystem,
    AutoMoveCamera: AutoMoveCamera,
    SceneNode:      SceneNode,

    Utils:          Utils
};

console.debug('Application.js loaded');