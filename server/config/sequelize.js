'use strict';

var Sequelize = require('Sequelize');
var passportSequelize = require('passport-local-sequelize');
var db = new Sequelize('survey', 'survey', 'survey');

/**
 * Define Models
 */
var User = passportSequelize.defineUser(db, {
  username: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return 'anonymous' + (new Date()).getTime();
    },

    allowNull: false,
    unique: true
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  type: {
    type: Sequelize.STRING,
    defaultValue: 'anonymous',
    allowNull: false
  },
  hash: {
    type: Sequelize.STRING(2048),
    allowNull: false
  },
  verified: {
    type: Sequelize.BOOLEAN,
    allowNull: true
  }
});

var Survey = db.define('Survey', {
  title: Sequelize.STRING
});

var Option = db.define('SurveyOption', {
  value: Sequelize.INTEGER
});

var Answer = db.define('Answer', {});

/**
 * Define Relationships
 */
Survey.hasMany(Option);
User.hasMany(Answer);
Survey.hasMany(Answer);
Option.hasMany(Answer);

User.sync()
  .then(function () {
    return Survey.sync();
  })
  .then(function () {
    return Option.sync();
  })
  .then(function () {
    return Answer.sync();
  })
  .then(function () {
    return User.findOne({ where: { username: 'admin' } });
  })
  .then(function (user) {
    if (!user) {
      return User.register({
        username: 'admin',
        type: 'admin',
        verified: true
      }, 'password', function (err, admin) {
        return err || admin.save();
      });
    }
  })
  .catch(function (e) {
    console.error(e);
  });

module.exports = {
  db: db,
  User: User,
  Survey: Survey,
  Option: Option,
  Answer: Answer
};
