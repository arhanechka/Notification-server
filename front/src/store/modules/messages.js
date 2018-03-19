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
        var i;
        state.messages.filter(function(item, index) 
        { i = index; return item.id == mes.id; })
        commit('REMOVE_READ', i)
       }
}

const getters =  {
    messages: state => {
        return state.messages
    }
}


export default { state, mutations, actions, getters} 