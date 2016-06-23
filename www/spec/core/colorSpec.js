"use strict";

import {Color} from "src/core/color";


describe("Color", function ()
{
    it("should be created", function ( done )
    {
        expect(Color).not.toBeNull();
        expect(Color).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let color = new Color(50, 100, 150, 200);

        expect(color.r).not.toBeNull();
        expect(color.r).not.toBeUndefined();
        expect(color.r).toBe(50);

        expect(color.g).not.toBeNull();
        expect(color.g).not.toBeUndefined();
        expect(color.g).toBe(100);

        expect(color.b).not.toBeNull();
        expect(color.b).not.toBeUndefined();
        expect(color.b).toBe(150);

        expect(color.a).not.toBeNull();
        expect(color.a).not.toBeUndefined();
        expect(color.a).toBe(200);

        done();
    });
});
