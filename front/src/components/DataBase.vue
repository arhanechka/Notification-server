<template>
<div>
  <h1>DataBase</h1>
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Message</th>
      <th scope="col">Read</th>
      </tr>
  </thead>
  <tbody>
    <tr  v-for="(message, index) in messages">
      <th scope="row">{{message.id}}</th>
      <td>{{message.message}}</td>
      <td><div class="form-check">
         <input class="form-check-input" type="checkbox" :value="message" v-model = "readMessages">
         </div>
         </td>
     </tr>
   </tbody>
</table>
   <button type="button" class="btn btn-info" @click = "eraseCheckedMessages(readMessages)">Erase checked</button>
   <button type="button" class="btn btn-info" @click = "eraseCheckedMessages(messages)">Erase all</button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data(){
    return{
      dbMessages: [],
      readMessages: []
    }
  },
 created(){
  this.getUnreadMessages();
 },
 computed: {
      messages(){
          return this.$store.getters.messages;
      }
  },
 methods:{
     ...mapMutations([
        'PUT_UNREAD'
      ]),

    getUnreadMessages ()  {
        let url = '/messages/status/0';
        this.$http
        .get(url)
        .then(response => {
         console.log(response.data.msg)
         this.$store.commit('PUT_UNREAD', response.data.msg)
        })
        .catch(error => {
          console.log(error);
        });
     },
    eraseCheckedMessages(array){
      console.log(array)
      let idArray = [];
      array.forEach(element => idArray.push(element.id))
      let url = '/messages/updateStatuses';
         this.$http
        .put(url, {"data":idArray})
        .then(response => {
         console.log(response.data)
         this.getUnreadMessages();
         this.readMessages = []
         })
        .catch(error => {
          console.log(error);
        })
    }
 }
}
</script>