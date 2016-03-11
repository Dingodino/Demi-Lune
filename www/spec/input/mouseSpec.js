"use strict";

import Mouse from "src/input/mouse";


describe("Mouse", function ()
{
    it("should be created", function ( done )
    {
        expect(Mouse).not.toBeNull();
        expect(Mouse).not.toBeUndefined();

        expect(Mouse.m_aButtons).not.toBeNull();
        expect(Mouse.m_aButtons).not.toBeUndefined();
        // TODO : expect(Mouse.m_aButtons).instanceof(Array);

        expect(Mouse.m_v2Pos).not.toBeNull();
        expect(Mouse.m_v2Pos).not.toBeUndefined();
        expect(Mouse.m_v2Pos.x).toBe(0);
        expect(Mouse.m_v2Pos.y).toBe(0);

        done();
    });
});
