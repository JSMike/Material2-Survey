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

  router.post('/api/login', function (req, res, next) {
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
            redirect: 'Login',
            message: _.get(e, 'message', 'Error!')
          });
        }

        return res.json({
          user: {
            id: user.id,
            type: user.type,
            username: user.username,
            isLoggedIn: req.isAuthenticated()
          },
          redirect: 'List'
        });
      });
    })(req, res, next);
  });

  router.get('/api/logout', isLoggedIn, function (req, res) {
    req.logout();
    res.json({
      redirect: 'View',
      isLoggedIn: req.isAuthenticated()
    });
  });

  router.get('/api/survey', function (req, res) {
    var query = {};
    if (req.query.after) {
      query.updated = { $gt: new Date(req.query.after) };
    }

    Survey.findOne(query, {
    }, function (err, resume) {
      if (err) {
        return res.status(500).send('Error: ' + err);
      }

      return res.send(resume);
    });
  });

  router.post('/api/survey', function (req, res) {
    var query = {};
    if (req.query.after) {
      query.updated = { $gt: new Date(req.query.after) };
    }

    Survey.findOne(query, {
    }, function (err, resume) {
      if (err) {
        return res.status(500).send('Error: ' + err);
      }

      return res.send(resume);
    });
  });

  router.post('/api/answer', function (req, res) {
    var query = {};
    if (req.query.after) {
      query.updated = { $gt: new Date(req.query.after) };
    }

    Survey.findOne(query, {
    }, function (err, resume) {
      if (err) {
        return res.status(500).send('Error: ' + err);
      }

      return res.send(resume);
    });
  });

  router.get('/', function (req, res) {
    if (!res.session.cookie.id) {
      res.cookie('id', req.session.id, { expires: new Date(999999999999999)} );
    }
    return res.sendFile(path.join(staticPath, 'index.html'));
  });

  router.all('*', function (req, res) {
    return res.redirect('/');
  });
};

module.exports = routing;
