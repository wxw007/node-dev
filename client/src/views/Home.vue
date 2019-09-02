<template>
  <div class="home">
      <div class="recommend">
        <div class="title">最新动态</div>
        <div class="recommend-content">
          <!-- <el-timeline v-infinite-scroll="load" infinite-scroll-delay="300" infinite-scroll-distance="100" infinite-scroll-immediate="1"> -->
          <el-timeline style="padding-right: 30px">
            <el-timeline-item  v-for="(item, index) in arr" timestamp="2018/4/3" placement="top" :key="index">
              <el-card class="recommend-content-item">
                <div class="content" @click="gotoDetail(index)">
                  <h4>关于 Vue 动态设置对象属性视图不更新问题</h4>
                  <p class="author">虎皮猫 提交于 2018/4/3 20:46</p>
                  <!-- <div
                    class="content-detail"
                  >123456</div> -->
                </div>
                <div class="operator">
                  <span>
                    收藏
                    <i class="el-icon-star-off"></i>
                  </span>
                  <!-- <span>收藏 <i class="el-icon-star-on"></i></span> -->
                  <span>
                    点赞
                    <i class="el-icon-goblet"></i>
                  </span>
                  <img :src="imgUrl" alt />
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "home",
  data() {
    return {
      arr: [1,1,1,1,1,1,1,1,1,1,1],
      imgUrl:
        "https://hupimao008.oss-cn-shanghai.aliyuncs.com/7f106aa0-bab5-11e9-a2da-75d4286e52be.jpeg"
    };
  },
  mounted() {
    // this.HTTPusers()
  },
  methods: {
    load(){
      this.arr = this.arr.concat([1,1,1])
    },
    gotoDetail(id){
      this.$router.push("/layout/detail/" + id)
    }
  }
};
</script>

<style lang="less" scoped>


.recommend {
  .title {
    position: absolute;
    padding-bottom: 10px;
    left: 0;
    right: 0;
    top: 20px;
    font-size: 20px;
    color: #333;
    border-bottom: 1px solid #ddd;
  }
  .recommend-content {
    margin-top: 40px;
    .recommend-content-item{
       position: relative;
      top: 0;
      transition: all 0.3s;
      &:hover {
        top: -3px;
      }
    }
    .content {
     
      cursor: pointer;
      .content-detail {
        color: #777;
        margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;

      }
    }
    .operator {
      margin-top: 15px;
      color: #aaa;
      > span {
        margin-right: 10px;
        cursor: pointer;
      }
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
}
.author {
  color: #aaa;
}
</style>
