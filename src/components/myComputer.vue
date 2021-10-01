<template>
    <div class='myComputer'>
        <div class='list'>
            <ul>
                <li @click='listToggle'>
                    <i class="fas fa-caret-right" style='margin-right:-10px;' v-show='!openList'></i>
                    <i class="fas fa-caret-down" style='margin-right:-7px; margin-left:-3px' v-show='openList'></i>
                    <i class="fas fa-desktop"></i>桌面</li>
                <li v-for='item of programList' v-show='openList' style='margin-left:20px' @dblclick="openProgram({key:item.key,name:item.name,icon:item.icon})"><i :class='item.icon'></i>{{item.name}}</li>
            </ul>
        </div>
        <div class='mainArea'>
            <div class='hardDrive'>
                <p >硬碟</p>
                <div class='hdList'>
                    <div v-for='item of hardDrive' class='hd'>
                        <div class='icon'>
                            <i class="fas fa-hdd"></i>
                        </div>
                        <div class='hdData'>
                            <p>{{item.name}}</p>
                            <div class='bar'>
                                <div clsss='barWidth' :style='{width: setbarWidth(item)  ,height:"100%" }' :class='{excess:item.excess, normal:!item.excess}'></div>
                            </div>
                            <p>剩餘{{item.surplus}}GB，共{{item.capacity}}GB</p>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return{
            openList:false,
            programList:[
                {name:'我的電腦',icon:'fas fa-laptop-code',key:'myComputer'},
                {name:'音樂撥放器',icon:'fas fa-play-circle',key:'Music'},   
                {name:'桌面設定',icon:'fas fa-cog',key:'setDesktop'},                
                {name:'網頁瀏覽器',icon:'fab fa-internet-explorer',key:'IE'},
                {name:'文字編輯器',icon:'fas fa-file-word',key:'word'},
            ],
            hardDrive:[
                {name:'本機硬碟(C:)',capacity:500,surplus:25,key:0,excess:false},
                {name:'本機硬碟(D:)',capacity:250,surplus:150,key:1,excess:false},
                {name:'本機硬碟(E:)',capacity:250,surplus:100,key:2,excess:false}
            ],
            
        }
    },
    computed:{
        programmed(){
           return this.$store.state.RunningProgram; 
       },
       zindex(){
           return this.$store.state.zindex; 
       }
    },
    methods:{
        listToggle(){
            document.querySelector('#clickSE').play();
            this.openList = !this.openList;
        },
        openProgram(data){
            document.querySelector('#clickSE').play();
            let index =null;
            if(this.programmed.length!==0){
                index = this.programmed.map(e=>{return e.key}).indexOf(data.key);
            }
            if(index === -1 || index === null){
                if(data.key === 'Music'){
                    data.width = '360px';
                    data.height = '150px';
                }
                else{
                    data.width = '800px';
                    data.height = '400px';
                }
                data.left = Math.floor(Math.random() * document.body.offsetWidth)/2+'px';
                data.top = Math.floor(Math.random() * document.body.offsetHeight)/2 +'px';
                data.showWindow = true;
                data.zindex = this.zindex ;
                this.$store.commit('ADD_PROGRAM',data);
            }
            else{
                this.$store.commit('SHOW_WINDOW',index);
            }

       },
        setbarWidth(data){
            let width = 100 - ((data.surplus / data.capacity) *100);
            if(width>70){
                this.hardDrive[data.key].excess = true;
            }
            return width +'%'; 
        }
    }
})
</script>

<style scoped>
    .list{
        width:180px;
    }
    .list ul{
        list-style-type: none;
        padding: 0 0 0 10px;
        /* margin-right:5px ; */
    }
    .list ul li{
        user-select: none;
        cursor: pointer;
    }
    .list ul li i{
        width:20px;
    }
    .list ul li:hover{
        color: burlywood;
    }
    .list ul li:last-child i{
        margin-left: 2px;
        margin-right: -2px;
    }
    .list ul li:nth-child(2) i{
        margin-left: -1px;
        margin-right: 1px;
    }
    .myComputer{
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
    }
    .mainArea{
        width:100%;
        height: calc(100% - 40px);
        /* background-color: #556; */
        border-left:2px solid rgb(174, 223, 216) ;
    }
    .mainArea{
        padding-left: 10px;
        overflow: auto;
    }
    .mainArea *{
        user-select: none;
    }
    .hdList {
        display: flex;
        flex-wrap: wrap;
    }
    .hdList .hd{
        width:280px;
        display: flex;
        flex-wrap: nowrap;
        border: 1px solid transparent;
        padding-left:5px;
    }
    .hdList .hd:hover{
        border: 1px solid rgb(156, 243, 243);
    }
    .hd .icon{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 44px;
    }
    .hd .hdData{
        margin-left: 5px;
    }
    .hd .hdData .bar{
        width:100%;
        border: 1px solid black;
        height: 15px;
    }
    .hd .hdData .bar .barWidth{
        height: 100%;
    }
    .bar .excess{
        background: rgb(216, 44, 44);
    }
    .bar .normal{
        background: rgb(17, 247, 197);
    }

</style>