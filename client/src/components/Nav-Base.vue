<template>
  <div class="nav">
    <div class="nav-item" @click="goto('/')">
      <i class="el-icon-house" ></i> 首页
    </div>
    <div class="nav-item" @click="goto('/work-diary')">
      <i class="el-icon-edit-outline"></i> 工作日志
    </div>
    <div class="nav-item disabled">
      <i class="el-icon-reading"></i> 实用好文
    </div>
    <div class="nav-item disabled">
      <i class="el-icon-edit"></i> 我的笔记
    </div>
    <div class="nav-item disabled">
      <i class="el-icon-star-off"></i> 我的收藏
    </div>
    <div class="nav-item disabled">
      <i class="el-icon-chat-dot-round"></i> 我的提问
    </div>
    <div class="nav-item disabled">待定模块</div>
  </div>
</template>
<script>
export default {
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
    &.disabled{
    cursor: not-allowed;
    color: #aaa;
    &:hover {
      left: 0;
    }
    
  }
  }
  
}
</style>