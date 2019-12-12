<template>
    <div class="home">
        <div class="recommend">
            <div class="title">互动消息</div>
            <div class="recommend-content">
                <el-timeline>
                    <el-timeline-item
                        v-for="(item, index) in 2"
                        placement="top"
                        :key="index"
                        color="rgb(81, 174, 250)"
                        :timestamp="item.create_time"
                    >
                        <el-card class="recommend-content-item">
                            <div>
                                <span class="responder">大地瓜</span>在
                                <span class="artical-title">文章123456</span>中回复了:
                            </div>
                            <div
                                class="response-content"
                            >测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息</div>
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

import { getMessage } from "api/index";

export default {
    data() {
        return {};
    },
    created() {},
    mounted() {
        this.makeWebsocket();
    },
    filters: {
        formatDate(val) {
            return val.formatDate();
        }
    },
    methods: {
        makeWebsocket() {
            
            socket.on("connect", function() {
                console.log("connect");
            });
            socket.on("test", function(data) {
                alert(data);
            });
        },
        getMessage() {
            let params = {};
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
            color: #999;
        }
    }
    .responder {
        color: #666;
        margin-right: 5px;
        font-weight: bold;
    }
    .artical-title {
        color: #666;
        margin: 0 5px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            color: rgb(52, 171, 250);
            text-decoration: underline;
        }
    }
    .response-content {
        margin-top: 5px;
        color: #555;
    }
}
</style>
