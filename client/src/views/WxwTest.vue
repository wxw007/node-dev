<template>
    <div class="box">
        <el-button v-log="{params:{a:1,b:2}}">123456</el-button>
        <!-- <component is="kkpie"></component> -->
        <!-- <kkpie percent="0.2" /> -->
        <br />
    </div>
</template>
<script>
// import Pie from "components/Pie.vue";
import client from "util/oss-config";
export default {
    data() {
        return {};
    },
    mounted() {},
    methods: {
        upload() {
            var dataurl =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAXCAIAAACEf/j0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhSURBVDhPY3hBARjVTCIY1UwiGNVMIhjVTCIYKM0vXgAAz7ji3fMY8xMAAAAASUVORK5CYII=";

            //base64转blob
            function dataURLtoBlob(dataurl) {
                var arr = dataurl.split(","),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], { type: mime });
            }
            //将blob转换为file
            function blobToFile(theBlob, fileName) {
                theBlob.lastModifiedDate = new Date();
                theBlob.name = fileName;
                return theBlob;
            }

            var _blob = dataURLtoBlob(dataurl);
            suffix = dataurl
                .split(";")[0]
                .split(":")[1]
                .split("/")[1]; //文件扩展名
            var filename = String(new Date().getTime()) + "." + suffix;
            var _file = blobToFile(_blob, filename);
            set_upload_param(uploader, _file, false);
        }
    }
};
</script>
<style lang="less" scoped>
.box {
    position: relative;
    height: 500px;
    width: 500px;
}
.pie {
    margin: 50% auto;
    transform: translateY(-50%);
}
</style>
