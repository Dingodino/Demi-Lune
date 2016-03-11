"use strict";

import AudioEngine from "src/audio/audioEngine";


describe("AudioEngine", function ()
{
    it("should be created", function ( done )
    {
        expect(AudioEngine).not.toBeNull();
        expect(AudioEngine).not.toBeUndefined();

        expect(AudioEngine.m_aSound).not.toBeNull();
        expect(AudioEngine.m_aSound).not.toBeUndefined();
        // TODO : expect(AudioEngine.m_aSound).instanceof(Array);

        done();
    });
});
