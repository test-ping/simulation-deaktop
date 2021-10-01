<template>
    <div :style='{width:containerData.width,height:containerData.height,left:containerData.left,top:containerData.top, "z-index":containerData.zindex}' class='windowContainer' @click='windowSwitching()'>
        <Toolbar :windowData='{name:containerData.name,key:containerData.key,left:containerData.left,top:containerData.top}'></Toolbar>
        <div :is='containerData.key' :windowData='containerData'></div>
    </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import Music from '@/components/Music.vue'
import setDesktop from '@/components/setDesktop.vue'
import Word from '@/components/Word.vue'
import IE from '@/components/IE.vue'
import myComputer from '@/components/myComputer.vue'


export default ({

    methods:{
        windowSwitching(data){
            let index = this.programmed.map(e=>e.key).indexOf(this.containerData.key)
            this.$store.commit('WINDOW_SWITCHING',index);
        }
    },
    computed:{
        programmed(){
            return this.$store.state.RunningProgram; 
        },
    },
    components:{
        Toolbar,
        Music,
        setDesktop,
        Word,
        IE,
        myComputer
    },
    props:['containerData'],
})
</script>

<style scoped>
    .windowContainer{
        background-color: rgb(255, 255, 255);
        border: 3px solid blue;
        position: fixed;
        /* overflow: scroll;
        overflow-x:hidden; */
    }

</style>