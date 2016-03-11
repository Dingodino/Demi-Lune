"use strict";

function appendLocalScript(scriptSrc, onloadCallback)
{
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = scriptSrc;
    if(onloadCallback)
        s.onload = onloadCallback;

    document.getElementsByTagName('head')[0].appendChild(s);
}

function start ()
{
    console.debug("let's start the tests...");

    appendLocalScript("spec.system.config.js");
}

start();