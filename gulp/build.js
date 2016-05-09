'use strict';

var gulp = require('gulp');
var conf = require('../gulp.config');
var sourcemaps = require('gulp-sourcemaps');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');

gulp.task('build', function () {
  var sourceTsFiles = [
    conf.tsFiles,
    conf.tsdFiles,
    conf.tsIgnore
  ];
  var tsResult = gulp.src(sourceTsFiles)
    .pipe(sourcemaps.init())
    .pipe(tsc(tsProject));

  tsResult.dts
    .pipe(gulp.dest(conf.devPath));

  return tsResult.js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(conf.devPath));
});
