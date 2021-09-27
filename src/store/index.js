import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    RunningProgram:[],
  },
  mutations: {
    ADD_PROGRAMMED(state,payload){
      state.RunningProgram.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
