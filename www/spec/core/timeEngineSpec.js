"use strict";

import {TimeEngine} from "src/core/timeEngine";


describe("TimeEngine", function ()
{
    it("should be created", function ( done )
    {
        let timeEngine = TimeEngine.getInstance();

        expect(timeEngine).not.toBeNull();
        expect(timeEngine).not.toBeUndefined();

        expect(timeEngine.m_fTime).not.toBeNull();
        expect(timeEngine.m_fTime).not.toBeUndefined();

        expect(timeEngine.m_fTotalTime).not.toBeNull();
        expect(timeEngine.m_fTotalTime).not.toBeUndefined();
        expect(timeEngine.m_fTotalTime).toBe(0);

        expect(timeEngine.m_fDeltaTime).not.toBeNull();
        expect(timeEngine.m_fDeltaTime).not.toBeUndefined();
        expect(timeEngine.m_fDeltaTime).toBe(0);

        expect(timeEngine.m_iFps).not.toBeNull();
        expect(timeEngine.m_iFps).not.toBeUndefined();
        expect(timeEngine.m_iFps).toBe(60);

        done();
    });

    it("should be updated", function ( done )
    {
        let timeEngine = TimeEngine.getInstance();
        
        expect(timeEngine).not.toBeNull();
        expect(timeEngine).not.toBeUndefined();

        let oldTime = timeEngine.m_fTime;
        let oldTotalTime = timeEngine.m_fTotalTime;

        setTimeout(function()
        {
            timeEngine.update();

            expect(timeEngine.m_fTime).not.toBeNull();
            expect(timeEngine.m_fTime).not.toBeUndefined();
            expect(timeEngine.m_fTime != oldTime).toBeTruthy();

            expect(timeEngine.m_fTotalTime).not.toBeNull();
            expect(timeEngine.m_fTotalTime).not.toBeUndefined();
            expect(timeEngine.m_fTotalTime != oldTotalTime).toBeTruthy();

            let fDeltaTime = timeEngine.getDeltaTime();
            expect(fDeltaTime).not.toBeNull();
            expect(fDeltaTime).not.toBeUndefined();
            expect(fDeltaTime).toBeGreaterThan(0.095);
            expect(fDeltaTime).toBeLessThan(0.200);

            let iFps = timeEngine.getFPS();
            expect(iFps).not.toBeNull();
            expect(iFps).not.toBeUndefined();
            expect(iFps).toBeGreaterThan(30);
            expect(iFps).toBeLessThan(70);

            done();

        }, 100);
    });
});
