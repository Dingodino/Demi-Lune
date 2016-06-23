"use strict";

import Keyboard from "src/input/keyboard";
import InputState from "src/input/inputState";


describe("Keyboard", function ()
{
    it("should be created", function ( done )
    {
        expect(Keyboard).not.toBeNull();
        expect(Keyboard).not.toBeUndefined();

        expect(Keyboard.m_aKeys).not.toBeNull();
        expect(Keyboard.m_aKeys).not.toBeUndefined();
        // TODO : expect(Keyboard.m_aKeys).instanceof(Array);

        done();
    });

    it("should be updated", function ( done )
    {
        expect(Keyboard).not.toBeNull();
        expect(Keyboard).not.toBeUndefined();

        Keyboard.update();

        let keyState = Keyboard.getKeyState(0);
        expect(keyState).not.toBeNull();
        expect(keyState).not.toBeUndefined();
        expect(keyState).toBe(InputState.NONE);

        done();
    });
});
