<template>
    <div class="wrap">
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="账号">
            <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.passWord"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
            <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上传头像">
            <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item> -->
        <input type="file" id="file">
        <el-button @click="upload">上传</el-button>
        <el-form-item>
            <el-button type="primary" class="login-btn" @click="login">注册</el-button>
            <el-button @click="gotoRegister">取消</el-button>
        </el-form-item>
    </el-form>

    <form action="//127.0.0.1:3000/upload" method="post" enctype="application/x-www-form-urlencoded">
        <input type="file" name="avatar">
        <input type="submit" value="提交">
    </form>
    </div>
</template>
<script>
import {upload} from "api/index"
export default {
    data() {
        return {
            form:{
                userName: "",
                passWord: "",
                nickName: "",
                imageUrl: ""
            }
            
        }
    },
    methods:{
        // 上传
        upload(){
            let file = document.getElementById("file").files[0];
            if(!file){
                return
            }
            let params =  new FormData();
            params.append("avatar", file);
            upload(params).then(res => {
                if(res.data.code === 0){
                    this.$message({
                        type: "success",
                        message: "上传成功"
                    })
                } else {
                    this.$message.error(res.data.message)
                }
            })
        },
        handleAvatarSuccess(){

        },
        beforeAvatarUpload() {

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
                    })
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
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>