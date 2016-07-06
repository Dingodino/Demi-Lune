"use strict";

import * as Box2D from "src/core/constants";


describe("Constants", function ()
{
    it("should be created", function ( done )
    {
        expect(Box2D.b2World).not.toBeNull();
        expect(Box2D.b2World).not.toBeUndefined();

        expect(Box2D.b2Vec2).not.toBeNull();
        expect(Box2D.b2Vec2).not.toBeUndefined();

        expect(Box2D.b2AABB).not.toBeNull();
        expect(Box2D.b2AABB).not.toBeUndefined();

        expect(Box2D.b2BodyDef).not.toBeNull();
        expect(Box2D.b2BodyDef).not.toBeUndefined();

        expect(Box2D.b2Body).not.toBeNull();
        expect(Box2D.b2Body).not.toBeUndefined();

        expect(Box2D.b2FixtureDef).not.toBeNull();
        expect(Box2D.b2FixtureDef).not.toBeUndefined();

        expect(Box2D.b2Fixture).not.toBeNull();
        expect(Box2D.b2Fixture).not.toBeUndefined();

        expect(Box2D.b2MassData).not.toBeNull();
        expect(Box2D.b2MassData).not.toBeUndefined();

        expect(Box2D.b2PolygonShape).not.toBeNull();
        expect(Box2D.b2PolygonShape).not.toBeUndefined();

        expect(Box2D.b2CircleShape).not.toBeNull();
        expect(Box2D.b2CircleShape).not.toBeUndefined();

        expect(Box2D.b2DebugDraw).not.toBeNull();
        expect(Box2D.b2DebugDraw).not.toBeUndefined();

        expect(Box2D.b2MouseJointDef).not.toBeNull();
        expect(Box2D.b2MouseJointDef).not.toBeUndefined();

        done();
    });
});
