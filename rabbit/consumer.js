var amqp = require('amqplib/callback_api');
var SocketCluster = require('socketcluster-client');
var Messages = require('../db_models/messages_model')
var config = require('../config/config')
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
    
    Messages.create({
          message: msg.content.toString(),
          user_id: 1,
          status: false
        }).then(function(inserted){
     console.log("dataForSocket")
     console.log(inserted.dataValues)
     
     if (socket.getState()=='open'){
      channel.publish(inserted.dataValues)
      setTimeout(function() {
      console.log(" [x] Done");
      ch.ack(msg);
      }, 5000);
     }
    }, {noAck: false})
   
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
