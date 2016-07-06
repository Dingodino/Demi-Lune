"use strict";

import {PhysicEngine} from "src/physic/physicEngine";
import {b2Vec2} from "src/core/constants";


describe("PhysicEngine", function ()
{
    it("should be created", function ( done )
    {
        let physicEngine = PhysicEngine.getInstance();

        expect(physicEngine).not.toBeNull();
        expect(physicEngine).not.toBeUndefined();

        expect(physicEngine.m_v2Gravity).not.toBeNull();
        expect(physicEngine.m_v2Gravity).not.toBeUndefined();
        expect(physicEngine.m_v2Gravity.x).toBe(0);
        expect(physicEngine.m_v2Gravity.y).toBe(-50);

        expect(physicEngine.m_World).not.toBeNull();
        expect(physicEngine.m_World).not.toBeUndefined();
        // TODO : expect(physicEngine.m_World).getInstance()of(World);

        expect(physicEngine.m_fTimeStep).not.toBeNull();
        expect(physicEngine.m_fTimeStep).not.toBeUndefined();
        expect(physicEngine.m_fTimeStep).toBe(1.0/30.0);

        expect(physicEngine.m_iVelocityIterationCount).not.toBeNull();
        expect(physicEngine.m_iVelocityIterationCount).not.toBeUndefined();
        expect(physicEngine.m_iVelocityIterationCount).toBe(6);

        expect(physicEngine.m_iPositionIterationCount).not.toBeNull();
        expect(physicEngine.m_iPositionIterationCount).not.toBeUndefined();
        expect(physicEngine.m_iPositionIterationCount).toBe(2);

        done();
    });

    it("should take accessors into account", function ( done )
    {
        let physicEngine = PhysicEngine.getInstance();
        
        expect(physicEngine).not.toBeNull();
        expect(physicEngine).not.toBeUndefined();

        physicEngine.setGravity(new b2Vec2(0, -10));
        physicEngine.setVelocityIterationCount(3);
        physicEngine.setPositionIterationCount(8);

        expect(physicEngine.getGravity().x).toBe(0);
        expect(physicEngine.getGravity().y).toBe(-10);
        expect(physicEngine.getVelocityIterationCount()).toBe(3);
        expect(physicEngine.getPositionIterationCount()).toBe(8);

        done();
    });
});
