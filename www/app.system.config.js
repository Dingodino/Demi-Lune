// set our baseURL reference path
System.config({
    defaultJSExtensions: true,
    map: {
        'systemjs'          : 'libs/system.js/dist/system.js',
        'system-polyfills'  : 'libs/system.js/dist/system-polyfills.js',
        'es6-module-loader' : "libs/es6-module-loader/dist/es6-module-loader.js"
    }
});

System.import('index.js');