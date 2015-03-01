"use strict";

var gulp = require('gulp'),
    jscs = require('gulp-jscs'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var files = ['./src/**/*.js', '!./src/lib/pixiParticle.js', '!./src/lib/weightedMarkovChain.js', './gulpfile.js'];

gulp.task('lint', function () {
    return gulp
        .src(files)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('codestyle', function () {
    return gulp
        .src(files)
        .pipe(jscs());
});
