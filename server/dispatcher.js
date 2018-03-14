var mysql=require('mysql');
const Sequelize = require('sequelize');

const config = require('../config')
const user = config.db.user;
const password = config.db.password;
const database = config.db.database;
const host = config.host;
const dialect = config.db.dialect

var start = function(){
    var connection=mysql.createPool({
        user: user,
        password:password,
        database:database
    });
    const sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: dialect
    });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

}

module.exports = start