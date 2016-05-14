'use strict';

var Sequelize = require('sequelize');
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
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Option = db.define('Option', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Answer = db.define('Answer', {
  permid: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

/**
 * Define Relationships
 */
Survey.hasMany(Option, { as: 'Options', foreignKeyConstraint: true, foreignKey: 'surveyId' });
Option.belongsTo(Survey, { foreignKeyConstraint: true, foreignKey: 'surveyId' });
Survey.hasMany(Answer, { as: 'Answers', foreignKeyConstraint: true, foreignKey: 'surveyId' });
Option.hasMany(Answer, { as: 'Answers', foreignKeyConstraint: true, foreignKey: 'optionId' });
Answer.belongsTo(Survey, { foreignKeyConstraint: true, foreignKey: 'surveyId' });
Answer.belongsTo(Option, { foreignKeyConstraint: true, foreignKey: 'optionId' });

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
