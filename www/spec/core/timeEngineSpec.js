"use strict";

import TimeEngine from "src/core/timeEngine";


describe("TimeEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(TimeEngine).not.toBeNull();
        expect(TimeEngine).not.toBeUndefined();

        expect(TimeEngine.m_fTime).not.toBeNull();
        expect(TimeEngine.m_fTime).not.toBeUndefined();

        expect(TimeEngine.m_fTotalTime).not.toBeNull();
        expect(TimeEngine.m_fTotalTime).not.toBeUndefined();
        expect(TimeEngine.m_fTotalTime).toBe(0);

        expect(TimeEngine.m_fDeltaTime).not.toBeNull();
        expect(TimeEngine.m_fDeltaTime).not.toBeUndefined();
        expect(TimeEngine.m_fDeltaTime).toBe(0);

        expect(TimeEngine.m_iFps).not.toBeNull();
        expect(TimeEngine.m_iFps).not.toBeUndefined();
        expect(TimeEngine.m_iFps).toBe(60);

        expect(TimeEngine.m_FpsText).not.toBeNull();
        expect(TimeEngine.m_FpsText).not.toBeUndefined();

        done();
    });

    it("should be updated", function ( done )
    {
        expect(TimeEngine).not.toBeNull();
        expect(TimeEngine).not.toBeUndefined();

        var oldTime = TimeEngine.m_fTime;
        var oldTotalTime = TimeEngine.m_fTotalTime;

        setTimeout(function()
        {
            TimeEngine.update();

            expect(TimeEngine.m_fTime).not.toBeNull();
            expect(TimeEngine.m_fTime).not.toBeUndefined();
            expect(TimeEngine.m_fTime != oldTime).toBeTruthy();

            expect(TimeEngine.m_fTotalTime).not.toBeNull();
            expect(TimeEngine.m_fTotalTime).not.toBeUndefined();
            expect(TimeEngine.m_fTotalTime != oldTotalTime).toBeTruthy();

            var fDeltaTime = TimeEngine.getDeltaTime();
            expect(fDeltaTime).not.toBeNull();
            expect(fDeltaTime).not.toBeUndefined();
            expect(fDeltaTime).toBeGreaterThan(0.95);
            expect(fDeltaTime).toBeLessThan(2);

            var iFps = TimeEngine.getFPS();
            expect(iFps).not.toBeNull();
            expect(iFps).not.toBeUndefined();
            expect(iFps).toBeGreaterThan(30);
            expect(iFps).toBeLessThan(70);

            done();

        }, 100);
    });
});
