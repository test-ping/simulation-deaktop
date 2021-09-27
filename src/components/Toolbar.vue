<template>
    <div>
        <p>{{windowName.name}}</p>
        <button @click='narrowWindow(windowName.key)'>－</button>
        <button><i class="far fa-square"></i></button>
        <button @click='closeWindow(windowName.key)'><i class="far fa-window-close"></i></button>
    </div>
</template>

<script>

export default ({
    props:['windowName'],
    methods:{
        closeWindow(val){
            this.$store.commit('CLOSE_PROGRAM',val);
        },
        narrowWindow(val){
            this.$store.commit('NARROW_WINDOW',val);
        }
    }
})
</script>

<style scoped>
    div{
        width:100%;
        background-color: dodgerblue;
        display: flex;
        justify-content: right;
    }
    div p{
        margin-right:auto ;
        margin-left: 5px;
        font-size: 12px;
        -webkit-user-select:none;
        -moz-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
    div button{
        background-color:transparent;
        -webkit-user-select:none;
        -moz-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
    div button i{
        font-size:16px;
    }
</style>