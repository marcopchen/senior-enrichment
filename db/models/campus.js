const Sequelize = require('sequelize');

const conn = require('../conn');

const Campus = conn.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: ''
  }
}, {
    scopes: {
      populated: () => ({
        include: [{
          model: conn.model('student'),
          attributes: { exclude: ['description'] }
        }]
      })
    }
  });

module.exports = Campus;
