// set our baseURL reference path
System.config({
    defaultJSExtensions: true,
    transpiler: null,
    map: {
        'systemjs'          : 'libs/system.js/dist/system.js',
        'system-polyfills'  : 'libs/system.js/dist/system-polyfills.js',
        'es6-module-loader' : "libs/es6-module-loader/dist/es6-module-loader.js"
    },
    // for code coverage, as it preprocesses files to add instrumentation, system js modules get broken
    meta: {
        'src/*': { format: 'register' }
    }
});
