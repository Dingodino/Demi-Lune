"use strict";

import {Renderable} from "src/render/renderable";


describe("Renderable", function ()
{
    it("should be created", function ( done )
    {
        expect(Renderable).not.toBeNull();
        expect(Renderable).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let renderable = new Renderable();

        expect(renderable).not.toBeNull();
        expect(renderable).not.toBeUndefined();

        expect(renderable.m_SceneNode).not.toBeNull();
        expect(renderable.m_SceneNode).not.toBeUndefined();

        expect(renderable.m_iPriority).not.toBeNull();
        expect(renderable.m_iPriority).not.toBeUndefined();
        expect(renderable.m_iPriority).toBe(0);

        done();
    });
});
