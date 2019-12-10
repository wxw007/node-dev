<template>
    <div>
        <el-table
            :span-method="objectSpanMethod"
            @expand-change="expandChange"
            :data="tableData4"
            style="width: 100%;margin-bottom: 20px;"
            row-key="id"
            border
        >
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    methods: {
        expandChange(row, isOpen) {
            let id = row.id;
            let resultArr = [];
            let tableData5 = JSON.parse(JSON.stringify(this.tableData5Bak));
            let start = tableData5.findIndex(item => item.id === id);
            let obj = this.tableData4.find(item => item.id === id);
            let childrenCount = obj.children.length;
            let replaceArr = [];
            if (isOpen) {
                // 如果展开行
                replaceArr.push(1 + childrenCount);
                for (let i = 0; i < childrenCount; i++) {
                    replaceArr.push(0);
                }
            } else {
                // 如果关闭行
                for (let i = 0; i < childrenCount + 1; i++) {
                    replaceArr.push(1);
                }
            }
            this.spanArr.splice(start, 1 + childrenCount, ...replaceArr);
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        },
        initSpanArr() {
            let arr = [];
            this.tableData5Bak.forEach(item => {
                arr.push(1);
            });
            this.spanArr = arr;
        }
    },
    created() {
        this.initSpanArr();
    },
    mounted() {},
    data() {
        return {
            showTable: false,
            spanArr: [],
            tableData4: [
                {
                    id: "5",
                    date: "2016-05-01",
                    name: "虎皮猫55",
                    address: "上海市普陀区金沙江路 1519 弄",
                    children: [
                        {
                            id: "51",
                            date: "111",
                            name: "虎皮猫55",
                            address: "上海市普陀区金沙江路 1519 弄"
                        },
                         {
                            id: "52",
                            date: "111",
                            name: "虎皮猫55",
                            address: "上海市普陀区金沙江路 1519 弄"
                        }
                    ]
                },
                {
                    id: "2",
                    date: "2016-05-01",
                    name: "虎皮猫22",
                    address: "上海市普陀区金沙江路 1519 弄",
                    children: [
                        {
                            id: "21",
                            date: "111",
                            name: "虎皮猫22",
                            address: "上海市普陀区金沙江路 1519 弄"
                        }
                    ]
                },
                {
                    id: "3",
                    date: "2016-05-01",
                    name: "虎皮猫33",
                    address: "上海市普陀区金沙江路 1519 弄",
                    children: [
                        {
                            id: "31",
                            date: "111",
                            name: "虎皮猫33",
                            address: "上海市普陀区金沙江路 1519 弄"
                        }
                    ]
                }
            ],
            tableData5Bak: [
                {
                    id: "5",
                    date: "2016-05-01",
                    name: "虎皮猫55",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id: "51",
                    date: "2016-05-01",
                    name: "虎皮猫55",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                 {
                            id: "52",
                            date: "111",
                            name: "虎皮猫55",
                            address: "上海市普陀区金沙江路 1519 弄"
                        },
                {
                    id: "2",
                    date: "2016-05-01",
                    name: "虎皮猫22",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id: "21",
                    date: "2016-05-01",
                    name: "虎皮猫22",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id: "3",
                    date: "2016-05-01",
                    name: "虎皮猫33",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    id: "31",
                    date: "2016-05-01",
                    name: "虎皮猫33",
                    address: "上海市普陀区金沙江路 1519 弄"
                }
            ],

            formLabelWidth: "90px"
        };
    },
    beforeMount: function() {}
};
</script>