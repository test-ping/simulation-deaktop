<template>
    <div id='main'>
        <div v-for="item,index of program" class='programBox' :style="{top:item.initialPosition}">
            <i :class='item.icon' ></i>
            <p>{{item.name}}</p>
        </div>
    </div>
    
</template>

<script>

export default ({
    data(){
        return{
            program:[
                {name:'我的電腦',icon:'fas fa-laptop-code',key:'myComputer',initialPosition:'0px'},
                {name:'音樂撥放器',icon:'fas fa-play-circle',initialPosition:'95px'},   
                {name:'桌面設定',icon:'fas fa-cog',initialPosition:'190px'},                
                {name:'internet-explorer',icon:'fab fa-internet-explorer',initialPosition:'285px'},
                {name:'文字編輯器',icon:'fas fa-file-word',initialPosition:'380px'},
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
    mounted(){
        
        document.querySelectorAll('.programBox').forEach(e=>{
            e.addEventListener('mousedown',e=>{
                // console.log(e);
                this.mouse.x = e.screenX;
                this.mouse.y = e.screenY;
                this.mousedown = true;
                if(e.toElement.nodeName === 'P' || e.toElement.nodeName === 'I'){
                    this.node = e.toElement.parentNode;
                }
                else{
                    this.node = e.toElement;
                }
                console.log(this.node.offsetTop)
                this.nodeStartPosition.x = this.node.offsetLeft;
                this.nodeStartPosition.y = this.node.offsetTop;
                // console.log(node.offsetTop, node.offsetLeft,node.offsetHeight );
            })
            e.addEventListener('mouseleave',e=>{
                if(this.mousedown && this.node){
                    window.addEventListener('mousemove',e=>{
                        if(this.mousedown && this.node){
                            this.windowListener = true;
                            // console.log(e.screenX)
                            this.node.classList.add('fixed');
                            this.nodePosition.x = e.screenX - 50;
                            this.nodePosition.y = e.screenY - 145;
                            this.node.style.left = this.nodePosition.x + 'px';
                            this.node.style.top = this.nodePosition.y  + 'px';
                            console.log('ss');
                        }
                    }); 
                }
            })
            e.addEventListener('mouseup',e=>{
                if(this.mousedown && this.node){
                    if(this.windowListener){
                        // window.removeEventListener('mousemove');
                        this.windowListener = null;
                    }
                    this.mousedown = false;
                    this.node = null;
                }
            })
        })
    },
    methods:{
        aa(){
            console.log('ss');
        }
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
    }
    .fixed{
        position: fixed;
    }
</style>