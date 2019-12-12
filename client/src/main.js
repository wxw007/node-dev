import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import hupicatUi from "hupicat-ui";
Vue.use(hupicatUi)


import "../public/css/common.css"

import io from "socket.io-client";
window.socket = io("ws://localhost:4000");

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

