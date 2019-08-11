<template>
    <div>
        {{params}}
    </div>
</template>
<script>
export default {
    data(){
        return {
            params: ""
        }
    },
    created(){
        this.params = this.$route.params
    }
}
</script>
<style lang="less" scoped>
    
</style>