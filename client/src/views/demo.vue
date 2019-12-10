<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" v-for="(v,i) in examDetailCols" :key="i">
        <template slot-scope="scope">
          <el-select v-model="scope.row[v.ruleId]" placeholder="请选择">
            <el-option v-for="itm in v.ops" :key="itm.key" :label="itm.label" :value="itm.key"></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      examDetailCols1: [
        {
          ruleId: "a",
          ops: [
            {
              key: "1",
              label: "选项1"
            },
            {
              key: "2",
              label: "选项2"
            }
          ]
        },
        {
          ruleId: "b",
          ops: [
            {
              key: "1",
              label: "选项1"
            },
            {
              key: "2",
              label: "选项2"
            }
          ]
        },
        {
          ruleId: "c",
          ops: [
            {
              key: "1",
              label: "选项1"
            },
            {
              key: "2",
              label: "选项2"
            }
          ]
        }
      ],
      tableData1: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        }
      ],
      examDetailCols:[],
      tableData:[],

    };
  },
  mounted(){
      const _this = this;
      setTimeout(()=>{
          _this.examDetailCols = _this.examDetailCols1;
          _this.tableData = _this.tableData1;
      }, 1000)
  },
  methods:{

  }
};
</script>
<style lang="less" scoped>
</style>