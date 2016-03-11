"use strict";

import SceneEngine from "src/scene/sceneEngine";


describe("SceneEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(SceneEngine).not.toBeNull();
        expect(SceneEngine).not.toBeUndefined();

        expect(SceneEngine.m_RootSceneNode).not.toBeNull();
        expect(SceneEngine.m_RootSceneNode).not.toBeUndefined();
        // TODO : expect(SceneEngine.m_RootSceneNode).instanceof(SceneNode);

        done();
    });
});
