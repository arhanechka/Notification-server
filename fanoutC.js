var amqp = require('amqplib/callback_api');
var SocketCluster = require('socketcluster-client');
const Sequelize = require('sequelize');
var Messages = require('./databaseModel')
var sequelize = require('./sequilize')

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', {durable: false});

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');
      ch.consume(q.queue, function(msg) {
       // console.log(" [x] %s", msg.content.toString());
       startSocket(msg.content.toString());
      }, {noAck: true});
    });
   });
});

function startSocket(msg) {
   socket = SocketCluster.create(
    {
   port: 8000,
  hostname: 'localhost'
  }
);
 
 console.log('socket connected')
 channel = socket.subscribe('mychan');
 channel.watch(handler);
 var dataForSocket;
 function handler(data) {
  console.log(data + ' - ws');
  // Messages.sync({force: false}).then(() => {
  //   return Messages.create({
  //     message: data
  //   }).then(function(inserted){
  //       //console.log(inserted.dataValues)
  //       dataForSocket = inserted;
  //   });
  // });
 }
//socket.emit('mychan', "hello, ann1")
 socket.on('connect', function() {
   console.log('CONNECTED');
 });

 channel.publish(msg)

}
