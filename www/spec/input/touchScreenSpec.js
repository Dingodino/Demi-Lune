"use strict";

import {TouchScreen} from "src/input/touchScreen";
import {InputState} from "src/input/inputState";


describe("TouchScreen", function ()
{
    it("should be created", function ( done )
    {
        let touchScreen = TouchScreen.getInstance();

        expect(touchScreen).not.toBeNull();
        expect(touchScreen).not.toBeUndefined();

        expect(touchScreen.m_State).not.toBeNull();
        expect(touchScreen.m_State).not.toBeUndefined();
        expect(touchScreen.m_State).toBe(InputState.RELEASED);

        expect(touchScreen.m_v2Pos).not.toBeNull();
        expect(touchScreen.m_v2Pos).not.toBeUndefined();
        expect(touchScreen.m_v2Pos.x).toBe(0);
        expect(touchScreen.m_v2Pos.y).toBe(0);

        done();
    });

    it("should be updated", function ( done )
    {
        let touchScreen = TouchScreen.getInstance();

        expect(touchScreen).not.toBeNull();
        expect(touchScreen).not.toBeUndefined();

        touchScreen.update();

        let touchState = touchScreen.getState();
        expect(touchState).not.toBeNull();
        expect(touchState).not.toBeUndefined();
        expect(touchState).toBe(InputState.RELEASED);
        
        done();
    });
});
