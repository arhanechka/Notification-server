<template>
<div>
   <h1>Live Messages</h1>
    <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Message</th>
      <th scope="col">Status</th>
      </tr>
  </thead>
  <tbody>
    <tr  v-for="(message, index) in lmes" @click = "changeStatus(index)">
      <th scope="row">{{message.id}}</th>
      <td>{{message.message}}</td>
      <td>
      <span class="badge badge-primary badge-pill" >unread</span>       
         </td>
     </tr>
   </tbody>
</table>
  
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