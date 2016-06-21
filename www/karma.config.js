module.exports = function (config)
{
    'use strict';

    config.set({
        autoWatch: false,
        singleRun: true,

        basePath: '',

        plugins: ['karma-systemjs', 'karma-junit-reporter', 'karma-jasmine-jquery', 'karma-jasmine', 'karma-coverage', 'karma-phantomjs-launcher', 'karma-chrome-launcher'],
        frameworks: ['systemjs', 'jasmine-jquery', 'jasmine'],

        browsers: [
                    /*'Chrome_without_security'*/
                    'PhantomJS_without_security'
                    ],

        proxies: {
            '/node_modules/': '/base/node_modules/',
            '/libs/': '/base/libs/',
            '/src/': '/base/src/',
            '/spec/': '/base/spec/'
        },

        // you can define custom flags
        customLaunchers: {
            Chrome_without_security: {
                base: 'Chrome',
                flags: ['--disable-web-security']
            },
            PhantomJS_without_security: {
                base: 'PhantomJS',
                flags: ['--web-security=false']
            }
        },

        preprocessors: {
            'src/**/!(Box2dWeb).js': ['coverage']
        },

        coverageReporter: {
            dir: '../coverage/',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                { type: 'cobertura', subdir: '.', file: 'cobertura.xml' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
                { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                { type: 'text', subdir: '.', file: 'text.txt' },
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' }
            ]
        },

        reporters: ['progress', 'coverage', 'junit'],

        // the default configuration
        junitReporter: {
            outputDir: '../test_output', // results will be saved as $outputDir/$browserName.xml
            outputFile: 'test-results.xml', // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        },

        logLevel: 'debug',

        browserNoActivityTimeout: 600000,// 10 minutes
        // the following parameter does not work because we indicate it's a single run...
        //browserDisconnectTolerance: 3,

        client: {
            captureConsole: true
        },

        systemjs: {
            // Path to your SystemJS configuration file
            configFile: 'spec.system.config.js',

            // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries.
            serveFiles: ['**/*']
        },

        files: [
            // all the specs:
            "spec/**/*Spec.js"
        ]
    });
};