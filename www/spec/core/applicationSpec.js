"use strict";

import Application from "src/core/application";


describe("Application", function ()
{
    it("should be created", function ( done )
    {
        expect(Application).not.toBeNull();
        expect(Application).not.toBeUndefined();

        expect(Application.animationFrameId).toBeNull();
        expect(Application.animationFrameId).not.toBeUndefined();

        expect(Application.lastUpdateDate).toBeNull();
        expect(Application.lastUpdateDate).not.toBeUndefined();

        done();
    });

    it("should be updated", function ( done )
    {
        expect(Application).not.toBeNull();
        expect(Application).not.toBeUndefined();

        Application.run();

        expect(Application.animationFrameId).not.toBeNull();
        expect(Application.animationFrameId).not.toBeUndefined();

        expect(Application.lastUpdateDate).not.toBeNull();
        expect(Application.lastUpdateDate).not.toBeUndefined();

        Application.terminate();

        expect(Application.animationFrameId).toBeNull();
        expect(Application.animationFrameId).not.toBeUndefined();

        done();
    });
});
