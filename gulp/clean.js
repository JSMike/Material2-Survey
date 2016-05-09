'use strict';

var gulp = require('gulp');
var clean = require('del');
var conf = require('../gulp.config');

gulp.task('clean:js', function (done) {
  clean(conf.builtJS)
    .then(function () {
      done();
    }, function (err) {

      console.error(err);
    });
});
