<template>
    <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="login-btn" @click="login">登陆</el-button>
            <el-button @click="gotoRegister">注册</el-button>
            <el-button @click="checkToken">验证token</el-button>
        </el-form-item>
    </el-form>
    <div>token： {{token}}</div>
    <div>{{info}}</div>
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
            token: ""
        }
    },
    methods:{
        checkToken(){
            let params = {};
            params.token = this.token || localStorage.token || "";
            checkToken(params).then( res => {
                if(res.data.code === 0){
                    this.info = res.data.content;
                    this.$message({
                        type: "success",
                        message: "token有效 验证成功"
                    })
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
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
                        message: "登录成功"
                    });
                    localStorage.setItem("token", res.data.content)
                    this.token = res.data.content;
                } else {
                    let message = res.data.message;
                    this.$message({
                        type: "warning",
                        message
                    })
                }
            }).catch( err => {
                console.log(err)
            })


        }
    }
    
}
</script>
<style scoped lang="less">
.wrap{
    padding-top: 1px;
}
.el-form{
    width: 300px;
    margin: 100px auto 0 auto;
}
.login-btn{
}
</style>