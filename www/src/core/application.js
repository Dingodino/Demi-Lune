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

import * as Box2D from "src/core/constants";

// Import engines
import {TimeEngine} from "src/core/timeEngine";
import {BindingEngine} from "src/core/bindingEngine";
import {SceneEngine} from "src/scene/sceneEngine";
import {RenderEngine} from "src/render/renderEngine";
import {CallbackEngine} from "src/callback/callbackEngine";
import {AudioEngine} from "src/audio/audioEngine";
import {InputEngine} from "src/input/inputEngine";
import {PhysicEngine} from "src/physic/physicEngine";

// Import other classes
import {Sound} from "src/audio/sound";
import {Color} from "src/core/color";
import {InputState} from "src/input/inputState";
import {Keyboard} from "src/input/keyboard";
import {Mouse} from "src/input/mouse";
import {TouchScreen} from "src/input/touchScreen";
import {Animation} from "src/render/animation";
import {AnimationPlayer} from "src/render/animationPlayer";
import {Parallax} from "src/render/parallax";
import {ParallaxLayer} from "src/render/parallaxLayer";
import {Particle} from "src/render/particle";
import {ParticleEmitter} from "src/render/particleEmitter";
import {ParticleSystem} from "src/render/particleSystem";
import {Renderable} from "src/render/renderable";
import {SpriteSheet} from "src/render/spriteSheet";
import {Text2D} from "src/render/text2D";
import {Texture} from "src/render/texture";
import {TrailEmitter} from "src/render/trailEmitter";
import {TrailParticle} from "src/render/trailParticle";
import {TrailSystem} from "src/render/trailSystem";
import {AutoMoveCamera} from "src/scene/autoMoveCamera";
import {Camera} from "src/scene/camera";
import {SceneNode} from "src/scene/sceneNode";

// Import utils
import * as Utils from "src/core/math";


class Application
{
    //===================================================================
    // Constructors
    //===================================================================

    /**
     * Create the application.
     */
    constructor ()
    {
        // Application loop identifier
        this.animationFrameId = null;

        // Date of the last update
        this.lastUpdateDate = null;

        // Engines
        this.engines = [
            TimeEngine.getInstance(),
            BindingEngine.getInstance(),
            InputEngine.getInstance(),
            SceneEngine.getInstance(),
            PhysicEngine.getInstance(),
            RenderEngine.getInstance(),
            CallbackEngine.getInstance(),
            AudioEngine.getInstance()
        ];
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Set the canvas.
     * @param canvas : new canvas.
     */
    setCanvas (canvas)
    {
        RenderEngine.getInstance().setCanvas(canvas);
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Initialize the application.
     */
    initialize ()
    {
        // Initialize all engines
        _.forEach(this.engines, function (engine)
        {
            engine.initialize();
        });

        // Set the initial clear color
        RenderEngine.getInstance().setClearColor("#000000");
    }

    /**
     * Update the application.
     * @param dt : delta time since last update.
     */
    update (dt)
    {
        // Update all engines
        _.forEach(this.engines, function (engine)
        {
            engine.update(dt);
        });

        // Display FPS
        if (this.m_FpsText != null)
        {
            let timeEngine = TimeEngine.getInstance();
            let color = this.m_FpsText.getColor();

            if (timeEngine.m_iFps >= 50) color = '#00FF00';
            else if (timeEngine.m_iFps >= 30) color = '#FFAA00';
            else color = '#FF0000';

            this.m_FpsText.setColor(color);
        }
    }

    /**
     * Terminate the application.
     */
    terminate ()
    {
        // Terminate all engines
        _.forEach(this.engines, function (engine)
        {
            engine.terminate();
        });

        // Stop the main loop
        if (this.animationFrameId)
        {
            window.cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }

    /**
     * Launch the application.
     */
    run ()
    {
        this.lastUpdateDate = new Date();

        // Cancel the old animation frame
        if (this.animationFrameId)
        {
            window.cancelAnimationFrame(this.animationFrameId);
        }

        let self = this;
        let callback = function ()
        {
            let dt = new Date() - self.lastUpdateDate;

            self.animationFrameId = null;
            self.update(dt);
            self.lastUpdateDate = new Date();

            self.animationFrameId = window.requestAnimationFrame(callback);
        };
        this.animationFrameId = window.requestAnimationFrame(callback);
    }

    /**
     * Display the number of frames per second.
     * @param a_v2Position : displaying position.
     */
    displayFPS (a_v2Position)
    {
        if (this.m_FpsText == null)
        {
            this.m_FpsText = new Text2D();
            this.m_FpsText.m_Font = "italic small-caps bold 16px arial";
            this.m_FpsText.getSceneNode().setPosition(a_v2Position);
            this.m_FpsText.setPriority(10);
            RenderEngine.getInstance().m_CurrentCamera.m_SceneNode.attachSceneNode(this.m_FpsText.getSceneNode());
            RenderEngine.getInstance().addRenderable(this.m_FpsText);

            BindingEngine.getInstance().createBinding(TimeEngine.getInstance(), 'm_iFps', this.m_FpsText, 'm_Text');
        }
    }
}

var app = new Application();
export default app;

window.demilune =
{
    Application:    app,
    RenderEngine:   RenderEngine.getInstance(),
    SceneEngine:    SceneEngine.getInstance(),
    CallbackEngine: CallbackEngine.getInstance(),
    TimeEngine:     TimeEngine.getInstance(),
    BindingEngine:  BindingEngine.getInstance(),
    AudioEngine:    AudioEngine.getInstance(),
    InputEngine:    InputEngine.getInstance(),
    PhysicEngine:   PhysicEngine.getInstance(),

    Sound:          Sound,
    Color:          Color,
    InputState:     InputState,
    Keyboard:       Keyboard.getInstance(),
    Mouse:          Mouse.getInstance(),
    TouchScreen:    TouchScreen.getInstance(),
    Animation:      Animation,
    AnimationPlayer:AnimationPlayer,
    Parallax:       Parallax,
    ParallaxLayer:  ParallaxLayer,
    Particle:       Particle,
    ParticleEmitter:ParticleEmitter,
    ParticleSystem: ParticleSystem,
    Renderable:     Renderable,
    SpriteSheet:    SpriteSheet,
    Text2D:         Text2D,
    Texture:        Texture,
    TrailEmitter:   TrailEmitter,
    TrailParticle:  TrailParticle,
    TrailSystem:    TrailSystem,
    AutoMoveCamera: AutoMoveCamera,
    Camera:         Camera,
    SceneNode:      SceneNode,

    b2Vec2:         Box2D.b2Vec2,
    b2World:        Box2D.b2World,
    b2AABB:         Box2D.b2AABB,
    b2BodyDef:      Box2D.b2BodyDef,
    b2Body:         Box2D.b2Body,
    b2FixtureDef:   Box2D.b2FixtureDef,
    b2Fixture:      Box2D.b2Fixture,
    b2MassData:     Box2D.b2MassData,
    b2PolygonShape: Box2D.b2PolygonShape,
    b2CircleShape:  Box2D.b2CircleShape,
    b2DebugDraw:    Box2D.b2DebugDraw,
    b2MouseJointDef:Box2D.b2MouseJointDef,

    Utils:          Utils
};

console.debug('Application loaded');