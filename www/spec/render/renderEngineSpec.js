"use strict";

import RenderEngine from "src/render/renderEngine";


describe("RenderEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(RenderEngine).not.toBeNull();
        expect(RenderEngine).not.toBeUndefined();

        expect(RenderEngine.m_aRenderables).not.toBeNull();
        expect(RenderEngine.m_aRenderables).not.toBeUndefined();

        expect(RenderEngine.m_ClearColor).not.toBeNull();
        expect(RenderEngine.m_ClearColor).not.toBeUndefined();
        expect(RenderEngine.m_ClearColor).toBe("#ffffff");

        expect(RenderEngine.m_v2CanvasSize).not.toBeNull();
        expect(RenderEngine.m_v2CanvasSize).not.toBeUndefined();
        expect(RenderEngine.m_v2CanvasSize.x).toBe(640);
        expect(RenderEngine.m_v2CanvasSize.y).toBe(480);

        expect(RenderEngine.m_v2CanvasHalfSize).not.toBeNull();
        expect(RenderEngine.m_v2CanvasHalfSize).not.toBeUndefined();
        expect(RenderEngine.m_v2CanvasHalfSize.x).toBe(320);
        expect(RenderEngine.m_v2CanvasHalfSize.y).toBe(240);

        expect(RenderEngine.m_bSortRenderables).not.toBeNull();
        expect(RenderEngine.m_bSortRenderables).not.toBeUndefined();
        expect(RenderEngine.m_bSortRenderables).toBe(false);

        done();
    });
});
