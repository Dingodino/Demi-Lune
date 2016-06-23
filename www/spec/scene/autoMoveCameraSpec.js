"use strict";

import {AutoMoveCamera} from "src/scene/autoMoveCamera";


describe("AutoMoveCamera", function ()
{
    it("should be created", function ( done )
    {
        expect(AutoMoveCamera).not.toBeNull();
        expect(AutoMoveCamera).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let autoMoveCamera = new AutoMoveCamera();
        expect(autoMoveCamera.m_v2Speed).not.toBeNull();
        expect(autoMoveCamera.m_v2Speed).not.toBeUndefined();

        done();
    });
});
