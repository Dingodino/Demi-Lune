/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Nicolas DAURES
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

var parallax = null;

function initializeTest()
{
    demilune.RenderEngine.setClearColor("#ffb21e");
    demilune.RenderEngine.displayFPS(new b2Vec2(240, -230));

    // Create a parallax
    parallax = new demilune.Parallax();

    var parallaxLayer = new demilune.ParallaxLayer();
    parallaxLayer.m_Image = new Image();
    parallaxLayer.m_Image.src = "sample/test_parallax1.png";
    parallaxLayer.m_v2Factor.x = 0;
    parallaxLayer.m_v2Factor.y = 0;
    parallaxLayer.m_iPriority = 3;
    parallaxLayer.m_SceneNode.m_v2Pos = new b2Vec2(0, -206);
    parallaxLayer.m_SceneNode.m_v2Scale = new b2Vec2(1920, 75);
    parallax.m_aParallaxLayers.push(parallaxLayer);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(parallaxLayer.m_SceneNode);
    demilune.RenderEngine.addRenderable(parallaxLayer);

    parallaxLayer = new demilune.ParallaxLayer();
    parallaxLayer.m_Image = new Image();
    parallaxLayer.m_Image.src = "sample/test_parallax2.png";
    parallaxLayer.m_v2Factor.x = 0.5;
    parallaxLayer.m_v2Factor.y = 0;
    parallaxLayer.m_iPriority = 2;
    parallaxLayer.m_SceneNode.m_v2Pos = new b2Vec2(0, -120);
    parallaxLayer.m_SceneNode.m_v2Scale = new b2Vec2(1920, 276);
    parallax.m_aParallaxLayers.push(parallaxLayer);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(parallaxLayer.m_SceneNode);
    demilune.RenderEngine.addRenderable(parallaxLayer);

    parallaxLayer = new demilune.ParallaxLayer();
    parallaxLayer.m_Image = new Image();
    parallaxLayer.m_Image.src = "sample/test_parallax3.png";
    parallaxLayer.m_v2Factor.x = 0.9;
    parallaxLayer.m_v2Factor.y = 0;
    parallaxLayer.m_iPriority = 1;
    parallaxLayer.m_SceneNode.m_v2Pos = new b2Vec2(200, -90);
    parallaxLayer.m_SceneNode.m_v2Scale = new b2Vec2(200, 200);
    parallax.m_aParallaxLayers.push(parallaxLayer);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(parallaxLayer.m_SceneNode);
    demilune.RenderEngine.addRenderable(parallaxLayer);

    parallaxLayer = new demilune.ParallaxLayer();
    parallaxLayer.m_Image = new Image();
    parallaxLayer.m_Image.src = "sample/test_parallax4.png";
    parallaxLayer.m_v2Factor.x = 1;
    parallaxLayer.m_v2Factor.y = 0;
    parallaxLayer.m_iPriority = 0;
    parallaxLayer.m_bRepeatOnX = false;
    parallaxLayer.m_SceneNode.m_v2Pos = new b2Vec2(200, 100);
    parallaxLayer.m_SceneNode.m_v2Scale = new b2Vec2(199, 190);
    parallax.m_aParallaxLayers.push(parallaxLayer);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(parallaxLayer.m_SceneNode);
    demilune.RenderEngine.addRenderable(parallaxLayer);

    // Launch auto-move camera
    var autoMoveCamera = new demilune.AutoMoveCamera();
    autoMoveCamera.m_v2Speed.x = 100;
    demilune.CameraEngine.m_CameraBehavior = autoMoveCamera;
}

function updateTest()
{
    // Update parallax
    var v2Move = new b2Vec2();
    v2Move.x = demilune.CameraEngine.m_SceneNode.m_v2Pos.x;
    v2Move.y = demilune.CameraEngine.m_SceneNode.m_v2Pos.y;
    demilune.CameraEngine.update();
    v2Move.x = demilune.CameraEngine.m_SceneNode.m_v2Pos.x - v2Move.x;
    v2Move.y = demilune.CameraEngine.m_SceneNode.m_v2Pos.y - v2Move.y;

    parallax.move(v2Move);

    demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
}

demilune.CallbackEngine.subscribePostRenderCallback(initializeTest);
demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
