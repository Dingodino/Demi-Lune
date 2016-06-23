"use strict";

import {Text2D} from "src/render/text2D";


describe("Text2D", function ()
{
    it("should be created", function ( done )
    {
        expect(Text2D).not.toBeNull();
        expect(Text2D).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let text2D = new Text2D();

        expect(text2D).not.toBeNull();
        expect(text2D).not.toBeUndefined();

        expect(text2D.m_Color).not.toBeNull();
        expect(text2D.m_Color).not.toBeUndefined();
        expect(text2D.m_Color).toBe("#000000");

        expect(text2D.m_Font).not.toBeNull();
        expect(text2D.m_Font).not.toBeUndefined();
        expect(text2D.m_Font).toBe("italic small-caps bold 12px arial");

        expect(text2D.m_Text).not.toBeNull();
        expect(text2D.m_Text).not.toBeUndefined();
        expect(text2D.m_Text).toBe("Text");

        done();
    });
});
