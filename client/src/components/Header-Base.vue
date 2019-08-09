<template>
    <div class="header">
        <div class="logo colorful">
            <span>LOGO</span>
        </div>
        <div class="user-info">
            <img v-if="avatarUrl" class="avatar" :src="avatarUrl" alt />
            <img v-else class="avatar" src="../assets/avatar.jpg" alt />
            <span class="user-name">
                欢迎:
                <span class="name-text">{{nickName}}</span>
                <span class="login-out" @click="loginOut">注销</span>
            </span>
            
        </div>
    </div>
</template>
<script>
import { getUserInfo } from "api/index";
export default {
    data() {
        return {
            avatarUrl: "",
            nickName: "",
        }
    },
    created(){
        this.getUserInfo();
    },
    methods:{
        getUserInfo(){
            getUserInfo().then(res => {
                let data = res.data;
                if(res.data.code === 0){
                    this.avatarUrl = data.content.avatar;
                    this.nickName = data.content.nick_name;
                } else {
                    this.$message({
                        type: "error",
                        message: data.message,
                    })
                    this.$router.push("/login");
                }
            })
        },
        loginOut(){
            localStorage.removeItem("token");
            this.$router.push("/login");
            this.$message({
                type: "success",
                message: "退出成功"
            })

        }
    }
};
</script>
<style lang="less" scoped>
.header {
    height: 60px;
    border-bottom: 1px solid #ccc;
    padding-top: 1px;
    .logo {
        font-weight: bold;
        font-size: 30px;
        margin-left: 10px;
        float: left;
        margin-top: 8px;
    }
    .user-info {
        float: right;
        margin-top: 12px;
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
        }
        .user-name {
            font-size: 14px;
            color: #aaa;
            margin-left: 10px;
            margin-right: 30px;
            .name-text {
                color: #333;
            }
            .login-out {
                margin-left: 30px;
                &:hover{
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }
    }
}

.colorful {
    -webkit-mask-image: linear-gradient(
        to right,
        red,
        orange,
        yellow,
        green,
        cyan,
        blue,
        purple
    );
    background-image: linear-gradient(
        to right,
        red,
        orange,
        yellow,
        green,
        yellow,
        orange,
        red,
        orange,
        yellow,
        green,
        yellow,
        orange,
        red
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -webkit-background-size: 200% 100%;
    animation: bgp 2s infinite linear;
}
@-webkit-keyframes bgp {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}
</style>
