"use strict";

import TrailEmitter from "src/render/trailEmitter";


describe("TrailEmitter", function ()
{
    it("should be created", function ( done )
    {
        expect(TrailEmitter).not.toBeNull();
        expect(TrailEmitter).not.toBeUndefined();

        done();
    });
});
