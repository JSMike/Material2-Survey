#!/usr/bin/env node
var gulp = require('gulp');
var run = require('run-sequence').use(gulp);
var tasks = process.argv.splice(2, Number.MAX_VALUE);

tasks = tasks.length > 0 ? tasks : 'default';
run(tasks);
