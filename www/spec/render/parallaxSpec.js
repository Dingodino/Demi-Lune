"use strict";

import Parallax from "src/render/parallax";


describe("Parallax", function ()
{
    it("should be created", function ( done )
    {
        expect(Parallax).not.toBeNull();
        expect(Parallax).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var parallax = new Parallax();

        expect(parallax).not.toBeNull();
        expect(parallax).not.toBeUndefined();

        expect(parallax.m_aParallaxLayers).not.toBeNull();
        expect(parallax.m_aParallaxLayers).not.toBeUndefined();
        // TODO : expect(parallax.m_aParallaxLayers).instanceof(Array);

        done();
    });
});
