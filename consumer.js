var amqp = require('amqplib/callback_api');
var SocketCluster = require('socketcluster-client');
const Sequelize = require('sequelize');
var Messages = require('./db_models.js/messages_model')
var sequelize = require('./sequilize')
var config = require('./config')
var socket

startSocket();
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
    console.log(" [x] Received %s", msg.content.toString());
    
    Messages.sync({force: false}).then(() => {
        return Messages.create({
          message: msg.content.toString(),
          status: false
        }).then(function(inserted){
     console.log("dataForSocket")
     console.log(inserted.dataValues)
     
     if (socket.getState()=='open'){
      channel.publish(inserted.dataValues)
      setTimeout(function() {
      console.log(" [x] Done");
      ch.ack(msg);
      }, 5000);}
    }, {noAck: false})
    .catch(function (e) {
      console.error("Problems with database");
      res.json(e)
      }); 
     }); 
    });
  });
});

function startSocket() {
    socket = SocketCluster.create(
     {
   port: config.socketPort,
   hostname: config.host
   }
 );
  socket.on('connect', function() {
    console.log('CONNECTED');
  });
  channel = socket.subscribe('mychan');
  channel.watch(handler);
  function handler(data) {
   console.log(data.message + ' - ws');
  }
 }
