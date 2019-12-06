<template>
    <div class="wrapper">
        <div
            class="group ondrag"
            v-for="(group, groupIndex) in arr"
            :key="groupIndex"
            @drop.self="drop($event,group, groupIndex, arr)"
            @dragover.self="dragover"
            @dragenter="dragenter($event,groupIndex)"
            :class="{isDragenter: isDragenterIndex===groupIndex}"
        >
            <div
                class="title"
                @drop.self="dropItem($event,group, groupIndex, arr)"
                @dragover="dragover"
            >{{group.title}}</div>
            <div class="unit-list">
                <transition-group name="list" tag="div">
                    <div
                        @drag="drag"
                        @dragstart.self="dragStart($event, item, itemIndex, groupIndex, arr)"
                        @drop.self="dropItem($event,group, groupIndex, arr)"
                        @dragover="dragover"
                        @dragend="dragend"
                        draggable="true"
                        class="list-item"
                        v-for="(item, itemIndex) in group.itemList"
                        :key="itemIndex"
                        :id="'item-'+groupIndex+'-'+itemIndex"
                    >
                        <span>{{item.text}}</span>
                    </div>
                </transition-group>
            </div>
        </div>
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
    methods: {
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
            if (e.target === document.getElementById(id).parentNode) {
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
    margin-left: 100px;
}
.group {
    margin-bottom: 20px;
    padding: 10px;
}
.group.ondrag {
    border: 1px dashed #aaa;
}
.list-item {
    background: #aae0f8;
    margin: 5px;
    padding:10px;
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
    transition: all 0.5s ease-in-out;
}
.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>