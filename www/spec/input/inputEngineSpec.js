"use strict";

import {InputEngine} from "src/input/inputEngine";


describe("InputEngine", function ()
{
    it("should be created", function ( done )
    {
        let inputEngine = InputEngine.getInstance();

        expect(inputEngine).not.toBeNull();
        expect(inputEngine).not.toBeUndefined();

        expect(inputEngine.m_Keyboard).not.toBeNull();
        expect(inputEngine.m_Keyboard).not.toBeUndefined();
        // TODO : expect(inputEngine.m_Keyboard).getInstance()of(Keyboard);

        expect(inputEngine.m_Mouse).not.toBeNull();
        expect(inputEngine.m_Mouse).not.toBeUndefined();
        // TODO : expect(inputEngine.m_Mouse).getInstance()of(Mouse);

        expect(inputEngine.m_TouchScreen).not.toBeNull();
        expect(inputEngine.m_TouchScreen).not.toBeUndefined();
        // TODO : expect(inputEngine.m_TouchScreen).getInstance()of(TouchScreen);

        done();
    });
});
