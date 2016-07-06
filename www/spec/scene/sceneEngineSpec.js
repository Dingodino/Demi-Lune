"use strict";

import {SceneEngine} from "src/scene/sceneEngine";


describe("SceneEngine", function ()
{
    it("should be created", function ( done )
    {
        let sceneEngine = SceneEngine.getInstance();

        expect(sceneEngine).not.toBeNull();
        expect(sceneEngine).not.toBeUndefined();

        expect(sceneEngine.m_RootSceneNode).not.toBeNull();
        expect(sceneEngine.m_RootSceneNode).not.toBeUndefined();
        // TODO : expect(sceneEngine.m_RootSceneNode).getInstance()of(SceneNode);

        done();
    });
});
