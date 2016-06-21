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
    eslint = require('gulp-eslint'),
    Builder = require('systemjs-builder'),
    Server = require('karma').Server,
    runSequence = require('run-sequence');

// some paths
var rootFolder = '.',
    wwwFolder = rootFolder + '/www',
    buildFolder = rootFolder + '/build',
    libFolder = rootFolder + '/node_modules',

    sourceFolder = wwwFolder + '/src',
    sources = sourceFolder + '/**/*.js',

    specFolder = wwwFolder + '/spec',
    specSources = specFolder + '/**/*.js',

    sampleFolder = wwwFolder + '/sample',
    sampleSources = sampleFolder + '/*.js';

// Environment
var production = process.env.NODE_ENV == 'PRODUCTION';
var tests = process.env.NODE_ENV == 'TESTS';
var development = (process.env.NODE_ENV == 'DEVELOPMENT' || (!production && !tests));
var watcher = process.env.NODE_ENV == 'WATCH';
buildFolder = production ? rootFolder + '/dist' : buildFolder;

// 2000 to limit cpu usage... default is 100ms
var watchInterval = 2000;


/********************************************************************
 * Transpile sources
 ********************************************************************/

gulp.task('babelSrc', function ()
{
    var src = gulp.src([sources]);

    return src.pipe(changed(buildFolder + '/src'))
        .pipe(debug({title: 'Transpile sources:'}))
        .pipe(sourcemaps.init())
        .pipe(babel({compact: false, presets: ['es2015']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildFolder + '/src'));
});
gulp.task('babelIndex', function ()
{
    var src = gulp.src([wwwFolder + '/index.js']);

    return src.pipe(changed(buildFolder))
        .pipe(debug({title: 'Transpile index.js:'}))
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildFolder));
});

gulp.task('transpileSources', function(callback) {
    runSequence('babelSrc',
        'babelIndex',
        callback);
});


/********************************************************************
 * Transpile specs
 ********************************************************************/

gulp.task('transpileSpecs', function() {

    var src = gulp.src([specSources]);

    return src.pipe(changed(buildFolder + '/spec'))
        .pipe(debug({title: 'Transpile specs:'}))
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015'], compact: false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildFolder + '/spec'))
});


/********************************************************************
 * Transpile samples
 ********************************************************************/

gulp.task('transpileSamples', function() {

    var src = gulp.src([sampleSources]);

    return src.pipe(changed(buildFolder + '/sample'))
        .pipe(debug({title: 'Transpile samples:'}))
        .pipe(plumber())
        .pipe(babel({presets: ['es2015'], compact: false}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(buildFolder + '/sample'))
});


/********************************************************************
 * Copy files
 ********************************************************************/

gulp.task('cleanRootFiles', function () {

    var src = gulp.src([buildFolder + '/index.html', buildFolder + '/app.system.config.js', buildFolder + '/appLauncher.js']);

    if (tests == false) src = gulp.src([buildFolder + '/index.html', buildFolder + '/spec.system.config.js', buildFolder + '/specLauncher.js']);

    return src.pipe(clean({force: true}));
});
gulp.task('copyRootFiles', ['cleanRootFiles'], function() {

    if (development || production)
    {
        var src = gulp.src([wwwFolder + '/appLauncher.js', wwwFolder + '/app.system.config.js', wwwFolder + '/karma.config.js']);
    }
    else
    {
        var src = gulp.src([wwwFolder + '/specLauncher.js', wwwFolder + '/spec.system.config.js', wwwFolder + '/karma.config.js']);
    }

    return src.pipe(changed(buildFolder))
        .pipe(debug({title: 'Copy root files:'}))
        .pipe(gulp.dest(buildFolder));
});
gulp.task('parseAndCopyRootFiles', ['copyRootFiles'], function() {

    var src = gulp.src([wwwFolder + '/index.html']);

    return src.pipe(changed(buildFolder))
        .pipe(debug({title: 'Parse and update index.html:'}))
        .pipe(preprocess({context: { DEPLOY_MODE: development ? 'DEVELOPMENT' : production ? 'PRODUCTION' : 'TESTS'}}))
        .pipe(gulp.dest(buildFolder))
});

gulp.task('copySampleFiles', function() {

    var src = gulp.src([sampleFolder + '/*.html', sampleFolder + '/*.png', sampleFolder + '/*.css', sampleFolder + '/*.ogg']);

    return src.pipe(changed(buildFolder + '/sample'))
        .pipe(debug({title: 'Copy sample files:'}))
        .pipe(gulp.dest(buildFolder + '/sample'));
});


/********************************************************************
 * Copy dependencies
 ********************************************************************/

gulp.task('copyLibs', function() {

    var src = gulp.src([libFolder + '/es6-module-loader/dist/es6-module-loader.js',
        libFolder + '/traceur/dist/commonjs/traceur.js',
        libFolder + '/systemjs/dist/system.js',
        libFolder + '/systemjs/dist/system-polyfills.js',
        libFolder + '/lodash/lodash.min.js']);

    return src.pipe(changed(buildFolder + '/libs'))
        .pipe(debug({title: 'Copy libs:'}))
        .pipe(gulp.dest(buildFolder + '/libs'));
});


/********************************************************************
 * Minify
 ********************************************************************/

gulp.task('minify', function(cb) {
    var builder = new Builder(buildFolder, wwwFolder + '/system.config.js');

    console.log('Minifiy code...');

    builder
        .buildStatic('index.js', buildFolder + '/demilune.js',
        {
            sfx: true,
            sourceMaps: false,
            minify: true
        })
        .then(function() {
            console.log('Minifiy complete');
        })
        .catch(function(err) {
            console.log('Minifiy error');
            console.log(err);
        });
});


/********************************************************************
 * Test runner
 ********************************************************************/

gulp.task('runTests', function() {
    new Server({ configFile: __dirname + '/build/karma.config.js' }).start();
});


/********************************************************************
 * Final tasks (to clean, build, deploy, ...)
 ********************************************************************/

// Defaut = dev
gulp.task('default', ['dev']);

// Clean the project
gulp.task('clean', function () {
    return gulp.src(['build', 'dist', 'coverage', 'test_output'])
        .pipe(clean({force: true}));
});

// Check code
gulp.task('lint', function () {
    return gulp.src([
        // src
        sourceFolder + '/**/*.js',
        // specs
        specFolder + '/**/*.js',
        // not box2D !
        '!' + sourceFolder + '/physic/Box2dWeb.js',
        // not node_modules !
        '!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint({configFile: 'www/.eslintrc', fix: true}))
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

// Build the project (dev and prod)
gulp.task('dev', function(callback) {
    runSequence('transpileSources',
        'parseAndCopyRootFiles',
        'copyLibs',
        callback);
});

gulp.task('spec', function(callback) {
    runSequence('dev',
        'transpileSpecs',
        'runTests',
        callback);
});

gulp.task('prod', function(callback) {
    runSequence('lint',
        'dev',
        'transpileSamples',
        'copySampleFiles',
        'minify',
        callback);
});
