"use strict";

import PhysicEngine from "src/physic/physicEngine";


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
});
