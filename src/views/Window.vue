<template>
    <div :style='{width:containerData.width,height:containerData.height,left:containerData.left,top:containerData.top}' class='windowContainer'>
        <Toolbar :windowName='{name:containerData.name,key:containerData.key}'></Toolbar>
        <div :is='containerData.key'></div>
    </div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue'
import Music from '@/components/Music.vue'

export default ({
    components:{
        Toolbar,
        Music
    },
    props:['containerData'],
})
</script>

<style scoped>
    .windowContainer{
        background-color: rgb(255, 255, 255);
        border: 3px solid blue;
        /* border-radius:  15px; */
        position: fixed;
    }

</style>