<template>
    <div class="home">
        <div class="recommend">
            <div class="title">我收藏的文章</div>
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
                            <div class="content" @click="gotoDetail(item.id)">
                                <div class="artical-title">
                                    {{item.title}}
                                    <el-tag size="mini">前端</el-tag>
                                    <el-tag size="mini" type="success">vue</el-tag>
                                    <el-tag size="mini" type="warning">js</el-tag>
                                </div>
                                <p class="author">
                                    <span class="nick-name">{{item.nick_name}}</span> 提交于
                                    <span class="create-time">{{item.create_time | formatDate}}</span>
                                </p>
                            </div>
                            <div class="operator">
                                <span
                                    @click="submitCollect(item, index, 1)"
                                    v-if="!item.is_collection"
                                >
                                    收藏
                                    <i class="el-icon-star-off"></i>
                                </span>
                                <span @click="submitCollect(item, index, 0)" v-else>
                                    已收藏
                                    <i class="el-icon-star-on"></i>
                                </span>
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
import { getArtical, submitCollect } from "api/index";
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
            params.type = "collection";
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

        // 收藏或者取消收藏
        submitCollect(item, index, val) {
            let params = {};
            params.id = item.id;
            params.is_collect = val;
            submitCollect(params).then(res => {
                if (res.data.code === 0) {
                    this.$set(this.pageList[index], "is_collection", val);
                    if (val) {
                        this.$message({
                            type: "success",
                            message: "收藏成功"
                        });
                    } else {
                        this.$message({
                            type: "warning",
                            message: "已取消收藏"
                        });
                    }
                } else {
                    this.$set(
                        this.pageList[index],
                        "is_collect",
                        item.is_collect
                    );
                    this.$message.error(res.data.message);
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
.el-icon-star-on {
    color: rgb(114, 184, 250);
    font-size: 18px;
    vertical-align: middle;
    margin-top: -4px;
}
</style>
