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

import "src/physic/Box2dWeb";


// "Import" des classes box2dweb
window.b2World = Box2D.Dynamics.b2World;
window.b2Vec2 = Box2D.Common.Math.b2Vec2;
window.b2AABB = Box2D.Collision.b2AABB;
window.b2BodyDef = Box2D.Dynamics.b2BodyDef;
window.b2Body = Box2D.Dynamics.b2Body;
window.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
window.b2Fixture = Box2D.Dynamics.b2Fixture;
window.b2MassData = Box2D.Collision.Shapes.b2MassData;
window.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
window.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
window.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
window.b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

console.debug('constants.js loaded');