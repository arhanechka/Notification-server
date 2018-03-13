<template>
  <div class="grid">
    <form action="/" method="post" class="form login">
      <header class="login__header">
        <h3 class="login__title">Login</h3>
      </header>
       <div class="login__body">
        <div class="form__field">
          <input type="email" placeholder="Email" required v-model = 'email' name = 'email'>
        </div>
        <div class="form__field">
          <input type="password" placeholder="Password" required v-model = 'password' name = 'password'>
        </div>
      </div>
      <footer class="login__footer">
        <input class="btn btn-info btn-sm" type="button" value="Login" @click = "checkUser">
        <!-- <p><span class="icon icon--info">?</span><a href="#">Forgot Password</a></p> -->
      </footer>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    checkUser(){
      if (this.email = 'aranvic1976@gmail.com' && this.password == '1111'){
        console.log(true)
        this.$router.push('/home')
        
      }
    }
  }
}
</script>
