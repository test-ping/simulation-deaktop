import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    RunningProgram:[],
  },
  mutations: {
    ADD_PROGRAM(state,payload){
      state.RunningProgram.push(payload);
    },
    CLOSE_PROGRAM(state,payload){
      let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload);
      state.RunningProgram.splice(index,1);
    },
    NARROW_WINDOW(state,payload){
      let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload);
      state.RunningProgram[index].showWindow = false;
    }
  },
  actions: {
  },
  modules: {
  }
})
