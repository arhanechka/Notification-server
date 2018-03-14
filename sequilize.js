const Sequelize = require('sequelize');
var config = require('./config')

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
  host: config.host,
  dialect: config.db.dialect
});


sequelize
  .authenticate()
  .then(() => {
  console.log('Connection has been established successfully.');

  
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
module.exports = sequelize;