'use strict';

var gulp = require('gulp');
var conf = require('../gulp.config');

gulp.task('watch', ['build'], function () {
  gulp.watch([conf.gulpFiles, conf.serverFiles], ['lint-js']);
  gulp.watch(conf.tsFiles, ['lint-ts', 'build']);
});
