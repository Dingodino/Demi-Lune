"use strict";

import {Camera} from "src/scene/camera";


describe("Camera", function ()
{
    it("should be created", function ( done )
    {
        let camera = new Camera();

        expect(camera).not.toBeNull();
        expect(camera).not.toBeUndefined();

        expect(camera.m_SceneNode).not.toBeNull();
        expect(camera.m_SceneNode).not.toBeUndefined();
        // TODO : expect(Camera.m_SceneNode).getInstance()of(SceneNode);

        done();
    });
});
