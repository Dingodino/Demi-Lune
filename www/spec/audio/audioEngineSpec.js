"use strict";

import {AudioEngine} from "src/audio/audioEngine";


describe("AudioEngine", function ()
{
    it("should be created", function ( done )
    {
        let audioEngine = AudioEngine.getInstance();
        expect(audioEngine).not.toBeNull();
        expect(audioEngine).not.toBeUndefined();

        expect(audioEngine.m_aSound).not.toBeNull();
        expect(audioEngine.m_aSound).not.toBeUndefined();
        // TODO : expect(AudioEngine.m_aSound).getInstance()of(Array);

        done();
    });
});
