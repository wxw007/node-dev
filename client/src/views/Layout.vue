<template>
    <div class="wrap">
        <header-base></header-base>
        <div class="container">
            <nav-base class="nav"></nav-base>
            <div class="content-wrap">
                <div class="content">
                <keep-alive>
                    <transition name="fade-transform" mode="out-in">
                        <router-view v-if="$route.meta.keepAlive">
                        </router-view>
                    </transition>
                </keep-alive>
                <transition name="fade-transform" mode="out-in">
                    <router-view v-if="!$route.meta.keepAlive">
                    </router-view>
                </transition>
                <!-- <transition name="fade-transform" mode="out-in">
                        <router-view >
                        </router-view>
                    </transition> -->
            </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import HeaderBase from "@/components/Header-Base.vue";
import NavBase from "@/components/Nav-Base.vue";
export default {
    components: {
        HeaderBase,
        NavBase
    }
};
</script>
<style lang="less" scoped>
.wrap {
    // background: url("../../public/images/indexBg.jpg") no-repeat;
    // background: #f2f2f2;
    background-size: cover;
    background-attachment: fixed;
    box-sizing: border-box;
    position: fixed;
    top: 62px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
}
.container {
    width: 1100px;
    margin: 0 auto;
    padding: 0 5px;
    overflow: hidden;
    box-sizing: border-box;
}
.nav {
    float: left;
    margin-top: 20px;
}
.content-wrap{
    width: 100%;
    // overflow: auto;
}
.content {
    width: 900px;
    margin: 0 auto;
    position: relative;
    padding-top: 35px;
}

/* fade-transform */
// .fade-transform-leave-active,
.fade-transform-enter-active {
    transition: all 0.3s;
}

.fade-transform-enter {
    // opacity: .8;
    transform: translateX(-30px);
    z-index: 1;
}

// .fade-transform-leave-to {
//   opacity: .6;
//   transform: translateX(30px);
// }
</style>
