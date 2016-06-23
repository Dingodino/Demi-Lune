"use strict";

import RenderEngine from "src/render/renderEngine";
import {Renderable} from "src/render/renderable";
import {Color} from "src/core/color";
import {b2Vec2} from "src/core/constants";


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

    it("should take accessors into account", function ( done )
    {
        expect(RenderEngine).not.toBeNull();
        expect(RenderEngine).not.toBeUndefined();

        RenderEngine.setClearColor(new Color(100, 200, 250, 255));
        RenderEngine.setCanvasSize(new b2Vec2(640, 480));

        expect(RenderEngine.getClearColor().r).toBe(100);
        expect(RenderEngine.getClearColor().g).toBe(200);
        expect(RenderEngine.getClearColor().b).toBe(250);
        expect(RenderEngine.getClearColor().a).toBe(255);

        expect(RenderEngine.getCanvasSize().x).toBe(640);
        expect(RenderEngine.getCanvasSize().y).toBe(480);

        done();
    });

    it("should be updated", function ( done )
    {
        expect(RenderEngine).not.toBeNull();
        expect(RenderEngine).not.toBeUndefined();

        // Add renderable
        let renderable = new Renderable();
        expect(RenderEngine.m_aRenderables.length).toBe(0);
        RenderEngine.addRenderable(renderable);
        expect(RenderEngine.m_aRenderables.length).toBe(1);

        // Remove renderable
        expect(RenderEngine.m_aRenderables.length).toBe(1);
        RenderEngine.removeRenderable(renderable);
        expect(RenderEngine.m_aRenderables.length).toBe(0);

        done();
    });
});
