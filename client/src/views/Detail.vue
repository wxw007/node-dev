<template>
    <div>
        <div class="top-info">
            <h2 class="title">{{artical.title}}</h2>
            <div class="author">
                <span style="margin-right: 20px">作者: {{artical.nick_name}}</span>
                <span>发布于：{{artical.create_time | formatDate}}</span>
            </div>
        </div>
        <div class="content" v-html="artical.content"></div>
        <div class="reply-box">
            <div class="reply-title">评论区</div>
            <div class="reply-list">
                <div class="reply-item">
                    <span class="reply-name">小不点</span> :
                    <span class="reply-content">这是回复内容内容这是回复内容内容</span>
                </div>
                <div class="reply-item">
                    <span class="reply-name">小不点</span> :
                    <span
                        class="reply-content"
                    >这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容这是回复内容内容</span>
                </div>

                <div class="reply-item">
                    <span class="reply-name">大地瓜</span>
                    <span style="margin: 0 5px; color: #333">回复</span>
                    <span class="reply-name">小不点</span>
                    :
                    <span class="reply-content">这是回复内容内容这是回复内容内容</span>
                </div>
            </div>
            <div class="reply-input">
                <el-input
                    type="textarea"
                    autosize
                    placeholder="说点什么吧..."
                    @focus="focusHandle(item)"
                    @blur="blurHandle(item)"
                ></el-input>
            </div>
            <!-- <div class="reply-btn" v-if="item.replyArticalActive">
                <el-button size="mini" type="primary" @click="submitReplyArtical">提交回复</el-button>
            </div> -->
        </div>
    </div>
</template>
<script>
import { getArtical } from "api/index";
import formater from "util/format.js";
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
    filters: {
        formatDate(val) {
            return formater.formatDate(val);
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
        },
          //
        focusHandle(item) {
            this.$set(item, "replyArticalActive", true);
        },
        //
        blurHandle(item) {
            const _this = this;
            setTimeout(() => {
                _this.$set(item, "replyArticalActive", false);
            }, 100);
        },
        submitReplyArtical() {}
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
        font-size: 14px;
    }
    .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
    }
}

/deep/.content {
    color: #666;
    p {
        // margin:15px 0 ;
    }
    img {
        max-width: 100%;
        // margin: 5px 0;
    }
}
.reply-box {
    font-size: 14px;
    cursor: default;
    margin-top: 10px;
    background: #fff;
    padding:10px 0 50px 0;

    .reply-title{
        border-bottom: 1px solid #ddd;
        margin-bottom: 5px;
        padding: 5px 0;
        font-weight: bold;
        font-size: 18px;
    }
    .reply-list {
        box-sizing: border-box;
        // background: rgb(247, 246, 246);
        color: #999;
        padding: 5px;
        .reply-item {
            margin: 5px 10px;
        }
    }
    .reply-name {
        color: rgb(38, 62, 116);
    }
    .reply-input {
        box-sizing: border-box;
        padding: 10px;
        background: #f8f8f8;
    }
    .reply-btn {
        overflow: hidden;
        padding-top: 8px;
        .el-button {
            float: right;
        }
    }
}
</style>
