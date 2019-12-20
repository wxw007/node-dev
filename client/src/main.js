import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import hupicatUi from "hupicat-ui";
Vue.use(hupicatUi)

import kkLog from "kk-log"
const options = {
  url: "//127.0.0.1:3000/login",
  method: 'post',
  headers:{
    'token': '123456'
  },
  // 需要记录页面停留时间的 path
  durationRoute:['/test']
  
}

let successCallBack = function(res){console.log(JSON.stringify(res))}
let failCallBack = function(err){console.log(JSON.stringify(err))}
Vue.use(kkLog, options, successCallBack, failCallBack)

import "../public/css/common.css"

import io from "socket.io-client";
// window.socket = io("ws://localhost:4000");

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

