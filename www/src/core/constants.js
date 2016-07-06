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

import * as Box2D from "libs/box2d";

// TODO : mode all physic concepts to PhysicEngine
export let b2World = Box2D.Dynamics.b2World;
export let b2Vec2 = Box2D.Common.Math.b2Vec2;
export let b2AABB = Box2D.Collision.b2AABB;
export let b2BodyDef = Box2D.Dynamics.b2BodyDef;
export let b2Body = Box2D.Dynamics.b2Body;
export let b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
export let b2Fixture = Box2D.Dynamics.b2Fixture;
export let b2MassData = Box2D.Collision.Shapes.b2MassData;
export let b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
export let b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
export let b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
export let b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;

console.debug('constants loaded');