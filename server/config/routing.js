'use strict';

var path = require('path');
var q = require('q');
var _ = require('lodash');
var Sequelize = require('sequelize');
var sequelize = require('./sequelize');
var Survey = sequelize.Survey;
var Option = sequelize.Option;
var Answer = sequelize.Answer;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.json({ redirect: 'Login' });
}

var routing = function (router, staticPath, passport) {

  router.post('/api/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, msg) {
      if (err) {
        return res.json({
          error: true,
          redirect: 'Login',
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

  router.post('/api/logout', isLoggedIn, function (req, res) {
    req.logout();
    return res.json({
      redirect: 'View',
      user: {
        id: -1,
        username: 'anonymous',
        type: 'anonymous',
        isLoggedIn: false
      },
      isLoggedIn: req.isAuthenticated()
    });
  });

  router.get('/api/survey', function (req, res) {
    if (!isNaN(req.query.id)) {
      Survey.findOne({
        where: { id: +req.query.id },
        attributes: Object.keys(Survey.attributes).concat([
          [
            Sequelize.literal('(select count(*) from Answers a where a.surveyId = Survey.id)'),
            'total'
          ]
        ])
      })
      .then(function (survey) {
        Option.findAll({
          where: { surveyId: survey.id },
          attributes: Object.keys(Option.attributes).concat([
            [
              Sequelize.literal('(select count(*) from Answers a where a.optionId = Option.id )'),
              'results'
            ]
          ])
        })
        .then(function (options) {
          return res.json({
            survey: survey,
            options: options
          });
        });
      });
    } else {
      Survey.findAll({
        limit: 1,
        order: [Sequelize.fn('Rand')],
        where: {
          id: {
            $notIn: [
              Sequelize
                .literal('select a.surveyId from Answers a where a.permid=\'' +
                req.cookies.permid + '\'')
            ]
          }
        },
        attributes: Object.keys(Survey.attributes).concat([
          [
            Sequelize.literal('(select count(*) from Answers a where a.surveyId = Survey.id)'),
            'total'
          ]
        ])
      })
      .then(function (surveys) {
        if (surveys.length === 0) {
          return res.json({
            survey: {
              id: -1,
              title: 'Oh No! There are no more surveys! Try again later.'
            },
            options: []
          });
        } else {
          Option.findAll({
            where: {
              surveyId: surveys[0].id
            },
            attributes: Object.keys(Option.attributes).concat([
              [
                Sequelize.literal('(select count(*) from Answers a where a.optionId = Option.id )'),
                'results'
              ]
            ])
          })
          .then(function (options) {
            return res.json({
              survey: surveys[0],
              options: options
            });
          });
        }
      });
    }
  });

  router.post('/api/survey', isLoggedIn, function (req, res) {
    if (_.get(req, 'body.id', -1) > 0) {
      Survey.upsert({ id: req.body.id, title: req.body.title })
        .then(function () {
          return Option.findAll({ where: { optionId: req.body.id } });
        })
        .then(function (options) {
          var queries = _.map(options, function (opt) {
            var reqOpt = _.find(req.body.options, { id: opt.id });
            if (reqOpt) {
              return Option.upsert(reqOpt);
            } else {
              return opt.destroy();
            }
          });

          var newOpts = _.filter(req.body.options, function (opt) {
            return !opt.id;
          });

          _.each(newOpts, function (opt) {
            queries.push(Option.insert(opt));
          });

          q.all(queries)
            .then(function (results) {
              return res.json(results);
            });
        });
    } else {
      Survey.create({ title: req.body.title })
        .then(function (survey) {
          var queries = _.map(req.body.options, function (opt) {
            return Option.create({ text: opt.text, surveyId: survey.id });
          });

          q.all(queries)
            .then(function (options) {
              return res.json({
                survey: survey,
                options: options
              });
            });
        });
    }
  });

  router.delete('/api/survey', isLoggedIn, function (req, res) {
    if (!req.body.id) {
      return res.status(400).json({
        message: 'Invalid delete request, no "id" field in request body.'
      });
    }

    Survey.destroy({ where: { id: req.body.id } }).then(function () {
      return res.status(200).send();
    });
  });

  router.get('/api/survey-list', isLoggedIn, function (req, res) {
    Survey.findAll({
      attributes: Object.keys(Survey.attributes).concat([
        [
          Sequelize.literal('(select count(*) from Answers a where a.surveyId = Survey.id )'),
          'total'
        ]
      ])
    })
      .then(function (surveys) {
        return res.json(surveys);
      });

  });

  router.post('/api/answer', function (req, res) {
    Answer.create({
      permid: req.cookies.permid,
      surveyId: +req.body.surveyId,
      optionId: +req.body.optionId
    }).then(function (answer) {
      return res.json(answer);
    })
      .catch(function (e) {
        res.status(500).send(e.message);
      });
  });

  router.all('*', function (req, res) {
    if (!req.cookies.permid) {
      res.cookie('permid', req.cookies['connect.sid'], {
        maxAge: 9999999999999,
        expires: new Date((new Date()).getTime() + 9999999999999)
      });
    }

    return res.sendFile(path.join(staticPath, 'index.html'));
  });

};

module.exports = routing;
