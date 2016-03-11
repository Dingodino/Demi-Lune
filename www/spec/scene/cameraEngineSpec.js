"use strict";

import CameraEngine from "src/scene/cameraEngine";


describe("CameraEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(CameraEngine).not.toBeNull();
        expect(CameraEngine).not.toBeUndefined();

        expect(CameraEngine.m_SceneNode).not.toBeNull();
        expect(CameraEngine.m_SceneNode).not.toBeUndefined();
        // TODO : expect(CameraEngine.m_SceneNode).instanceof(SceneNode);

        expect(CameraEngine.m_CameraBehavior).toBeNull();
        expect(CameraEngine.m_CameraBehavior).not.toBeUndefined();

        done();
    });
});
