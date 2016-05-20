'use strict';

var path = require('path');
var serverPath = path.join(__dirname, '/server');
var devPath = path.join(__dirname, '/client');
var typingsPath = path.join(__dirname, '/typings');

module.exports = {
  main: path.join(devPath, '/app/main.ts'),
  devPath: devPath,
  serverPath: serverPath,
  typingsPath: typingsPath,
  gulpFiles: path.join(__dirname, 'gulp') + '/*.js',
  serverFiles: serverPath + '/**/*.js',
  tsFiles: devPath + '/**/*.ts',
  tsdFiles: typingsPath + 'main/**/*.js',
  tsIgnore: '!' + devPath + '/systemjs.config.ts', // ignore ng2 system generated formatting issues
  builtJS: path.join(devPath, '/app/**/*.js'),
  clientImg: path.join(devPath, '/img') + '/**/*.*',
  nodemon: {
    script: 'server/server.js',
    delayTime: 1,
    watch: ['server/**/*.js'],
    env: {
      PORT: 3000,
      NODE_ENV: 'dist'
    }
  }
};
