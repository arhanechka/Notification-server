<template>
<div>
 
   <h1>DataBase</h1>
</div>
</template>

<script>
export default {
 created(){
   this.getDbMessages();
 },
 methods:{
   getDbMessages(){
     let url = '/messages';
     this.$http
        .get(url)
        .then(response => {
         console.log(response)
        })
        .catch(error => {
          console.log(error);
        });
   }
 }
}
</script>