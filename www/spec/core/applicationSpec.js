"use strict";

import Application from "src/core/application";


describe("Application", function ()
{
    it("should be created", function ( done )
    {
        expect(Application).not.toBeNull();
        expect(Application).not.toBeUndefined();

        expect(Application._animationFrameId).toBeNull();
        expect(Application._animationFrameId).not.toBeUndefined();

        expect(Application._lastUpdateDate).toBeNull();
        expect(Application._lastUpdateDate).not.toBeUndefined();

        done();
    });
});
