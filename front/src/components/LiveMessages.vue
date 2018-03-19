<template>
<div>
   <h1>Live Messages</h1>
    <div class="list-group">
   <li class="list-group-item list-group-item-action active"><h5>Unread messages</h5></li>
   <ul  class="list-group" v-for="(ms, index) in lmes">
     <li class="list-group-item d-flex justify-content-between align-items-center 
     list-group-item-action list-group-item-light"
     @click = "changeStatus(index)">{{ms.message}}
     <span class="badge badge-primary badge-pill" >unread</span>
     </li>
   </ul>
 </div>
</div>
</template>

<script>
import {mapActions} from 'vuex'
var socket = require('../../../config/socket')
var channel
export default {
data(){
    return{
        lmes: []
    }
},
created(){
        this.startSocket();
    },
 methods:{
     ...mapActions([
          'updateMessages'
      ]),
        startSocket() {
     console.log(socket.getState())
     channel = socket.subscribe('mychan');
      channel.watch(this.handler)
        },
    handler(data) {
         console.log(data.message + ' - ws');
         this.lmes.push(data)
      },
      changeStatus(index){
          console.log(this.lmes[index])
        let id = this.lmes[index].id
        console.log (id)
        let url = '/messages/updateStatus/'+id;
        this.$http
        .put(url)
        .then(response => {
         console.log(response.data.msg)
         this.updateMessages(this.lmes[index])
         this.lmes.splice(index,1)
         })
        .catch(error => {
          console.log(error);
        })
    }
    }
}
</script>