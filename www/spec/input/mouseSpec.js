"use strict";

import {Mouse} from "src/input/mouse";
import {InputState} from "src/input/inputState";


describe("Mouse", function ()
{
    it("should be created", function ( done )
    {
        let mouse = Mouse.getInstance();

        expect(mouse).not.toBeNull();
        expect(mouse).not.toBeUndefined();

        expect(mouse.m_aButtons).not.toBeNull();
        expect(mouse.m_aButtons).not.toBeUndefined();
        // TODO : expect(mouse.m_aButtons).getInstance()of(Array);

        expect(mouse.m_v2Pos).not.toBeNull();
        expect(mouse.m_v2Pos).not.toBeUndefined();
        expect(mouse.m_v2Pos.x).toBe(0);
        expect(mouse.m_v2Pos.y).toBe(0);

        done();
    });

    it("should be updated", function ( done )
    {
        let mouse = Mouse.getInstance();
        
        expect(mouse).not.toBeNull();
        expect(mouse).not.toBeUndefined();

        mouse.update();

        let mouseButtonState = mouse.getMouseButtonState(0);
        expect(mouseButtonState).not.toBeNull();
        expect(mouseButtonState).not.toBeUndefined();
        expect(mouseButtonState).toBe(InputState.RELEASED);

        done();
    });
});
