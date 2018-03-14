const Sequelize = require('sequelize');
var config = require('./config')

const db = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.host,
  dialect: config.db.dialect
});


module.exports = db