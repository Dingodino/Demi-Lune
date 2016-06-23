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


// Ball
function Ball()
{
    this.m_Body =       null;
    this.m_Texture =    null;
};

Ball.prototype.initialize = function(a_v2Pos)
{
    let fixtureDef = new demilune.b2FixtureDef();
    fixtureDef.shape = new demilune.b2CircleShape(20);
    fixtureDef.density = 1.0;
    fixtureDef.restitution = 0.8;
    fixtureDef.friction = 0.05;
    let bodyDef = new demilune.b2BodyDef();
    bodyDef.position.x = a_v2Pos.x;
    bodyDef.position.y = a_v2Pos.y;
    bodyDef.type = demilune.b2Body.b2_dynamicBody;
    this.m_Body = demilune.PhysicEngine.getWorld().CreateBody(bodyDef);
    this.m_Body.CreateFixture(fixtureDef);

    this.m_Texture = new demilune.Texture();
    demilune.RenderEngine.addRenderable(this.m_Texture);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(this.m_Texture.m_SceneNode);
    this.m_Texture.m_SceneNode.m_v2Scale.x = 40;
    this.m_Texture.m_SceneNode.m_v2Scale.y = 40;
}

Ball.prototype.update = function(a_fdt)
{
    this.m_Texture.m_SceneNode.m_v2Pos.x = this.m_Body.GetPosition().x;
    this.m_Texture.m_SceneNode.m_v2Pos.y = this.m_Body.GetPosition().y;
    this.m_Texture.m_SceneNode.m_fOrientation = 2*Math.PI - this.m_Body.GetAngle();
}

// Ground
function Ground()
{
    this.m_Body =       null;
    this.m_v2HalfSize = null;
    this.m_SceneNode =  null;
};

Ground.prototype.initialize = function(a_v2Pos, a_v2Size)
{
    this.m_v2HalfSize = new demilune.b2Vec2();
    this.m_v2HalfSize.x = a_v2Size.x;
    this.m_v2HalfSize.y = a_v2Size.y;

    let fixtureDef = new demilune.b2FixtureDef();
    fixtureDef.shape = new demilune.b2PolygonShape();
    fixtureDef.shape.SetAsBox(this.m_v2HalfSize.x, this.m_v2HalfSize.y);
    fixtureDef.density = 10.0;
    fixtureDef.restitution = 0.3;
    fixtureDef.friction = 0.1;
    let bodyDef = new demilune.b2BodyDef();
    bodyDef.position.x = a_v2Pos.x;
    bodyDef.position.y = a_v2Pos.y;
    bodyDef.type = demilune.b2Body.b2_staticBody;
    this.m_Body = demilune.PhysicEngine.getWorld().CreateBody(bodyDef);
    this.m_Body.CreateFixture(fixtureDef);

    this.m_SceneNode = new demilune.SceneNode();
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(this.m_SceneNode);
}

Ground.prototype.update = function(a_fdt)
{
    this.m_SceneNode.m_v2Pos.x = this.m_Body.GetPosition().x;
    this.m_SceneNode.m_v2Pos.y = this.m_Body.GetPosition().y;
}


/****************************************************************
 * Sample
 ****************************************************************/

var image = null;
var balls = [];
var grounds = [];
var timer = 0;
var textMousePos = null;
var textBallPos = null;

