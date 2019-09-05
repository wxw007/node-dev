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
                <div class="reply-item" v-for="(item, index) in replyList" :key="index">
                    <span class="reply-name">{{item.nick_name}}</span> :
                    <span class="reply-content">{{item.content}}</span>
                    <div class="children-reply">
                        <div class="children-reply-item" v-for="(replyChild, replyIndex) in item.children" :key="replyIndex">
                            <span class="reply-name">{{replyChild.nick_name}}</span>
                            <span style="margin: 0 5px; color: #333">回复</span>
                            <span class="reply-name">{{replyChild.parentName}}</span>
                            :
                            <span
                                class="reply-content"
                            >{{replyChild.content}}</span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="reply-input">
                <el-input
                    type="textarea"
                    v-model="replyContent"
                    autosize
                    placeholder="说点什么吧..."
                    @focus="focusHandle"
                    @blur="blurHandle"
                ></el-input>
            </div>
            <!-- <div class="reply-btn" v-if="item.replyArticalActive">
                <el-button size="mini" type="primary" @click="submitReplyArtical">提交回复</el-button>
            </div>-->
        </div>
    </div>
</template>
<script>
import { getArtical, getReply } from "api/index";
import formater from "util/format.js";
export default {
    data() {
        return {
            id: null,
            artical: {},
            replyContent: "",
            replyList: [],
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
            this.getReply();
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
        // 获取文章评论
        getReply() {
             getReply({ id: this.id }).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    this.replyList = data.content;
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
    font-size: 14px;
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
    padding: 10px 0 50px 0;

    .reply-title {
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
            margin: 5px 10px 15px 10px;
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
    .children-reply {
        background: #f2f2f2;
        box-sizing: border-box;
        padding: 5px 10px;
        margin:5px 0;
    }
}
</style>
