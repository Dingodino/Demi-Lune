"use strict";

// required libs
var gulp = require('gulp'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    debug = require('gulp-debug'),
    changed = require('gulp-changed'),
    preprocess = require('gulp-preprocess'),
    watch = require('gulp-watch'),
    clean = require('gulp-clean'),
    Builder = require('systemjs-builder'),
    Server = require('karma').Server,
    runSequence = require('run-sequence');
    //zip = require('gulp-vinyl-zip');

// some paths
var rootFolder = '.',
    wwwFolder = rootFolder + '/www',
    sourceFolder = wwwFolder + '/src',
    es6Path = sourceFolder + '/**/*.js',
    assetsSources = sourceFolder + '/resources/**/*.{ttf,otf,iff,woff,eof,svg,css,html,png,gif,jpg,xml,json,xaml,mp3,pdf,xps,swf,emf,mp4,wmv}',
    outputFolder = rootFolder + '/build/www',
    distFolder = rootFolder + '/dist',
    //packageFolder = rootFolder + '/zip',
    libFolder = wwwFolder + '/libs/**/*.{css,png,jpg,js,map}',

    specFolder = wwwFolder + '/spec',
    outputSpecFolder = outputFolder + '/spec',
    es6SpecPath = specFolder + '/**/*.js',

    sampleFolder = wwwFolder + '/sample',
    outputSampleFolder = distFolder + '/sample',
    es6SamplePath = sampleFolder + '/*.js';

var production = process.env.NODE_ENV == 'PRODUCTION';
var tests = process.env.NODE_ENV == 'TESTS';
var development = (process.env.NODE_ENV == 'DEVELOPMENT' || (!production && !tests));

// 500 to limit cpu usage on recent node... default is 100ms
var watchInterval = 2000;

/*
 * Creates Babel. This tasks will cause ES6 to be transpiled to ES5.
 */
gulp.task('babelSrc', function ()
{
    var src = gulp.src([es6Path]);

    if (development) {
        src = src.pipe(watch([es6Path], { interval: watchInterval })).pipe(plumber());
    }

    return src.pipe(changed(outputFolder + '/src'))
        .pipe(debug({title: 'babel:'}))
        .pipe(sourcemaps.init())
        .pipe(babel({modules: 'system',
            experimental: true,
            compact: false,
            optional: []
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputFolder + '/src'));
});
gulp.task('babelIndexjs', function ()
{
    var src = gulp.src([wwwFolder + '/index.js']);

    if (development) {
        src = src.pipe(watch([wwwFolder + '/index.js'], { interval: watchInterval })).pipe(plumber());
    }

    return src.pipe(changed(outputFolder))
        .pipe(debug({title: 'babelIndexjs:'}))
        .pipe(sourcemaps.init())
        .pipe(babel({modules: 'system',
            experimental: true,
            optional: []
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputFolder));
});

gulp.task('copyRootFiles', ['clean:rootFiles'], function() {

    if (development || production)
    {
        var src = gulp.src([wwwFolder + '/appLauncher.js', wwwFolder + '/app.system.config.js', wwwFolder + '/karma.config.js']);
    }
    else
    {
        var src = gulp.src([wwwFolder + '/specLauncher.js', wwwFolder + '/spec.system.config.js', wwwFolder + '/karma.config.js']);
    }

    if (development) {
        src = src.pipe(watch([wwwFolder + '/appLauncher.js', wwwFolder + '/app.system.config.js', wwwFolder + '/karma.config.js'], { interval: watchInterval })).pipe(plumber());
    }

    return src.pipe(changed(outputFolder))
        .pipe(debug({title: 'copy root files:'}))
        .pipe(gulp.dest(outputFolder));

});

gulp.task('copylibs', function() {

    var src = gulp.src([libFolder]);

    if (development) {
        src = src.pipe(watch([libFolder], { interval: watchInterval })).pipe(plumber());
    }

    return src.pipe(changed(outputFolder + '/libs'))
        .pipe(debug({title: 'copy Libs:'}))
        .pipe(gulp.dest(outputFolder + '/libs'));
});

gulp.task('html', ['copyRootFiles'], function() {

    var src = gulp.src([wwwFolder + '/index.html']);

    if (development) {
        src = src.pipe(watch([wwwFolder + '/index.html'], { interval: watchInterval })).pipe(plumber());
    }

    return src.pipe(changed(outputFolder))
        .pipe(debug({title: 'parse and update index.html:'}))
        .pipe(preprocess({context: { DEPLOY_MODE: development ? 'DEVELOPMENT' : production ? 'PRODUCTION' : 'TESTS'}}))
        .pipe(gulp.dest(outputFolder))
});
gulp.task('babelSpec', function() {

    var src = gulp.src([es6SpecPath]);

    if (development) {
        src = src.pipe(watch([es6SpecPath], { interval: watchInterval })).pipe(plumber());
    }

    return src.pipe(changed(outputSpecFolder))
        .pipe(debug({title: 'copy spec:'}))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({modules: 'system',
            experimental: true,
            optional: [],
            compact: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputSpecFolder))
});

gulp.task('babelSample', function() {

    var src = gulp.src([es6SamplePath]);

    return src.pipe(changed(outputSampleFolder))
        .pipe(debug({title: 'copy sample:'}))
        .pipe(plumber())
        //.pipe(sourcemaps.init())
        .pipe(babel({modules: 'system',
            experimental: true,
            optional: [],
            compact: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(outputSampleFolder))
});
gulp.task('copySample', function() {

    var src = gulp.src([sampleFolder + '/*.html', sampleFolder + '/*.png', sampleFolder + '/*.css', sampleFolder + '/*.ogg']);

    return src.pipe(changed(outputSampleFolder))
        .pipe(debug({title: 'copy sample files:'}))
        .pipe(gulp.dest(outputSampleFolder));
});


gulp.task('clean:rootFiles', function () {

    var src = gulp.src([outputFolder + '/index.html', outputFolder + '/app.system.config.js', outputFolder + '/appLauncher.js']);

    if (tests == false) {
        src = gulp.src([outputFolder + '/index.html', outputFolder + '/spec.system.config.js', outputFolder + '/specLauncher.js']);
    }

    return src.pipe(clean({force: true}));
});

gulp.task('clean:all', function () {
    return gulp.src(outputFolder)
        .pipe(clean({force: true}));
});

gulp.task('minify', function(cb) {
    var builder = new Builder(outputFolder, wwwFolder + '/app.system.config.js');

    console.log('minifiying code...');

    builder
        .buildStatic('index.js', distFolder + '/demilune.js',
        {sfx: true,
            sourceMaps: false,
            minify: false
        })
        .then(function() {
            console.log('Build complete');
            // then let's deploy root folder but keep only necessary files
            //gulp.run('package');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

gulp.task('copy:libs', function() {
    return gulp.src([outputFolder + '/libs/**/es6-module-loader.js',
        outputFolder + '/libs/**/system.js',
        outputFolder + '/libs/**/system-polyfills.js'])
        .pipe(debug({title: 'libs:'}))
        .pipe(changed(distFolder + '/libs'))
        .pipe(gulp.dest(distFolder + '/libs'));
});

gulp.task('copy:rootFiles', function() {
    return gulp.src([outputFolder + '/index.html'])
        .pipe(debug({title: 'rootFiles:'}))
        .pipe(changed(distFolder))
        .pipe(gulp.dest(distFolder));
});

//gulp.task('package', ['copy:rootFiles', 'copy:libs'], function () {
//    return gulp.src(distFolder + '/**/*')
//        .pipe(zip.dest(packageFolder + '/demilune.zip'));
//});


/** Defaut = dev */
gulp.task('default', ['dev']);

var minifyAndDeploy = function(cb) {
    var builder = new Builder(outputFolder, wwwFolder + '/app.system.config.js');

    console.log('minifiying code...');

    builder
        .buildStatic('index.js', distFolder + '/demilune.js',
            {sfx: true,
                sourceMaps: false,
                minify: false
            })
        .then(function() {
            console.log('Build complete');
            // then let's deploy root folder but keep only necessary files
            //gulp.run('package');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
};

var runTests = function () {

    new Server({ configFile: __dirname + '/build/www/karma.config.js' }).start();
};

gulp.task('clean', ['clean:rootFiles']);

gulp.task('dev', function() {
    runSequence('clean',
        'babelSrc',
        'babelIndexjs',
        'html',
        'copylibs');
});

gulp.task('spec', function() {
    runSequence('clean',
        'babelSrc',
        'babelIndexjs',
        'html',
        'copylibs',
        'babelSpec',
        runTests);
});

gulp.task('prod', function() {
    runSequence('clean',
        'babelSrc',
        'babelIndexjs',
        'html',
        'copylibs',
        'babelSample',
        'copySample',
        'copy:libs',
        minifyAndDeploy);
});
