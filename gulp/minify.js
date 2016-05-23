'use strict';

var gulp = require('gulp');
var htmlMin = require('gulp-htmlmin');
var conf = require('../gulp.config');

gulp.task('minify:html', ['clean:html'], function () {
  return gulp.src(conf.htmlFiles)
    .pipe(htmlMin({ collapseWhitespace: true }))
    .pipe(gulp.dest(conf.buildPath));
});
