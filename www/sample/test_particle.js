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

import "demilune.js";


/****************************************************************
 * Sample
 ****************************************************************/

let fTimeBeforePulse = 3.0;
let fOrientation = 0;
let particleSystem = null;
let particleEmitter1 = null;
let particleEmitter2 = null;
let particleEmitter3 = null;
let particleSystem2 = null;
let particleEmitter4 = null;
let trailSystem = null;
let trailEmitter = null;
let textParticleCount = null;

function initializeTest()
{
	// Debug infos
    demilune.RenderEngine.displayFPS(new demilune.b2Vec2(240, -230));

    let textPos = new demilune.b2Vec2(-30, -230);
    textParticleCount = new demilune.Text2D();
    textParticleCount.setColor("#aaaaaa");
    textParticleCount.setFont("18px arial");
    textParticleCount.setText("0");
    textParticleCount.getSceneNode().setPosition(textPos);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(textParticleCount.getSceneNode());
    demilune.RenderEngine.addRenderable(textParticleCount);

	// Create two images
	let image = new Image();
	image.src = "sample/test_particle.png";
	let image2 = new Image();
	image2.src = "sample/test_particle2.png";

	// Create a particle system
	particleSystem = new demilune.ParticleSystem();
	//particleSystem.setImage(image);
	particleSystem.setParticleCount(1000);
	
	// Create a particle emitter
	particleEmitter1 = particleSystem.addParticleEmitter();
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(particleEmitter1.getSceneNode());
	particleEmitter1.getSceneNode().setPosition(new demilune.b2Vec2(0, 0));
	particleEmitter1.setSpeedMin(30);
	particleEmitter1.setSpeedMax(40);
	particleEmitter1.setLifeMin(3);
	particleEmitter1.setLifeMax(5);
    particleEmitter1.setColorStart(new demilune.Color(0, 0, 0, 255));
    particleEmitter1.setColorEnd(new demilune.Color(0, 100, 255, 255));
	particleEmitter1.setFrequency(100);
    particleEmitter1.launch();

	// Create a second particle emitter
	particleEmitter2 = particleSystem.addParticleEmitter();
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(particleEmitter2.getSceneNode());
	particleEmitter2.getSceneNode().setPosition(new demilune.b2Vec2(224, -168));
	particleEmitter2.setSpeedMin(30);
	particleEmitter2.setSpeedMax(40);
	particleEmitter2.setLifeMin(3);
	particleEmitter2.setLifeMax(5);
	particleEmitter2.setEmitAngle(2 * Math.PI);
    particleEmitter2.setColorStart(new demilune.Color(0, 0, 0, 255));
    particleEmitter2.setColorEnd(new demilune.Color(150, 50, 0, 255));

    // Create a third particle emitter
    particleEmitter3 = particleSystem.addParticleEmitter();
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(particleEmitter3.getSceneNode());
    particleEmitter3.getSceneNode().setPosition(new demilune.b2Vec2(224, 168));
    particleEmitter3.setSpeedMin(30);
    particleEmitter3.setSpeedMax(40);
    particleEmitter3.setAngularSpeedMin(0.5);
    particleEmitter3.setAngularSpeedMax(0.7);
    particleEmitter3.setLifeMin(0.7);
    particleEmitter3.setLifeMax(1);
    particleEmitter3.setColorStart(new demilune.Color(0, 0, 0, 255));
    particleEmitter3.setColorEnd(new demilune.Color(0, 150, 0, 255));
    particleEmitter3.setShape(particleEmitter3.EParticleShape.RECTANGLE);
    particleEmitter3.setEmitAngle(2 * Math.PI);
    particleEmitter3.setEmitShape(particleEmitter3.EParticleEmitterShape.DISK);
    particleEmitter3.setEmitRadius(50);
    particleEmitter3.setFrequency(100);
    particleEmitter3.launch();

    // Create a second particle system
	particleSystem2 = new demilune.ParticleSystem();
	particleSystem2.setImage(image2);
	particleSystem2.setParticleCount(100);
	
	// Create a fourth particle emitter
	particleEmitter4 = particleSystem2.addParticleEmitter();
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(particleEmitter4.getSceneNode());
    particleEmitter4.getSceneNode().setPosition(new demilune.b2Vec2(-224, -168));
    particleEmitter4.getSceneNode().setOrientation(0);
    particleEmitter4.setSpeedMin(20);
    particleEmitter4.setSpeedMax(30);
    particleEmitter4.setAngularSpeedMin(0.1);
    particleEmitter4.setAngularSpeedMax(0.3);
    particleEmitter4.setLifeMin(3);
    particleEmitter4.setLifeMax(5);
    particleEmitter4.setAngleMin(0);
    particleEmitter4.setAngleMax(2);
    particleEmitter4.setScaleMin(50);
    particleEmitter4.setScaleMax(70);
    particleEmitter4.setFrequency(10);
    particleEmitter4.setEmitAngle(0);
    particleEmitter4.setBlending("source-over");
    particleEmitter4.launch();

    // Create a trail system
    trailSystem = new demilune.TrailSystem();
    trailSystem.setImage(image);
    trailSystem.setParticleCount(100);

    // Create a trail emitter
    trailEmitter = trailSystem.addTrailEmitter();
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(trailEmitter.getSceneNodeStart());
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(trailEmitter.getSceneNodeEnd());
    trailEmitter.getSceneNodeStart().setPosition(new demilune.b2Vec2(-198, 120));
    trailEmitter.getSceneNodeEnd().setPosition(new demilune.b2Vec2(60, 170));
    trailEmitter.getSceneNodeStart().update();
    trailEmitter.getSceneNodeEnd().update();
    trailEmitter.setColorStart(new demilune.Color(255, 0, 0, 255));
    trailEmitter.setColorEnd(new demilune.Color(0, 0, 255, 0));
    trailEmitter.setThickness(10);
    trailEmitter.setLife(1.0);
    trailEmitter.setBlending("source-over");
    trailEmitter.setFrequency(100);
    trailEmitter.launch();
}

