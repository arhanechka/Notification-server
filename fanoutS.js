var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var ex = 'logs';
   // var msg = process.argv.slice(2).join(' ') || 'Hello World!';

    ch.assertExchange(ex, 'fanout', {durable: false});
    var counter = 0;
  var timerId = setInterval(function() {
    var msg = fakeRequest(counter);
   ch.publish(ex, '', new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  
    counter ++;
  }, 10000);
    
  
 // setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
});
function fakeRequest(i){
  return "Hello "+i;
 }