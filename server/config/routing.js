'use strict';

var path = require('path');
var _ = require('lodash');
var sequelize = require('./sequelize');
var User = sequelize.User;
var Survey = sequelize.Survey;
var Option = sequelize.Option;
var Answer = sequelize.Answer;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.json({ redirect: 'login' });
}

var routing = function (router, staticPath, passport) {

  router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, msg) {
      if (err) {
        return res.json({
          error: true,
          redirect: 'login',
          message: _.get(err, 'message', 'Error!')
        });
      }

      if (!user) {
        return res.json({
          fail: true,
          message: msg
        });
      }

      req.login(user, function (e) {
        if (e) {
          return res.json({
            error: true,
            redirect: 'login',
            message: _.get(e, 'message', 'Error!')
          });
        }

        return res.json({
          user: user,
          redirect: 'local'
        });
      });
    })(req, res, next);
  });

  router.get('/logout', isLoggedIn, function (req, res) {
    req.logout();
    res.json({ redirect: 'blog' });
  });

  router.get('/api/survey', function (req, res) {
    var query = {};
    if (req.query.after) {
      query.updated = { $gt: new Date(req.query.after) };
    }

    Survey.findOne(query, {
      _id: 0,
      'basic.phone': 0,
      'basic.location': 0
    }, function (err, resume) {
      if (err) {
        return res.status(500).send('Error: ' + err);
      }

      return res.send(resume);
    });
  });

  router.get('/', function (req, res) {
    return res.sendFile(path.join(staticPath, 'index.html'));
  });

  router.all('*', function (req, res) {
    return res.redirect('/');
  });
};

module.exports = routing;
