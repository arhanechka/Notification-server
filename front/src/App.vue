<template>
  <div id="app">

   <!-- <component :is="mode" @confirmed="mode = 'app-header'" @logout="logged($event)"></component> -->
   <app-header></app-header>
   <router-view></router-view>
  </div>
</template>

<script>

import Login from './components/Login'
import Header from './components/Header'

export default {
  name: 'app',
  data () {
    return {
      mode: 'app-login',
    }
  },
  components:{
    appLogin: Login,
    appHeader: Header
  },
  
  methods:{
  logged(logout) {
      if (logout) {
        this.mode = 'app-login';
      } else {
        this.mode = 'app-header';
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
