<template>
    <div class="wrap">
        <el-form class="form" ref="ruleForm" :model="form" label-width="80px" :rules="rules" status-icon>
            <el-form-item label="账号" prop="userName">
                <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-input
                    type="password"
                    v-model="form.passWord"
                    show-password
                    placeholder="只能输入6-20个字母、数字、下划线"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassWord">
                <el-input
                    type="password"
                    v-model="form.confirmPassWord"
                    show-password
                    placeholder="只能输入6-20个字母、数字、下划线"
                ></el-input>
            </el-form-item>
            <el-form-item label="昵称">
                <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="上传头像">
                <input style="display: none" type="file" id="file" @change="upload" />
                <label class="upload-icon" for="file" v-if="!form.avatarUrl">+</label>
                <img
                    v-if="form.avatarUrl"
                    class="avatar"
                    :src="form.avatarUrl"
                    @click="changeImg"
                    alt
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="login-btn" @click="submit">注册</el-button>
                <el-button @click="gotoLogin">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {register} from "api/index"
import client from "util/oss-config";
import uuid from "uuid";

let SIZE_NUM = 5; // 图片大小数值
const MAX_SIZE = SIZE_NUM * 1024 * 1024; // 图片最大为 5M

//校验密码：只能输入6-20个字母、数字、下划线
function isPasswd(s) {
    var patrn = /^(\w){6,20}$/;
    if (!patrn.exec(s)) return false;
    return true;
}

export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            } else if (!isPasswd(value)) {
                callback(new Error("只能输入6-20个字母、数字、下划线"));
            } else {
                if (this.form.passWord !== "") {
                    this.$refs.ruleForm.validateField("confirmPassWord");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.form.passWord) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            form: {
                userName: "",
                passWord: "",
                confirmPassWord: "",
                nickName: "",
                avatarUrl: ""
            },
            loading: false,
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入账号",
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 20,
                        message: "长度在 6 到 20 个字符",
                        trigger: "blur"
                    }
                ],
                passWord: [
                    // {
                    //     required: true,
                    //     message: "请输入密码",
                    //     trigger: "blur"
                    // },
                    { validator: validatePass, trigger: "blur" }
                ],
                confirmPassWord: [
                    // {
                    //     required: true,
                    //     message: "请再次输入密码",
                    //     trigger: "blur"
                    // },
                    { validator: validatePass2, trigger: "blur" }
                ]
            }
        };
    },
    methods: {
        // 更改头像
        changeImg() {
            document.getElementById("file").click();
        },
        // 上传
        upload() {
            let file = document.getElementById("file").files[0];

            // 无文件时返回
            if (!file) {
                return;
            }
            // 判断文件类型 是否为图片
            let type = file.type;
            if (type.indexOf("image") === -1) {
                this.$message.error("只能上传图片");
                return;
            }

            // 判断文件大小是否超过限制
            let size = file.size;
            if (size > MAX_SIZE) {
                this.$message.error(`只能上传 ${SIZE_NUM}M 以内的图片`);
                return;
            }

            // 生成上传的文件名
            let index = file.name.lastIndexOf(".");
            let fileType = file.name.substr(index + 1).toLowerCase();
            let fileName = uuid.v1() + "." + fileType;

            // 执行上传 oss
            let _this = this;
            client
                .multipartUpload(fileName, file)
                .then(function(result) {
                    if (result.res.status === 200) {
                        console.log(result);
                        let imgUrl = result.res.requestUrls[0];
                        _this.form.avatarUrl = imgUrl.replace(
                            "http:",
                            "https:"
                        );
                        _this.form.avatarUrl = _this.form.avatarUrl.split(
                            "?"
                        )[0];
                    } else {
                    }
                })
                .catch(function(err) {
                    console.log(err);
                });

            console.log(fileName);
        },

        // 提交表单
        submit() {
            let that = this;
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    let params = this.form;
                    register(params).then(res => {
                        if(res.data.code === 0){
                            that.$message({
                                type: "success",
                                message: "注册成功",
                            })
                            that.$router.push("login")
                        } else {
                            that.$message.error(res.data.message)
                        }
                    })
                } else {
                    return false;
                }
            });
        },

        gotoLogin() {
            this.$router.push("login");
        }
    }
};
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
.el-form {
    width: 500px;
    margin: 100px auto 0 auto;
}
.el-form-item{
    color: #fff;
}
.login-btn {
}
.upload-icon {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    border: 1px solid #fff;
    text-align: center;
    line-height: 80px;
    color: #fff;
    font-size: 30px;
    font-weight: 100;
    cursor: pointer;
}
.avatar {
    display: inline-block;
    width: 80px;
    height: 80px;
    border-radius: 4px;
    cursor: pointer;
}
.el-button{

}
</style>