<template>
    <div id='main'>
        <div v-for="item,index of program" class='programBox' :style="{top:item.initialPosition}" :id='item.key' @dblclick="openProgram({key:item.key,icon:item.icon,name:item.name})">
            <i :class='item.icon' ></i>
            <p>{{item.name}}</p>
        </div>
        <template v-show='programmed.length!==0'>
            <Window v-for='item of programmed' :containerData='item' v-show='item.showWindow'> </Window>
        </template>
    </div>
    
</template>

<script>
import Window from './Window.vue'


export default ({
    data(){
        return{
            program:[
                {name:'我的電腦',icon:'fas fa-laptop-code',key:'myComputer',initialPosition:'0px'},
                {name:'音樂撥放器',icon:'fas fa-play-circle',key:'Music',initialPosition:'95px'},   
                {name:'桌面設定',icon:'fas fa-cog',key:'setDesktop',initialPosition:'190px'},                
                {name:'網頁瀏覽器',icon:'fab fa-internet-explorer',key:'IE',initialPosition:'285px'},
                {name:'文字編輯器',icon:'fas fa-file-word',key:'word',initialPosition:'380px'},
            ],
            mouse:{
                x:0,
                y:0
            },
            windowListener:false,
            mousedown:false,
            node:null,
            nodeStartPosition:{
                x:0,
                y:0
            },
            nodePosition:{
                x:0,
                y:0
            },
        }
    },
    computed:{
        programmed(){
           return this.$store.state.RunningProgram; 
       },
    },
    mounted(){
        document.querySelectorAll('.programBox').forEach(e=>{
            e.addEventListener('mousedown',e=>{
                this.mouse.x = e.screenX;
                this.mouse.y = e.screenY;
                this.mousedown = true;
                if(e.toElement.nodeName === 'P' || e.toElement.nodeName === 'I'){
                    this.node = e.toElement.parentNode;
                }
                else{
                    this.node = e.toElement;
                }
                this.nodeStartPosition.x = this.node.offsetLeft;
                this.nodeStartPosition.y = this.node.offsetTop;
            })
            e.addEventListener('mouseleave',e=>{
                if(this.mousedown && this.node){
                    window.addEventListener('mousemove',e=>{
                        if(this.mousedown && this.node){
                            this.windowListener = true;
                            this.node.classList.add('fixed');
                            this.nodePosition.x = e.screenX - 50;
                            this.nodePosition.y = e.screenY - 145;
                            this.node.style.left = this.nodePosition.x + 'px';
                            this.node.style.top = this.nodePosition.y  + 'px';
                        }
                    }); 
                }
            })
            e.addEventListener('mouseup',this.mouseDrag);
        })
    },
    methods:{
        openProgram(data){

            data.width = '800px';
            data.height = '400px';
            data.left = Math.floor(Math.random() * document.body.offsetWidth)/2+'px';
            data.top = Math.floor(Math.random() * document.body.offsetHeight)/2 +'px';
            data.showWindow = true;



            this.$store.commit('ADD_PROGRAM',data);
        },
        mouseDrag(){
            if(this.mousedown && this.node){
                    if(this.windowListener){
                        this.windowListener = null;
                    }
                    let allNode = document.querySelectorAll('.programBox');
                    let overlap = false;
                    allNode.forEach(e=>{
                        if(e.id !== this.node.id){
                        
                            if( (e.offsetLeft < this.node.offsetLeft &&  e.offsetLeft + e.offsetWidth > this.node.offsetLeft) ||  (e.offsetLeft < this.node.offsetLeft + this.node.offsetWidth &&  e.offsetLeft + e.offsetWidth > this.node.offsetLeft +this.node.offsetWidth)){
                                if((e.offsetTop < this.node.offsetTop &&  e.offsetTop + e.offsetHeight > this.node.offsetTop) || (e.offsetTop < this.node.offsetTop + this.node.offsetHeight  &&  e.offsetTop + e.offsetHeight > this.node.offsetTop + this.node.offsetHeight)){
                                    overlap = true;
                                }
                            }

                        }
                    })

                    if(this.node.offsetLeft <0 || this.node.offsetTop <0 || this.node.offsetLeft+this.node.offsetWidth > document.body.clientWidth || this.node.offsetTop+this.node.offsetHeight > document.body.clientHeight -40 ){
                        overlap = true;
                    }


                    if(overlap){
                        this.node.style.left = this.nodeStartPosition.x + 'px';
                        this.node.style.top = this.nodeStartPosition.y  + 'px';
                    }

                    overlap = false;
                    this.mousedown = false;
                    this.node = null;
                }
        }
    },
    components:{
        Window,
    }

})
</script>

<style scoped>
    #main{
        height:100% !important;
    }
    .programBox{
        width:100px;
        position: fixed;
        /* display: flex; */
        /* flex-wrap: wrap; */
        border: 1px solid transparent;
    }
    .programBox:hover{
        border: 1px solid rgb(52, 231, 207);
        background-color: rgba(216, 223, 230,0.6);
    }
    .programBox i{
        margin-top: 10px;
        display: block;
        width:100%;
        text-align: center;
        font-size: 30px;
    }
    .programBox p{
        width: 100%;
        text-align: center;
        cursor: default;
        -webkit-user-select:none;
        -moz-user-select:none;
        -o-user-select:none;
        user-select:none;
    }
    .fixed{
        position: fixed;
    }
</style>