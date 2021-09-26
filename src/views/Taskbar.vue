<template>
    <div class='tadkbarBackground'>
        <div class='list' v-show='listState'>
            <List @openProgram='openProgram'></List>
        </div>
        <button @click="openList"><i class="fab fa-windows"></i></button>
        <ul v-if='programmed.length !== 0'>
            <!-- <li v-for="item of programmed"></li>     -->
        </ul>
        <div class='time'>
            {{time}}
        </div>
    </div>
</template>


<script>

import List from '@/components/List.vue';

export default ({
   created(){
        this.time =  (new Date().getFullYear() + '/' + (new Date().getMonth() >= 10 ? new Date().getMonth() : '0' + new Date().getMonth() ) + '/' 
           + (new Date().getDate()>=10 ? new Date().getDate() : '0' + new Date().getDate()) + ' ' 
           + (new Date().getHours()>=10 ? new Date().getHours(): '0' + new Date().getHours()) +':' 
           + (new Date().getMinutes()>=10 ? new Date().getMinutes(): '0'+new Date().getMinutes()) +':' 
           + (new Date().getSeconds() >=10 ? new Date().getSeconds():'0'+new Date().getSeconds()));   
       setInterval(()=>{
           this.time =  (new Date().getFullYear() + '/' + (new Date().getMonth() >= 10 ? new Date().getMonth() : '0' + new Date().getMonth() ) + '/' 
           + (new Date().getDate()>=10 ? new Date().getDate() : '0' + new Date().getDate()) + ' ' 
           + (new Date().getHours()>=10 ? new Date().getHours(): '0' + new Date().getHours()) +':' 
           + (new Date().getMinutes()>=10 ? new Date().getMinutes(): '0'+new Date().getMinutes()) +':' 
           + (new Date().getSeconds() >=10 ? new Date().getSeconds():'0'+new Date().getSeconds()));
       },1000);
   },
   data(){
       return {
           time:'',
           listState:false,
       }
   },
   methods:{
       openList(){
           if(this.listState){
                this.listState = false;
           }
           else{
               this.listState = true;
           }
       },
       openProgram(val){
           this.listState = false;
       }
   },
   computed:{
       programmed(){
           return this.$store.state.programmedList; 
       },
   },
   components:{
       List
   }
})
</script>

<style scoped>
    .tadkbarBackground{
        height:100%;
        position: relative;
        background: linear-gradient(90deg, rgba(46, 162, 90, 1)35%, rgba(163, 108, 147, 0.9)60%);
        background: -moz-linear-gradient(90deg, rgba(46, 162, 90, 1)35%, rgba(163, 108, 147, 0.9)60%);
        background: -webkit-linear-gradient(90deg, rgba(46, 162, 90, 1)35%, rgba(163, 108, 147, 0.9)60%);
        background: -o-linear-gradient(90deg, rgba(46, 162, 90, 1)35%, rgba(163, 108, 147, 0.9)60%);
    }
    .tadkbarBackground .list{
        width:250px;
        height: 350px;
        background-color: rgb(255, 255, 255);
        position: absolute;
        bottom:40px;
        border: 3px solid rgb(10, 88, 233);
    }
    button{
        border: none;
        width:100px;
        height:100%;
        background: linear-gradient(90deg, rgba(57, 163, 144, 1)35%, rgba(163, 220, 70, 0.8)60%);
        background: -moz-linear-gradient(90deg, rgba(57, 163, 144, 1)35%, rgba(163, 220, 70, 0.8)60%);
        background: -webkit-linear-gradient(90deg, rgba(57, 163, 144, 1)35%, rgba(163, 220, 70, 0.8)60%);
        background: -o-linear-gradient(90deg, rgba(57, 163, 144, 1)35%, rgba(163, 220, 70, 0.8)60%);
    }
    button:hover{
        cursor: pointer;
        background: linear-gradient(90deg, rgba(57, 113, 144, 1)35%, rgba(163, 167, 70, 0.8)60%);
        background: -moz-linear-gradient(90deg, rgba(57, 113, 144, 1)35%, rgba(163, 167, 70, 0.8)60%);
        background: -webkit-linear-gradient(90deg, rgba(57, 113, 144, 1)35%, rgba(163, 167, 70, 0.8)60%);
        background: -o-linear-gradient(90deg, rgba(57, 113, 144, 1)35%, rgba(163, 167, 70, 0.8)60%);
    }
    button i{
        /* height: 100%; */
        /* width:100%; */
        font-size: 30px;
        color:rgb(31, 31, 194);
    }
    .time{
        display: inline-block;
        float:right;
        /* background-color: blue; */
        height: 100%;
        line-height: 37px;
        margin-right: 3px;
        color:rgb(10, 88, 233);
        font-weight:bold ;
    }
</style>