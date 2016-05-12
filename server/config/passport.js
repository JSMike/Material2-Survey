'use strict';

// Load passport and User model
var passport = require('passport');
var sequelize = require('./sequelize');
var User = sequelize.User;

// Add passport to express app
module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  passport.use('local-login', User.createStrategy());
  return passport;
};
