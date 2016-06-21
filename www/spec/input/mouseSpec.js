"use strict";

import Mouse from "src/input/mouse";
import InputState from "src/input/inputState";


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

    it("should be updated", function ( done )
    {
        expect(Mouse).not.toBeNull();
        expect(Mouse).not.toBeUndefined();

        Mouse.update();

        var mouseButtonState = Mouse.getMouseButtonState(0);
        expect(mouseButtonState).not.toBeNull();
        expect(mouseButtonState).not.toBeUndefined();
        expect(mouseButtonState).toBe(InputState.NONE);

        done();
    });
});