function initializeTest()
{
    demilune.RenderEngine.setClearColor('#ffffff');
    demilune.RenderEngine.displayFPS(new demilune.b2Vec2(240, -230));

    let textPos = new demilune.b2Vec2(-30, -230);
    textMousePos = new demilune.Text2D();
    textMousePos.setColor("#ff0000");
    textMousePos.setFont("18px arial");
    textMousePos.setText("0, 0");
    textMousePos.getSceneNode().setPosition(textPos);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(textMousePos.getSceneNode());
    demilune.RenderEngine.addRenderable(textMousePos);

    textPos = new demilune.b2Vec2(-230, -230);
    textBallPos = new demilune.Text2D();
    textBallPos.setColor("#ff0000");
    textBallPos.setFont("18px arial");
    textBallPos.setText("0, 0");
    textBallPos.getSceneNode().setPosition(textPos);
    demilune.SceneEngine.getRootSceneNode().attachSceneNode(textBallPos.getSceneNode());
    demilune.RenderEngine.addRenderable(textBallPos);

    // Ball texture
    image = new Image();
    image.src = "sample/test_physic.png";

    grounds[0] = new Ground();
    grounds[0].initialize(new demilune.b2Vec2(0, -200), new demilune.b2Vec2(250, 20));

    grounds[1] = new Ground();
    grounds[1].initialize(new demilune.b2Vec2(-230, 0), new demilune.b2Vec2(20, 200));

    grounds[2] = new Ground();
    grounds[2].initialize(new demilune.b2Vec2(230, 0), new demilune.b2Vec2(20, 200));
}

function updateTest()
{
    let v2CamPos = demilune.CameraEngine.m_SceneNode.m_v2Pos;

    // Create random balls
    if (balls.length < 50)
    {
        timer += demilune.TimeEngine.getDeltaTime();
        if (timer > 0.5)
        {
            let ball = new Ball();
            ball.initialize(new demilune.b2Vec2(0, 200));
            ball.m_Texture.m_Image = image;
            ball.m_Body.SetLinearVelocity(new demilune.b2Vec2(demilune.Utils.randomf(-30, 30), -30));
            balls.push(ball);

            timer = 0;
        }
    }

    // Add mouse force
    if (demilune.Mouse.m_aButtons[0] == demilune.InputState.GOTO_PRESSED)
    {
        for (var i = 0; i < balls.length; i++)
        {
            let v2BallPosInScreen = demilune.RenderEngine.convertScenePosToScreenPos(balls[i].m_Body.GetPosition(), v2CamPos);
            let v2Dir = new demilune.b2Vec2(v2BallPosInScreen.x - Mouse.m_v2Pos.x,
                v2BallPosInScreen.y - Mouse.m_v2Pos.y);
            let fDistance = Math.sqrt(v2Dir.x * v2Dir.x + v2Dir.y * v2Dir.y);
            let v2Normal = new demilune.b2Vec2(v2Dir.x / fDistance, v2Dir.y / fDistance);
            if (fDistance < 50)
            {
                v2Dir.x = v2Normal.x * 600000;
                v2Dir.y = v2Normal.y * 600000;
                balls[i].m_Body.ApplyImpulse(v2Dir, balls[i].m_Body.GetPosition());
            }
        }
    }

    // Update gameplay
    for (var i = 0; i < balls.length; i++)
    {
        balls[i].update(demilune.TimeEngine.m_fDeltaTime);
    }
    for (var i = 0; i < grounds.length; i++)
    {
        grounds[i].update(demilune.TimeEngine.m_fDeltaTime);
    }

    for (var i = 0; i < grounds.length; i++)
    {
        let v2GroundPos = demilune.RenderEngine.convertScenePosToScreenPos(grounds[i].m_SceneNode.m_v2Pos, new demilune.b2Vec2(0, 0));
        let v2HalfSize = grounds[i].m_v2HalfSize;
        let context = demilune.RenderEngine.context;
        context.save();
        context.fillStyle = 'black';
        context.fillRect(v2GroundPos.x - v2HalfSize.x, v2GroundPos.y - v2HalfSize.y, v2HalfSize.x * 2, v2HalfSize.y * 2);
        context.restore();
    }

    // Mouse position
    if (balls.length > 0)
    {
        let v2BallPos = demilune.RenderEngine.convertScenePosToScreenPos(balls[0].m_Body.GetPosition(), v2CamPos);
        textMousePos.setText("Mouse Pos : " + Math.floor(demilune.Mouse.m_v2Pos.x) + ", " + Math.floor(demilune.Mouse.m_v2Pos.y));
        textBallPos.setText("Ball Pos : " + Math.floor(v2BallPos.x) + ", " + Math.floor(v2BallPos.y));
    }

    demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
}

demilune.CallbackEngine.subscribePostRenderCallback(initializeTest);
demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
