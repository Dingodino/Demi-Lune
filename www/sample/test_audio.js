/*******************************************************************************************************************
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Nicolas DAURES
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

var sound = null;

function initializeTest()
{
	demilune.RenderEngine.setClearColor('#ffffff');
	demilune.RenderEngine.displayFPS(new b2Vec2(240, -230));

	sound = new demilune.Sound();
	var audio = new Audio();
	audio.src = "sample/test_audio.ogg";
	sound.setAudio(audio);
	sound.play();
	//AudioEngine.getInstance().addSound(sound);
	//AudioEngine.getInstance().playSound(0);
}

function updateTest()
{
	demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
}

demilune.CallbackEngine.subscribePostRenderCallback(initializeTest);
demilune.CallbackEngine.subscribePostRenderCallback(updateTest);
