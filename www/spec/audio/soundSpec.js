"use strict";

import {Sound} from "src/audio/sound";


describe("Sound", function ()
{
    it("should be created", function ( done )
    {
        expect(Sound).not.toBeNull();
        expect(Sound).not.toBeUndefined();

        done();
    });

    it("should take constructor's parameters into account", function ( done )
    {
        let sound = new Sound();
        expect(sound.m_Audio).toBeNull();
        expect(sound.m_Audio).not.toBeUndefined();

        done();
    });
});
