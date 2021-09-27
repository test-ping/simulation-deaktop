<template>
  <div id="app">
    <div id='main'>
      <MainDesktop></MainDesktop>
    </div>
    <div id='taskbar'>
      <Taskbar></Taskbar>
    </div>
  </div>
</template>

<script>
import MainDesktop from '@/views/Main.vue';

import Taskbar from '@/views/Taskbar.vue';
export default ({
  methods:{
    // add(){
    //   this.$store.commit('ADD_PROGRAMMED', Math.random());
    // },
  },
  components:{
    Taskbar,
    MainDesktop
  },
})
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width:100%;
  height: 100%;
  
}
#app #main{
  width:100%;
  height: calc(100% - 40px);
  background: url('./assets/background.jpg');
  background-position: center center;
}
#app #taskbar{
  width:100%;
  height:37px;
  border-top:solid 3px white;
  background-color: rgb(95, 45, 45);
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