function updateTest()
{    
	// Update particle system
	particleSystem.update();
	particleSystem2.update();
	
	// Rotate first particle emitter
	fOrientation += demilune.TimeEngine.getDeltaTime() * 2.0;
	particleEmitter1.getSceneNode().setOrientation(fOrientation);

	// Pulse second particle emitter
	fTimeBeforePulse -= demilune.TimeEngine.getDeltaTime();
	if (fTimeBeforePulse <= 0.0)
	{
		fTimeBeforePulse = 3.0;
		particleEmitter2.pulse(100);
	}

    // Update trail system
    trailSystem.update();

    // Rotate trail emitter
    fOrientation += demilune.TimeEngine.getDeltaTime() * 1.0;
    let v2PositionStart = new demilune.b2Vec2(trailEmitter.getSceneNodeStart().getWorldPosition().x,
                                     trailEmitter.getSceneNodeStart().getWorldPosition().y);
    v2PositionStart.y = 50 + Math.cos(fOrientation) * 100.0;
    let v2PositionEnd = new demilune.b2Vec2(0, 1);
    v2PositionEnd = demilune.Utils.rotateVector(v2PositionEnd, fOrientation);
    v2PositionEnd.x *= 80;
    v2PositionEnd.y *= 80;
    v2PositionEnd.x += v2PositionStart.x;
    v2PositionEnd.y += v2PositionStart.y;
    trailEmitter.getSceneNodeStart().setPosition(v2PositionStart);
    trailEmitter.getSceneNodeEnd().setPosition(v2PositionEnd);

    // Update particle count
    let iParticleCount = particleEmitter1.m_aParticles.length;
    iParticleCount += particleEmitter2.m_aParticles.length;
    iParticleCount += particleEmitter3.m_aParticles.length;
    iParticleCount += particleEmitter4.m_aParticles.length;
    iParticleCount += trailEmitter.m_aTrailParticles.length;
    textParticleCount.setText(iParticleCount + " particles");

    demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
}

demilune.CallbackEngine.subscribePostRenderCallback(initializeTest);
demilune.CallbackEngine.subscribePostRenderCallback(updateTest);