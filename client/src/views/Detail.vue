<template>
    <div>
        <div class="top-info">
            <h2 class="title">{{artical.title}}</h2>
            <div class="author"> <span style="margin-right: 20px">作者: {{artical.nick_name}}</span> <span>发布于：{{artical.create_time | formatDate}}</span></div>
        </div>
        <div class="content" v-html="artical.content"></div>
    </div>
</template>
<script>

import { getArtical } from "api/index";
import formater from "util/format.js"
export default {
    data() {
        return {
            id: null,
            artical: {}
        };
    },
    created() {
        this.initData();
    },
    filters:{
        formatDate(val){
            return formater.formatDate(val)
        }
    },
    methods: {
        // 初始化回填数据
        initData() {
            this.id = this.$route.params.id - 0;
            this.getArticalData();
        },
        // 获取文章数据
        getArticalData() {
            getArtical({ id: this.id }).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    this.artical = data.content[0];
                }
            });
        }
    }
};
</script>
<style lang="less" scoped>
.top-info {
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    .title {
    }
    .author {
        margin-top: 5px;
        color: #aaa;
        font-size: 12px;
    }
    .avatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
    }
}

/deep/.content {
    img {
        max-width: 100%;
    }
}
</style>
