'use strict';

var gulp = require('gulp');
var conf = require('../gulp.config');
var browserify = require('browserify');
var tsify = require('tsify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('build', [
  'copy:html',
  'copy:resources',
  'copy:css'
], function () {
  return browserify(conf.main)
    .plugin(tsify)
    .bundle()
    .pipe(source('surveyApp.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/app'));
});
