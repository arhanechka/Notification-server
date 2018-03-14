var mysql=require('mysql');
var config = require('../config')

var connection=mysql.createPool({
user: config.db.user,
password:config.db.password,
database:config.db.database
});

module.exports=connection;