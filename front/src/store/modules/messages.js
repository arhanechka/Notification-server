import axios from '../../backend/vue-axios/axios'


const state = {
    messages: []
};

const mutations = {
    'GET_UNREAD' (state, messages){
        state.messages = messages
    },
    'REMOVE_READ' (state, index){
        state.messages.splice(index,1)
        console.log(state.messages.length)
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
     updateMessageStatus({commit}, param){
         let id = state.messages[param.id].id;
         let status = param.status
         console.log(id)
         let url = '/messages/updateStatus/'+id+'/'+status;
     
         axios
        .put(url,{id:id, status:status})
        .then(response => {
         console.log(response.data.msg)
         commit('REMOVE_READ', param.id)
         })
        .catch(error => {
          console.log(error);
        })
    }
}
     


const getters = {
    recieveUnreadMessages (state, getters) {
       return state.messages
    }
    
}

export default { state, mutations, actions, getters} 