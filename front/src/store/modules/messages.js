const state = {
    messages: []
};

const mutations = {
    'PUT_UNREAD' (state, messages){
        state.messages = messages
    },
    'REMOVE_READ' (state, index){
        state.messages.splice(index,1)
        console.log(state.messages.length)
    }
};

const actions = {
     updateMessages({commit}, mes){
         console.log("mes")
         console.log(mes)
         for (var i =0; i<state.messages.length; i++){
             if (mes.id == state.messages[i].id){
                commit('REMOVE_READ', i) 
             }
         }
        //  state.messages.findIndex(element => element.id==mes.id)
        //  .then(index=>{
        //  console.log(index)
        //  commit('REMOVE_READ', index)})
      }
}

const getters =  {
    messages: state => {
        return state.messages
    }
}


export default { state, mutations, actions, getters} 