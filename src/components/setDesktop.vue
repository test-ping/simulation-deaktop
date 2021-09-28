<template>
    <div class='container' :style='{height:windowSet.height}'>
        <p>目前使用中的桌布</p>
        <div class='mainImageBox' :style="{background:background ,width:mainImageBoxSet.width,height:mainImageBoxSet.height}" ></div>
        <p>請選擇要更換的桌布：</p>
        <div class='bgList'>
            <div class='image' v-for='item of images' :style="{background:item.url,width:bgListSet.width,height:bgListSet.height}" @click='selectHandler(item.key)' :class="{select:item.select}"></div>
        </div>
        <div class='buttonGroud'>
            <button @click='buttonHandler'>確認更換</button>
        </div>
    </div>
</template>

<script>

export default ({
    data(){
        return {
            images:[
                {url:'url(' + require('@/assets/background.jpg') + ')',key:1,select:false},
                {url:'url(' + require('@/assets/background2.jpg') + ')',key:2,select:false},
                {url:'url(' + require('@/assets/background3.jpg') + ')',key:3,select:false}
            ],
        }
    },
    methods:{
        selectHandler(key){
            let index = this.images.map(e=>e.select).indexOf(true);
            if(index !== -1){
                this.images[index].select = false;
            }
            this.images[key-1].select = true;

        },
        buttonHandler(){
            let index = this.images.map(e=>e.select).indexOf(true);
            if(index !== -1){
                this.$store.commit('CHANGE_BACKGROUND',this.images[index].url);
            }
            else{
                alert('您未選擇要更換的桌布');
                return;
            }
            this.$store.commit('CLOSE_PROGRAM',this.windowData.key);       
        }
    },
    computed:{
        background(){
            return this.$store.state.background; 
        },
        windowSet(){
            return {
                height: parseInt(this.windowData.height.slice(0,this.windowData.height.indexOf('px'))) - 40  + 'px'
            }
        },
        mainImageBoxSet(){
            return {
                width: parseInt(this.windowData.width.slice(0,this.windowData.width.indexOf('px'))) /2 +'px',
                height: parseInt(this.windowData.height.slice(0,this.windowData.height.indexOf('px'))) /2 +50 + 'px'
            }
        },
        bgListSet(){
            return {
                width: parseInt(this.mainImageBoxSet.width.slice(0,this.mainImageBoxSet.width.indexOf('px'))) /2 + 30  +'px',
                height: parseInt(this.mainImageBoxSet.height.slice(0,this.mainImageBoxSet.height.indexOf('px'))) - 50  + 'px'
            }
        }
    },
    props:{
        'windowData':{
            type:Object,
        }
    },
})
</script>

<style scoped>

    .container{
        overflow:auto;
        /* height: 360px; */
        overflow-x:hidden ;
    }
    p{
        margin-left: 15px;
        font-weight: bold;

    }
    p:nth-child(3){
        margin-top: 25px;
    }
    .mainImageBox{
        border:5px solid rgb(212, 212, 212);
        border-radius: 15px;
        margin: 0px auto;
        /* width:400px; */
        /* height:250px; */
        background-position-y: bottom !important;
        background-size: cover !important;
    }
    .bgList{
        display: flex;
        flex-wrap: nowrap;
        justify-content:space-around;

    }
    .bgList .image{
        /* width:230px;
        height:150px; */
        background-size: cover !important;
        border:5px solid rgb(212, 212, 212);
        border-radius: 10px;
        background-position-y: bottom !important;
    }
    .bgList .image.select{
        border:5px solid rgb(226, 236, 80);
    }
    .buttonGroud{
        margin-top: 10px;
        margin-bottom: 15px;
        margin-right: 10px; 
        text-align: right;
    }
    button{
        padding: 5px;
        cursor: pointer;
    }

</style>