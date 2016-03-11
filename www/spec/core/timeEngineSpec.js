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
        // TODO : expect(TimeEngine.m_FpsText).instanceof(Text2D);

        done();
    });
});
