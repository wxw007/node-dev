<template>
    <div class="nav">
        <div class="nav-item write" style="margin-bottom: 20px" @click="goto('/articaledit/new')">
            <i class="el-icon-edit-outline"></i> 写文章
        </div>
        <div class="nav-item" :class="{active: activeRoute === '/home'}" @click="goto('/')">
            <i class="el-icon-house"></i> 首页
        </div>
        <div class="nav-item" :class="{active: activeRoute === '/work-diary'}" @click="goto('/work-diary')">
            <i class="el-icon-edit-outline"></i> 工作日志
        </div>
        <div class="nav-item" :class="{active: activeRoute === '/my-artical'}" @click="goto('/my-artical')">
            <i class="el-icon-edit"></i> 我的文章
        </div>
        <div class="nav-item" :class="{active: activeRoute === '/my-collection'}" @click="goto('/my-collection')">
            <i class="el-icon-star-off"></i> 我的收藏
        </div>
        <!-- <div class="nav-item disabled">
            <i class="el-icon-chat-dot-round"></i> 我的提问
        </div>
        <div class="nav-item disabled">待定模块</div> -->
    </div>

    
</template>
<script>
export default {
  data(){
    return {
      activeRoute: ""
    }
  },
  
  mounted(){
    this.activeRoute = this.$route.path;
  },
  watch:{
    "$route"(newVal, oldVal){
      if(newVal.name === "Detail"){
        this.activeRoute = oldVal.path;
        return
      }
      this.activeRoute = newVal.path;
    }
  },
    methods: {
        goto(url) {
            this.$router.push(url);
        }
    }
};
</script>
<style lang="less" scoped>
.nav {
    width: 120px;
    position: fixed;
    left: calc((100vw - 900px) / 4 - 50px);
    top: 100px;

    .nav-item {
        position: relative;
        left: 0;
        height: 50px;
        line-height: 50px;
        box-shadow: 0 0 5px #bbb;
        margin-top: 5px;
        transition: all 0.2s;
        background: #fff;
        cursor: pointer;
        color: #666;
        padding-left: 15px;
        &:hover {
            left: 10px;
        }
        i {
            opacity: 0.5;
        }
        &.disabled {
            cursor: not-allowed;
            color: #aaa;
            &:hover {
                left: 0;
            }
        }
    }
    .nav-item.write {
        background: rgb(78, 154, 255);
        color: #fff;
        box-shadow: 0 0 8px rgb(127, 184, 248);
        i {
            color: #fff;
            opacity: 1;
        }
    }
    .nav-item.active{
      color: rgb(84, 156, 250);
      /deep/ .el-icon-house{
        color: rgb(84, 156, 250);
      }
    }
}
</style>