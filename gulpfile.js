'use strict';

var gulp = require('gulp');
var glob = require('glob-array');
var config = require('./gulp.config');

/**
 * Load each gulp module from the gulp directory
 */
glob.sync([config.gulpFiles])
  .forEach(function (file) {
    console.log(file);
    require(file);
  });

/**
 * Declare default task
 * Server: Clean temporary files, and build, run server, watch for changes
 */
gulp.task('default', ['server']);
