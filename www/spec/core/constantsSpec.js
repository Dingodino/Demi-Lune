"use strict";

import "src/core/constants";


describe("Constants", function ()
{
    it("should be created", function ( done )
    {
        expect(window.b2World).not.toBeNull();
        expect(window.b2World).not.toBeUndefined();

        expect(window.b2Vec2).not.toBeNull();
        expect(window.b2Vec2).not.toBeUndefined();

        expect(window.b2AABB).not.toBeNull();
        expect(window.b2AABB).not.toBeUndefined();

        expect(window.b2BodyDef).not.toBeNull();
        expect(window.b2BodyDef).not.toBeUndefined();

        expect(window.b2Body).not.toBeNull();
        expect(window.b2Body).not.toBeUndefined();

        expect(window.b2FixtureDef).not.toBeNull();
        expect(window.b2FixtureDef).not.toBeUndefined();

        expect(window.b2Fixture).not.toBeNull();
        expect(window.b2Fixture).not.toBeUndefined();

        expect(window.b2MassData).not.toBeNull();
        expect(window.b2MassData).not.toBeUndefined();

        expect(window.b2PolygonShape).not.toBeNull();
        expect(window.b2PolygonShape).not.toBeUndefined();

        expect(window.b2CircleShape).not.toBeNull();
        expect(window.b2CircleShape).not.toBeUndefined();

        expect(window.b2DebugDraw).not.toBeNull();
        expect(window.b2DebugDraw).not.toBeUndefined();

        expect(window.b2MouseJointDef).not.toBeNull();
        expect(window.b2MouseJointDef).not.toBeUndefined();

        done();
    });
});
