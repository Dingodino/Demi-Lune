"use strict";

import TouchScreen from "src/input/touchScreen";
import InputState from "src/input/inputState";


describe("TouchScreen", function ()
{
    it("should be created", function ( done )
    {
        expect(TouchScreen).not.toBeNull();
        expect(TouchScreen).not.toBeUndefined();

        expect(TouchScreen.m_State).not.toBeNull();
        expect(TouchScreen.m_State).not.toBeUndefined();
        expect(TouchScreen.m_State).toBe(InputState.NONE);

        expect(TouchScreen.m_v2Pos).not.toBeNull();
        expect(TouchScreen.m_v2Pos).not.toBeUndefined();
        expect(TouchScreen.m_v2Pos.x).toBe(0);
        expect(TouchScreen.m_v2Pos.y).toBe(0);

        done();
    });
});
