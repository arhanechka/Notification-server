const Sequelize = require('sequelize');
var sequelize = require('../sequilize')

const User = sequelize.define('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, 
      autoIncrement: true 
    },
    email: {
      type: Sequelize.STRING, 
      unique: true, 
      allowNull: false
    },
    password: {
      type: Sequelize.STRING, 
      allowNull: false
    },
  }); 

  module.exports = User
