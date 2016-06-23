"use strict";

import {SpriteSheet} from "src/render/spriteSheet";


describe("SpriteSheet", function ()
{
    it("should be created", function ( done )
    {
        expect(SpriteSheet).not.toBeNull();
        expect(SpriteSheet).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let spriteSheet = new SpriteSheet();

        expect(spriteSheet).not.toBeNull();
        expect(spriteSheet).not.toBeUndefined();

        expect(spriteSheet.m_Image).toBeNull();
        expect(spriteSheet.m_Image).not.toBeUndefined();

        expect(spriteSheet.m_iFrameCount).not.toBeNull();
        expect(spriteSheet.m_iFrameCount).not.toBeUndefined();
        expect(spriteSheet.m_iFrameCount).toBe(0);

        expect(spriteSheet.m_iLineCount).not.toBeNull();
        expect(spriteSheet.m_iLineCount).not.toBeUndefined();
        expect(spriteSheet.m_iLineCount).toBe(0);

        expect(spriteSheet.m_iColumnCount).not.toBeNull();
        expect(spriteSheet.m_iColumnCount).not.toBeUndefined();
        expect(spriteSheet.m_iColumnCount).toBe(0);

        expect(spriteSheet.m_v2FrameSize).not.toBeNull();
        expect(spriteSheet.m_v2FrameSize).not.toBeUndefined();
        expect(spriteSheet.m_v2FrameSize.x).toBe(0);
        expect(spriteSheet.m_v2FrameSize.y).toBe(0);

        done();
    });
});
