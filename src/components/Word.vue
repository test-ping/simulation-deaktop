<template>
    <div>
        <textarea name="input" id="input" v-model.trim='inputData' :style="{width:textareaWH.width,height:textareaWH.height}"></textarea>
    </div>
</template>

<script>

export default ({
    data(){
        return{
            inputData:'',
        }
    },
    created(){
        this.inputData = this.original;
    },
    computed:{
        textareaWH(){
            return {
                width: this.windowData.width.slice(0,this.windowData.width.indexOf('px')) *1 - 5 + 'px',
                height: this.windowData.height.slice(0,this.windowData.height.indexOf('px')) - 45 + 'px' 
            }
        },
        original(){
            return this.$store.state.inputWord;
        }
    },
    props:{
        windowData:{
            type:Object,
        }
    },
    beforeDestroy(){
        this.$store.commit('UPDATE_WORD',this.inputData);
    }
})
</script>

<style scoped>
    textarea{
        border: none;
        font-size: 16px;
        resize:none;
    }
    textarea:focus {
        outline: none;
    }
</style>