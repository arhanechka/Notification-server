import axios from '../../backend/vue-axios/axios'


const state = {
    messages: [],
    liveMessages: []
};

const mutations = {
    'PUT_UNREAD' (state, messages){
        state.messages = messages
    },
    'REMOVE_READ' (state, index){
        let mesForRemove
        state.messages.splice(index,1)
        console.log(state.messages.length)
    },
    'REMOVE_ALL'(state, message){
      //  state.liveMessages.push(message);
        console.log(state.liveMessages.length)
    }
};

const actions = {
   
    getUnreadMessages: ({commit}) => {
        let url = '/messages/status/0';
        let messages;
        axios
        .get(url)
        .then(response => {
         console.log(response.data.msg)
         messages = response.data.msg;
         commit('GET_UNREAD', messages)

        })
        .catch(error => {
          console.log(error);
        });
     },
     updateMessageStatus({commit}, ){
         console.log("id")
         console.log(id)
         let url = '/messages/updateStatus/'+id;
         axios
        .put(url)
        .then(response => {
         console.log(response.data.msg)
         commit('REMOVE_READ', param.id)
         })
        .catch(error => {
          console.log(error);
        })
    },
    eraseAllUnread({commit}){
        this.state.messages.splice(0)
        commit('UPDATE_LIVE', message)
    }
}
     


const getters =  {
    messages: state => {
        return state.messages
    }
}


export default { state, mutations, actions, getters} 