// set our baseURL reference path
System.config({
    defaultJSExtensions: '.js',
    map: {
        'systemjs'          : 'libs/system.js',
        'system-polyfills'  : 'libs/system-polyfills.js',
        'es6-module-loader' : "libs/es6-module-loader.js"
    },
    globalEvaluationScope: false
});
