"use strict";

import {RenderEngine} from "src/render/renderEngine";
import {Renderable} from "src/render/renderable";
import {Color} from "src/core/color";
import {b2Vec2} from "src/core/constants";


describe("RenderEngine", function ()
{
    it("should be created", function ( done )
    {
        let renderEngine = RenderEngine.getInstance();

        expect(renderEngine).not.toBeNull();
        expect(renderEngine).not.toBeUndefined();

        expect(renderEngine.m_aRenderables).not.toBeNull();
        expect(renderEngine.m_aRenderables).not.toBeUndefined();

        expect(renderEngine.m_ClearColor).not.toBeNull();
        expect(renderEngine.m_ClearColor).not.toBeUndefined();
        expect(renderEngine.m_ClearColor).toBe("#ffffff");

        expect(renderEngine.m_v2CanvasSize).not.toBeNull();
        expect(renderEngine.m_v2CanvasSize).not.toBeUndefined();
        expect(renderEngine.m_v2CanvasSize.x).toBe(640);
        expect(renderEngine.m_v2CanvasSize.y).toBe(480);

        expect(renderEngine.m_v2CanvasHalfSize).not.toBeNull();
        expect(renderEngine.m_v2CanvasHalfSize).not.toBeUndefined();
        expect(renderEngine.m_v2CanvasHalfSize.x).toBe(320);
        expect(renderEngine.m_v2CanvasHalfSize.y).toBe(240);

        expect(renderEngine.m_bSortRenderables).not.toBeNull();
        expect(renderEngine.m_bSortRenderables).not.toBeUndefined();
        expect(renderEngine.m_bSortRenderables).toBe(false);

        done();
    });

    it("should take accessors into account", function ( done )
    {
        let renderEngine = RenderEngine.getInstance();

        expect(renderEngine).not.toBeNull();
        expect(renderEngine).not.toBeUndefined();

        renderEngine.setClearColor(new Color(100, 200, 250, 255));
        renderEngine.setCanvasSize(new b2Vec2(640, 480));

        expect(renderEngine.getClearColor().r).toBe(100);
        expect(renderEngine.getClearColor().g).toBe(200);
        expect(renderEngine.getClearColor().b).toBe(250);
        expect(renderEngine.getClearColor().a).toBe(255);

        expect(renderEngine.getCanvasSize().x).toBe(640);
        expect(renderEngine.getCanvasSize().y).toBe(480);

        done();
    });

    it("should be updated", function ( done )
    {
        let renderEngine = RenderEngine.getInstance();
        
        expect(renderEngine).not.toBeNull();
        expect(renderEngine).not.toBeUndefined();

        // Add renderable
        let renderable = new Renderable();
        expect(renderEngine.m_aRenderables.length).toBe(0);
        renderEngine.addRenderable(renderable);
        expect(renderEngine.m_aRenderables.length).toBe(1);

        // Remove renderable
        expect(renderEngine.m_aRenderables.length).toBe(1);
        renderEngine.removeRenderable(renderable);
        expect(renderEngine.m_aRenderables.length).toBe(0);

        done();
    });
});
