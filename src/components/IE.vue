<template>
    <div class='browser'>
        <div class='addressBar'>
            <input type="text" id='url' v-model="url" >
        </div>
        <div id='webContent' :style="{background:setBackground}">

        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return{
            url:'https://www.google.com.tw/'
        }
    },
    computed:{
        setBackground(){
            let index = this.windowData.width.indexOf('px');
            let number = this.windowData.width.slice(0,index) * 1;
            if(number>800){
                return "url(" + require('@/assets/google.jpg')+")";
            }
            else{
                return "url(" + require('@/assets/google_small.jpg')+")";
            }
        }
    },
    props:['windowData'],
})
</script>

<style scoped>
.browser{
    height: 100%;
    overflow: auto;
}
.addressBar{
    width:100% ;
}
.addressBar #url{
    width:100%;
    box-sizing:border-box;
}
#url:focus{
    outline: none;
}
#webContent{
    width:100%;
    height: calc(100% - 100px) ;
    background-size: cover !important;
}
</style>