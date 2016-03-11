"use strict";

import Animation from "src/render/animation";


describe("Animation", function ()
{
    it("should be created", function ( done )
    {
        expect(Animation).not.toBeNull();
        expect(Animation).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var animation = new Animation();

        expect(animation).not.toBeNull();
        expect(animation).not.toBeUndefined();

        expect(animation.m_SpriteSheet).toBeNull();
        expect(animation.m_SpriteSheet).not.toBeUndefined();

        expect(animation.m_aFrameIndexes).not.toBeNull();
        expect(animation.m_aFrameIndexes).not.toBeUndefined();
        // TODO : expect(animationPlayer.m_aFrameIndexes).instanceof(Array);

        expect(animation.m_iFrameCount).not.toBeNull();
        expect(animation.m_iFrameCount).not.toBeUndefined();
        expect(animation.m_iFrameCount).toBe(0);

        expect(animation.m_fDuration).not.toBeNull();
        expect(animation.m_fDuration).not.toBeUndefined();
        expect(animation.m_fDuration).toBe(0);

        done();
    });
});
