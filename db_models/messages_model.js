const Sequelize = require('sequelize');
var sequelize = require('../config/db')
var User = require('./user_model')

const Messages = sequelize.define('messages', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, 
      autoIncrement: true 
    },
    user_id: {
      type: Sequelize.INTEGER,
   
      references: {
        // This is a reference to another model
        model: User,
   
        // This is the column name of the referenced model
        key: 'id'}
      },
    message: {
      type: Sequelize.STRING
    },
    status: Sequelize.BOOLEAN
  });

  module.exports = Messages