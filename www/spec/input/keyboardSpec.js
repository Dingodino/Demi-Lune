"use strict";

import Keyboard from "src/input/keyboard";


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
});
