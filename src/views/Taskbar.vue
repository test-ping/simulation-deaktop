<template>
    <div class='tadkbarBackground'>
        <div class='list' v-show='listState'>
            <List @openProgram='openProgram'></List>
        </div>
        <div class='taskbar'>
            <button @click="openList"><i class="fab fa-windows"></i></button>
            <div v-if='programmed.length !== 0' class='programList'>
                <div v-for="item of programmed">
                    <i :class='item.icon'></i> 
                </div>    
            </div>
            <div class='time'>
                {{time}}
            </div>
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
       openProgram(data){
           this.listState = false;
           if(this.programmed.filter(e=>e.key === data.key).length ===0){
               this.$store.commit('ADD_PROGRAM',data);
           }
           else{

           }
       }
   },
   computed:{
       programmed(){
           return this.$store.state.RunningProgram; 
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
        background-color: rgba(53, 252, 225, 0.7);
    }
    .tadkbarBackground .list{
        width:250px;
        height: 350px;
        background-color: rgb(255, 255, 255);
        position: absolute;
        bottom:40px;
        border: 3px solid rgb(10, 88, 233);
    }
    .tadkbarBackground .taskbar{
        height: 100%;
        display: flex;
    }
    .tadkbarBackground .taskbar .programList{
         display: flex;
         flex-wrap: nowrap;

    }
    .tadkbarBackground .taskbar .programList div:nth-child(1){
        margin-left:15px ;
    }
    .tadkbarBackground .taskbar .programList div{
         height: 35px;
         line-height: 35px;
         width:60px;
         margin-left: 5px;
         text-align: center;
         border: 1px solid black;
         border-radius:5px ;
    }
    .tadkbarBackground .taskbar .programList div i{
        font-size: 30px;
        padding-top: 2px;
    }
    .tadkbarBackground .taskbar .programList div:hover i{
        color:rgb(207, 223, 66);
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
        /* display: inline-block; */
        /* float:right; */
        /* background-color: blue; */
        height: 100%;
        line-height: 37px;
        margin-right: 3px;
        color:rgb(10, 88, 233);
        font-weight:bold ;
        margin-left: auto;
    }
</style>