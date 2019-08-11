<template>
    <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
            <el-button @click="gotoRegister">注册</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>
<script>
import { login, checkToken } from "api/index"
export default {
    data() {
        return {
            form:{
                userName: "",
                passWord: ""
            },
            info: "",
        }
    },
    methods:{
        // checkToken(){
        //     let params = {};
        //     params.token = this.token || localStorage.token || "";
        //     checkToken(params).then( res => {
        //         if(res.data.code === 0){
        //             this.info = res.data.content;
        //             this.$message({
        //                 type: "success",
        //                 message: "token有效 验证成功"
        //             })
        //         } else {
        //             this.$message.error(res.data.message)
        //         }
        //     })
        // },
        gotoRegister(){
            this.$router.push("Register")
        },
        checkLoginInfo(){
            if(!this.form.userName){
                this.$message.error("账号不能为空");
                return false;
            }
            if(!this.form.passWord){
                this.$message.error("密码不能为空");
                return false;
            }
            return true;
        },
        login() {
            let validate = this.checkLoginInfo();
            if(!validate){
                return
            };
            let params = this.form;
            login(params).then( res => {
                console.log(res)
                if(res.data.code === 0){
                    this.$message({
                        type: "success",
                        message: "登录成功",
                    });
                    localStorage.setItem("token", res.data.content)
                    this.$router.push("/")
                    
                } else {
                    let message = res.data.message;
                    this.$message.error(message)
                }
            }).catch( err => {
                console.log(err)
            })


        }
    }
    
}
</script>
<style scoped lang="less">
.wrap {
    position: relative;
    padding-top: 1px;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    &::before {
        content: "";
        -webkit-filter: blur(8px);
        filter: blur(8px);
        display: block;
        z-index: -1;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: url("../../public/images/bg.jpg") no-repeat;
        background-size: cover;
        opacity: .5;
    }
}
.el-form{
    width: 300px;
    margin: 100px auto 0 auto;
}
.login-btn{
}
</style>