"use strict";

import TrailSystem from "src/render/trailSystem";


describe("TrailSystem", function ()
{
    it("should be created", function ( done )
    {
        expect(TrailSystem).not.toBeNull();
        expect(TrailSystem).not.toBeUndefined();

        done();
    });
});
