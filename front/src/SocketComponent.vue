<template>
  <div id="app">
 
    <h1>{{ msg }}</h1>


    
  </div>
</template>

<script>
var SocketCluster = require('socketcluster-client');

var socket
export default {
  name: 'app',
  data () {
    return {
      msg: 'For socket'
    }
  },
  created(){
   this.startSocket();
  },
  methods:{
  startSocket() {
    socket = SocketCluster.create(
     {
    port: 8000,
   hostname: 'localhost'
   }
 );
  socket.on('connect', function() {
    console.log('CONNECTED');
  });
  var channel = socket.subscribe('mychan');
  channel.watch(handler);
  function handler(data) {
   console.log(data.message + ' - ws');
   this.msg = data.message;
  }
 }
  }
}
</script>