'use strict';

// Import required modules
var path = require('path');
var express = require('express');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var LEX = require('letsencrypt-express');
var forceSSL = require('express-force-ssl');
var passportConfig = require('./config/passport');
var routing = require('./config/routing');

// Set configuration variables
var app = express();
var router = express.Router();
var env = process.env.NODE_ENV || 'dev';
var staticPath = path.join(__dirname, '..', (env === 'dev' ? 'client' : 'dist'));
var morganEnv = 'dev';
var passport;

// Passport Settings
app.use(session({
  secret: 'SumomeCodingChallenge',
  resave: false,
  saveUninitialized: true
}));
passport = passportConfig(app);

// Express Settings
if (env === 'prod') { // If not dev, add middleware to force https
  app.use(forceSSL);
}

app.use(morgan(morganEnv)); // Sets logging level
app.use(compression()); // compress all requests
app.use(cookieParser()); // read cookies (required for authentication)
app.use(bodyParser.json()); // Parse post request as JSON
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Use JSON API spec
app.use(express.static(staticPath)); // Set hosted path
app.use('/lib', express.static(path.join(__dirname, '..', 'node_modules')));
app.use('/', router); // Attach router to the base URL
routing(router, staticPath, passport); // Add routing

// Add allows local dev without https cert
if (process.env.NODE_ENV !== 'prod') {
  LEX = LEX.testing();
}

// Add express app to letsencrypt-express, and set letsencrypt configuration
var lex = LEX.create({
  configDir: '/home/{{YourUser}}/letsencrypt/etc',
  onRequest: app,
  approveRegistration: function (hostname, cb) {
    cb(null, {
      domains: [hostname],
      email: '{{YourEmail}}',
      agreeTos: true
    });
  }
});

// Sets up listening
lex.listen([3000], [3443], function () {
  var protocol = ('requestCert' in this) ? 'https' : 'http';
  console.log('Listening at ' + protocol + '://localhost:' + this.address().port);
});
