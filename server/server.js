
const express = require('express');
const app = express();
var config = require('../config')
var dispatcher = require('./dispatcher')
var messages = require('./routes/messages');
var users = require('./routes/users');
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Content-Type, Authorization");
  next();
});

dispatcher();
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

  app.listen(config.restPort, function () {
    console.log('Node app is running on port ' +config.restPort);
});

module.exports = app;