<template>
  <div class="diary-wrapper">
    <div class="title">
      写日志
      <span class="time">日期: {{day}}</span>
    </div>
    <el-form
      :model="dynamicValidateForm"
      ref="dynamicValidateForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="(index+1)+'、'"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
      required: true, message: '内容不能为空', trigger: 'blur'
    }"
      >
        <el-input v-model="domain.value" style="width: 80%; margin-right: 20px"></el-input>
        <el-button @click.prevent="removeDomain(domain)" type="danger" v-if="index>0">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">保存</el-button>
        <el-button @click="addDomain" type="success">新增记录</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">全部清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { submitWorkDiary } from "api/index";
export default {
  data() {
    return {
      day: "",
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ]
      }
    };
  },
  created() {
    this.getDay();
  },
  methods: {
    // 获取当天日期
    getDay() {
      let day = new Date();
      day.setTime(day.getTime());
      let myddy = day.getDay(); //获取存储当前日期
      const weekday = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      ];
      var s2 =
        day.getFullYear() +
        "-" +
        (day.getMonth() + 1) +
        "-" +
        day.getDate() +
        " " +
        weekday[myddy];
      this.day = s2;
    },
    // 提交表单前处理数据
    dealData() {
      let params = {};
      params.createTime = Date.now();
      let arr = [];
      this.dynamicValidateForm.domains.forEach((item, index) => {
        arr.push(item.value);
      });
      params.content = arr;
      return params;
    },

    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = _this.dealData();
          submitWorkDiary(params).then(res => {
            if (res.data.code === 0) {
              _this.$message({
                type: "success",
                message: "保存成功"
              });
              _this.dynamicValidateForm = {
                domains: [
                  {
                    value: ""
                  }
                ]
              };
            } else {
              _this.$message.error(res.data.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>
<style lang="less" scoped>
.title {
  padding-bottom: 10px;
  width: 100%;
  top: 20px;
  font-size: 20px;
  color: #333;
  border-bottom: 1px solid #ddd;
  .time {
    float: right;
    color: #aaa;
    font-size: 14px;
    vertical-align: middle;
    margin-top: 5px;
  }
}

.el-form {
  margin-top: 20px;
}
</style>