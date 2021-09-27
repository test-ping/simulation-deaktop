import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    RunningProgram:[],
    zindex:0,
  },
  mutations: {
    ADD_PROGRAM(state,payload){
      state.RunningProgram.push(payload);
      state.zindex ++;
    },
    CLOSE_PROGRAM(state,payload){
      let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload);
      state.RunningProgram.splice(index,1);
    },
    NARROW_WINDOW(state,payload){
      let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload);
      state.RunningProgram[index].showWindow = false;
    },
    SHOW_WINDOW(state,payload){
      state.RunningProgram[payload].showWindow = true;
      state.RunningProgram[payload].zindex = state.zindex;
      state.zindex++;
    },
    WINDOW_SWITCHING(state,payload){
      state.RunningProgram[payload].zindex = state.zindex;
      state.zindex++;
    },
    ENLARGE(state,payload){
       let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload);
       state.RunningProgram[index].left = '0px';
       state.RunningProgram[index].top = '0px';
       console.log(document.body.offsetWidth)
       state.RunningProgram[index].width = document.body.offsetWidth + 'px';
       state.RunningProgram[index].height = document.body.offsetHeight - 43 +'px';
    }

  },
  actions: {
  },
  modules: {
  }
})
