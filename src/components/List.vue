<template>
    <div>
        <ul>
            <li @click="openProgram({key:'myComputer',icon:'fas fa-laptop-code',name:'我的電腦'})">
                <i class="fas fa-laptop-code"></i> 我的電腦
            </li>
            <li @click="openProgram({key:'IE',icon:'fab fa-internet-explorer',name:'網頁瀏覽器'})">
                <i class="fab fa-internet-explorer"></i> 網頁瀏覽器
            </li>
            <li @click="openProgram({key:'word',icon:'fas fa-file-word',name:'文字編輯器'})">
                <i class="fas fa-file-word"></i> 文字編輯器
            </li>
            <li @click="openProgram({key:'setDesktop',icon:'fas fa-cog',name:'桌面設定'})">
                <i class="fas fa-cog"></i> 桌面設定
            </li>
            <li @click="openProgram({key:'Music',icon:'fas fa-play-circle',name:'音樂撥放器'})">
                <i class="fas fa-play-circle"></i> 音樂撥放器
            </li>

        </ul>
    </div>
</template>

<script>

export default ({
    methods:{
        openProgram(data){
            this.$emit('openProgram', data);
        }
    }
})
</script>


<style scoped>
    ul{
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
    ul li i{
        color: deepskyblue;
        width:25px;
    }
    ul li:nth-child(3) i{
        margin-left: 3px;
        margin-right: -3px;
    }
    li{
        margin-left: 5px;
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        margin-right: 5px;
        box-sizing: border-box;

    }
    li:hover{
        background: rgb(202, 202, 202);
        cursor: default;
        /* border: 1px solid rgb(154, 202, 204); */
    }
</style>