"use strict";

import InputEngine from "src/input/inputEngine";


describe("InputEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(InputEngine).not.toBeNull();
        expect(InputEngine).not.toBeUndefined();

        expect(InputEngine.m_Keyboard).not.toBeNull();
        expect(InputEngine.m_Keyboard).not.toBeUndefined();
        // TODO : expect(InputEngine.m_Keyboard).instanceof(Keyboard);

        expect(InputEngine.m_Mouse).not.toBeNull();
        expect(InputEngine.m_Mouse).not.toBeUndefined();
        // TODO : expect(InputEngine.m_Mouse).instanceof(Mouse);

        expect(InputEngine.m_TouchScreen).not.toBeNull();
        expect(InputEngine.m_TouchScreen).not.toBeUndefined();
        // TODO : expect(InputEngine.m_TouchScreen).instanceof(TouchScreen);

        done();
    });
});
