'use strict';

var gulp = require('gulp');
var clean = require('del');
var conf = require('../gulp.config');

gulp.task('clean:html', function (done) {
  clean(conf.htmlFiles.replace('client', 'dist'))
    .then(function () {
      done();
    },

    function (err) {
      console.error(err);
    });
});
