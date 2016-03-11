"use strict";

import ParallaxLayer from "src/render/parallaxLayer";


describe("ParallaxLayer", function ()
{
    it("should be created", function ( done )
    {
        expect(ParallaxLayer).not.toBeNull();
        expect(ParallaxLayer).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var parallaxLayer = new ParallaxLayer();

        expect(parallaxLayer).not.toBeNull();
        expect(parallaxLayer).not.toBeUndefined();

        expect(parallaxLayer.m_Image).toBeNull();
        expect(parallaxLayer.m_Image).not.toBeUndefined();

        expect(parallaxLayer.m_v2Factor).not.toBeNull();
        expect(parallaxLayer.m_v2Factor).not.toBeUndefined();
        expect(parallaxLayer.m_v2Factor.x).toBe(0);
        expect(parallaxLayer.m_v2Factor.y).toBe(0);

        expect(parallaxLayer.m_bRepeatOnX).not.toBeNull();
        expect(parallaxLayer.m_bRepeatOnX).not.toBeUndefined();
        expect(parallaxLayer.m_bRepeatOnX).toBe(true);

        done();
    });
});
