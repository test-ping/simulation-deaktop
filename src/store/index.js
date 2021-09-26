import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    programmedList:[],
  },
  mutations: {
    ADD_PROGRAMMED(state,payload){
      state.programmedList.push(payload);
    }
  },
  actions: {
  },
  modules: {
  }
})
