<template>
  <div class="diary-wrapper">
   <div class="date-picker">
      <el-date-picker
      @change="dateChange"
      class="date-picker"
      v-model="week"
      type="week"
      format="第 WW 周"
      placeholder="选择周">
    </el-date-picker>
   </div>
    <span class="time">日期: {{day}}</span>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="写日志" name="write">
        <el-form
          :model="dynamicValidateForm"
          ref="dynamicValidateForm"
          label-width="30px"
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
      </el-tab-pane>
      <el-tab-pane label="日志列表" name="view">
        <el-timeline style="padding-left: 10px">
          <el-timeline-item
            v-for="(item,index) in workDiaryList"
            :key="index"
            :timestamp="'最后更新时间: '+ formatDate(item.create_time)"
            placement="top"
            color="rgb(81, 174, 250)"
          >
            <el-card class="recommend-content-item">
              <div class="content">
                <div>
                  <p
                    v-for="(itemContent, itemIndex) in item.content"
                    :key="itemIndex"
                  >{{itemIndex+1}}、 {{itemContent}}</p>
                </div>
              </div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { submitWorkDiary, getWorkDiary } from "api/index";
export default {
  data() {
    return {
      week:"",
      workDiaryList: [],
      activeName: "write",
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
  computed: {
    weekStartDate() {
      if(this.week){
        return this.week.getTime();
      }
      return 0;
      
    },
    weekEndDate() {
      if(this.week){
          return this.week.getTime() + 7 * 24 * 60 * 60 * 1000 - 1000;
      }
      return 0
    },
  },
  created() {
    this.day = this.getDay(new Date());
    this.getWorkDiary();
  },
  methods: {
    dateChange(){
      this.getWorkDiary();
    },
    // 时间戳转换时间
    formatDate(timestamp) {
      let datetime = new Date(timestamp);

      // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
      var year = datetime.getFullYear(),
        month = ("0" + (datetime.getMonth() + 1)).slice(-2),
        date = ("0" + datetime.getDate()).slice(-2),
        hour = ("0" + datetime.getHours()).slice(-2),
        minute = ("0" + datetime.getMinutes()).slice(-2),
        second = ("0" + datetime.getSeconds()).slice(-2);

        // 获取星期几
        let weekDay = this.getDay(datetime)
      // 拼接
      var result =
       
        weekDay +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second;

      return result;
    },
    // 获取日志列表
    getWorkDiary() {
      let params = {};
      params.weekStartDate = this.weekStartDate;
      params.weekEndDate = this.weekEndDate;
      getWorkDiary(params).then(res => {
        if (res.data.code === 0) {
          this.workDiaryList = this.changeWorkDiary(res.data.content);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    // 处理日志列表
    changeWorkDiary(arr) {
      if (arr.length === 0) {
        return;
      }
      let newArr = arr.map(item => {
        let obj = {};
        obj.create_time = item.create_time;
        obj.content = item.content.split(",");
        return obj;
      });
      return newArr;
    },
    handleClick() {
      let avtiveName = this.activeName;
      if(avtiveName === 'view'){
        this.getWorkDiary()
      }
    },
    // 获取当天日期
    getDay(day) {
      // let day = date || new Date();
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
      weekday[myddy] +
        " " +
        day.getFullYear() +
        "-" +
        (day.getMonth() + 1) +
        "-" +
        day.getDate() 
        
      return s2;
    },
    // 提交表单前处理数据
    dealData() {
      let params = {};
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
}
.time {
  position: absolute;
  right: 0;
  margin-top: 10px;
  color: #aaa;
  font-size: 14px;
  vertical-align: middle;
}
.el-form {
  margin-top: 20px;
}
.date-picker{
  color: rgb(81, 174, 250);
}
</style>