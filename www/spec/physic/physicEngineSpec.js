"use strict";

import PhysicEngine from "src/physic/physicEngine";
import {b2Vec2} from "src/core/constants";


describe("PhysicEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(PhysicEngine).not.toBeNull();
        expect(PhysicEngine).not.toBeUndefined();

        expect(PhysicEngine.m_v2Gravity).not.toBeNull();
        expect(PhysicEngine.m_v2Gravity).not.toBeUndefined();
        expect(PhysicEngine.m_v2Gravity.x).toBe(0);
        expect(PhysicEngine.m_v2Gravity.y).toBe(-50);

        expect(PhysicEngine.m_World).not.toBeNull();
        expect(PhysicEngine.m_World).not.toBeUndefined();
        // TODO : expect(PhysicEngine.m_World).instanceof(World);

        expect(PhysicEngine.m_fTimeStep).not.toBeNull();
        expect(PhysicEngine.m_fTimeStep).not.toBeUndefined();
        expect(PhysicEngine.m_fTimeStep).toBe(1.0/30.0);

        expect(PhysicEngine.m_iVelocityIterationCount).not.toBeNull();
        expect(PhysicEngine.m_iVelocityIterationCount).not.toBeUndefined();
        expect(PhysicEngine.m_iVelocityIterationCount).toBe(6);

        expect(PhysicEngine.m_iPositionIterationCount).not.toBeNull();
        expect(PhysicEngine.m_iPositionIterationCount).not.toBeUndefined();
        expect(PhysicEngine.m_iPositionIterationCount).toBe(2);

        done();
    });

    it("should take accessors into account", function ( done )
    {
        expect(PhysicEngine).not.toBeNull();
        expect(PhysicEngine).not.toBeUndefined();

        PhysicEngine.setGravity(new b2Vec2(0, -10));
        PhysicEngine.setVelocityIterationCount(3);
        PhysicEngine.setPositionIterationCount(8);

        expect(PhysicEngine.getGravity().x).toBe(0);
        expect(PhysicEngine.getGravity().y).toBe(-10);
        expect(PhysicEngine.getVelocityIterationCount()).toBe(3);
        expect(PhysicEngine.getPositionIterationCount()).toBe(8);

        done();
    });
});
