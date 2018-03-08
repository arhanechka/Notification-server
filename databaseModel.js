const Sequelize = require('sequelize');
var sequelize = require('./sequilize')

const Messages = sequelize.define('messages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, 
      autoIncrement: true 
    },
    message: {
      type: Sequelize.STRING
    },
    status: Sequelize.BOOLEAN
  });

  module.exports = Messages
