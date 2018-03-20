import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import {routes} from './routes/routes'
import * as axios from './backend/vue-axios'
import store from './store/store'

Vue.use(VueRouter)

// Vue.filter('mesStatus', (value, status) => {
//   console.log("value")
//   console.log('$'+ value.toLocaleString())
//   return '$'+ value.toLocaleString()
// })

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  axios,
  store,
  router,
  render: h => h(App)
})
