<template>
    <div>
        <select name="selectBGM" id="selectBGM" v-model='select'>
            <option  v-for='item of musics' :value="item.key" >曲名：{{item.name}}</option>
        </select>
        <div class='progressBar' id='progressBar' @click="changeCurrentTimeHandler($event)">
            <div class='bar' :style="{width:barWidth}"></div>
            <div class='scroll' :style="{left:barWidth}" @mousedown.self='downHandler($event)'></div>
        </div>
        <div clsss='controlArea' id='buttonGroup'>
            <button class='start' title='開始播放' @click='startMusic' :class='{state:buttonState.play}'><i class="fas fa-play"></i></button>
            <button class='stop' title='暫停撥放' @click='stopMusic' :class='{state:buttonState.stop}'><i class="fas fa-stop-circle"></i></button>
            <button class='suspend' title='中止撥放' @click='discontinueMusic' :class='{state:buttonState.suspend}'><i class="fas fa-stop"></i></button>
            <button class='previous' title='上一首' @click='previousMusic'><i class="fas fa-step-backward"></i></button>
            <button class='next' title='下一首' @click='nextBGM'><i class="fas fa-step-forward"></i></button>
            <span class='musicTime'>{{currentTime}} / {{duration}}</span>
            <button @click='volumeToggle'><i class="fas fa-volume-up" v-show='volume'></i><i class="fas fa-volume-off" v-show='!volume'></i></button>
        </div>
        <div v-show='false'>  {{windowPosition.zindex}}</div>
    </div>
</template>

<script>

export default ({
    data(){
        return {
            audio:null,
            BGMduration:null,
            select:null,
            timeChange:null,
            barWidth:'0%',
            BGMcurrentTime:null,
            bar:null,
            buttonState:{
                play:false,
                stop:false,
                suspend:false
            },
            volume:true,
            barPosition:{},
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
        this.select = 0;
        this.bar = document.getElementById('progressBar').getBoundingClientRect();
        this.$set(this.barPosition, 'left', this.bar.left);
        this.$set(this.barPosition, 'top', this.bar.top);
        this.$set(this.barPosition, 'right', this.bar.right);
        this.$set(this.barPosition, 'bottom', this.bar.bottom);
        this.$set(this.barPosition, 'width', this.bar.width);
        this.buttonState.play= true;
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
            set:{
                this.$nextTick(function(){
                    this.bar = document.getElementById('progressBar').getBoundingClientRect();
                    this.$set(this.barPosition, 'left', this.bar.left);
                    this.$set(this.barPosition, 'top', this.bar.top);
                    this.$set(this.barPosition, 'right', this.bar.right);
                    this.$set(this.barPosition, 'bottom', this.bar.bottom);
                    this.$set(this.barPosition, 'width', this.bar.width);
                })
            }
            get:{
                return {
                    windowLeft : this.windowData.zindex,
                }
            }
            
        },  
        currentTime(){
            if(this.BGMcurrentTime){
                return Math.floor(this.BGMcurrentTime / 60) >=10? Math.floor(this.BGMcurrentTime / 60) : '0' + Math.floor(this.BGMcurrentTime / 60) + ':' 
                + ((this.BGMcurrentTime - (60 * Math.floor(this.BGMcurrentTime / 60)))  >= 10 ?  (this.BGMcurrentTime - (60 * Math.floor(this.BGMcurrentTime / 60)))  : '0' + (this.BGMcurrentTime - (60 * Math.floor(this.BGMcurrentTime / 60)))); 
            }
            else{
                return '00:00';
            }
        },
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
            window.addEventListener('mousemove', this.dragScroll);
            window.addEventListener('mouseup',this.stopDrag);
        },
        dragScroll(e){
            if(e.pageX>= this.barPosition.left && e.pageX <= this.barPosition.right && e.pageY>= this.barPosition.top && e.pageY <= this.barPosition.bottom) {
                this.buttonState.play= false;
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
                        if(this.select < this.musics.length-1){
                            this.select++;
                        }
                        else{
                            this.select = 0;
                        }
                        this.BGMcurrentTime = null;
                        clearInterval(this.timeChange);
                    }  

                } , 1000);

            }
            else{
                this.buttonState.play= true;
                this.buttonState.stop= false;
                this.buttonState.suspend= false;
                this.audio.play();
                this.stopDrag();
            }
        },
        stopDrag(){
            this.mouseDown = false;
            window.removeEventListener('mousemove',this.dragScroll);
            window.removeEventListener('mouseup',this.stopDrag);
            this.buttonState.play= true;
            this.buttonState.stop= false;
            this.buttonState.suspend= false;
        },
        changeCurrentTimeHandler(e){
           this.dragScroll(e);
           this.audio.play();
           this.buttonState.play= true;
           this.buttonState.stop= false;
           this.buttonState.suspend= false;
        },
        startMusic(){
            this.audio.play();
            this.buttonState.play= true;
            this.buttonState.stop= false;
            this.buttonState.suspend= false;
        },
        stopMusic(){
            this.audio.pause();
            this.buttonState.play= false;
            this.buttonState.stop= true;
            this.buttonState.suspend= false;
        },
        discontinueMusic(){
            this.audio.pause();
            this.barWidth = '0%';
            this.audio.currentTime = 0;
            this.buttonState.play= false;
            this.buttonState.stop= false;
            this.buttonState.suspend= true;
        },
        previousMusic(){
            this.select !== 0 ? this.select = 0 : this.select = this.musics.length-1;
            this.buttonState.play= true;
            this.buttonState.stop= false;
            this.buttonState.suspend= false;
        },
        nextBGM(){
            (this.select >= this.musics.length-1) ? this.select = 0 : this.select++;
            this.buttonState.play= true;
            this.buttonState.stop= false;
            this.buttonState.suspend= false;
        },
        volumeToggle(){
            this.volume = !this.volume;
            this.audio.volume = this.volume ? 1:0;
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
                    if(this.select < this.musics.length-1){
                        this.select++;
                    }
                    else{
                        this.select = 0;
                    }
                    this.BGMcurrentTime = null;
                    clearInterval(this.timeChange);
                }  
            } , 1000);
        },
    }
})
</script>

<style scoped>
    #buttonGroup{
        margin-left:25px !important;
        margin-right:25px !important;
    }
    #buttonGroup button+button{
        /* margin-left: 10px; */
    }
    select{
        width:calc(100%  - 50px);
        margin-left: 25px;
        margin-right: 25px;
        margin-top: 10px;
    }
    select:focus{
        box-shadow: 0 0 5px 2px #467BF4;    
    }
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
    .state{
        box-shadow: inset 2px 2px 5px #000;
    }
    .musicTime{
        display: inline-block;
        /* padding-top: 15px; */
        margin-left: 13px;
        margin-right:10px ;
        border: 1px solid black ;
        padding: 0px 10px 0px 10px;
    }

</style>