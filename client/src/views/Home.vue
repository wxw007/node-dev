<template>
  <div class="home">
    <header-base></header-base>
    <div class="main">
      <!-- <img src="../../public/images/indexBg.jpg" alt=""> -->
    </div>
  </div>
</template>

<script>
import HeaderBase from '@/components/Header-Base.vue'

export default {
  name: 'home',
  components: {
    HeaderBase
  },
  mounted(){
    // this.HTTPusers()
  },
  methods:{
   
  }
}
</script>
<style lang="less">
  .main{
    height: calc(100vh - 62px);
    background: url("../../public/images/indexBg.jpg") no-repeat;
    background-size: cover;

  }
</style>
