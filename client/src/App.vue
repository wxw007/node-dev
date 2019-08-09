<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="less">


/* fade-transform */
// .fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .3s;
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
