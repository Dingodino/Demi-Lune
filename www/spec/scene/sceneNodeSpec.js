"use strict";

import SceneNode from "src/scene/sceneNode";


describe("SceneNode", function ()
{
    it("should be created", function ( done )
    {
        expect(SceneNode).not.toBeNull();
        expect(SceneNode).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        var sceneNode = new SceneNode();

        expect(sceneNode).not.toBeNull();
        expect(sceneNode).not.toBeUndefined();

        expect(sceneNode.m_ParentNode).toBeNull();
        expect(sceneNode.m_ParentNode).not.toBeUndefined();

        expect(sceneNode.m_aChildNodes).not.toBeNull();
        expect(sceneNode.m_aChildNodes).not.toBeUndefined();
        // TODO : expect(sceneNode.m_aChildNodes).instanceof(Array);

        expect(sceneNode.m_v2Pos).not.toBeNull();
        expect(sceneNode.m_v2Pos).not.toBeUndefined();
        expect(sceneNode.m_v2Pos.x).toBe(0);
        expect(sceneNode.m_v2Pos.y).toBe(0);

        expect(sceneNode.m_v2Scale).not.toBeNull();
        expect(sceneNode.m_v2Scale).not.toBeUndefined();
        expect(sceneNode.m_v2Scale.x).toBe(1);
        expect(sceneNode.m_v2Scale.y).toBe(1);

        expect(sceneNode.m_fOrientation).not.toBeNull();
        expect(sceneNode.m_fOrientation).not.toBeUndefined();
        expect(sceneNode.m_fOrientation).toBe(0);

        expect(sceneNode.m_v2WorldPos).not.toBeNull();
        expect(sceneNode.m_v2WorldPos).not.toBeUndefined();
        expect(sceneNode.m_v2WorldPos.x).toBe(0);
        expect(sceneNode.m_v2WorldPos.y).toBe(0);

        expect(sceneNode.m_v2WorldScale).not.toBeNull();
        expect(sceneNode.m_v2WorldScale).not.toBeUndefined();
        expect(sceneNode.m_v2WorldScale.x).toBe(1);
        expect(sceneNode.m_v2WorldScale.y).toBe(1);

        expect(sceneNode.m_fWorldOrientation).not.toBeNull();
        expect(sceneNode.m_fWorldOrientation).not.toBeUndefined();
        expect(sceneNode.m_fWorldOrientation).toBe(0);

        done();
    });

    // TODO : test positon, scale and orientation
});
