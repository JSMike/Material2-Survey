'use strict';

var gulp = require('gulp');
var util = require('gulp-util');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var tslint = require('gulp-tslint');
var tsStylish = require('gulp-tslint-stylish');
var conf = require('../gulp.config');

gulp.task('lint-js', function () {
  return gulp.src([conf.gulpFiles, conf.serverFiles])
    .pipe(jshint())
    .on('error', util.noop)
    .pipe(jscs())
    .on('error', util.noop)
    .pipe(stylish.combineWithHintResults())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint-ts', function () {
  return gulp.src(conf.tsFiles)
    .pipe(tslint())
    .pipe(tslint.report(tsStylish, {
      bell: false
    }));
});
