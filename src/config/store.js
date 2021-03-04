import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    server: null
  },

  mutations: {
    setUser(state, payload){
      state.user = payload
    },
    setServer(state, payload){
      state.server = payload
    }
  },

  getters: {
    getUser(state){
      return state.user
    },
    getServer(state){
      return state.server
    }
  }
})
