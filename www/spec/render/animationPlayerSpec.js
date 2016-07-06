"use strict";

import {AnimationPlayer} from "src/render/animationPlayer";


describe("AnimationPlayer", function ()
{
    it("should be created", function ( done )
    {
        expect(AnimationPlayer).not.toBeNull();
        expect(AnimationPlayer).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let animationPlayer = new AnimationPlayer();

        expect(animationPlayer).not.toBeNull();
        expect(animationPlayer).not.toBeUndefined();

        expect(animationPlayer.m_SpriteSheet).toBeNull();
        expect(animationPlayer.m_SpriteSheet).not.toBeUndefined();

        expect(animationPlayer.m_aAnimations).not.toBeNull();
        expect(animationPlayer.m_aAnimations).not.toBeUndefined();
        // TODO expect(animationPlayer.m_aAnimations).getInstance()of(Array);

        expect(animationPlayer.m_iCurrentAnimation).not.toBeNull();
        expect(animationPlayer.m_iCurrentAnimation).not.toBeUndefined();
        expect(animationPlayer.m_iCurrentAnimation).toBe(0);

        expect(animationPlayer.m_fCurrentTime).not.toBeNull();
        expect(animationPlayer.m_fCurrentTime).not.toBeUndefined();
        expect(animationPlayer.m_fCurrentTime).toBe(0);

        expect(animationPlayer.m_iCurrentFrameLine).not.toBeNull();
        expect(animationPlayer.m_iCurrentFrameLine).not.toBeUndefined();
        expect(animationPlayer.m_iCurrentFrameLine).toBe(0);

        expect(animationPlayer.m_iCurrentFrameColumn).not.toBeNull();
        expect(animationPlayer.m_iCurrentFrameColumn).not.toBeUndefined();
        expect(animationPlayer.m_iCurrentFrameColumn).toBe(0);

        expect(animationPlayer.m_bHFlip).not.toBeNull();
        expect(animationPlayer.m_bHFlip).not.toBeUndefined();
        expect(animationPlayer.m_bHFlip).toBe(false);

        expect(animationPlayer.m_bVFlip).not.toBeNull();
        expect(animationPlayer.m_bVFlip).not.toBeUndefined();
        expect(animationPlayer.m_bVFlip).toBe(false);

        done();
    });
});
