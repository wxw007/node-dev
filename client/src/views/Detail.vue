<template>
    <div>
        <div v-if="hasData">
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
                        <div class="main-reply" @click="reply(item, true)">
                            <span class="reply-name">{{item.nick_name}}</span> :
                            <span class="reply-content">{{item.content}}</span>
                        </div>
                        <div
                            class="children-reply"
                            v-if="item.children && item.children.length > 0"
                        >
                            <div
                                class="children-reply-item"
                                v-for="(replyChild, replyIndex) in item.children"
                                :key="replyIndex"
                                @click="reply(replyChild, true)"
                            >
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
                        ref="replyBox"
                        type="textarea"
                        v-model="replyContent"
                        autosize
                        :placeholder="placeholder"
                        @focus="focusHandle"
                        @blur="blurHandle"
                    ></el-input>
                    <div class="reply-btn" v-if="!!replyContent">
                        <el-button size="mini" type="primary" @click="submitReply()">提交回复</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="no-data">暂无相关文章 嘻嘻！</div>
    </div>
</template>
<script>
import { getArtical, getReply, submitReply } from "api/index";
import formater from "util/format.js";
import { setTimeout } from "timers";
export default {
    data() {
        return {
            id: null,
            artical: {},
            replyContent: "",
            replyList: [],
            replyArticalActive: false,
            parent_id: null,
            placeholder: "说点什么吧...",
            parentReply: {},
            hasData: true
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
                    if (!data.content || data.content.length === 0) {
                        this.hasData = false;
                        return;
                    }
                    this.artical = data.content[0];
                } else {
                    this.hasData = false;
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

        // 开始回复
        reply(item, isChild) {
            if (isChild) {
                this.placeholder = "回复 " + item.nick_name + " :";
            }
            this.parentReply = item;
            this.$refs.replyBox.focus();
            this.replyArticalActive = true;
        },

        // 发布评论
        submitReply() {
            let item = this.parentReply;
            if (!this.replyContent) {
                this.$message({
                    type: "warning",
                    message: "回复内容不能为空"
                });
                return;
            }
            let params = {};
            params.artical_id = this.id;
            params.belong_to_id = item.belong_to_id || item.id || null;
            params.parent_id = item.id || null;
            params.parent_user_id = item.user_id || null;
            params.content = this.replyContent;
            submitReply(params).then(res => {
                if (res.data.code === 0) {
                    this.$message({
                        type: "success",
                        message: "评论成功"
                    });
                    this.getReply();
                    this.parentReply = {};
                    this.replyContent = "";
                    this.placeholder = "说点什么吧...";
                }
            });
        },
        //
        focusHandle(item) {
            this.replyArticalActive = true;
        },
        //
        blurHandle(item) {
            const _this = this;
            setTimeout(() => {
                _this.replyArticalActive = false;
            }, 200);
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
            .main-reply {
                cursor: pointer;
                transition: 0.2s;
                &:hover {
                    color: #333;
                    background: #f7f7f7;
                }
            }
            .children-reply {
                background: #f7f7f7;
                box-sizing: border-box;
                padding: 5px 10px;
                margin: 5px 0;
                .children-reply-item {
                    cursor: pointer;
                    transition: 0.2s;
                    &:hover {
                        color: #333;
                        background: #f8f8f8;
                    }
                }
            }
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
.no-data {
    text-align: center;
    color: #aaa;
    padding-top: 50px;
}
</style>
