<template>
    <div @mousedown.self='mouseDownHandler($event)' @mouseleave.self="startDragHandler($event)">
        <p>{{windowData.name}}</p>
        <button @click='narrowWindow(windowData.key)'>－</button>
        <button @click='enlarge(windowData.key)'><i class="far fa-square"></i></button>
        <button @click='closeWindow(windowData.key)'><i class="far fa-window-close"></i></button>
    </div>
</template>

<script>



export default ({
    data(){
        return{
            mouseDown:false,
            startDrag:false,
            startWindowPosition:{
                left:0,
                top:0
            },
            startLeave:false,
        }
    },
    props:['windowData'],
    methods:{
        closeWindow(val){
            this.$store.commit('CLOSE_PROGRAM',val);
        },
        narrowWindow(val){
            this.$store.commit('NARROW_WINDOW',val);
        },
        enlarge(val){
            this.$store.commit('ENLARGE',val);
        },
        mouseDownHandler(e){
            this.mouseDown = true;
            window.addEventListener('mousemove', this.dragHandler);
            window.addEventListener('mouseup', this.stopDragHandler);
            document.body.addEventListener('mouseleave', this.stopDragHandler);
        },
        startDragHandler(e){
            if(this.mouseDown){
                this.startDrag = true;
                this.startWindowPosition.left = this.windowData.left;
                this.startWindowPosition.top = this.windowData.top;
            }
        },
        dragHandler(e){
            if(this.mouseDown && this.startDrag){
                if(this.startLeave){
                    this.$store.commit('WINDOW_MOVE',{key:this.windowData.key,left:e.pageX -this.startLeave ,top:e.pageY});
                }
                else{
                    this.$store.commit('WINDOW_MOVE',{key:this.windowData.key,left:e.pageX-e.offsetX ,top:e.pageY});
                    this.startLeave = e.offsetX;
                }

            }
        },
        stopDragHandler(e){
            this.mouseDown = false;
            this.startDrag = false;
            this.startLeave  = null;
            window.removeEventListener('mousemove', this.dragHandler);
            window.removeEventListener('mouseup', this.stopDragHandler);
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