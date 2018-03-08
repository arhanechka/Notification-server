var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'task_queue';
    //var msg = process.argv.slice(2).join(' ') || "Hello World!";
     ch.assertQueue(q, {durable: true});
     var counter = 0;
     var timerId = setInterval(function() {
      var msg = "Hello "+counter;
      ch.sendToQueue(q, new Buffer(msg), {persistent: true});
      console.log(" [x] Sent '%s'", msg);
      counter ++;
    }, 10000);
   
  });
//  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});

