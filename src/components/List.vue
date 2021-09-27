<template>
    <div>
        <ul>
            <li @click="openProgram({key:'IE',icon:'fab fa-internet-explorer'})">
                <i class="fab fa-internet-explorer"></i> internet-explorer 
            </li>
            <li @click="openProgram({key:'word',icon:'fas fa-file-word'})">
                <i class="fas fa-file-word"></i> 文字編輯器
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
    ul li:nth-child(2) i{
        margin-left: 3px;
        margin-right: -3p[];
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