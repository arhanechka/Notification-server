import Vue from 'vue'
import router from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import DataBase from '../components/DataBase.vue'
import LiveMessages from '../components/LiveMessages.vue'
import AllMessages from '../components/AllMessages.vue'


export const routes = [
    // {path: '/', component : Login},
    {path: '/home', component : Home},
    {path: '/db', component : DataBase},
    {path: '/live', component : LiveMessages},
    {path: '/all', component : AllMessages},

]