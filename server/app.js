
const express = require('express');
const app = express();
var config = require('../config/config')
var sequelize = require('../config/db')
var User = require('../db_models.js/user_model')
var Messages = require('../db_models.js/messages_model')
var dispatcher = require('./dispatcher')
var messages = require('./routes/messages');
var users = require('./routes/users');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type, Authorization");
  next();
});
 
//dispatcher();
sequelize
.authenticate()
.then(()=> {
    console.log("Connection has been established successfully.");
      // event handling:
      User.sync({force: false})
        .then(() => {
          console.log("User synced");
        })
        Messages.sync({force: false})
        .then(() => {
          console.log("Messages synced");
        })   
        .catch(error => {
          console.log("Not synced : " + error);
        });
        app.listen(config.restPort, () => {
            console.log('Express listening on port:', config.restPort);
          });
    })
    .catch(err => {
        console.error("Unable to connect to the database:", err);
      });
app.use('/messages', messages);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handlers
  
  // development error handler
  // will print stacktrace
  if (app.get('env') === 'dev') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

//   app.listen(config.restPort, function () {
//     console.log('Node app is running on port ' +config.restPort);
// });

module.exports = app;