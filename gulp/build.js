'use strict';

var gulp = require('gulp');
var conf = require('../gulp.config');
var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

gulp.task('build', [
  'copy:html',
  'copy:resources',
  'copy:css'
], function () {
  return browserify({ debug: true, entries: conf.main })
    .plugin(tsify)
    .bundle()
    .pipe(source('surveyApp.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(conf.buildPath + '/app'));
});
