"use strict";

import {InputState} from "src/input/inputState";


describe("InputState", function ()
{
    it("should be created", function ( done )
    {
        expect(InputState).not.toBeNull();
        expect(InputState).not.toBeUndefined();

        expect(InputState.RELEASED).not.toBeNull();
        expect(InputState.RELEASED).not.toBeUndefined();
        expect(InputState.RELEASED).toBe(0);

        expect(InputState.GOTO_PRESSED).not.toBeNull();
        expect(InputState.GOTO_PRESSED).not.toBeUndefined();
        expect(InputState.GOTO_PRESSED).toBe(1);

        expect(InputState.PRESSED).not.toBeNull();
        expect(InputState.PRESSED).not.toBeUndefined();
        expect(InputState.PRESSED).toBe(2);

        expect(InputState.HOLD).not.toBeNull();
        expect(InputState.HOLD).not.toBeUndefined();
        expect(InputState.HOLD).toBe(3);

        expect(InputState.GOTO_RELEASED).not.toBeNull();
        expect(InputState.GOTO_RELEASED).not.toBeUndefined();
        expect(InputState.GOTO_RELEASED).toBe(4);

        done();
    });
});
