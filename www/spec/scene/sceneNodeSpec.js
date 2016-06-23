"use strict";

import {SceneNode} from "src/scene/sceneNode";
import "src/core/constants";
import {b2Vec2} from "src/core/constants";


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
        let sceneNode = new SceneNode();

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

    it("should take accessors into account", function ( done )
    {
        let sceneNode = new SceneNode();

        expect(sceneNode).not.toBeNull();
        expect(sceneNode).not.toBeUndefined();

        // Set transformations
        sceneNode.setPosition(new b2Vec2(150, 200));
        sceneNode.setOrientation(Math.PI);
        sceneNode.setScale(new b2Vec2(2, 2));

        // Apply transformations
        sceneNode.update();

        // Check transformations
        expect(sceneNode).not.toBeNull();
        expect(sceneNode.getPosition()).not.toBeNull();
        expect(sceneNode.getPosition().x).toBe(150);
        expect(sceneNode.getPosition().y).toBe(200);
        expect(sceneNode.getOrientation()).toBe(Math.PI);
        expect(sceneNode.getScale().x).toBe(2);
        expect(sceneNode.getScale().y).toBe(2);

        done();
    });

    it("should be attached to parent node", function ( done )
    {
        let parentNode = new SceneNode();
        let childNode = new SceneNode();

        expect(parentNode).not.toBeNull();
        expect(parentNode).not.toBeUndefined();

        expect(childNode).not.toBeNull();
        expect(childNode).not.toBeUndefined();

        // Attach nodes
        expect(parentNode.getChildNodes().length).toBe(0);
        expect(childNode.getParentNode()).toBeNull();
        parentNode.attachSceneNode(childNode);
        expect(parentNode.getChildNodes().length).toBe(1);
        expect(childNode.getParentNode()).not.toBeNull();

        // Set transformations to parent
        parentNode.setPosition(new b2Vec2(150, 200));
        parentNode.setOrientation(Math.PI);
        parentNode.setScale(new b2Vec2(2, 2));

        // Set transformations to child
        childNode.setPosition(new b2Vec2(20, 30));
        childNode.setOrientation(Math.PI * 0.5);
        childNode.setScale(new b2Vec2(1, 3));

        // Apply transformations
        parentNode.update();

        // Check parent node transformations
        expect(parentNode).not.toBeNull();
        expect(parentNode.getPosition().x).toBe(150);
        expect(parentNode.getPosition().y).toBe(200);
        expect(parentNode.getOrientation()).toBe(Math.PI);
        expect(parentNode.getScale().x).toBe(2);
        expect(parentNode.getScale().y).toBe(2);

        // Check child node transformations
        expect(childNode).not.toBeNull();
        expect(childNode.getWorldPosition().x).toBe(170);
        expect(childNode.getWorldPosition().y).toBe(230);
        expect(childNode.getWorldOrientation()).toBe(Math.PI * 1.5);
        expect(childNode.getWorldScale().x).toBe(2);
        expect(childNode.getWorldScale().y).toBe(6);

        // Detach child node from parent
        expect(parentNode.getChildNodes().length).toBe(1);
        expect(childNode.getParentNode()).not.toBeNull();
        parentNode.detachSceneNode(childNode);
        expect(parentNode.getChildNodes().length).toBe(0);
        expect(childNode.getParentNode()).toBeNull();

        done();
    });
});
