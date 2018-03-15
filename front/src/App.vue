<template>
  <div id="app">

   <component :is="mode" @confirmed="mode = 'app-header'" @logout="logged($event)"></component>
   <router-view></router-view>
<p>{{msg}}</p>
  </div>
</template>

<script>

import Login from './components/Login'
import Header from './components/Header'
var socket = require('../../config/socket')
var channel
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      mode: 'app-login',
      mess: ['start']
    }
  },
  components:{
    appLogin: Login,
    appHeader: Header
  },
  created(){
  this.startSocket();
 
  },
  computed:{
   
  },
  methods:{
  logged(logout) {
      if (logout) {
        this.mode = 'app-login';
      } else {
        this.mode = 'app-header';
      }
    },
   startSocket() {
     console.log(socket.getState())
     channel = socket.subscribe('mychan');
      channel.watch(handler)
      function handler(data) {
         console.log(data.message + ' - ws');
       }
 
   }
    
}
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
