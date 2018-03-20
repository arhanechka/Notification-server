<template>
<div>
  <h1>All Messages</h1>
  <div class="container">
  <div class="row">
    <div class="col-10">
  <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Message</th>
      <th scope="col">Status</th>
      </tr>
  </thead>
  <tbody>
    <tr  v-for="(message, index) in currentMessages">
      <th scope="row">{{message.id}}</th>
      <td>{{message.message}}</td>
      <td>  <span class="badge badge-success badge-pill"  
        :class="{danger: !ifMessageUnread(message.status)}"
      >
      {{ifMessageUnread(message.status)? 'read' : 'unread'}}</span>       

         </td>
     </tr>
   </tbody>
</table>
    </div>
  </div>
  </div>
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end" >
     <li class="page-item "v-for = "i in indexes">
      <a class="page-link" href="#" tabindex="-1" @click = "setCurrentIndex(i.index)">{{i.index}}</a>
    </li>
 
  </ul>
</nav>
</div>

</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'

export default {
  data(){
    return{
      //currentMessages: [],
      firstIndex: 0,
      currentIndex: {
          index: 1,
          start: 0
      },
      indexes: [
          {
              index: 1,
              start: 0
          }

      ]
    }
  },
 created(){
  this.getAllMessages();
 // this.getPortionOfMessages(this.firstIndex, this.lastIndex);
 //this.getIndexes();
 },
 computed: {
      messages(){
          return this.$store.getters.allMessages;
      },
      currentMessages(){
          return this.$store.getters.allMessages.slice(this.currentIndex.start, this.currentIndex.start+30);
      }
  },
 methods:{
     ...mapMutations([
        'PUT_ALL'
      ]),

    getAllMessages ()  {
        let url = '/messages';
        this.$http
        .get(url)
        .then(response => {
         console.log(response.data.msg)
         this.$store.commit('PUT_ALL', response.data.msg)
         this.getIndexes(response.data.msg)
        })
        .catch(error => {
          console.log(error);
        });
     },
    ifMessageUnread(status){
        return status == 1;
    },
    setCurrentIndex(index){
       this.currentIndex.index = index;
       this.currentIndex.start = this.indexes[index-1].start;
    },
    getIndexes(messages){
       let count=2;
        for (let i = 30; i<messages.length; i+=30){
            this.indexes.push({index:count, start: i})
            console.log(this.indexes)
            count++;
        }
    }
    
 }
}
</script>
<style scoped>
.danger{
    background-color: lightcoral
    
}

</style>