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
   <button type="button" class="btn btn-info" @click = "getDbMessages">Check for new unread</button>
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
   console.log("in created")
  this.$store.dispatch('getUnreadMessages');
 },
 computed: {
      ...mapGetters({
        messages: 'recieveUnreadMessages'
      })
  },
 methods:{
   ...mapActions([
          'updateMessageStatus'
      ]),
   getDbMessages(){
   //  this.$store.dispatch('getUnreadMessages');
    //  let url = '/messages/status/0';
    //  this.$http
    //     .get(url)
    //     .then(response => {
    //      console.log(response.data.msg)
    //      this.dbMessages = response.data.msg;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
   },
   changeStatus(index){
     let param = {
       id: index,
       status: 1
     }
     this.updateMessageStatus(param)
    //  this.readMessages.push(this.dbMessages[index])
    //  console.log(this.readMessages.length)
    //  this.dbMessages.splice(index, 1);
   }
 }
}
</script>