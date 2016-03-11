"use strict";

import Texture from "src/render/texture";


describe("Texture", function ()
{
    it("should be created", function ( done )
    {
        expect(Texture).not.toBeNull();
        expect(Texture).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var texture = new Texture();

        expect(texture).not.toBeNull();
        expect(texture).not.toBeUndefined();

        expect(texture.m_Image).toBeNull();
        expect(texture.m_Image).not.toBeUndefined();

        done();
    });
});
