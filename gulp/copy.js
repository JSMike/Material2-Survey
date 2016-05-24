'use strict';

var gulp = require('gulp');
var conf = require('../gulp.config');

gulp.task('copy:resources', function () {
  return gulp.src(conf.devPath + '/app/resources/**/*.*')
    .pipe(gulp.dest(conf.buildPath + '/app/resources'));
});

gulp.task('copy:css', function () {
  return gulp.src(conf.devPath + '/**/*.css')
    .pipe(gulp.dest(conf.buildPath));
});

gulp.task('copy:html', function () {
  return gulp.src(conf.htmlFiles)
    .pipe(gulp.dest(conf.buildPath));
});
