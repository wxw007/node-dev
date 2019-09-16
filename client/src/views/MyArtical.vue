<template>
    <div class="home">
        <div class="recommend" v-if="pageList.length>0">
            <div class="title">我的文章列表</div>
            <div class="recommend-content">
                <el-timeline
                    :infinite-scroll-disabled="noData"
                    v-infinite-scroll="load"
                    infinite-scroll-delay="300"
                    infinite-scroll-distance="100"
                    infinite-scroll-immediate="1"
                >
                    <el-timeline-item
                        v-for="(item, index) in pageList"
                        placement="top"
                        :key="index"
                        color="rgb(81, 174, 250)"
                    >
                        <el-card class="recommend-content-item">
                            <span class="open-switch">
                                <el-tooltip content="是否公开" placement="top">
                                    <el-switch
                                        v-model="item.is_open"
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#13ce66"
                                        inactive-color="#bdbaba"
                                        @change="((val)=>{switchChange(val, item, index)})"
                                    ></el-switch>
                                </el-tooltip>
                            </span>
                            <div class="content">
                                <div class="artical-title">
                                    <span
                                        class="title-text"
                                        @click="gotoDetail(item.id)"
                                    >{{item.title}}</span>
                                    <el-tag size="mini">前端</el-tag>
                                    <el-tag size="mini" type="success">vue</el-tag>
                                    <el-tag size="mini" type="warning">js</el-tag>
                                    <!-- <el-tag size="mini" type="warning">标签四</el-tag>
                                    <el-tag size="mini" type="danger">标签五</el-tag>-->
                                </div>
                                <p class="author" @click="gotoDetail(item.id)">
                                    <span class="nick-name">{{item.nick_name}}</span> 提交于
                                    <span class="create-time">{{item.create_time | formatDate}}</span>
                                </p>
                            </div>
                            <div class="operator">
                                <span>
                                    收藏数
                                    <span style="color: #4790ee">还没写</span>
                                </span>
                                <span>
                                    点赞数
                                    <span style="color: #4790ee">{{item.thumb_up_count}}</span>
                                </span>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <div class="no-data" v-else>暂无相关数据 嘻嘻！</div>
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
import { getArtical, submitIsOpen } from "api/index";
import { setTimeout } from "timers";
export default {
    name: "home",
    data() {
        return {
            pageList: [],
            params: {
                rows: 20,
                page: 1
            },
            noData: false,
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
            (params.type = "self"),
                getArtical(params).then(res => {
                    let data = res.data;
                    if (data.code === 0) {
                        if (data.content.length === 0) {
                            this.noData = true;
                            return;
                        }
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
        },

        // 设置公开和加密
        switchChange(val, item, index) {
            console.log(val);
            let params = {};
            params.is_open = val;
            params.id = item.id;
            submitIsOpen(params).then(res => {
                if (res.data.code === 0) {
                    if (val) {
                        this.$message({
                            type: "success",
                            message: "已公开"
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: "已加密"
                        });
                    }

                    this.$set(this.pageList, "is_open", val);
                } else {
                    this.$message.error(res.data.message);
                    this.$set(this.pageList, "is_open", item.is_open);
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.recommend {
    .title {
        // position: absolute;
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
            .open-switch {
                position: absolute;
                right: 10px;
                top: 22px;
                color: #aaa;
                font-size: 12px;
            }
        }
        .content {
            .title-text {
                cursor: pointer;
            }
            .author {
                cursor: pointer;
            }
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
                color: rgb(38, 62, 116);
            }
            .reply-input {
                margin-top: 15px;
            }
            .reply-btn {
                overflow: hidden;
                padding-top: 8px;
                .el-button {
                    float: right;
                }
            }
        }
    }
}
.artical-title {
    font-weight: bold;
    font-size: 20px;
    .el-tag {
        font-weight: normal;
        margin: 0 5px;
    }
}
.author {
    margin-top: 5px;
    color: #aaa;
}
.nick-name {
    color: rgb(99, 149, 241);
}
.create-time {
    color: rgb(71, 144, 238);
    font-size: 12px;
}
.no-data {
    text-align: center;
    color: #aaa;
    padding-top: 50px;
}
</style>
