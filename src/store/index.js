import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    RunningProgram:[],
    zindex:0,
    background:'url(' + require('@/assets/background.jpg') + ')',
    inputWord:'',
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
      if(state.RunningProgram[payload]){
        state.RunningProgram[payload].zindex = state.zindex;
        state.zindex++;
      }
    },
    WINDOW_MOVE(state,payload){
      let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload.key);
      state.RunningProgram[index].left = payload.left + 'px';
      state.RunningProgram[index].top = payload.top + 'px';
    },
    ENLARGE(state,payload){
       let index = state.RunningProgram.map(e=>{return e.key}).indexOf(payload);
       state.RunningProgram[index].left = '0px';
       state.RunningProgram[index].top = '0px';
       state.RunningProgram[index].width = document.body.offsetWidth + 'px';
       state.RunningProgram[index].height = document.body.offsetHeight - 43 +'px';
    },
    CHANGE_BACKGROUND(state,payload){
        state.background = payload;
    },
    UPDATE_WORD(state,payload){
      state.inputWord = payload;
    }

  },
  actions: {
  },
  modules: {
  }
})
