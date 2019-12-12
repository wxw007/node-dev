<template>
    <div class="wrapper">
        <el-button type="primary" @click="submit">发布消息</el-button>
        <!-- <div
            class="group ondrag"
            v-for="(groupItem, groupIndex) in arr"
            :key="'groupIndex'+groupIndex"
            @drop="drop($event,groupItem, groupIndex, arr)"
            @dragover.prevent="dragover"
            @dragenter.prevent="dragenter($event,groupIndex)"
            :class="{isDragenter: isDragenterIndex===groupIndex}"
        >
            <div draggable="false"><slot name="title" :groupItem="groupItem">分组标题</slot></div>
            <div class="unit-list">
                <transition-group name="list" tag="div">
                    <div
                        @drag="drag"
                        @dragstart.self="dragStart($event, dragItem, itemIndex, groupIndex, arr)"
                        @dragend="dragend"
                        draggable="true"
                        class="list-item"
                        v-for="(dragItem, itemIndex) in groupItem.itemList"
                        :key="itemIndex"
                        :id="'dragItem-'+groupIndex+'-'+itemIndex"
                    >
                        <span v-html="dragItem.text"></span>
                    </div>
                </transition-group>
            </div>
        </div>-->
    </div>
</template>
<script>
export default {
    data() {
        return {
            isDragenterIndex: "",

            arr: [
                {
                    title: "标题1",
                    itemList: [
                        {
                            text: "111"
                        },
                        {
                            text: "222"
                        },
                        {
                            text: "333"
                        }
                    ]
                },
                {
                    title: "标题2",
                    itemList: [
                        {
                            text: "444"
                        },
                        {
                            text: "555"
                        },
                        {
                            text: "666"
                        }
                    ]
                },
                {
                    title: "标题3",
                    itemList: [
                        {
                            text: "777"
                        },
                        {
                            text: "888"
                        },
                        {
                            text: "999"
                        }
                    ]
                }
            ]
        };
    },
    mounted() {
        this.makeWebsocket();
    },
    methods: {
        makeWebsocket() {
            socket.on("connect", function() {
                console.log("connect");
            });
        },
        // 发布消息
        submit() {
            socket.emit("submit", '这是一条消息');
        },
        getDragElData(e) {
            if (e.dataTransfer) {
                let data = JSON.parse(e.dataTransfer.getData("data"));
                let itemIndex = e.dataTransfer.getData("itemIndex") - 0;
                let groupIndex = e.dataTransfer.getData("groupIndex") - 0;
                let arr = JSON.parse(e.dataTransfer.getData("arr"));
                let obj = { data, itemIndex, groupIndex, arr };
                return obj;
            } else {
                return null;
            }
        },

        drop(e, group, groupIndex, arr) {
            let id = e.dataTransfer.getData("id");
            // 如果在原容器释放拖动 则不做任何改变
            if (
                e.target.parentNode === document.getElementById(id).parentNode
            ) {
                return;
            }
            let dropElData = this.getDragElData(e);
            this.arr[dropElData.groupIndex].itemList.splice(
                dropElData.itemIndex,
                1
            );
            this.arr[groupIndex].itemList.push(dropElData.data);
            console.log("数据：", this.arr);
        },
        dropItem(e, group, groupIndex) {
            let id = e.dataTransfer.getData("id");
            if (
                e.target.parentNode === document.getElementById(id).parentNode
            ) {
                return;
            }
            let dropElData = this.getDragElData(e);
            this.arr[dropElData.groupIndex].itemList.splice(
                dropElData.itemIndex,
                1
            );
            this.arr[groupIndex].itemList.push(dropElData.data);
            console.log("数据：", this.arr);
        },
        dragover(e) {
            e.preventDefault();
        },
        dragStart(e, item, itemIndex, groupIndex, arr) {
            e.dataTransfer.setData("id", e.target.id);
            e.dataTransfer.setData("data", JSON.stringify(item));
            e.dataTransfer.setData("itemIndex", itemIndex);
            e.dataTransfer.setData("groupIndex", groupIndex);
            e.dataTransfer.setData("arr", JSON.stringify(arr));
        },
        drag(e) {},
        dragenter(e, groupIndex) {
            this.isDragenterIndex = groupIndex;
        },
        dragend() {
            this.isDragenterIndex = "";
        }
    }
};
</script>
<style scoped>
.wrapper {
    padding-top: 1px;
}
.group {
    margin-bottom: 20px;
    padding: 10px;
    margin: 10px;
}
.group.ondrag {
    border: 1px dashed #aaa;
}
.list-item {
    background: #aae0f8;
    margin: 10px;
    padding: 10px;
    transition: all 0.2s;
}
.list-item:hover {
    background: #6acdf8;
    cursor: pointer;
}
.group.ondrag.isDragenter {
    border: 2px dashed #f00;
}
</style>
<style>
.list-enter-active,
.list-leave-active {
    transition: all 0.3s ease-in-out;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateX(100px);
}
</style>