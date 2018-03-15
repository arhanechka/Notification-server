<template>
  <div id="app">
   
  </div>
</template>

<script>

var socket = require('../../config/socket')
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
 if (socket.getState()=='open'){
      channel = socket.subscribe('mychan');
      channel.watch(handler);
      function handler(data) {
          console.log(data.message + ' - ws');
        }
 }
  }
}
}
</script>