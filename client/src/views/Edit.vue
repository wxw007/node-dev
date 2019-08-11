<template>
    <div class="editor-container">
        <div class="operation">
            <el-button style="float: right;margin-top: 8px;margin-right: 10px; font-size: 14px;" size="mini" type="primary">发布</el-button>
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
            content: "",
            editorOption: {}
        }
    },
    methods: {
        onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange(){}, // 内容改变事件
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
        submit(){
            
        }
    }

}
</script>
<style lang="less" scoped>
   
    .quill-editor{
        height: calc(100vh - 180px);
        background: #fff;

    }
    .ql-editor{
    }
    /deep/.ql-toolbar.ql-snow + .ql-container.ql-snow{
        background: #fff;
    }
  
</style>