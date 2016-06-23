/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014-2016 Nicolas DAURES
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *******************************************************************************************************************/

import "demilune.js";


/****************************************************************
 * Sample
 ****************************************************************/

var sceneNodeToRotate = null;
var sceneNodeToScale = null;
var sceneNodeToTranslate = null;

function initializeTest()
{
	demilune.RenderEngine.setClearColor('#ffffff');
	demilune.RenderEngine.displayFPS(new demilune.b2Vec2(240, -230));

	// Create 3 texts
	var text1Pos = new demilune.b2Vec2(-300, 200);
	var text1 = new demilune.Text2D();
	text1.setColor("#000000");
	text1.setFont("22px arial");
	text1.setText("Test Text 1 : 22px arial");
	text1.getSceneNode().setPosition(text1Pos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(text1.getSceneNode());
	demilune.RenderEngine.addRenderable(text1);

	var text2Pos = new demilune.b2Vec2(-300, 170);
	var text2 = new demilune.Text2D();
	text2.setColor("#ff0000");
	text2.setFont("italic bold 20px arial");
	text2.setText("Test Text 2 : italic bold 20px arial");
	text2.getSceneNode().setPosition(text2Pos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(text2.getSceneNode());
	demilune.RenderEngine.addRenderable(text2);

	var text3Pos = new demilune.b2Vec2(-300, 140);
	var text3 = new demilune.Text2D();
	text3.setColor("#0000ff");
	text3.setFont("18px times");
	text3.setText("Test Text 3 : 18px times");
	text3.getSceneNode().setPosition(text3Pos);
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(text3.getSceneNode());
	demilune.RenderEngine.addRenderable(text3);

	// Create a texture (translation)
	var v2TexturePos = new demilune.b2Vec2(-20, -100);
	var v2TextureScale = new demilune.b2Vec2(200, 200);
	var texture = new demilune.Texture();
	texture.m_Image = new Image();
	texture.m_Image.src = "sample/test_texture.png";
	texture.m_SceneNode.m_v2Pos = v2TexturePos;
	texture.m_SceneNode.m_v2Scale = v2TextureScale;
	sceneNodeToTranslate = texture.m_SceneNode;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(texture.m_SceneNode);
	demilune.RenderEngine.addRenderable(texture);

	// Create a texture (rotation)
	var v2Texture2Pos = new demilune.b2Vec2(200, -100);
	var v2Texture2Scale = new demilune.b2Vec2(200, 200);
	var texture2 = new demilune.Texture();
	texture2.m_Image = texture.m_Image;
	texture2.m_SceneNode.m_v2Pos = v2Texture2Pos;
	texture2.m_SceneNode.m_v2Scale = v2Texture2Scale;
	sceneNodeToRotate = texture2.m_SceneNode;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(texture2.m_SceneNode);
	demilune.RenderEngine.addRenderable(texture2);

	// Create a texture (scale)
	var v2Texture3Pos = new demilune.b2Vec2(200, 100);
	var v2Texture3Scale = new demilune.b2Vec2(200, 200);
	var texture3 = new demilune.Texture();
	texture3.m_Image = texture.m_Image;
	texture3.m_SceneNode.m_v2Pos = v2Texture3Pos;
	texture3.m_SceneNode.m_v2Scale = v2Texture3Scale;
	sceneNodeToScale = texture3.m_SceneNode;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(texture3.m_SceneNode);
	demilune.RenderEngine.addRenderable(texture3);

	// Create an animation
	var v2AnimationPos = new demilune.b2Vec2(-200, -100);
	var v2AnimationScale = new demilune.b2Vec2(64, 64);
	var animationPlayer = new demilune.AnimationPlayer();

	var spriteSheet = new demilune.SpriteSheet();
	spriteSheet.m_Image = new Image();
	spriteSheet.m_Image.src = "sample/test_animation.png";
	spriteSheet.m_iFrameCount = 25;
	spriteSheet.m_iLineCount = 5;
	spriteSheet.m_iColumnCount = 5;
	spriteSheet.m_v2FrameSize.x = 64;
	spriteSheet.m_v2FrameSize.y = 64;

	var animation = new demilune.Animation();
	animation.m_SpriteSheet = spriteSheet;
	animation.m_aFrameIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
	animation.m_iFrameCount = 25;
	animation.m_fDuration = 0.5;

	animationPlayer.m_SpriteSheet = spriteSheet;
	animationPlayer.m_aAnimations.push(animation);
	animationPlayer.m_SceneNode.m_v2Pos = v2AnimationPos;
	animationPlayer.m_SceneNode.m_v2Scale = v2AnimationScale;

	demilune.SceneEngine.getRootSceneNode().attachSceneNode(animationPlayer.m_SceneNode);
	demilune.RenderEngine.addRenderable(animationPlayer);

	// Create a text
	var textTexture = new demilune.Text2D();
	textTexture.m_Color = "#000000";
	textTexture.m_Font = "italic bold 24px arial";
	textTexture.m_Text = "Test translate";
	textTexture.m_SceneNode.m_v2Pos.x = v2TexturePos.x - 50;
	textTexture.m_SceneNode.m_v2Pos.y = v2TexturePos.y + 100;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textTexture.m_SceneNode);
	demilune.RenderEngine.addRenderable(textTexture);

	var textTexture2 = new demilune.Text2D();
	textTexture2.m_Color = "#000000";
	textTexture2.m_Font = "italic bold 24px arial";
	textTexture2.m_Text = "Test rotate";
	textTexture2.m_SceneNode.m_v2Pos.x = v2Texture2Pos.x - 50;
	textTexture2.m_SceneNode.m_v2Pos.y = v2Texture2Pos.y + 100;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textTexture2.m_SceneNode);
	demilune.RenderEngine.addRenderable(textTexture2);

	var textTexture3 = new demilune.Text2D();
	textTexture3.m_Color = "#000000";
	textTexture3.m_Font = "italic bold 24px arial";
	textTexture3.m_Text = "Test scale";
	textTexture3.m_SceneNode.m_v2Pos.x = v2Texture3Pos.x - 50;
	textTexture3.m_SceneNode.m_v2Pos.y = v2Texture3Pos.y + 100;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textTexture3.m_SceneNode);
	demilune.RenderEngine.addRenderable(textTexture3);

	var textAnimation = new demilune.Text2D();
	textAnimation.m_Color = "#000000";
	textAnimation.m_Font = "italic bold 24px arial";
	textAnimation.m_Text = "Test animation";
	textAnimation.m_SceneNode.m_v2Pos.x = v2AnimationPos.x - 100;
	textAnimation.m_SceneNode.m_v2Pos.y = v2AnimationPos.y + 100;
	demilune.SceneEngine.getRootSceneNode().attachSceneNode(textAnimation.m_SceneNode);
	demilune.RenderEngine.addRenderable(textAnimation);
}

function updateTest()
{
	// Translate a texture
	var v2Position = sceneNodeToTranslate.getPosition();
	v2Position.x = -20 + Math.cos(demilune.TimeEngine.getTotalTime()) * 10;
	v2Position.y = -100 + Math.cos(demilune.TimeEngine.getTotalTime()) * 10;
	sceneNodeToTranslate.setPosition(v2Position);

	// Rotate a texture
	var fOrientation = sceneNodeToRotate.getOrientation();
	sceneNodeToRotate.setOrientation(fOrientation + demilune.TimeEngine.getDeltaTime());

	// Scale a texture
	var v2Scale = sceneNodeToScale.getScale();
	v2Scale.x = Math.cos(demilune.TimeEngine.getTotalTime()) * 200;
	v2Scale.y = Math.cos(demilune.TimeEngine.getTotalTime()) * 200;
	sceneNodeToScale.setScale(v2Scale);

	demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
}

demilune.CallbackEngine.subscribePostRenderCallback(initializeTest);
demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
