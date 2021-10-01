<template>
    <div>
        <select name="selectBGM" id="selectBGM" v-model='select'>
            <option  v-for='item of musics' :value="item.key" >{{item.name}}</option>
        </select>
        <div class='progressBar' id='progressBar'>
            <div class='bar' :style="{width:barWidth}"></div>
            <div class='scroll' :style="{left:barWidth}" @mousedown.self='downHandler($event)'></div>
        </div>
        <div class='duration'> {{currentTime}} / {{duration}}</div>
        <div clsss='controlArea'>
            <button class='start' title='開始播放'><i class="fas fa-play"></i></button>
            <button class='stop' title='暫停撥放'><i class="fas fa-stop-circle"></i></button>
            <button class='suspend' title='中止撥放'><i class="fas fa-stop"></i></button>
            <button class='previous' title='上一首'><i class="fas fa-step-backward"></i></button>
            <button class='next' title='下一首'><i class="fas fa-step-forward"></i></button>

        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return {
            audio:null,
            BGMduration:null,
            select:0,
            timeChange:null,
            barWidth:'0%',
            BGMcurrentTime:null,
            barPosition:{left:0,top:0,bottom:0,right:0,width:0},
            musics:[{url:require('@/assets/BGM/How it Began.mp3'),name:'How it Began',key:0},
                {url:require('@/assets/BGM/Malmo Sunrise.mp3'),name:'Malmo Sunrise',key:1},
                {url:require('@/assets/BGM/Retreat.mp3'),name:'Retreat',key:2},
                {url:require('@/assets/BGM/Sioux Falls.mp3'),name:'Sioux Falls',key:3},
                {url:require('@/assets/BGM/Heart Break.mp3'),name:'Heart Break',key:4},
            ],
            mouseDown:false,

        }
    },
    props:['windowData'],
    mounted(){
        this.getBarPosition();
    },
    computed:{
        duration(){
            if(this.BGMduration){
                return Math.floor(this.BGMduration / 60) >=10? Math.floor(this.BGMduration / 60) : '0' + Math.floor(this.BGMduration / 60) + ':' 
                + ((this.BGMduration - (60 * Math.floor(this.BGMduration / 60)))  >= 10 ?  (this.BGMduration - (60 * Math.floor(this.BGMduration / 60)))  : '0' + (this.BGMduration - (60 * Math.floor(this.BGMduration / 60)))); 
            }
            else{
                return '00:00';
            }
        },
        windowPosition(){
            this.getBarPosition();
            return {left:this.windowData.left,top:this.windowData.top};
        },  
        currentTime(){
            if(this.BGMcurrentTime){
                return Math.floor(this.BGMcurrentTime / 60) >=10? Math.floor(this.BGMcurrentTime / 60) : '0' + Math.floor(this.BGMcurrentTime / 60) + ':' 
                + ((this.BGMcurrentTime - (60 * Math.floor(this.BGMcurrentTime / 60)))  >= 10 ?  (this.BGMcurrentTime - (60 * Math.floor(this.BGMcurrentTime / 60)))  : '0' + (this.BGMcurrentTime - (60 * Math.floor(this.BGMcurrentTime / 60)))); 
            }
            else{
                return '00:00';
            }
        }
    },  
    beforeDestroy(){
        if(this.audio){
            this.audio.pause();
            this.audio.currentTime =0;
            clearInterval(this.timeChange);
        }
    },
    methods:{
        downHandler(e){
            this.mouseDown = true;
            // console.log(e);
            window.addEventListener('mousemove', this.dragScroll);
        
            window.addEventListener('mouseup',this.stopDrag);
        },
        getBarPosition(){
            this.barPosition.left =  document.getElementById('progressBar').getBoundingClientRect().left;
            this.barPosition.top =  document.getElementById('progressBar').getBoundingClientRect().top;
            this.barPosition.right =  document.getElementById('progressBar').getBoundingClientRect().right;
            this.barPosition.bottom =  document.getElementById('progressBar').getBoundingClientRect().bottom;
            this.barPosition.width =  document.getElementById('progressBar').getBoundingClientRect().width;

        },
        dragScroll(e){
            if(e.pageX>= this.barPosition.left && e.pageX <= this.barPosition.right && e.pageY>= this.barPosition.top && e.pageY <= this.barPosition.bottom) {
                let width =  Math.floor( (e.pageX - this.barPosition.left) / (this.barPosition.width ) * 100);
                this.barWidth = width + '%';
                this.audio.pause();
                this.audio.currentTime = Math.floor(this.BGMduration * width /100);
                this.BGMcurrentTime = Math.round(this.audio.currentTime);
                this.barWidth = width + '%';
                clearInterval(this.timeChange);

                this.timeChange = setInterval(()=>{
                    this.BGMcurrentTime = Math.round(this.audio.currentTime);
                    this.barWidth = (this.audio.currentTime / this.BGMduration  * 100) + '%';
                    if(this.audio.currentTime>= this.BGMduration){
                        clearInterval(this.timeChange);
                    }  

                } , 1000);




            }
            else{
                this.audio.play();
                this.stopDrag();
            }
        },
        stopDrag(){
            this.mouseDown = false;
            window.removeEventListener('mousemove',this.dragScroll);
            window.removeEventListener('mouseup',this.stopDrag);
            this.audio.play();
        }
        
    },
    watch:{
        select:function(newval , old){
            if(this.audio) {
                this.audio.pause();
                this.audio.currentTime =0;
                this.timeChange = null;
            }
            this.barWidth = '0%';
            this.audio = document.createElement("audio");
            this.audio.src = this.musics[newval].url;
            let time = null;
            let loadDuration = setInterval(()=>{
                let duration = this.audio.duration;
                if(!isNaN(duration)){
                    clearInterval(loadDuration);
                    this.BGMduration = Math.floor(this.audio.duration);
                }
            },10);
            this.audio.play();
            this.timeChange = setInterval(()=>{
                this.BGMcurrentTime = Math.round(this.audio.currentTime) ;
                this.barWidth = (this.audio.currentTime / this.BGMduration  * 100) + '%';
                if(this.audio.currentTime>= this.BGMduration){
                    clearInterval(this.timeChange);
                }  
            } , 1000);
        },
    }
})
</script>

<style scoped>
    .progressBar{
        border: 1px solid black;
        background: rgb(201, 201, 201);
        height: 15px;
        margin:10px 25px 10px 25px;
        width:calc(100% - 50px);
        position: relative;
    }
    .bar{
        height: 100%;
        background: rgb(209, 95, 95);
    }
    .scroll{
        height:25px;
        width:15px;
        border: 1px solid black;
        background: rgb(173, 173, 173);
        position: absolute;
        top:-5px;
    }
</style>