"use strict";

import {Keyboard} from "src/input/keyboard";
import {InputState} from "src/input/inputState";


describe("Keyboard", function ()
{
    it("should be created", function ( done )
    {
        let keyboard = Keyboard.getInstance();

        expect(keyboard).not.toBeNull();
        expect(keyboard).not.toBeUndefined();

        expect(keyboard.m_aKeys).not.toBeNull();
        expect(keyboard.m_aKeys).not.toBeUndefined();
        // TODO : expect(keyboard.m_aKeys).getInstance()of(Array);

        done();
    });

    it("should be updated", function ( done )
    {
        let keyboard = Keyboard.getInstance();
        
        expect(keyboard).not.toBeNull();
        expect(keyboard).not.toBeUndefined();

        keyboard.update();

        let keyState = keyboard.getKeyState(0);
        expect(keyState).not.toBeNull();
        expect(keyState).not.toBeUndefined();
        expect(keyState).toBe(InputState.RELEASED);

        done();
    });
});
