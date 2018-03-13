<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link to='/home' class="navbar-brand" href="#">Home</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" 
  data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" 
  aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <router-link to='/db' class="nav-item nav-link " href="#">Database messages <span class="sr-only">(current)</span></router-link>
      <router-link to='/live' class="nav-item nav-link" href="#">Live messages</router-link>
     </div>
    </div>
    <ul class="navbar-nav navbar-right" @click="logout">
     <router-link to='/' class="navbar-brand" href="#" >Logout</router-link>
    </ul>
  
</nav>
</template>
<script>
export default {
  methods:{
    logout(){
      console.log("in logout")
      this.$emit('logout', true)
    }
  }
}
</script>
