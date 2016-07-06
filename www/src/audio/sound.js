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

"use strict";


export class Sound
{
	//===================================================================
	// Constructors
	//===================================================================

    /**
     * Create a sound.
     */
    constructor ()
    {
        this.m_Audio =  null;
    }


    //===================================================================
    // Accessors
    //===================================================================

    /**
     * Get the audio resource.
     * @returns {null|*}
     */
    getAudio ()
    {
        return this.m_Audio;
    }

    /**
     * Set the audio resource.
     * @param a_Audio : new audio resource.
     */
    setAudio (a_Audio)
    {
        this.m_Audio = a_Audio;
    }

    /**
     * Test if it is a loop sound.
     * @returns {*}
     */
    isLoop ()
    {
        return this.m_Audio.loop;
    }

    /**
     * Set sound loop.
     * @param a_bIsLoop
     */
    setLoop (a_bIsLoop)
    {
        this.m_Audio.loop = a_bIsLoop;
    }

    /**
     * Get the volume of the sound.
     * @returns {*}
     */
    getVolume ()
    {
        return this.m_Audio.volume;
    }

    /**
     * Set the volume of the sound.
     * @param a_fVolume : new volume.
     */
    setVolume (a_fVolume)
    {
        this.m_Audio.volume = a_fVolume;
    }

    /**
     * Get the pitch of the sound.
     * @returns {*}
     */
    getPitch ()
    {
        return this.m_Audio.playbackRate;
    }

    /**
     * Set the pitch of the sound.
     * @param a_fPitch : new pitch of the sound.
     */
    setPitch (a_fPitch)
    {
        this.m_Audio.playbackRate = a_fPitch;
    }


    //===================================================================
    // Operations
    //===================================================================

    /**
     * Play the sound.
     */
    play ()
    {
        this.m_Audio.play();
    }

    /**
     * Pause the sound.
     */
    pause ()
    {
        this.m_Audio.pause();
    }
}

console.debug('Sound loaded');