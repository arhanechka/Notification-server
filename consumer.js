var amqp = require('amqplib/callback_api');
var SocketCluster = require('socketcluster-client');
const Sequelize = require('sequelize');
var Messages = require('./databaseModel')
var sequelize = require('./sequilize')
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
          message: msg.content.toString()
        }).then(function(inserted){
     console.log("dataForSocket")
     console.log(inserted.dataValues)
     
     if (socket.getState()=='open'){
      channel.publish(inserted.dataValues)
      setTimeout(function() {
      console.log(" [x] Done");
      ch.ack(msg);
      }, 5000);}
    }, {noAck: false}); }); });
  });
});

function startSocket(msg) {
    socket = SocketCluster.create(
     {
    port: 8000,
   hostname: 'localhost'
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
