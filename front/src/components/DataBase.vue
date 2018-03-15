<template>
<div>
  <h1>DataBase</h1>
   <div class="list-group">
   <li class="list-group-item list-group-item-action active"><h5>Unread messages</h5></li>
   <ul  class="list-group" v-for="(message, index) in messages">
     <li class="list-group-item d-flex justify-content-between align-items-center 
     list-group-item-action list-group-item-light"
     @click = "changeStatus(index)">{{message.message}}
     <span class="badge badge-primary badge-pill" >unread</span>
     </li>
   </ul>
 </div>
   <button type="button" class="btn btn-info" @click = "getUnreadMessages">Check for new unread</button>
</div>
</template>

<script>
import {mapActions} from 'vuex'
import { mapGetters } from 'vuex'
export default {
  data(){
    return{
      dbMessages: [],
      readMessages: []
    }
  },
 created(){
  this.$store.dispatch('getUnreadMessages');
 },
 computed: {
      ...mapGetters({
        messages: 'recieveUnreadMessages'
      })
  },
 methods:{
   ...mapActions([
          'updateMessageStatus', 'getUnreadMessages'
      ]),
    changeStatus(index){
     let param = {
       id: index,
       status: 1
     }
     this.updateMessageStatus(param)
    }
 }
}
</script>