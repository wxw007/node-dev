<template>
    <div class="home">
        <div class="recommend">
            <div class="title">最新动态</div>
            <div class="recommend-content">
                <el-timeline
                    v-infinite-scroll="load"
                    infinite-scroll-delay="300"
                    infinite-scroll-distance="100"
                    infinite-scroll-immediate="1"
                >
                    <el-timeline-item
                        v-for="(item, index) in pageList"
                        timestamp="2018/4/3"
                        placement="top"
                        :key="index"
                        color="rgb(81, 174, 250)"
                    >
                        <el-card class="recommend-content-item">
                            <div class="content" @click="gotoDetail(item.id)">
                                <h3>{{item.title}}</h3>
                                <p
                                    class="author"
                                >{{item.nick_name}} 提交于 {{item.create_time | formatDate}}</p>
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
                            <div class="reply-box">
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
                                        <span class="reply-name">小不点</span> :
                                        <span class="reply-content">这是回复内容内容这是回复内容内容</span>
                                    </div>
                                </div>
                                <div class="reply-input">
                                    <el-input
                                        type="textarea"
                                        autosize
                                        placeholder="请输入回复内容..."
                                        v-model="item.replyContent"
                                    ></el-input>
                                </div>
                                <div class="reply-btn">
                                  <el-button size="mini" type="primary">回复</el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </div>
</template>

<script>
Number.prototype.formatDate = function() {
    var t, y, m, d, h, i, s;
    t = new Date(parseInt(this));
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    var ft = "y-m-d h:i:s";
    var fa = ft.split(" ");
    var aa = fa[0] ? fa[0].split("-") : [];
    var bb = fa[1] ? fa[1].split(":") : [];
    var cc = aa.concat(bb);
    var ds = "";
    for (var e = 0; e < cc.length; e++) {
        switch (cc[e]) {
            case "y":
                ds += y;
                break;
            case "m":
                ds += "-" + (m < 10 ? "0" + m : m);
                break;
            case "d":
                ds += "-" + (d < 10 ? "0" + d : d);
                break;
            case "h":
                ds += " " + (h < 10 ? "0" + h : h);
                break;
            case "i":
                ds += ":" + (i < 10 ? "0" + i : i);
                break;
            case "s":
                ds += ":" + (s < 10 ? "0" + s : s);
                break;
            default:
                break;
        }
    }
    return ds;
};
import { getArtical } from "api/index";
export default {
    name: "home",
    data() {
        return {
            pageList: [],
            params: {
                rows: 20,
                page: 1
            },
            imgUrl:
                "https://hupimao008.oss-cn-shanghai.aliyuncs.com/7f106aa0-bab5-11e9-a2da-75d4286e52be.jpeg"
        };
    },
    created() {
        this.getArticalData();
    },
    filters: {
        formatDate(val) {
            return val.formatDate();
        }
    },
    methods: {
        // 获取文章数据
        getArticalData() {
            let params = this.params;
            getArtical(params).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    this.pageList = this.pageList.concat(data.content);
                }
            });
        },
        // 滚动触底 加载更多
        load() {
            this.params.page += 1;
            this.getArticalData();
        },

        gotoDetail(id) {
            this.$router.push("/layout/detail/" + id);
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
        padding-right: 20px;
        padding-left: 5px;
        .recommend-content-item {
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
        .reply-box {
            cursor: default;
            margin-top: 10px;

            .reply-list {
                box-sizing: border-box;
                background: rgb(247, 246, 246);
                color: #999;
                padding: 5px;
                .reply-item {
                    margin: 5px 10px;
                }
            }
            .reply-name {
                color: #333;
            }
            .reply-input {
                margin-top: 15px;
            }
            .reply-btn{
              overflow: hidden;
              padding-top: 8px;
              .el-button{
                float: right;
              }
            }
        }
    }
}
.author {
    color: #aaa;
}
</style>
