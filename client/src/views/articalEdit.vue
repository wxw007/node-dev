<template>
    <div class="editor-container">
        <div class="title require">
            <el-input v-model="title" placeholder="请输入标题(必填)" require></el-input>
        </div>
        <div class="operation">
            <el-button style="float: right;margin-top: 8px;margin-right: 10px; font-size: 14px;" size="mini" type="primary" @click="submit">发布</el-button>
        </div>
         <quill-editor
            v-model="content"
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script>
import { submitArtical } from "api/index"
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
export default {
     components: {
        quillEditor
    },
    data() {
        return {
            content: "<p>1111</p>",
            editorOption: {},
            title: ""
        }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(e){
            console.log(this.editor)
        }, 
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        },
         submit(){
            let params = {};
            params.content = this.content;
            params.title = this.title.trim();
            if(!this.title){
                this.$message.error("请填写标题")
                return
            }
            if(!this.content){
               this.$message.error("请填写内容")
                return 
            }
            submitArtical(params).then(res => {
                if(res.data.code === 0){
                    this.$message({
                        type: "success",
                        message: "发布成功"
                    })
                } else {
                    this.$message.error(res.data.message)
                }

            }).catch(err => {

            })

        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
       
    }

}
</script>
<style lang="less" scoped>
   
    .quill-editor{
        height: calc(100vh - 180px - 50px);
        background: #fff;

    }
    .ql-editor{
    }
    /deep/.ql-toolbar.ql-snow + .ql-container.ql-snow{
        background: #fff;
    }
    /deep/.ql-snow .ql-tooltip.ql-flip{
        left:0 !important;
        top: 0 !important;
    }

    .title{
        height: 40px;
        margin-bottom: 10px;
        .el-input{
            font-size: 16px;
            color: #333;
        }
    }
    .require::before{
        content: "*";
        color: #F00;
        font-size: 10px;
        position: absolute;
        left: -10px
    }
  
</style>