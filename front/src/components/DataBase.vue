<template>
<div>
  <h1>Unread Messages</h1>
  <div class="container">
  <div class="row">
    <div class="col-9">
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
    </div>
    <div class="col-sm">
     <div class="btn-group">
  <li class="btn btn-secondary btn-info btn-lg dropdown-toggle" 
  :class="{open: isDropdownOpen}"
  @click="idDrop"
  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Live messages
  
  <div class="dropdown-menu"
  >
<a class="dropdown-item" href="#">Action</a> 
<a class="dropdown-item" href="#">Another action</a>
 </div></li>
</div>
    </div>
    <select v-model="selected">
  <option disabled value="">Выберите один из вариантов</option>
  <option>А</option>
  <option>Б</option>
  <option>В</option>
</select>
<span>Выбрано: {{ selected }}</span>
<div>
<ul >
   <li
                            class="dropdown"
                            :class="{open: isDropdownOpen}"
                            @click="idDrop">
                        <a
                                href="#"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                                role="button"
                                aria-haspopup="true"
                                aria-expanded="false">Save & Load <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#" >Save Data</a></li>
                            <li><a href="#" >Load Data</a></li>
                        </ul>
                    </li> 
</ul>
</div>
  </div>
</div>

  
   <button type="button" class="btn btn-info" @click = "eraseCheckedMessages(readMessages)">Erase checked</button>
   <button type="button" class="btn btn-info" @click = "eraseCheckedMessages(messages)">Erase all</button>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapMutations } from 'vuex'
// comment
export default {
  data(){
    return{
      dbMessages: [],
      readMessages: [],
      isDropdownOpen: false, 
      selected: ''

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
    idDrop(){
this.isDropdownOpen = !this.isDropdownOpen;
console.log(this.isDropdownOpen)
    },
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