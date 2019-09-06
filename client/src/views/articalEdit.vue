<template>
    <div class="editor-container">
        <div class="title require">
            <el-input v-model="title" placeholder="请输入标题(必填)" require></el-input>
        </div>
        <div class="title require">
            <el-radio v-model="is_open" label="1">公开</el-radio>
            <el-radio v-model="is_open" label="0">加密</el-radio>
        </div>
        <div class="operation">
            <el-button
                style="float: right;margin-top: 8px;margin-right: 10px; font-size: 14px;"
                size="mini"
                type="primary"
                @click="submit"
            >发布</el-button>
        </div>
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
        ></quill-editor>
    </div>
</template>
<script>
import { submitArtical, getArtical, updateArtical } from "api/index";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: null,
            editorOption: {},
            title: "",
            editId: null,
            is_open: '1',
        };
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        }
    },
    created() {
        this.initData();
    },
    methods: {
        // 初始化回填数据
        initData() {
            this.editId = this.$route.params.id - 0;
            // 若是新建
            if (!this.editId || this.editId === "new") {
                return;
            }
            // 若是编辑 则回填数据
            this.getArticalData();
        },
        // 获取文章数据
        getArticalData() {
            getArtical({ id: this.editId }).then(res => {
                let data = res.data;
                if (data.code === 0) {
                    this.content = data.content[0].content;
                    this.title = data.content[0].title;
                }
            });
        },
        onEditorReady(editor) {
            // 准备编辑器
        },
        onEditorBlur() {}, // 失去焦点事件
        onEditorFocus() {}, // 获得焦点事件
        onEditorChange(e) {
            console.log(this.editor);
        },
        // 转码
        // escapeStringHTML(str) {
        //     str = str.replace(/&lt;/g, "<");
        //     str = str.replace(/&gt;/g, ">");
        //     return str;
        // },
        submit() {
            let params = {};
            params.content = this.content;
            params.is_open = this.is_open - 0;
            params.title = this.title.trim();
            if (!this.title) {
                this.$message.error("请填写标题");
                return;
            }
            if (!this.content) {
                this.$message.error("请填写内容");
                return;
            }
            if (this.editId && this.editId !== "new") {
                params.id = this.editId;
                this.updateArtical(params);
            } else {
                this.submitArtical(params);
            }
        },
        // 新发布文章
        submitArtical(params) {
            submitArtical(params)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: "success",
                            message: "发布成功"
                        });
                        this.$router.push('/')
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {});
        },

        // 更新文章
        updateArtical(params) {
            updateArtical(params)
                .then(res => {
                    if (res.data.code === 0) {
                        this.$message({
                            type: "success",
                            message: "更新成功"
                        });
                        this.$router.push('/')
                        this.initData();
                    } else {
                        this.$message.error(res.data.message);
                    }
                })
                .catch(err => {});
        }
    }
};
</script>
<style lang="less" scoped>
.quill-editor {
    height: calc(100vh - 180px - 50px);
    background: #fff;
}
.ql-editor {
}
/deep/.ql-toolbar.ql-snow + .ql-container.ql-snow {
    background: #fff;
    height: calc(100vh - 180px - 150px);
}
/deep/.ql-snow .ql-tooltip.ql-flip {
    left: 0 !important;
    top: 0 !important;
}

.title {
    height: 40px;
    margin-bottom: 10px;
    .el-input {
        font-size: 16px;
        color: #333;
    }
}
.require::before {
    content: "*";
    color: #f00;
    font-size: 10px;
    position: absolute;
    left: -10px;
}
</style>